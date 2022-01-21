# Image Processing API - Fullstack

## Intro

This application runs a simple node.js server and offers a REST endpoint to serve images through stream.

Transforms and automations are in place and are thoroughly described below. There is a [complete rubric checklist here](https://review.udacity.com/#!/rubrics/3005/view

## Provided endpoint

After installing the dependencies, building and executing the project, the endpoint will be available as demonstrated below:

### Path

`/api/images`

### Query string parameters

| Query string param | Description                                     |
| ------------------ | ----------------------------------------------- |
| filename           | Any image available in the `assets/full` folder |
| width              | Custom image width                              |
| height             | Custom image height                             |

### Full example

Considering the app running at port 3000 on your local environment, you can access the following endpoints

- Getting the index page and functionality to upload more images - [http://localhost:3000](http://localhost:3000)
- Getting all available images in the 'assets/full' dir and choose which one to process it as well decide the dimenions - [http://localhost:3000/process](http://localhost:3000/process)
- Getting the same image with custom dimensions - [http://localhost:3000/api/images?filename=port&width=100&height=100](http://localhost:3000/api/images?filename=port&width=100&height=100)

## Project stack

### Frontend

- Express Templating Pug
- Tailwind CSS

### Backend

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Sharp package](https://www.npmjs.com/package/sharp)

### Tooling

- [ESLint](https://eslint.org/)
- [Nodemon](https://nodemon.io/)
- [Jest](https://jestjs.io/docs/)
- [Prettier](https://prettier.io/)

## Getting started

To get this project up and running one will need to:

1. Download the project & install the dependencies
2. Build & execute the application

### Install dependencies

This is straightforward, after cloning/downloading this repository you can execute the following command from the root folder:

```bash
npm install
```

## Automations

All tasks are available through `npm run` scripts.

### Linter/prettier

Code styling check and automatic fix is handled by ESLint. You can execute the command below:

```bash
npm run lint
npm run prettier
```

### Typescript transpiling

The backend code is delivered through the `./src` folder, and the transformed output is placed under `./dist`.
You can execute the command below:

```bash
npm run build
```

### Executing Jest test

The test suite validates basic functionality of the images handler helper. You can execute the command below:

```bash
npm run test
```

### Executing the server

There are two modes of execution:

1. Single execution
2. Execution with watcher mode and restart enabled

The commands to achieve the builds described above are, respectively:

```bash
npm run start
```
