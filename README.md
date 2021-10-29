# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Gamesmith steps:

### Check the backend to be used. Generally it's safe to use either staging or production
`less src/utils/index.js`

### Use Node 14.8.0
`nvm install 14.8.0`

`nvm use 14.8.0`

### Install
`npm install --legacy-peer-deps`

### If you have any webpack issues:
`npm install webpack@4.44.2 --legacy-peer-deps`

### Copy over the modified moduled
`cp -rfp modified_modules/* node_modules/`

### Run a dev instance locally
`npm run start` (runs on port 3000)

### Build ready for deployment
`rm -rf build`

`npm run build`

### Check the built version runs correctly
`npm install serve`

`serve -s build` (runs on port 5000)
