<a href="http://pixelscommander.com/polygon/reactive-elements/example/#.U0LMA62Sy7o">
    <img alt="Reactive Elements" src="http://pixelscommander.com/polygon/reactive-elements/assets/logo-reactive-elements-small.png"/>
</a>

Convert React.js components into Web Components
===============================================
Compatible with any [custom elements](http://w3c.github.io/webcomponents/spec/custom/) implementation or [polyfill](https://github.com/Polymer/CustomElements).

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

**Find demo in corresponding folder.**

Nesting
-------
Original content of a custom element is injected to component as ```this.props._content```.

```html
<my-react-component>Hello world</my-react-component>
```

In this case props._content is equal to "Hello world".

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
this.getDOMNode().dispatchEvent(event)
```
Subscribing to DOM events is similar:
```html
this.getDOMNode().addEventListener('change', function(e){...});
```

NPM and Bower
------------------------------------------
- NPM: reactive-elements
- Bower: ReactiveElements

Dependencies
------------
- [React.js](https://github.com/facebook/react)
- Custom elements support or [polyfill](https://github.com/Polymer/CustomElements)

License
-------
MIT: http://mit-license.org/

Copyright 2014 Denis Radin aka [PixelsCommander](http://pixelscommander.com)

Inspired by Christopher Chedeau`s [react-xtags](http://github.com/vjeux/react-xtags/)
