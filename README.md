<a href="http://pixelscommander.com/polygon/reactive-elements/example/#.U0LMA62Sy7o">
    <img alt="Reactive Elements" src="http://pixelscommander.com/polygon/reactive-elements/assets/logo-reactive-elements-small.png"/>
</a>

# Convert React.js components into Web Components

```sh
npm install reactive-elements
yarn add reactive-elements
```

## How to use?

### Directly in a browser

**Placing component in a pure HTML**

```html
<body>
	<my-react-component items="{window.someArray}"></my-react-component>
</body>
```

**React class definition**

```js
/* @jsx React.DOM */
MyComponent = React.createClass({
  render: function() {
    console.log(this.props.items); // passed as HTML tag`s argument
    console.log(this.props.children); // original tag children
    return (
      <ul>
        <li>React content</li>
      </ul>
    );
  },
});

ReactiveElements('my-react-component', MyComponent);
```

### With Bundler

```js
import React, { Component } from 'react';
import ReactiveElements from 'reactive-elements';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

ReactiveElements('welcome-component', Welcome);
```

## Nesting

Original children of a custom element is injected to component as
`this.props.children`.

```html
<my-react-component>Hello world</my-react-component>
```

In this case `this.props.children` is equal to "Hello world".

Container node of the element is passed as `this.props.container`. Both
props.container and props.children have type of `documentFragment`.

## Boolean attribute transforms (added in version 0.7.0)

An attribute that has the value `"true"` or `"false"` will be converted into the
boolean `true` or `false` when given to the React component:

```html
<my-react-component is-logged-in="true">Hello world</my-react-component>
```

Here, `this.props.isLoggedIn === true` within the React component.

If you don't want this behaviour you can disable it with a special attribute:

```html
<my-react-component is-logged-in="true" reactive-elements-no-boolean-transform>Hello world</my-react-component>
```

## Exposing components methods on custom element

If you want to expose React component methods on custom element - assign them to
component as following:

```js
componentDidMount: function() {
    this.props.container.setTextContent = this.setTextContent.bind(this);
}
```

## Handling attributes change

You may add `attributeChanged` callback to component in order to handle / modify
/ filter incoming values.

```js
attributeChanged: function(attributeName, oldValue, newValue) {
    console.log('Attribute ' + attributeName + ' was changed from ' + oldValue + ' to ' + newValue);
    this.props[attributeName] = parseInt(newValue);
}
```

## Communicate via DOM events

You may trigger DOM event from React component by using following snippet:

```js
var event = new CustomEvent('change', {
  bubbles: true,
});
React.findDOMNode(this).dispatchEvent(event);
```

Subscribing to DOM events is similar:

```js
React.findDOMNode(this).addEventListener('change', function(e){...});
```

## Dependencies

* [React.js](https://github.com/facebook/react)
* [React DOM](https://github.com/facebook/react)
* Custom elements support or [polyfill](https://github.com/WebComponents/webcomponentsjs)
* Support or [polyfills](https://github.com/zloirock/core-js) for:
   * `regexp.match`
   * `regexp.replace`
   * `object.define-setter`
   * `object.define-getter`
   * `object.define-property`
   * `function.name`
   * `web.dom.iterable`
   * `array.iterator`
   * `object.keys`
   * `object.set-prototype-of`
   * `reflect.construct`
   * `function.bind`

## License

MIT: http://mit-license.org/

Copyright 2014 Denis Radin aka [PixelsCommander](http://pixelscommander.com)

Inspired by Christopher Chedeau`s
[react-xtags](http://github.com/vjeux/react-xtags/)
