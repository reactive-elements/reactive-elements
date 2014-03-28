/* @jsx React.DOM */
window.LGI = {};

window.LGI.App = React.createClass({
    render: function() {
        return <ul><li>React test</li></ul>;
    }
});

xtag.registerReact('lgi-app', window.LGI.App);