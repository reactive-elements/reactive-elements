![Reactive Elements](http://pixelscommander.com/polygon/reactag/assets/logo-reactive-elements-small.png "Reactive Elements")

Use React.js components as native HTML elements
===============================================

Lightweight X-Tag add-on which allows to use React.js components as custom HTML elements.

[Demo](http://pixelscommander.com/polygon/reactive-elements/example/)

##Example

**Using component in HTML**

	<body>
		<my-react-component></my-react-component>
	</body>

**React component definition**

	/* @jsx React.DOM */
	MyComponent = React.createClass({
	    render: function() {
	        return <ul><li>React content</li></ul>;
	    }
	});
	
	xtag.registerReact('my-react-component', MyComponent);

**Find complete example in corresponding folder**
	
##Dependencies
- React.js
- X-Tag core


##License

MIT: http://mit-license.org/

Copyright 2014 Denis Radin aka [PixelsCommander](http://pixelscommander.com)
