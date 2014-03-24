/** @jsx React.DOM */
/* @jsx React.DOM */
window.LGI = {};

window.LGI.Carusel = React.createClass({displayName: 'Carusel',
    render: function() {
        return React.DOM.ul(null, React.DOM.li(null, "React test"));
    }
});

xtag.registerReact('lgi-carusel', window.LGI.Carusel);