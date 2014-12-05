<a href="http://pixelscommander.com/polygon/reactive-elements/example/#.U0LMA62Sy7o">
    <img alt="Reactive Elements" src="http://pixelscommander.com/polygon/reactive-elements/assets/logo-reactive-elements-small.png"/>
</a>

React.js components as native HTML elements
===========================================
Tiny Google [Polymer](http://polymer-project.org) or Mozilla [X-Tags](http://www.x-tags.org/) add-on which allows to use [React.js](http://facebook.github.io/react/) components as [custom HTML elements](http://w3c.github.io/webcomponents/spec/custom/). Also works with a native Custom Elements implementation if present.

[Demo](http://pixelscommander.com/polygon/reactive-elements/example/)

*UPD* Convert Angular and Backbone views as well with [MVC elements project](https://github.com/MVC-Elements)

Example
-------
**Using component in HTML**

```html
<body>
	<my-react-component items="{window.someArray}"></my-react-component>
</body>
```

**React component definition**
```js
/* @jsx React.DOM */
MyComponent = React.createClass({
  render: function() {
    console.log(this.props.items);
    console.log(this.props._content); // original tag contents in a <content>
    return <ul><li>React content</li></ul>;
  }
});

document.registerReact('my-react-component', MyComponent);
```

**Find complete examples in corresponding folder.**

Nesting
-------
Original content of a custom element is injected to component as ```this.props._content```.

```html
<my-react-component>Hello world</my-react-component>
```

In this case props._content is equal to "Hello world".

NPM and Bower
------------------------------------------
- NPM: reactive-elements
- Bower: ReactiveElements

Dependencies
------------
- [React.js](https://github.com/facebook/react)
- [X-Tag core](https://github.com/x-tag/core) or [Polymer custom elements](https://github.com/Polymer/CustomElements) or native browser support for custom elements.

License
-------
MIT: http://mit-license.org/

Copyright 2014 Denis Radin aka [PixelsCommander](http://pixelscommander.com)

Inspired by Christopher Chedeau`s [react-xtags](http://github.com/vjeux/react-xtags/)