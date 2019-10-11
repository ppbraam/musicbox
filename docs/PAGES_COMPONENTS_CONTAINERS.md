## Pages vs. Containers vs. Components

Read about the difference of the 3 types of react components.

#### General rules
- All React components are pure functional
- All React components are in typescript, well typed and of the tsx file extension
- All non-react files are in typescript, well typed and of the ts file extension
- All React components are default exported
- All React components' prop-typing passed as generic
- Functional Components are type-hinted with the short FC instead of the long one
- All React components import their scss files as the last import of its imports
- Components and pages are exported in their parent directory index.ts file, and imported from there


| |Page|Container|Component|
|---|---|---|---|
|Local State|✅|✅|❌|
|Redux Connect|✅|✅|❌|
|Route entry|✅|❌|❌|
|Use hooks|✅|✅|✅|

#### Pages
Pages are entry points for your routes. Every route component is a Page component.
```typescript
// Routes.ts
{
    component: Home, // Home is a page
    exact: true,
    key: 'home',
    path: '/',
},
```

#### Containers
Containers on the other hand are *smart* components. <br/>
Containers may manipulate data, have a state and may connect to redux.

#### Components
Components are *dumb* components and are only used presentational.

They must only return a rendered component and must not manipulate data.

[Read more](https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43)
