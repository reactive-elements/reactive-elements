/** @jsx React.DOM */
/* @jsx React.DOM */
window.LGI = {};

window.LGI.Carusel = React.createClass({displayName: 'Carusel',
    render: function() {
        var rows = [];
        this.props.items.forEach(function(item) {
            rows.push(React.DOM.li( {key:item.text}, item.text));
        });

        return React.DOM.ul(null, rows)
    }
});

xtag.registerReact('lgi-carusel', window.LGI.Carusel);