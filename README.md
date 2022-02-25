# Axone Books

This repository contains the Client and Server code for Axone books.

## Test Setup

### Connect to Mongodb
- sudo docker exec -it bigchaindb_mongodb_1 bash
- Then run: mongo
- Then run: use bigchain
- Then run: show collections
- Then now you can query from any of the collections

## Google Cloud Bigchaindb Node
- Install MongoDB:
```
sudo apt install mongodb
```
- For remote access change; bind_ip from 127.0.0.1 to 0.0.0.0:
```
sudo nano /etc/mongod.conf
```
- Install bigchaindb from:
- http://docs.bigchaindb.com/projects/server/en/latest/simple-deployment-template/set-up-node-software.html
- If you see port already in use after starting mongodb run this:
```
sudo lsof -iTCP -sTCP:LISTEN -n -P
```
- Then kill the mongodb process:
```
sudo kill <process_id>
```

### Manual Bigchaindb Startup
- Then start the bigchaindb:
```
nohup bigchaindb start > bigchaindb.log 2>&1 &
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
- If you get an error about itdangerous in the bigchaindb.log run this:
- Do for both sudo and non-sudo because of python environments:
```
pip3 install itsdangerous==2.0.1
sudo pip3 install itsdangerous==2.0.1
```
- If you get a waring; RuntimeWarning: greenlet.greenlet size changed:
```
sudo pip install --upgrade gevent
```

### Using Monit - Recommended
- Monit can be used to make sure that both the bigchaindb process is started and that tendermint are running
```
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

      nohup bigchaindb start > $3/bigchaindb.out 2>&1 &

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
- Then initialize tendermint which creates the .tendermint folder:
```
sudo tendermint init
```
- Now to start the monit service we need to show it what processes to start:
```
sudo nano /etc/monit/monitrc
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
    start program "/home/takundachirema/.bigchaindb-monit/monit_script start_tendermint /home/takundachirema/.bigchaindb-monit/monit_processes/tendermint.pid /home/takundachirema/.bigchaindb-monit/logs /home/takundachirema/.bigchaindb-monit/logs"
    restart program "/home/takundachirema/.bigchaindb-monit/monit_script start_tendermint /home/takundachirema/.bigchaindb-monit/monit_processes/tendermint.pid /home/takundachirema/.bigchaindb-monit/logs /home/takundachirema/.bigchaindb-monit/logs"
    stop program "/home/takundachirema/.bigchaindb-monit/monit_script stop_tendermint /home/takundachirema/.bigchaindb-monit/monit_processes/tendermint.pid /home/takundachirema/.bigchaindb-monit/logs /home/takundachirema/.bigchaindb-monit/logs"
    depends on bigchaindb

check file tendermint.out.log with path /home/takundachirema/.bigchaindb-monit/logs/tendermint.out.log
    if size > 200 MB then
        exec "/home/takundachirema/.bigchaindb-monit/monit_script_logrotate rotate_tendermint_logs /home/takundachirema/.bigchaindb-monit/logs/tendermint.out.log /home/takundachirema/.bigchaindb-monit/monit_processes/tendermint.pid"

check file tendermint.err.log with path /home/takundachirema/.bigchaindb-monit/logs/tendermint.err.log
    if size > 200 MB then
        exec "/home/takundachirema/.bigchaindb-monit/monit_script_logrotate rotate_tendermint_logs /home/takundachirema/.bigchaindb-monit/logs/tendermint.err.log /home/takundachirema/.bigchaindb-monit/monit_processes/tendermint.pid"

```
- Then start the monit service:
```
sudo /etc/init.d/monit restart
```
- Then check that all processes are running


## Google Cloud VM Setup Docker compose
- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04
- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04
- Install make if not found: sudo apt-get install -y make
- Clone bigchaindb repo

```
git clone https://github.com/bigchaindb/bigchaindb.git
cd bigchaindb
make run
```

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
- Then reload nginx:
```
sudo service nginx reload
```
- For errors in connection logs are here:
```
nano /var/log/nginx/error.log
```

### Heroku CLI on Mac Book

- Run :
```
arch -arm64 brew tap heroku/brew && arch -arm64 brew install heroku
```

### Local Bigchaindb Setup

- Clone the repo https://github.com/bigchaindb/bigchaindb
- Then run: 
```
sudo make run
```
- To run it in the background:
```
sudo make run &> log.out &
```

### Run these to create the text indexes

## Project setup

### Installing Dependencies
To setup and install the necessary packages and modules required to run the dashboard, run the command below in both the root directory of the project and the folder `dev-server`.
```
    npm install
```
node-sass 4.14.1 requires node version 14.8.1
Install it using these commands
```
    sudo npm cache clean -f
    sudo npm install -g n
    sudo n 14.18.1
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
