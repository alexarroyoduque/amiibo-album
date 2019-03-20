# amiibum

Experimental project.
Mark your collected amiibos with this album developed with lit-html.

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
The api calls are commented. The amiibo-service components would call the service and emit an event that listens to amiibo-main. Calls to the api use http instead of https. The app is deployed in firebase that only allows https calls. Therefore the response json of the service is locally in the application and the images as well. The images have reduced their size with pngquant.

## Credit
> Developed by @AlexArroyoDuque

> Amiibo Api [https://github.com/N3evin/AmiiboAPI](https://github.com/N3evin/AmiiboAPI)

> Sample LitElement project [https://github.com/PolymerLabs/start-lit-element](https://github.com/PolymerLabs/start-lit-element)

> Google fonts [https://fonts.google.com/](https://fonts.google.com/)
