(function() {
    var registerElement = document.registerElement || document.register;

    if (registerElement) {
        registerElement = registerElement.bind(document);
    } else {
        throw new Error('No custom element support or polyfill found!');
    }

    var React = window.React || require('react');
    var ReactDOM = window.ReactDOM || require('react-dom');
    var utils = require('./utils');

    exports.registerReact = function (elementName, ReactComponent, options) {

        options = options || {
            renderOnAttached: false,
        };

        var elementPrototype = Object.create(HTMLElement.prototype);
        var reactElement;

        function create(parent, props) {
            var element = React.createElement(ReactComponent, props);
            parent.reactiveElement = element;
            return ReactDOM.render(element, parent, props.onRender);
        }

        var renderCallback = options.renderOnAttached ? 'attachedCallback' : 'createdCallback';

        elementPrototype[renderCallback] = function () {
            var props = utils.getProps(this);
            props.children = utils.getChildren(this);
            reactElement = create(this, props);

            if (reactElement !== null) {
                exposeMethods(reactElement, reactElement.props.container);
                exposeDefaultMethods(reactElement, reactElement.props.container);

                utils.getterSetter(this, 'props', function () {
                    return reactElement.props;
                }, function (props) {
                    reactElement = create(this, props);
                });
            }
        };

        elementPrototype.detachedCallback = function () {
            ReactDOM.unmountComponentAtNode(this);
        };

        elementPrototype.attributeChangedCallback = function (name, oldValue, newValue) {
            // we only care about attribute changes once we've rendered initially
            if (this.reactiveElement) {
                var props = utils.getProps(this);
                reactElement = create(this, props);
            }
        };

        registerElement(elementName, {prototype: elementPrototype});
    };

    function exposeDefaultMethods (reactComponent, customElement) {
        customElement.forceUpdate = reactComponent.forceUpdate.bind(reactComponent);
    }

    function exposeMethods (reactComponent, customElement) {
        utils.extend(customElement, reactComponent);
    }

    exports.utils = utils;

    document.registerReact = exports.registerReact;
}())
