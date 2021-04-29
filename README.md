# INF5006 Dashboard
This repository contains the code used to create a dashboard representation of the University of Cape Town's African Institute of Financial Markets and Risk Management's (AIFMRM) quarterly Equity Risk Service report.

## DB and MSSQL server setup

### Setting up MSSQL server
- In MS Studio go to the server instance and go to security.
- Create the user eg. admin and give password eg admin.
- Go to `user mappings` and map to the AIFMRM_ERS db.

- Go to Server instance and right click, then click properties.
- Then go to security and select `SQL server` authentication.

### Adding tables to the MSSQL server
Assuming you've correctly opened the given AIFMRM_ERS database file, you will now want to add the additional synthetic tables to the AIFMRM_ERS db. You will require the following csv files: 
* industry_portfolio_metrics.csv
* portfolio_metrics.csv
* shares_metrics.csv.
* industry_portfolio_tooltips.csv
* portfolio_metrics_tooltips.csv
* share_metrics_tooltips.csv
These can be found in the MSTeams group. Send an email to the UCT AIFMRM to gain access to these files. Note that the files provided here are just a small subset of the overall database. The full dataset will likely not be made available for public use.

To import the csv files as tables, open MS SQL Server Management Studio and do the following:
1. Right-click on main database `AIFRMR_ERS`
2. Go to `Tasks` option
3. Select 'Import flat file'
4. Follow the instructions, choose all default options and most importantly, DO NOT CHANGE the name of the table. Use the default name suggested based on the csv file.

After doing this for each of the synthetic table (and the tool tip table once those have been added), you should now be able to run the following test queries from MS SQL Server Management Studio:
    ```
    select * from AIFMRM_ERS.dbo.industry_portfolio_metrics
    ```
    ```
    select * from AIFMRM_ERS.dbo.shares_metrics
    ```
    ```
    select * from AIFMRM_ERS.dbo.portfolio_metrics
    ```
    ```
    select * from AIFMRM_ERS.dbo.portfolio_metrics_tooltips
    ```

If the queries execute as expected, then congratulations, you have successfully set up the databases.


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

### Requesting a new feature
Please contact the UCT AIFMRM.

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
