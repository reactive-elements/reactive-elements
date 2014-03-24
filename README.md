![Reactive Elements](http://pixelscommander.com/polygon/reactag/assets/logo-reactive-elements.png "Reactive Elements")

Reactive Elements
=================

Lightweight X-Tag add-on which allows to use React.js components as custom elements.

Example
-------

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
	
##License

**MIT**: http://mit-license.org/

Copyright 2014 Denis Radin aka [PixelsCommander](http://pixelscommander.com)