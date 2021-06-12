# Axone Books

This repository contains the Client and Server code for Axone books.

## Test Setup

### Connect to Mongodb
- sudo docker exec -it bigchaindb_mongodb_1 bash
- Then run: mongo
- Then run: use bigchain
- Then run: show collections
- Then now you can query from any of the collections

### Run these to create the text indexes



## Project setup

### Installing Dependencies
To setup and install the necessary packages and modules required to run the dashboard, run the command below in both the root directory of the project and the folder `dev-server`.
```
    npm install
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

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


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

## Future Work
If you would like to contribute to this project, these are the features that are currently in the pipeline:
1. Allow users to create customised portfolios of stocks and calculate beta values and other risk measures across their uniquely selected portfolio.
2. Add a history feature to the downloads tab to store previous request specifications made within a single user session.
3. Retroactively write automated tests for the webserver once remote hosting and setup is complete.
4. Add workflows to ensure PEP8 and ESLinter compliance.

## NOTE: Changelog between first and second milestones
### Documentation
Up-to-date README.md with instructions on how to contribute and collaborate.

### Downloads Tab
The following changes were made:
1. Added three new synthetic tables to be downloaded.
2. Ability to remove/add columns from table before downloading.
3. Ability to download only the information currently present in the table, i.e. download filtered table contents.
4. Add tooltips to table columns which display on hover.
5. Add alert boxes which prevent users from requesting a table without having provided all of the necessary information.
6. Changed the drop down selectors to a vue-bootstrap component to allow for smoother selection, option resets upon table switching and greyed out instructional text at the top of each dropdown menue.

### About Page
We have one now. It's awesome. Contains full set of instructions for how to use the dashboard, as well as information about the service.

### Index Metrics Page
TODO.

### Dashboard Landing Page
TODO.

### Testing
1. Added CI for python tests using github actions.

### Linting and Refactoring
Basic code cleanup, commenting improvements and style guide compliance.
