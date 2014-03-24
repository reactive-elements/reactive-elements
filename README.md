React.js to X-Tag bridge
========================

Tiny X-Tag addon which allows to use React.js components as custom elements representation.

Example
-------

**React component definition**

	/* @jsx React.DOM */
	Carusel = React.createClass({
	    render: function() {
	        return <ul><li>React test</li></ul>;
	    }
	});
	
	xtag.registerReact('lgi-carusel', Carusel);
	
**Using component in HTML**

	<body>
		<lgi-carusel></lgi-carusel>
	</body>