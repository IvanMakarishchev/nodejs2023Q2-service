# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/IvanMakarishchev/nodejs2023Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Create env. file inside the root folder

Use configuration from .env.example file

## Running application

```
npm start
```
After starting the app on port (4000 as default)

## OpenAPI documentation

```
http://localhost:4000/api/
```
## Endpoints

* /user - GET | POST
* /user/{id} - GET | PUT | DELETE
* /track - GET | POST
* /track/{id} - GET | PUT | DELETE
* /album - GET | POST
* /album/{id} - GET | PUT | DELETE
* /artist - GET | POST
* /artist/{id} - GET | PUT | DELETE
* /favs - GET
* /favs/track/{id} - POST | DELETE
* /favs/album/{id} - POST | DELETE
* /favs/artist/{id} - POST | DELETE

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
