<a href="http://pixelscommander.com/polygon/reactive-elements/example/#.U0LMA62Sy7o">
    <img alt="Reactive Elements" src="http://pixelscommander.com/polygon/reactive-elements/assets/logo-reactive-elements-small.png"/>
</a>

Convert React.js components into Web Components
===============================================

[Live demo](http://pixelscommander.com/polygon/reactive-elements/example/)

*UPD* Convert Angular and Backbone views as well with [MVC elements project](https://github.com/MVC-Elements)

How to use?
-------
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
    return <ul><li>React content</li></ul>;
  }
});

document.registerReact('my-react-component', MyComponent);
```

**Find demo in corresponding folder.**

Nesting
-------
Original children of a custom element is injected to component as ```this.props.children```.

```html
<my-react-component>Hello world</my-react-component>
```

In this case props.children is equal to "Hello world".

Container node of the element is passed as ```this.props.container```. Both props.container and props.children have type of ```documentFragment```.

Exposing components methods on custom element
---------------------------------------------
If you want to expose React component methods on custom element - assign them to component as following:
```html
componentDidMount: function() {
    this.props.container.setTextContent = this.setTextContent.bind(this);
    ...
```

Handling attributes change
--------------------------
You may add ```attributeChanged``` callback to component in order to handle / modify / filter incoming values.

```html
attributeChanged: function(attributeName, oldValue, newValue) {
    console.log('Attribute ' + attributeName + ' was changed from ' + oldValue + ' to ' + newValue);
    this.props[attributeName] = parseInt(newValue);
}
```

Communicate via DOM events
---------------------------
You may trigger DOM event from React component by using following snippet:
```html
var event = new CustomEvent('change', {
      bubbles: true
    });
React.findDOMNode(this).dispatchEvent(event)
```
Subscribing to DOM events is similar:
```html
React.findDOMNode(this).addEventListener('change', function(e){...});
```

NPM and Bower
------------------------------------------
- NPM: reactive-elements
- Bower: ReactiveElements

Dependencies
------------
- [React.js](https://github.com/facebook/react)
- ```function.bind``` and ```Object.create``` support or polyfills
- Custom elements support or [polyfill](https://github.com/WebReflection/document-register-element)

Custom elements polyfill behavior
---------------------------------
Polyfill binds to ```DOMContentLoaded``` in order to process DOM so no custom elements exist until it fired. To prevent this hook into ```DOMContentLoaded``` and operate elements on it or after.

License
-------
MIT: http://mit-license.org/

Copyright 2014 Denis Radin aka [PixelsCommander](http://pixelscommander.com)

Inspired by Christopher Chedeau`s [react-xtags](http://github.com/vjeux/react-xtags/)