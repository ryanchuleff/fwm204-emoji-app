# FWM204 Emoji Thrower
#### Emoji Thrower Code from re:Invent 2023


## AppSync Backend

The Emoji Thrower is based on an AppSync backend that you can create via the AWS Console.  To accomplish this, please generate a real-time API with the AppSync service console. Once the API has been created, you'll need to go to the 'settings' page and get the following items:

- API endpoint
- API Key

## Client Application

The client application is designed to push emojis into the real-time channel with AppSync.

Start by updating the `client/src/amplifyconfiguration.json` file to supply the API endpoint and API key that were captured in the backend.

Launch the application by running the commands below from the terminal.

```
cd ./client
npm i
npm start
```

## Server Application

The server application is a display application that shows the emojis published by the client application.

Start by updating the `client/src/amplifyconfiguration.json` file to supply the API endpoint and API key that were captured in the backend.

Launch the application by running the commands below from the terminal.

```
cd ./server
npm i
npm start
```