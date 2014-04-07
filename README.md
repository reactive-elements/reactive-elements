<a href="http://pixelscommander.com/polygon/reactive-elements/example/#.U0LMA62Sy7o">
    <img alt="Reactive Elements" src="http://pixelscommander.com/polygon/reactive-elements/assets/logo-reactive-elements-small.png"/>
</a>

React.js components as native HTML elements
===========================================

Lightweight Mozilla X-Tag add-on which allows to use React.js components as custom HTML elements.

[Demo](http://pixelscommander.com/polygon/reactive-elements/example/)

##Example

**Using component in HTML**

	<body>
		<my-react-component items="{window.someArray}"></my-react-component>
	</body>

**React component definition**

	/* @jsx React.DOM */
	MyComponent = React.createClass({
	    render: function() {
	    	console.log(this.props.items);
	        return <ul><li>React content</li></ul>;
	    }
	});
	
	xtag.registerReact('my-react-component', MyComponent);

**Find complete example in corresponding folder**
	
##Dependencies
- [React.js](https://github.com/facebook/react)
- [X-Tag core](https://github.com/x-tag/core)


##License

MIT: http://mit-license.org/

Copyright 2014 Denis Radin aka [PixelsCommander](http://pixelscommander.com)
