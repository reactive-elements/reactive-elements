!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ReactiveElements=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

},{}],2:[function(_dereq_,module,exports){
(function() {
    var registerElement = document.registerElement || document.register;

    if (registerElement) {
        registerElement = registerElement.bind(document);
    } else {
        throw new Error('No custom element support or polyfill found!');
        return;
    }

    var React = window.React || _dereq_('react');
    var utils = _dereq_('./utils');

    exports.registerReact = function (elementName, ReactComponent) {
        var elementPrototype = Object.create(HTMLElement.prototype);
        var reactElement;

        function create(parent, props) {
            var element = React.createElement(ReactComponent, props);
            parent.reactiveElement = element;
            return React.render(element, parent, props.onRender);
        }

        elementPrototype.createdCallback = function () {
            var props = utils.getProps(this);
            props.children = utils.getChildren(this);
            reactElement = create(this, props);
            exposeMethods(reactElement, reactElement.props.container);
            exposeDefaultMethods(reactElement, reactElement.props.container);

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
            var propertyName = utils.attributeNameToPropertyName(name),
                value = utils.parseAttributeValue(newValue);

            var propertiesObject = {};
            propertiesObject[propertyName] = value;

            this.setProps(propertiesObject, function(){
                reactElement = create(this, this.props);
            });
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

},{"./utils":3}],3:[function(_dereq_,module,exports){
var getAllProperties = function (obj) {
    var props = {};
    while (obj && obj !== React.Component.prototype && obj !== Object.prototype) {
        var propNames = Object.getOwnPropertyNames(obj);
        for (var i = 0; i < propNames.length; i++) {
            props[propNames[i]] = null;
        }
        obj = Object.getPrototypeOf(obj);
    }
    delete props.constructor;
    return Object.keys(props);
};

exports.extend = function (extensible, extending) {
    var props = getAllProperties(extending);
    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (!(prop in extensible)) {
            var val = extending[prop];
            if (typeof val === 'function') {
                val = val.bind(extending);
            }
            extensible[prop] = val;
        }
    }
};

exports.getProps = function (el) {
    var props = {};

    for (var i = 0; i < el.attributes.length; i++) {
        var attribute = el.attributes[i];
        var name = exports.attributeNameToPropertyName(attribute.name);
        props[name] = exports.parseAttributeValue(attribute.value);
    }

    props.container = el;

    return props;
};

exports.getterSetter = function (variableParent, variableName, getterFunction, setterFunction) {
    if (Object.defineProperty) {
        Object.defineProperty(variableParent, variableName, {
            get: getterFunction,
            set: setterFunction
        });
    }
    else if (document.__defineGetter__) {
        variableParent.__defineGetter__(variableName, getterFunction);
        variableParent.__defineSetter__(variableName, setterFunction);
    }

    variableParent['get' + variableName] = getterFunction;
    variableParent['set' + variableName] = setterFunction;
};

exports.attributeNameToPropertyName = function (attributeName) {
    return attributeName
        .replace(/^(x|data)[-_:]/i, '')
        .replace(/[-_:](.)/g, function (x, chr) {
            return chr.toUpperCase();
        });
};

exports.parseAttributeValue = function (value) {
    var pointerRegexp = /^{.*?}$/i,
        jsonRegexp = /^{{2}.*}{2}$/,
        jsonArrayRegexp = /^{\[.*\]}$/;

    var pointerMatches = value.match(pointerRegexp),
        jsonMatches = value.match(jsonRegexp) || value.match(jsonArrayRegexp);

    if (jsonMatches) {
        value = JSON.parse(jsonMatches[0].replace(/^{|}$/g, ''));
    } else if (pointerMatches) {
        value = eval(pointerMatches[0].replace(/[{}]/g, ''));
    }

    return value;
};

exports.getChildren = function (el) {
    var fragment = document.createDocumentFragment();
    while (el.childNodes.length) {
        fragment.appendChild(el.childNodes[0]);
    }
    return fragment;
}

},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxzcmNcXFJlYWN0aXZlRWxlbWVudHNcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6L3NyYy9SZWFjdGl2ZUVsZW1lbnRzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L2xpYi9fZW1wdHkuanMiLCJDOi9zcmMvUmVhY3RpdmVFbGVtZW50cy9zcmMvZmFrZV9lMzUwYTNjOC5qcyIsIkM6L3NyYy9SZWFjdGl2ZUVsZW1lbnRzL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsbnVsbCwiKGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHJlZ2lzdGVyRWxlbWVudCA9IGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCB8fCBkb2N1bWVudC5yZWdpc3RlcjtcclxuXHJcbiAgICBpZiAocmVnaXN0ZXJFbGVtZW50KSB7XHJcbiAgICAgICAgcmVnaXN0ZXJFbGVtZW50ID0gcmVnaXN0ZXJFbGVtZW50LmJpbmQoZG9jdW1lbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGN1c3RvbSBlbGVtZW50IHN1cHBvcnQgb3IgcG9seWZpbGwgZm91bmQhJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBSZWFjdCA9IHdpbmRvdy5SZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xyXG4gICAgdmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG5cclxuICAgIGV4cG9ydHMucmVnaXN0ZXJSZWFjdCA9IGZ1bmN0aW9uIChlbGVtZW50TmFtZSwgUmVhY3RDb21wb25lbnQpIHtcclxuICAgICAgICB2YXIgZWxlbWVudFByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSFRNTEVsZW1lbnQucHJvdG90eXBlKTtcclxuICAgICAgICB2YXIgcmVhY3RFbGVtZW50O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBjcmVhdGUocGFyZW50LCBwcm9wcykge1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3RDb21wb25lbnQsIHByb3BzKTtcclxuICAgICAgICAgICAgcGFyZW50LnJlYWN0aXZlRWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5yZW5kZXIoZWxlbWVudCwgcGFyZW50LCBwcm9wcy5vblJlbmRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmNyZWF0ZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHByb3BzID0gdXRpbHMuZ2V0UHJvcHModGhpcyk7XHJcbiAgICAgICAgICAgIHByb3BzLmNoaWxkcmVuID0gdXRpbHMuZ2V0Q2hpbGRyZW4odGhpcyk7XHJcbiAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCBwcm9wcyk7XHJcbiAgICAgICAgICAgIGV4cG9zZU1ldGhvZHMocmVhY3RFbGVtZW50LCByZWFjdEVsZW1lbnQucHJvcHMuY29udGFpbmVyKTtcclxuICAgICAgICAgICAgZXhwb3NlRGVmYXVsdE1ldGhvZHMocmVhY3RFbGVtZW50LCByZWFjdEVsZW1lbnQucHJvcHMuY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLmdldHRlclNldHRlcih0aGlzLCAncHJvcHMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RFbGVtZW50LnByb3BzO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocHJvcHMpIHtcclxuICAgICAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCBwcm9wcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGVsZW1lbnRQcm90b3R5cGUuZGV0YWNoZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgUmVhY3QudW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIHByb3BlcnR5TmFtZSA9IHV0aWxzLmF0dHJpYnV0ZU5hbWVUb1Byb3BlcnR5TmFtZShuYW1lKSxcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdXRpbHMucGFyc2VBdHRyaWJ1dGVWYWx1ZShuZXdWYWx1ZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJvcGVydGllc09iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzT2JqZWN0W3Byb3BlcnR5TmFtZV0gPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvcHMocHJvcGVydGllc09iamVjdCwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCB0aGlzLnByb3BzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmVnaXN0ZXJFbGVtZW50KGVsZW1lbnROYW1lLCB7cHJvdG90eXBlOiBlbGVtZW50UHJvdG90eXBlfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGV4cG9zZURlZmF1bHRNZXRob2RzIChyZWFjdENvbXBvbmVudCwgY3VzdG9tRWxlbWVudCkge1xyXG4gICAgICAgIGN1c3RvbUVsZW1lbnQuZm9yY2VVcGRhdGUgPSByZWFjdENvbXBvbmVudC5mb3JjZVVwZGF0ZS5iaW5kKHJlYWN0Q29tcG9uZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBleHBvc2VNZXRob2RzIChyZWFjdENvbXBvbmVudCwgY3VzdG9tRWxlbWVudCkge1xyXG4gICAgICAgIHV0aWxzLmV4dGVuZChjdXN0b21FbGVtZW50LCByZWFjdENvbXBvbmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0cy51dGlscyA9IHV0aWxzO1xyXG5cclxuICAgIGRvY3VtZW50LnJlZ2lzdGVyUmVhY3QgPSBleHBvcnRzLnJlZ2lzdGVyUmVhY3Q7XHJcbn0oKSlcclxuIiwidmFyIGdldEFsbFByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICB2YXIgcHJvcHMgPSB7fTtcclxuICAgIHdoaWxlIChvYmogJiYgb2JqICE9PSBSZWFjdC5Db21wb25lbnQucHJvdG90eXBlICYmIG9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xyXG4gICAgICAgIHZhciBwcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcE5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHByb3BzW3Byb3BOYW1lc1tpXV0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcclxuICAgIH1cclxuICAgIGRlbGV0ZSBwcm9wcy5jb25zdHJ1Y3RvcjtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhwcm9wcyk7XHJcbn07XHJcblxyXG5leHBvcnRzLmV4dGVuZCA9IGZ1bmN0aW9uIChleHRlbnNpYmxlLCBleHRlbmRpbmcpIHtcclxuICAgIHZhciBwcm9wcyA9IGdldEFsbFByb3BlcnRpZXMoZXh0ZW5kaW5nKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgcHJvcCA9IHByb3BzW2ldO1xyXG4gICAgICAgIGlmICghKHByb3AgaW4gZXh0ZW5zaWJsZSkpIHtcclxuICAgICAgICAgICAgdmFyIHZhbCA9IGV4dGVuZGluZ1twcm9wXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IHZhbC5iaW5kKGV4dGVuZGluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXh0ZW5zaWJsZVtwcm9wXSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnRzLmdldFByb3BzID0gZnVuY3Rpb24gKGVsKSB7XHJcbiAgICB2YXIgcHJvcHMgPSB7fTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgYXR0cmlidXRlID0gZWwuYXR0cmlidXRlc1tpXTtcclxuICAgICAgICB2YXIgbmFtZSA9IGV4cG9ydHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lKGF0dHJpYnV0ZS5uYW1lKTtcclxuICAgICAgICBwcm9wc1tuYW1lXSA9IGV4cG9ydHMucGFyc2VBdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGUudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3BzLmNvbnRhaW5lciA9IGVsO1xyXG5cclxuICAgIHJldHVybiBwcm9wcztcclxufTtcclxuXHJcbmV4cG9ydHMuZ2V0dGVyU2V0dGVyID0gZnVuY3Rpb24gKHZhcmlhYmxlUGFyZW50LCB2YXJpYWJsZU5hbWUsIGdldHRlckZ1bmN0aW9uLCBzZXR0ZXJGdW5jdGlvbikge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YXJpYWJsZVBhcmVudCwgdmFyaWFibGVOYW1lLCB7XHJcbiAgICAgICAgICAgIGdldDogZ2V0dGVyRnVuY3Rpb24sXHJcbiAgICAgICAgICAgIHNldDogc2V0dGVyRnVuY3Rpb25cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGRvY3VtZW50Ll9fZGVmaW5lR2V0dGVyX18pIHtcclxuICAgICAgICB2YXJpYWJsZVBhcmVudC5fX2RlZmluZUdldHRlcl9fKHZhcmlhYmxlTmFtZSwgZ2V0dGVyRnVuY3Rpb24pO1xyXG4gICAgICAgIHZhcmlhYmxlUGFyZW50Ll9fZGVmaW5lU2V0dGVyX18odmFyaWFibGVOYW1lLCBzZXR0ZXJGdW5jdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyaWFibGVQYXJlbnRbJ2dldCcgKyB2YXJpYWJsZU5hbWVdID0gZ2V0dGVyRnVuY3Rpb247XHJcbiAgICB2YXJpYWJsZVBhcmVudFsnc2V0JyArIHZhcmlhYmxlTmFtZV0gPSBzZXR0ZXJGdW5jdGlvbjtcclxufTtcclxuXHJcbmV4cG9ydHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lID0gZnVuY3Rpb24gKGF0dHJpYnV0ZU5hbWUpIHtcclxuICAgIHJldHVybiBhdHRyaWJ1dGVOYW1lXHJcbiAgICAgICAgLnJlcGxhY2UoL14oeHxkYXRhKVstXzpdL2ksICcnKVxyXG4gICAgICAgIC5yZXBsYWNlKC9bLV86XSguKS9nLCBmdW5jdGlvbiAoeCwgY2hyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjaHIudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydHMucGFyc2VBdHRyaWJ1dGVWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgdmFyIHBvaW50ZXJSZWdleHAgPSAvXnsuKj99JC9pLFxyXG4gICAgICAgIGpzb25SZWdleHAgPSAvXnt7Mn0uKn17Mn0kLyxcclxuICAgICAgICBqc29uQXJyYXlSZWdleHAgPSAvXntcXFsuKlxcXX0kLztcclxuXHJcbiAgICB2YXIgcG9pbnRlck1hdGNoZXMgPSB2YWx1ZS5tYXRjaChwb2ludGVyUmVnZXhwKSxcclxuICAgICAgICBqc29uTWF0Y2hlcyA9IHZhbHVlLm1hdGNoKGpzb25SZWdleHApIHx8IHZhbHVlLm1hdGNoKGpzb25BcnJheVJlZ2V4cCk7XHJcblxyXG4gICAgaWYgKGpzb25NYXRjaGVzKSB7XHJcbiAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKGpzb25NYXRjaGVzWzBdLnJlcGxhY2UoL157fH0kL2csICcnKSk7XHJcbiAgICB9IGVsc2UgaWYgKHBvaW50ZXJNYXRjaGVzKSB7XHJcbiAgICAgICAgdmFsdWUgPSBldmFsKHBvaW50ZXJNYXRjaGVzWzBdLnJlcGxhY2UoL1t7fV0vZywgJycpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5leHBvcnRzLmdldENoaWxkcmVuID0gZnVuY3Rpb24gKGVsKSB7XHJcbiAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICB3aGlsZSAoZWwuY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbC5jaGlsZE5vZGVzWzBdKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmcmFnbWVudDtcclxufVxyXG4iXX0=
(2)
});
