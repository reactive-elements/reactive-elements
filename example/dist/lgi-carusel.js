/** @jsx React.DOM */
/* @jsx React.DOM */
window.LGI = {};

window.LGI.Carusel = React.createClass({displayName: 'Carusel',
    getInitialState: function() {
        return {
            color: '#ffffff'
        };
    },
    render: function() {
        var rows = [];
        this.props.items.forEach(function(item) {
            rows.push(React.DOM.li( {key:item.text}, item.text));
        });

        return React.DOM.ul( {style:this.state}, rows)
    },
    changeColor: function(color) {
        this.state.color = color;
        this.forceUpdate();
    }
});

xtag.registerReact('lgi-carusel', window.LGI.Carusel);