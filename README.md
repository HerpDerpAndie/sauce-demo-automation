# Overview
This automation project is meant to test sauce demo application, and verify end to end checkout flow, sorting based on price, and basic login functionalities

# Tested Application
Sauce demo web application used for this automation can be accesed from [Sauce Demo] (https://www.saucedemo.com/)
## Login Credentials Used
Login credentials is provided by the demo application, and this automation uses the `standar_user` user

# Setup
To install dependencies of this project run the command
```
npm i
```
# Running automation code
To run the automation in headless mode we can run
```
npx playwright test [option]
```
or if we want to run in playwright ui mode use the `--ui` option, or `--headed`, or for more accurate and detailed run for observability `--debug` option <br>
Or to specify which browser (webkit, chrome, firefox) using `--project` option
```
npx playwright test --project=firefox
```
# Displaying automation run report
To generate and show report in HTML format we can run 
```
npx playwright show-report
```
