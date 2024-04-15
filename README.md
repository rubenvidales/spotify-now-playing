# Spotify Now Playing

## Introduction

I took this [article from Medium](https://medium.com/@alagappan.dev/create-a-now-playing-widget-using-the-spotify-web-api-in-react-a6cb564ed923) to develop a small React project where I will apply the acquired knowledge.
The basic idea is a small application that shows what is being played in a Spotify account, for this, I make use of its API.

## Installation

This project was made using Vite

### Local usage

`npm run dev` to run the project in a local machine with `Node 16+`

### .env

An .env file is necessary to provide some data to the application

```.env
VITE_REACT_APP_SPOTIFY_CLIENT_ID=<your_id>
VITE_REACT_APP_SPOTIFY_CLIENT_SECRET=<your client_secret>
VITE_REACT_APP_SPOTIFY_REFRESH_TOKEN=<your refresh token>
```

`VITE_REACT_APP_SPOTIFY_CLIENT_ID` and `VITE_REACT_APP_SPOTIFY_CLIENT_SECRET` are provided by Spotify when the developer account is created, for `VITE_REACT_APP_SPOTIFY_REFRESH_TOKEN` you must make some steps described in the Medium article.

## Features

- Offline mode in NowPlaying component

## Assets used

- Material Design Icons (by Google)
- Spotify logo (by Spotify)

## Learnings and practices

- localStorage usage
- TDD practice
- deployment (TODO)
