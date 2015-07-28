/* @jsx React.DOM */
window.LGI = {};

window.LGI.Carusel = React.createClass({displayName: "Carusel",
    getInitialState: function() {
        return {
            color: '#000000'
        };
    },
    attributeChanged: function(name, oldValue, newValue) {
        console.log('Attribute ' + name + ' was changed from ' + oldValue + ' to ' + newValue);
    },
    render: function() {
        var rows = [];

        if (this.props.items === undefined) {
            return React.createElement("div", null);
        }

        this.props.items.forEach(function(item) {
            rows.push(React.createElement("li", {key: item.text}, item.text));
        });

        return React.createElement("div", null, "<my-reactive-element>", React.createElement("ul", {style: this.state}, rows), "</my-reactive-element>");
    },
    changeColor: function(color) {
        this.state.color = color;
        this.forceUpdate();
    }
});

document.registerReact('my-reactive-element', window.LGI.Carusel);