## About
#### Motivation:
After building some enterprise software applications we noticed we had to do a setup for every project.
Because of this issue we decided to make a boilerplate which we can use and safe some time.

We created and used some conventions to create a predictable codebase.<br/>
Of course no project is the same, so feel free to modify it the way it works for you as long as it complies with the conventions.

For more information see [Documentation](#documentation)

#### Short:
This repository contains a boilerplate of a react app consisting of some basic features.
- Translations/labeling
- Routing
- Redux + saga
- Typescript
- Server Side Rendering

Todo:
- SSR Async
- Testing

## Requirements
- Node 12 `brew install node@12`
- Typescript 3.5 `npm install -g typescript`
- ESlint 5.16 `npm install -g eslint`
- TSlint 5.18 `npm install -g tslint`
- Yarn `npm install -g yarn`

## Installation
- Clone this project
- `yarn install`
- `cp .env.example .env` and configure

## Run the project
- `yarn start` for development server (with hot reloading)
- `yarn server` for production server (with ssr)

## Documentation
### Create React App [`readme`](./docs/CREATE_REACT_APP.md)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Rules
- A React component must be pure functional
- A React component must be in typescript, well typed and of the tsx file extension
- A non-react file must be in typescript, well typed and of the ts file extension
- A React component must be default exported
- A React component's prop-typing must be passed as generic
- A Functional Component must be type-hinted with the short FC instead
- A React component must import their scss files as the last import of its imports
- Components and pages must be exported in their parent directory index.ts file, and must be imported from there

Simple example of a component:
```
components
│   SomeComponent
│   SomeOtherComponent 
│
└───MyComponent
    │   MyComponent.scss
    │   MyComponent.tsx
|
|   index.ts
```

```tsx
import React, { FC, ReactElement } from 'react';

import './MyComponent.scss';

interface MyComponentProps {
  className?: string;
  title: string;
}


const MyComponent: FC<MyComponentProps> = ({
  className = '',
  title,
}): ReactElement => {
  return (
    <section className={`my-component ${className}`}>
      <h2 className="my-component__title">{title}</h2>
    </section>
  );
};


export default MyComponent;
```

### Pages vs. Containers vs. Components [`readme`](./docs/PAGES_COMPONENTS_CONTAINERS.md)
- [General rules](./docs/PAGES_COMPONENTS_CONTAINERS.md#general-rules)
- [What are `pages`](./docs/PAGES_COMPONENTS_CONTAINERS.md#pages)
- [What are `containers`](./docs/PAGES_COMPONENTS_CONTAINERS.md#containers)
- [What are `components`](./docs/PAGES_COMPONENTS_CONTAINERS.md#components)

### Server Side Rendering
#### The Server Directory
This directory contains a file `production.js` and makes the ssr happen.<br/>
To do this it will do a couple of things:
1. Compile typescript into a directory called `compiled`
2. Transpile all scss files to the compile directory for import to resolve
3. Start the http server

#### Modifying the http server
You are free to modify the http server because its completely decoupled from the production script.<br/>
The http server can be found at `src/_httpserver/index.ts`, it should always export a default function accepting a port.<br/>
If this does not the desired solution you can edit `server/production.js` where the server script gets started.

The http server uses fastify [`docs`](https://www.fastify.io/docs/latest/).

It does not yet support async fetches yet.
