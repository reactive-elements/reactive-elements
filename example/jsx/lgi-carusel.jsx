/* @jsx React.DOM */
window.LGI = {};

window.LGI.Carusel = React.createClass({
    render: function() {
        var rows = [];
        this.props.items.forEach(function(item) {
            rows.push(<li key={item.text}>{item.text}</li>);
        });

        return <ul>{rows}</ul>
    }
});

xtag.registerReact('lgi-carusel', window.LGI.Carusel);