/** @jsx React.DOM */
/* @jsx React.DOM */
window.LGI = {};

window.LGI.Carusel = React.createClass({displayName: 'Carusel',
    getInitialState: function() {
        return {
            color: '#000000'
        };
    },
    render: function() {
        var rows = [];

        if (this.props.items === undefined) {
            return React.DOM.div(null);
        }

        this.props.items.forEach(function(item) {
            rows.push(React.DOM.li( {key:item.text}, item.text));
        });

        return React.DOM.div(null, "<reactive element>",React.DOM.ul( {style:this.state}, rows),"</reactive element>");
    },
    changeColor: function(color) {
        this.state.color = color;
        this.forceUpdate();
    }
});

xtag.registerReact('lgi-carusel', window.LGI.Carusel);