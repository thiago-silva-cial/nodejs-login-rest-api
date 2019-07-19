# Node.js REST API boilerplate

## Installation requirements

Before cloning API repository, make sure that you have:

 - Installed [Node.js](https://nodejs.org/en/download/) v10.6.0 or greater
 - Installed [Yarn](https://yarnpkg.com/en/docs/install#windows-stable) v1.15.2 or greater

For production environment (hosting using IIS on Windows):
- Installed [IISNode](https://github.com/tjanczuk/iisnode)
- Installed [URLRewrite](https://www.iis.net/downloads/microsoft/url-rewrite)

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
