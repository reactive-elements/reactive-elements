/* @jsx React.DOM */
window.LGI = {};

window.LGI.Carusel = React.createClass({
    render: function() {
        return <ul><li>React test</li></ul>;
    }
});

xtag.registerReact('lgi-carusel', window.LGI.Carusel);