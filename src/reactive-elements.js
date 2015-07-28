(function () {
    var registerElement = document.registerElement || document.register;
    if (registerElement) {
        registerElement = registerElement.bind(document);
    } else {
        // There is no custom element support or polyfill.
        return;
    }

    var React = window.React || require('react');
    var utils = require('./utils');

    exports.registerReact = function (elementName, ReactComponent) {
        var elementPrototype = Object.create(HTMLElement.prototype);
        var reactElement;

        function create(parent, props) {
            var element = React.createElement(ReactComponent, props);
            return React.render(element, parent);
        }

        elementPrototype.createdCallback = function () {
            reactElement = create(this, utils.getProps(this));
            utils.getterSetter(this, 'props', function () {
                return reactElement.props;
            }, function (props) {
                reactElement = create(this, props);
            });
        };

        elementPrototype.detachedCallback = function () {
            React.unmountComponentAtNode(this);
        };

        elementPrototype.attributeChangedCallback = function (name, oldValue, newValue) {
            this.props[name] = newValue;
            reactElement = create(this, this.props);
        };

        if (ReactComponent.override) {
            var keys = Object.keys(ReactComponent.override);
            for (var i = 0; i < keys.length; i++) {
                elementPrototype[keys[i]] = ReactComponent.override[keys[i]];
            }
        }

        registerElement(elementName, {prototype: elementPrototype});
    };

    exports.utils = utils;

    document.registerReact = exports.registerReact;
    if (window.xtag) {
        window.xtag.registerReact = registerReact;
    }
}())
