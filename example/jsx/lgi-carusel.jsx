/* @jsx React.DOM */
window.LGI = {};

window.LGI.Carusel = React.createClass({
    getInitialState: function() {
        return {
            color: '#ffffff'
        };
    },
    render: function() {
        var rows = [];
        this.props.items.forEach(function(item) {
            rows.push(<li key={item.text}>{item.text}</li>);
        });

        return <ul style={this.state}>{rows}</ul>
    },
    changeColor: function(color) {
        this.state.color = color;
        this.forceUpdate();
    }
});

xtag.registerReact('lgi-carusel', window.LGI.Carusel);