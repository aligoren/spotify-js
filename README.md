# Spotify-JS

An spotify wrapper for JavaScript.

# Usage

Before you start use SpotifyJS library you have to generate client_id on [Spotify Developer Portal](https://beta.developer.spotify.com/dashboard/)

## init Class

You must declare your client_id and callback address. Callback address must be valid. Your code should be below.

```javascript
import Spotify from "./spotify.js";

const config = {
    client_id: 'YOUR_CLIENT_ID',
    callback_address: window.location.href
}

const spotify = new Spotify(config);
```

## Authentication

You need to login for access token. After initialization you must set element to click. There is two ways as below:

First way you just click login to get access token. Access token will save in localStorage.

```javascript
spotify.login('.btn');
```

Second way contains callback method to get some information and operations. For example you might want to hide button after login.

- data.btn => html element that you declared
- data.url => authorization url

```javascript
spotify.login('.btn', (data) => {
    data.btn.style.display = 'none';

    console.log(data.url)
});
```

## User Information

When you want to see logged user details you can use `me()` method. That will return promise. You must use below code.

```javascript
spotify.me().then(resp => {
    //
});
```

## Search

If you want to search on Spotify you can use this method. This method will promise.

**Required Parameters:** [query, type]

**Optional Parameters:** [market, limit, offset]

```javascript
spotify.search({
    query: 'Tarkan',
    type: 'track,artist',
    market: 'TR',
    limit: 10,
    offset: 1
}).then(resp => {
    // 
});
```

## Album

When you want to see album details. You can use `album()` method with Album ID. This method will promise.

**Required Parameters:** [id]

**Optional Parameters:** [market]

```javascript
spotify.album({
    id: '4fJzakARJP2UfOjSj5Q9s1',
    market: 'TR'
}).then(resp => {
    //
});
```

## Albums

This method same as  `album()` method. Only difference this method accepts multiple album id. So, this method will return multiple album information. This method will promise.

**Required Parameters:** [ids]

**Optional Parameters:** [market]

```javascript
spotify.albums({
    ids: '4fJzakARJP2UfOjSj5Q9s1,06EBiLh3V0q2dOUdXnic7e',
    market: 'TR'
}).then(resp => {
    //
});
```

## Tracks

This method will return the tracks in the album.

**Required Parameters:** [id]

**Optional Parameters:** [market, limit, offset]

```javascript
spotify.tracks({
    id: '4fJzakARJP2UfOjSj5Q9s1',
    market: 'TR',
    limit: 10,
    offset: 1
}).then(resp => {
    //
})
```

## Get Single Artist

Single parameter required.

```javascript
spotify
    .artist('2yMN0IP20GOaN6q0p0zL5k')
    .then(resp => {
        //
    })
```