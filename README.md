# amiibum

Experimental project to learn lit-html.
Check your collected amiibos with this album.

[https://amiibum.firebaseapp.com](https://amiibum.firebaseapp.com)

## Quick start

```
npm install -g polymer-cli
git clone "this-repository"
cd amiibum
npm install
polymer serve
```

## Deploy

```
polymer build
polymer serve build/default
```

```
firebase deploy
```

### Development info
The api calls are commented. The amiibo-service components would request the service and emit an event that listens to amiibo-main. Requests to the api use http instead of https. The app is deployed in firebase and firebase only allows https requests. Therefore the response json and amiibo images are is locally in the app. The images have been reduced with mogrify and pngquant.

## Credits
> Developed by @AlexArroyoDuque

> Amiibo Api [https://github.com/N3evin/AmiiboAPI](https://github.com/N3evin/AmiiboAPI)

> Sample LitElement project [https://github.com/PolymerLabs/start-lit-element](https://github.com/PolymerLabs/start-lit-element)

> Google fonts [https://fonts.google.com](https://fonts.google.com)
