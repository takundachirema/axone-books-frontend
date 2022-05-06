# Axone Books

This repository contains the Client and Server code for Axone books.

## Google Cloud Bigchaindb Node

### Setup SSL

- Install nginx: 
```
sudo apt update
sudo apt install nginx
```
- update the http and https to redirect to port 9984:
```
sudo nano /etc/nginx/sites-enabled/default
```
- Then paste this:
```
server {
    ...
    location / {
        proxy_pass http://127.0.0.1:9984;
    }
    ...
```
- Also increase the file size max that can be sent
```
sudo nano /etc/nginx/nginx.conf
```
- Then add this into the http tag:
```
http {
    ...
    client_max_body_size 20M;
} 
```
- Then reload nginx:
```
sudo service nginx reload
```
- For errors in connection logs are here:
```
nano /var/log/nginx/error.log
```
- Now install lets encrypt and we'll use it for obtaining a certificate for https connection to the node
```
sudo apt update && sudo apt install certbot python3-certbot-nginx
```
- Get SSL certificate
```
sudo certbot --nginx
```
- When asked about your domain names put like this:
```
nececity.net www.nececity.net
```

### Install MongoDB:
```
sudo apt-get update
sudo apt install mongodb
```
- For remote access change; bind_ip from 127.0.0.1 to 0.0.0.0:
```
sudo nano /etc/mongodb.conf
```
- The restart the service. Its mongodb on ubuntu 20.04 and mongod on others:
```
sudo service mongodb restart
```

### Install Bigchaindb and Tendermint
- http://docs.bigchaindb.com/projects/server/en/latest/simple-deployment-template/set-up-node-software.html OR:
```
sudo apt install -y python3-pip libssl-dev
sudo pip3 install -U pip
sudo pip3 install bigchaindb==2.2.2
```
- Install tendermint
```
sudo apt install -y unzip
wget https://github.com/tendermint/tendermint/releases/download/v0.31.5/tendermint_v0.31.5_linux_amd64.zip
unzip tendermint_v0.31.5_linux_amd64.zip
rm tendermint_v0.31.5_linux_amd64.zip
sudo mv tendermint /usr/local/bin
```
- Initialize tendermint
```
sudo tendermint init
```
- If you see port already in use after starting mongodb run this:
```
sudo lsof -iTCP -sTCP:LISTEN -n -P
```
- Then kill the mongodb process:
```
sudo kill <process_id>
```

### Start Bigchaindb Using Monit - Recommended
- Monit can be used to make sure that both the bigchaindb process is started and that tendermint are running
```
sudo apt-get update
sudo apt install monit 
bigchaindb-monit-config 
```
- These create the .bigchaindb-monit folder
- The script that is run is called .bigchaindb-monit/monit_script
- put this in that script:
```
#!/bin/bash
case $1 in

  start_bigchaindb)

    pushd $4

      nohup bigchaindb start > $3/bigchaindb.out.log 2>&1 &

      echo $! > $2
    popd

    ;;

  stop_bigchaindb)

    kill -2 `cat $2`
    rm -f $2

    ;;

  start_tendermint)

    pushd $4
      sudo nohup tendermint node >> $3/tendermint.out.log 2>> $3/tendermint.err.log &
      
      sudo bigchaindb init
      
      echo $! > $2
    popd

    ;;

  stop_tendermint)

    kill -2 `cat $2`
    rm -f $2

    ;;

esac
exit 0
```
- The script that takes care of logs is called: .bigchaindb-monit/monit_script_logrotate
```
#!/bin/bash
case $1 in
  rotate_tendermint_logs)
    /bin/rm $2.tar.gz
    /bin/tar -cvf $2.tar.gz $2    
    /bin/cp /dev/null $2
    ;;
esac
exit 0
```
- Now to start the monit service we need to show it what processes to start:
```
sudo nano /etc/monit/monitrc
```
- First make the monit be 5 seconds: set daemon 5
- Make log files go to: set log /var/log/monit.log
- If you have to remove the monitrc file run this command:
```
sudo chmod 600 /etc/monit/monitrc
```
- Then fill that file with the below in the SERVICES section:
```
check process bigchaindb_process
    with pidfile /home/takundachirema/.bigchaindb-monit/monit_processes/bigchaindb.pid
    start program "/home/takundachirema/.bigchaindb-monit/monit_script start_bigchaindb /home/takundachirema/.bigchaindb-monit/monit_processes/bigchaindb.pid /home/takundachirema/.bigchaindb-monit/logs /home/takundachirema/.bigchaindb-monit/logs"
    restart program "/home/takundachirema/.bigchaindb-monit/monit_script start_bigchaindb /home/takundachirema/.bigchaindb-monit/monit_processes/bigchaindb.pid /home/takundachirema/.bigchaindb-monit/logs /home/takundachirema/.bigchaindb-monit/logs"
    stop program "/home/takundachirema/.bigchaindb-monit/monit_script stop_bigchaindb /home/takundachirema/.bigchaindb-monit/monit_processes/bigchaindb.pid /home/takundachirema/.bigchaindb-monit/logs /home/takundachirema/.bigchaindb-monit/logs"

check process tendermint
    with pidfile /home/takundachirema/.bigchaindb-monit/monit_processes/tendermint.pid
    start program "/home/takundachirema/.bigchaindb-monit/monit_script start_tendermint /home/takundachirema/.bigchaindb-monit/monit_processes/tendermint.pid /home/takundachirema/.bigchaindb-monit/logs /home/takundachirema/.bigchaindb-monit/logs /home/takundachirema/.bigchaindb-monit/monit_processes/bigchaindb.pid"
    restart program "/home/takundachirema/.bigchaindb-monit/monit_script start_tendermint /home/takundachirema/.bigchaindb-monit/monit_processes/tendermint.pid /home/takundachirema/.bigchaindb-monit/logs /home/takundachirema/.bigchaindb-monit/logs /home/takundachirema/.bigchaindb-monit/monit_processes/bigchaindb.pid"
    stop program "/home/takundachirema/.bigchaindb-monit/monit_script stop_tendermint /home/takundachirema/.bigchaindb-monit/monit_processes/tendermint.pid /home/takundachirema/.bigchaindb-monit/logs /home/takundachirema/.bigchaindb-monit/logs"

check file bigchaindb.out.log with path /home/takundachirema/.bigchaindb-monit/logs/bigchaindb.out.log
    if size > 20 MB then
        exec "/home/takundachirema/.bigchaindb-monit/monit_script_logrotate rotate_tendermint_logs /home/takundachirema/.bigchaindb-monit/logs/bigchaindb.out.log /home/takundachirema/.bigchaindb-monit/monit_processes/bigchaindb.pid"

check file tendermint.out.log with path /home/takundachirema/.bigchaindb-monit/logs/tendermint.out.log
    if size > 20 MB then
        exec "/home/takundachirema/.bigchaindb-monit/monit_script_logrotate rotate_tendermint_logs /home/takundachirema/.bigchaindb-monit/logs/tendermint.out.log /home/takundachirema/.bigchaindb-monit/monit_processes/tendermint.pid"

check file tendermint.err.log with path /home/takundachirema/.bigchaindb-monit/logs/tendermint.err.log
    if size > 20 MB then
        exec "/home/takundachirema/.bigchaindb-monit/monit_script_logrotate rotate_tendermint_logs /home/takundachirema/.bigchaindb-monit/logs/tendermint.err.log /home/takundachirema/.bigchaindb-monit/monit_processes/tendermint.pid"

```
- ** NB - Run the commands in the Errors for both Monit and Manual section
- Then start the monit service:
```
sudo /etc/init.d/monit restart
```
- Then check that all processes are running
```
sudo lsof -iTCP -sTCP:LISTEN -n -P
```
- To check a specific process run:
```
ps aux | grep -i tendermint
```
- If not, check the logs from the monit process
```
sudo nano /var/log/monit.log
```

### Start Bigchaindb Manual
- ** NB - Run the commands in the Errors for both Monit and Manual section
- Then start the bigchaindb:
```
nohup bigchaindb start > bigchaindb.out.log 2>&1 &
```
- Then start the tendermint node:
```
tendermint node &> tendermint.out &
```
- To stop it first check process id and then kill it as below. Don't forget the -2 parameter.
```
ps -ef | grep bigchaindb
sudo kill -2 <process_id>
```

### Bigchaindb backups
- You must set backups because tendermint is not reliable
- Run this command to create the backups directories:
```
sudo mkdir /var/backups/mongo/
sudo mkdir /var/backups/tendermint/
```
- Create a script called check_collections.js in .bigchaindb-monit folder:
```
use bigchain
db.transactions.find().count()
```
- Create a script named backup_script in .bigchaindb-monit folder:
```
#!/bin/bash

RESULT=$(mongo < /home/takundachirema/.bigchaindb-monit/check_collections.js | tail -2 | head -n 1)

if [ $RESULT == "0" ]; then
    echo "No Transactions Collection Found!"
else
    sudo mongodump --db bigchain --out /var/backups/mongo/`date +"%m-%d-%y_%H:%M"`
    sudo cp -a /root/.tendermint/. /var/backups/tendermint/`date +"%m-%d-%y_%H:%M"`

    sudo find /var/backups/mongo/ -mindepth 1 -mmin +$((60*24*3)) -type d -exec rm -r {} ';'
    sudo find /var/backups/tendermint/ -mindepth 1 -mmin +$((60*24*3)) -type d -exec rm -r {} ';'
fi
```
- Make it executable by running:
```
sudo chmod u+x /home/takundachirema/.bigchaindb-monit/backup_script
```
- Then setup a cron job for this to run every hour by first running:
```
sudo crontab -e
```
- The put the below into that file:
```
0 */12 * * * /home/takundachirema/.bigchaindb-monit/backup_script >> /home/takundachirema/.bigchaindb-monit/logs/backup.out.log 2>&1
```
- Whenever the tendermint process restarts it will backup the current bigchaindb in that folder.
- It is also necessary to backup the tendermint data which is also done by those scripts.
- To restore a db run the below. Replace the times with the backup one:
```
sudo mongorestore --db bigchain --drop /var/backups/mongo/04-28-22_15\:30/bigchain/
```
- Also copy the same time backup of the tendermint into it's directory:
```
sudo cp -a /var/backups/tendermint/04-28-22_15\:30/. /root/.tendermint/
```

### Errors for both Monit and Manual

- If you get an error about itdangerous in the bigchaindb.out.log run this:
- Do for both sudo and non-sudo because of python environments:
```
pip3 install itsdangerous==2.0.1
sudo pip3 install itsdangerous==2.0.1
```
- If you get an error; cannot import name 'BaseResponse' from 'werkzeug.wrappers', run this:
```
sudo pip3 install werkzeug==2.0.3
```
- If you get a warning; RuntimeWarning: greenlet.greenlet size changed:
```
sudo pip install --upgrade gevent
```

## Reset BigchainDB

- Run these commands:
```
sudo tendermint unsafe_reset_all
```
- delete the directory:
```
sudo rm -R /root/.tendermint
```
- Then stop the tendermint process
```
ps aux | grep -i tendermint
```
- Then reset the bigchaindb
```
sudo bigchaindb drop
```
- Then stop bigchaindb process
```
ps aux | grep -i bigchaindb
```
- then re-initialize it
```
sudo tendermint init
```

## Bigchaindb Docker setup Google Cloud VM

- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04
- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04
- Install make if not found: sudo apt-get install -y make
- Clone bigchaindb repo

```
git clone https://github.com/bigchaindb/bigchaindb.git
cd bigchaindb
make run
```

### Connect to Mongodb
- sudo docker exec -it bigchaindb_mongodb_1 bash
- Then run: mongo
- Then run: use bigchain
- Then run: show collections
- Then now you can query from any of the collections
- To view indexes of metadata: db.metadata.getIndexes()

## Heroku CLI on Mac Book

- Run :
```
arch -arm64 brew tap heroku/brew && arch -arm64 brew install heroku
```

## Local Bigchaindb Setup

- Clone the repo https://github.com/bigchaindb/bigchaindb
- Then run: 
```
sudo make run
```
- To run it in the background:
```
sudo make run &> log.out &
```

### Understanding Tendermint and BigchainDB

- Tendermint seeks to abstract the BFT (Bazantyne Fault Tolerance) such that it is not a monolithic structure.
- For decentralized BFT we need the brain (logic), the storage (state) and the 2 need to communicate.
- With blockchains such as Ethereum the brain and storage are all one structure with the communication hidden inside it.
- Tendermint wants to abstract that such that the brain i.e. Tendermint Node (TN) just has to get data from the storage without knowing the storage implementation.
- To do that the TN needs to have an API structure which is called the ABCI (application blockchain interface).
- So the TN is the consensus engine, which also includes the peer to peer layers (since the TN nodes need communication for BFT).
- The TN is decoupled from the storage using the ABCI. So TN is on one end and the application is on the other end of the ABCI.
- The application is responsible for giving the TN whatever it needs, e.g. the UTXO's etc. so that the TN can make decisions.sh
## Tendermint Node
### Run these to create the text indexes

## Project setup

### Installing Dependencies
- To setup and install the necessary packages and modules required to run the dashboard, run the command below in both the root directory of the project and the folder `dev-server`.
```
    npm install
```
- node-sass 4.14.1 requires node version 14.8.1
- Install it using these commands
```
    sudo npm cache clean -f
    sudo npm install -g n
    sudo n 14.18.1
```
- On Mac using homebrew you must first unlink it and then relink it like so:
```
brew unlink node
brew link --overwrite node@14
```

Install docker and docker compose
On Mac install docker from the url https://docs.docker.com/desktop/mac/install
Clone the bigchaindb git repository
cd into the repo and run
```
    sudo make run
```
- If you get cors issues from backend make sure that the mongodb port is exposed for external applications

### Compiling and serving the dashboard
From the terminal, navigate to the root folder of the project and run the following command to serve the frontend of the project:
```
    npm run serve
```
Then, in a new terminal, navigate to the dev-server folder and run the following command to create the web server:
```
    npm run start
```

### Compiles and minifies for production
```
    npm run build
```

### Lints and fixes files
(Linting is currently disabled.)
```
    npm run lint
```

## Contributing to this project
To make a contribution to the dashboard, please follow the standard github open source project colloboration guidelines (adapted from: https://github.com/necolas/issue-guidelines/blob/master/CONTRIBUTING.md)
### Raising an Issue
Please provide the following information when raising an issue:
1. First search the existing issues to make sure that the problem you have detected has not already been reported.
2. Assuming your issue is _unique_ and _demonstrable_, create a minimum working example to illustrate the problem. Include this test case and your full working environment and setup in your issue. 
3. If you are an end-user within the financial industry and simply want to make use of the information in the dashboard rather than self-hosting your own version, a simple explanation of your problem along with some screenshots are sufficient to open an issue.

You should not use issues as a means to:
1. Request a new feature.
2. Report a problem which cannot be replicated.

Finally, do not divert or highjack another person's issue. Be respectful and polite when interacting with others.

### Making a pull request
We always appreciate pull requests, improvements and patches. Here are some basic guidelines you should adhere to when doing so:
1. Please ask before embarking on any significant pull request, otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the dashboard.

2. Please adhere to the coding conventions used throughout the project: 
* Use the [Google JS Styleguide](https://google.github.io/styleguide/jsguide.html) and make sure your code has minimum 70% test coverage.

3. Follow this process if you'd like your work considered for inclusion in the project:
    * Fork the project, clone your fork, and configure the remotes.
    * Create a new local branch for your feature/patch.
    * Commit your local changes in small, logical chunks.
    * Keep your local repo up to date with the upstream remote.
    * Finally, when you're ready, push your local changes back to your fork.
    * Open a Pull Request with a clear title and description.

IMPORTANT: By submitting a patch, you agree to allow the project owner to license your work under the same license as that used by the project.

### Linting and Refactoring
Basic code cleanup, commenting improvements and style guide compliance.
