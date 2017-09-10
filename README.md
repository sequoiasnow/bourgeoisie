# Bourgeoisie

Bourgeoisie is a simple template for setting up a modern react development
with react. It is based in part on the faboulous [este](https://github.com/este/este)
by Daniel Steigerwald. Largelly this template is an opinionated view of how
to structure a project, much like those Bourgeoisie that Marx decried, it 
presentes one source of truth, and is haughty and condescening about it. That
being sent, if it fits your persuasions, join the nobility and use the project!

## Webpack
The webpack setup for Bourgeoisie is minimal, mostly to allow simple modifications 
but also becasue of certain style choices. For instance, all css is rendered using 
[glamor](https://github.com/threepointone/glamor) (a css-in-js processor). Because
of that there isn't a style-loader, and node-sass is not a dependency. Similairly,
the entire project is based on typescript so there is no loader for javascript
files. *I Do intent to build another branch for javascript with flow soon, however
currently typescript seems more production ready and has a larger community*

## Github Pages
By putting all the build material in the docs folder, simply running `npm run build` 
and then `git push` with the updated docs will show an update on github pages 
if github pages is inabled. 

## Component Based Styles
The main component is the `Box` component, it is design to be maluable, it can form
a `View` in react-native or a `div` in the browser, or whatver else you could come
up with. The Box component allows various properties such as paddings to be passed
as props, as follows.

```jsx
<Box padding={1} marginTop={2} flexDirection="row" />

``` 

However, for more comprehensive styles the box component also accepts a `css` property
which can take either one or many styles, a style being defined as: 
`(theme: Theme) => Object`. A benifit of this is that the theme is typed for autocompletion
in the project thereafter. 

```jsx
<Box css={theme => ({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    backgroundColor: theme.colors.white,
})}>
    {this.props.links.map((link, i) => <Link {...link} key={i} />}
</Box>
```

You may notice that for many of the `padding` and `margin` styles numbers are passed. In
an effort to maintain consisten vertical rhythm, the padding and margin are based off of 
fontSize specified by `typography.js` and a number will simply be a multiple of that size.
This allows for very consistent appreances of padding and margins across a project. It should
also be noted that these styles are interpreted both within the css styles and within the 
props passed directly to the component. This also works with colors, where `primary` resolves
to `theme.colors.primary`. For more information on this see the `Box` component.

---

The `Text` component has all the properties of the box component as well as some text 
specific ones, including `size` which accepts a number and computes fontSize and lineHeight
in a manner consistent with vertical rhythm. For other similair components see the 
[atoms](./src/app/core/atoms) folder which contains all their definitions.

## Using this template

Download this repository and feel free to edit any and all of the files. The redux
structure is based on the ducks concept. Each module which accesses redux has a ducks file 
containing all the definitions necessary for that module. The name of the current module
and parent modules is the same as the path that should be specified for the reducers using 
the combine reducers function. If this seems unclear, which I incerasingly suspect having 
written this, look at the ducks in the core module and how theme and styles are passed
through reducers.

