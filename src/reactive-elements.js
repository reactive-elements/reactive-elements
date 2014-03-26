(function (w) {
    if (w.xtag === undefined) return;

    var propertiesMapping = {
        'class': 'className',
        'onclick': 'onClick',
        'onmousedown': 'onMouseDown',

    };

    var getPropertiesFromAttributes = function (attributes) {
        var result = {};

        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];

            result[attribute.name] = parseAttributeValue(attributes[i].value);
        }
        return result;
    };

    var parseAttributeValue = function (value) {
        var regexp = /\{.*?\}/g;
        var matches = value.match(regexp);

        if (matches !== null && matches !== undefined && matches.length > 0) {
            value = eval(matches[0].replace('{', '').replace('}', ''));
        }

        return value;
    }

    w.xtag.registerReact = function (elementName, reactClass) {
        var element = {};

        w.xtag.register(elementName, {
            extends: 'div',
            lifecycle: {
                created: function () {
                    element = new reactClass(getPropertiesFromAttributes(this.attributes));
                    React.renderComponent(element, this);
                },
                inserted: function () {
                    if (element.componentDidMount)
                        element.componentDidMount();
                },
                removed: function () {
                    if (element.componentWillUnmount)
                        element.componentDidMount();
                },
                attributeChanged: function (a, b, c) {

                }
            }
        })
    };
})(window)