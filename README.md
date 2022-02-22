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
- Setup the VM instance: https://cloud.google.com/compute/docs/quickstart-linux
- SSH connect to it with following steps:
- Install google skd: https://cloud.google.com/sdk/docs/quickstart
- Download using the curl command (go to home directory as recommended) it's easier.
- Unzip the folder: tar -zxf google-cloud-sdk-*
- Then run: ./google-cloud-sdk/install.sh
- Then run: ./google-cloud-sdk/bin/gcloud init

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
