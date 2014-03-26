/** @jsx React.DOM */
/* @jsx React.DOM */
window.LGI = {};

window.LGI.App = React.createClass({displayName: 'App',
    render: function() {
        return React.DOM.ul(null, React.DOM.li(null, "React test"));
    }
});

xtag.registerReact('lgi-app', window.LGI.App);