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
            return React.render(element, parent, props.onRender);
        }

        elementPrototype.createdCallback = function () {
            console.log('Created');
            var properties = utils.getProps(this);
            reactElement = create(this, properties);

            exposeDefaultMethods(reactElement, reactElement.props.container);
            exposeMethods(reactElement, reactElement.props.container);

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
exports.extend = function (extandable, extending) {
    for (var i in extending) {
        if (!(i in extandable)) {
            extandable[i] = extending[i];
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
    props.children = getChildren(el);

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

function getChildren(el) {
    var fragment = document.createDocumentFragment();
    while (el.childNodes.length) {
        fragment.appendChild(el.childNodes[0]);
    }
    return fragment;
}

},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kZW5pc3JhZGluL1Jlc2VhcmNoZXMvSFRNTDpKUy9SZWFjdGl2ZUVsZW1lbnRzL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGVuaXNyYWRpbi9SZXNlYXJjaGVzL0hUTUw6SlMvUmVhY3RpdmVFbGVtZW50cy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwiL1VzZXJzL2RlbmlzcmFkaW4vUmVzZWFyY2hlcy9IVE1MOkpTL1JlYWN0aXZlRWxlbWVudHMvc3JjL2Zha2VfNjk3MjYxNDQuanMiLCIvVXNlcnMvZGVuaXNyYWRpbi9SZXNlYXJjaGVzL0hUTUw6SlMvUmVhY3RpdmVFbGVtZW50cy9zcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLG51bGwsIihmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVnaXN0ZXJFbGVtZW50ID0gZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50IHx8IGRvY3VtZW50LnJlZ2lzdGVyO1xuXG4gICAgaWYgKHJlZ2lzdGVyRWxlbWVudCkge1xuICAgICAgICByZWdpc3RlckVsZW1lbnQgPSByZWdpc3RlckVsZW1lbnQuYmluZChkb2N1bWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjdXN0b20gZWxlbWVudCBzdXBwb3J0IG9yIHBvbHlmaWxsIGZvdW5kIScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIFJlYWN0ID0gd2luZG93LlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG4gICAgdmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4gICAgZXhwb3J0cy5yZWdpc3RlclJlYWN0ID0gZnVuY3Rpb24gKGVsZW1lbnROYW1lLCBSZWFjdENvbXBvbmVudCkge1xuICAgICAgICB2YXIgZWxlbWVudFByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSFRNTEVsZW1lbnQucHJvdG90eXBlKTtcbiAgICAgICAgdmFyIHJlYWN0RWxlbWVudDtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGUocGFyZW50LCBwcm9wcykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0Q29tcG9uZW50LCBwcm9wcyk7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QucmVuZGVyKGVsZW1lbnQsIHBhcmVudCwgcHJvcHMub25SZW5kZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5jcmVhdGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQ3JlYXRlZCcpO1xuICAgICAgICAgICAgdmFyIHByb3BlcnRpZXMgPSB1dGlscy5nZXRQcm9wcyh0aGlzKTtcbiAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCBwcm9wZXJ0aWVzKTtcblxuICAgICAgICAgICAgZXhwb3NlRGVmYXVsdE1ldGhvZHMocmVhY3RFbGVtZW50LCByZWFjdEVsZW1lbnQucHJvcHMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGV4cG9zZU1ldGhvZHMocmVhY3RFbGVtZW50LCByZWFjdEVsZW1lbnQucHJvcHMuY29udGFpbmVyKTtcblxuICAgICAgICAgICAgdXRpbHMuZ2V0dGVyU2V0dGVyKHRoaXMsICdwcm9wcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RFbGVtZW50LnByb3BzO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHByb3BzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGVsZW1lbnRQcm90b3R5cGUuZGV0YWNoZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFJlYWN0LnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gdXRpbHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lKG5hbWUpLFxuICAgICAgICAgICAgICAgIHZhbHVlID0gdXRpbHMucGFyc2VBdHRyaWJ1dGVWYWx1ZShuZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIHZhciBwcm9wZXJ0aWVzT2JqZWN0ID0ge307XG4gICAgICAgICAgICBwcm9wZXJ0aWVzT2JqZWN0W3Byb3BlcnR5TmFtZV0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgdGhpcy5zZXRQcm9wcyhwcm9wZXJ0aWVzT2JqZWN0LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCB0aGlzLnByb3BzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVyRWxlbWVudChlbGVtZW50TmFtZSwge3Byb3RvdHlwZTogZWxlbWVudFByb3RvdHlwZX0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBleHBvc2VEZWZhdWx0TWV0aG9kcyAocmVhY3RDb21wb25lbnQsIGN1c3RvbUVsZW1lbnQpIHtcbiAgICAgICAgY3VzdG9tRWxlbWVudC5mb3JjZVVwZGF0ZSA9IHJlYWN0Q29tcG9uZW50LmZvcmNlVXBkYXRlLmJpbmQocmVhY3RDb21wb25lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cG9zZU1ldGhvZHMgKHJlYWN0Q29tcG9uZW50LCBjdXN0b21FbGVtZW50KSB7XG4gICAgICAgIHV0aWxzLmV4dGVuZChjdXN0b21FbGVtZW50LCByZWFjdENvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgZXhwb3J0cy51dGlscyA9IHV0aWxzO1xuXG4gICAgZG9jdW1lbnQucmVnaXN0ZXJSZWFjdCA9IGV4cG9ydHMucmVnaXN0ZXJSZWFjdDtcbn0oKSlcbiIsImV4cG9ydHMuZXh0ZW5kID0gZnVuY3Rpb24gKGV4dGFuZGFibGUsIGV4dGVuZGluZykge1xuICAgIGZvciAodmFyIGkgaW4gZXh0ZW5kaW5nKSB7XG4gICAgICAgIGlmICghKGkgaW4gZXh0YW5kYWJsZSkpIHtcbiAgICAgICAgICAgIGV4dGFuZGFibGVbaV0gPSBleHRlbmRpbmdbaV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnRzLmdldFByb3BzID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgdmFyIHByb3BzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IGVsLmF0dHJpYnV0ZXNbaV07XG4gICAgICAgIHZhciBuYW1lID0gZXhwb3J0cy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUoYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICBwcm9wc1tuYW1lXSA9IGV4cG9ydHMucGFyc2VBdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGUudmFsdWUpO1xuICAgIH1cblxuICAgIHByb3BzLmNvbnRhaW5lciA9IGVsO1xuICAgIHByb3BzLmNoaWxkcmVuID0gZ2V0Q2hpbGRyZW4oZWwpO1xuXG4gICAgcmV0dXJuIHByb3BzO1xufTtcblxuZXhwb3J0cy5nZXR0ZXJTZXR0ZXIgPSBmdW5jdGlvbiAodmFyaWFibGVQYXJlbnQsIHZhcmlhYmxlTmFtZSwgZ2V0dGVyRnVuY3Rpb24sIHNldHRlckZ1bmN0aW9uKSB7XG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFyaWFibGVQYXJlbnQsIHZhcmlhYmxlTmFtZSwge1xuICAgICAgICAgICAgZ2V0OiBnZXR0ZXJGdW5jdGlvbixcbiAgICAgICAgICAgIHNldDogc2V0dGVyRnVuY3Rpb25cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRvY3VtZW50Ll9fZGVmaW5lR2V0dGVyX18pIHtcbiAgICAgICAgdmFyaWFibGVQYXJlbnQuX19kZWZpbmVHZXR0ZXJfXyh2YXJpYWJsZU5hbWUsIGdldHRlckZ1bmN0aW9uKTtcbiAgICAgICAgdmFyaWFibGVQYXJlbnQuX19kZWZpbmVTZXR0ZXJfXyh2YXJpYWJsZU5hbWUsIHNldHRlckZ1bmN0aW9uKTtcbiAgICB9XG5cbiAgICB2YXJpYWJsZVBhcmVudFsnZ2V0JyArIHZhcmlhYmxlTmFtZV0gPSBnZXR0ZXJGdW5jdGlvbjtcbiAgICB2YXJpYWJsZVBhcmVudFsnc2V0JyArIHZhcmlhYmxlTmFtZV0gPSBzZXR0ZXJGdW5jdGlvbjtcbn07XG5cbmV4cG9ydHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lID0gZnVuY3Rpb24gKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICByZXR1cm4gYXR0cmlidXRlTmFtZVxuICAgICAgICAucmVwbGFjZSgvXih4fGRhdGEpWy1fOl0vaSwgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bLV86XSguKS9nLCBmdW5jdGlvbiAoeCwgY2hyKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH0pO1xufTtcblxuZXhwb3J0cy5wYXJzZUF0dHJpYnV0ZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdmFyIHBvaW50ZXJSZWdleHAgPSAvXnsuKj99JC9pLFxuICAgICAgICBqc29uUmVnZXhwID0gL157ezJ9Lip9ezJ9JC8sXG4gICAgICAgIGpzb25BcnJheVJlZ2V4cCA9IC9ee1xcWy4qXFxdfSQvO1xuXG4gICAgdmFyIHBvaW50ZXJNYXRjaGVzID0gdmFsdWUubWF0Y2gocG9pbnRlclJlZ2V4cCksXG4gICAgICAgIGpzb25NYXRjaGVzID0gdmFsdWUubWF0Y2goanNvblJlZ2V4cCkgfHwgdmFsdWUubWF0Y2goanNvbkFycmF5UmVnZXhwKTtcblxuICAgIGlmIChqc29uTWF0Y2hlcykge1xuICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoanNvbk1hdGNoZXNbMF0ucmVwbGFjZSgvXnt8fSQvZywgJycpKTtcbiAgICB9IGVsc2UgaWYgKHBvaW50ZXJNYXRjaGVzKSB7XG4gICAgICAgIHZhbHVlID0gZXZhbChwb2ludGVyTWF0Y2hlc1swXS5yZXBsYWNlKC9be31dL2csICcnKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuZnVuY3Rpb24gZ2V0Q2hpbGRyZW4oZWwpIHtcbiAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgd2hpbGUgKGVsLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsLmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gZnJhZ21lbnQ7XG59XG4iXX0=
(2)
});
