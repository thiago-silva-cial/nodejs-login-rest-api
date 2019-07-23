# Node.js REST AUTH API

## Installation requirements

Before cloning API repository, make sure that you have:

 - Installed [Node.js](https://nodejs.org/en/download/) v10.6.0 or greater
 - Installed [Yarn](https://yarnpkg.com/en/docs/install#windows-stable) v1.15.2 or greater

## Installation

After clonning the repository, run these commands below:

### Dev Environment

- Install all depedencies
```
yarn
```

### Production Environment

running on server

- Install production depedencies
```
yarn install --prod
```

## Project Commands

- Run the API locally (ex: localhost:port/route)
```
yarn dev
```

- Build project on development environment and generate the /dist folder to publish on the server
```
yarn build:dev
```

- Build project on production environment and generate the /dist folder to publish on the server
```
yarn build:prod
```

- Run unit/integration tests
```
yarn test
```
