!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ReactiveElements=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function() {
    var registerElement = document.registerElement || document.register;
    if (registerElement) {
        registerElement = registerElement.bind(document);
    } else {
        // There is no custom element support or polyfill.
        return;
    }

    var React = window.React || _dereq_('react');
    var utils = _dereq_('./utils');

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
            }, function (props) {
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

        registerElement(elementName, {prototype: elementPrototype});
    };

    exports.utils = utils;

    document.registerReact = exports.registerReact;
    if (window.xtag) {
        window.xtag.registerReact = registerReact;
    }
}())

},{"./utils":2,"react":"CwoHg3"}],2:[function(_dereq_,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9rb2Yvd29yay9wcm9qZWN0cy91YmVyZ3JhcGUvcmVhY3RpdmUtZWxlbWVudHMvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2tvZi93b3JrL3Byb2plY3RzL3ViZXJncmFwZS9yZWFjdGl2ZS1lbGVtZW50cy9zcmMvZmFrZV82NzU2ZGM3Yy5qcyIsIi9Vc2Vycy9rb2Yvd29yay9wcm9qZWN0cy91YmVyZ3JhcGUvcmVhY3RpdmUtZWxlbWVudHMvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuICAgIHZhciByZWdpc3RlckVsZW1lbnQgPSBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQgfHwgZG9jdW1lbnQucmVnaXN0ZXI7XG4gICAgaWYgKHJlZ2lzdGVyRWxlbWVudCkge1xuICAgICAgICByZWdpc3RlckVsZW1lbnQgPSByZWdpc3RlckVsZW1lbnQuYmluZChkb2N1bWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhlcmUgaXMgbm8gY3VzdG9tIGVsZW1lbnQgc3VwcG9ydCBvciBwb2x5ZmlsbC5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBSZWFjdCA9IHdpbmRvdy5SZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xuICAgIHZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuICAgIGV4cG9ydHMucmVnaXN0ZXJSZWFjdCA9IGZ1bmN0aW9uIChlbGVtZW50TmFtZSwgUmVhY3RDb21wb25lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRQcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSk7XG4gICAgICAgIHZhciByZWFjdEVsZW1lbnQ7XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlKHBhcmVudCwgcHJvcHMpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdENvbXBvbmVudCwgcHJvcHMpO1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LnJlbmRlcihlbGVtZW50LCBwYXJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5jcmVhdGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgdXRpbHMuZ2V0UHJvcHModGhpcykpO1xuICAgICAgICAgICAgdXRpbHMuZ2V0dGVyU2V0dGVyKHRoaXMsICdwcm9wcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RFbGVtZW50LnByb3BzO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHByb3BzKcKge1xuICAgICAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCBwcm9wcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmRldGFjaGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgUmVhY3QudW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHNbbmFtZV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCB0aGlzLnByb3BzKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckVsZW1lbnQoZWxlbWVudE5hbWUsIHtwcm90b3R5cGU6IGVsZW1lbnRQcm90b3R5cGV9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0cy51dGlscyA9IHV0aWxzO1xuXG4gICAgZG9jdW1lbnQucmVnaXN0ZXJSZWFjdCA9IGV4cG9ydHMucmVnaXN0ZXJSZWFjdDtcbiAgICBpZiAod2luZG93Lnh0YWcpIHtcbiAgICAgICAgd2luZG93Lnh0YWcucmVnaXN0ZXJSZWFjdCA9IHJlZ2lzdGVyUmVhY3Q7XG4gICAgfVxufSgpKVxuIiwiZXhwb3J0cy5nZXRQcm9wcyA9IGZ1bmN0aW9uIChlbCkge1xuICAgIHZhciBwcm9wcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGUgPSBlbC5hdHRyaWJ1dGVzW2ldO1xuICAgICAgICB2YXIgbmFtZSA9IGV4cG9ydHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgcHJvcHNbbmFtZV0gPSBleHBvcnRzLnBhcnNlQXR0cmlidXRlVmFsdWUoYXR0cmlidXRlLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm9wcy5jb250YWluZXIgPSBlbDtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGdldENoaWxkcmVuKGVsKTtcblxuICAgIHJldHVybiBwcm9wcztcbn07XG5cbmV4cG9ydHMuZ2V0dGVyU2V0dGVyID0gZnVuY3Rpb24gKHZhcmlhYmxlUGFyZW50LCB2YXJpYWJsZU5hbWUsIGdldHRlckZ1bmN0aW9uLCBzZXR0ZXJGdW5jdGlvbikge1xuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhcmlhYmxlUGFyZW50LCB2YXJpYWJsZU5hbWUsIHtcbiAgICAgICAgICAgIGdldDogZ2V0dGVyRnVuY3Rpb24sXG4gICAgICAgICAgICBzZXQ6IHNldHRlckZ1bmN0aW9uXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChkb2N1bWVudC5fX2RlZmluZUdldHRlcl9fKSB7XG4gICAgICAgIHZhcmlhYmxlUGFyZW50Ll9fZGVmaW5lR2V0dGVyX18odmFyaWFibGVOYW1lLCBnZXR0ZXJGdW5jdGlvbik7XG4gICAgICAgIHZhcmlhYmxlUGFyZW50Ll9fZGVmaW5lU2V0dGVyX18odmFyaWFibGVOYW1lLCBzZXR0ZXJGdW5jdGlvbik7XG4gICAgfVxuXG4gICAgdmFyaWFibGVQYXJlbnRbJ2dldCcgKyB2YXJpYWJsZU5hbWVdID0gZ2V0dGVyRnVuY3Rpb247XG4gICAgdmFyaWFibGVQYXJlbnRbJ3NldCcgKyB2YXJpYWJsZU5hbWVdID0gc2V0dGVyRnVuY3Rpb247XG59O1xuXG5leHBvcnRzLmF0dHJpYnV0ZU5hbWVUb1Byb3BlcnR5TmFtZSA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVOYW1lKSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZU5hbWVcbiAgICAgICAgLnJlcGxhY2UoL14oeHxkYXRhKVstXzpdL2ksICcnKVxuICAgICAgICAucmVwbGFjZSgvWy1fOl0oLikvZywgZnVuY3Rpb24gKHgsIGNocikge1xuICAgICAgICAgICAgcmV0dXJuIGNoci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9KTtcbn07XG5cbmV4cG9ydHMucGFyc2VBdHRyaWJ1dGVWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciBwb2ludGVyUmVnZXhwID0gL157Lio/fSQvaSxcbiAgICAgICAganNvblJlZ2V4cCA9IC9ee3syfS4qfXsyfSQvLFxuICAgICAgICBqc29uQXJyYXlSZWdleHAgPSAvXntcXFsuKlxcXX0kLztcblxuICAgIHZhciBwb2ludGVyTWF0Y2hlcyA9IHZhbHVlLm1hdGNoKHBvaW50ZXJSZWdleHApLFxuICAgICAgICBqc29uTWF0Y2hlcyA9IHZhbHVlLm1hdGNoKGpzb25SZWdleHApIHx8IHZhbHVlLm1hdGNoKGpzb25BcnJheVJlZ2V4cCk7XG5cbiAgICBpZiAoanNvbk1hdGNoZXMpIHtcbiAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKGpzb25NYXRjaGVzWzBdLnJlcGxhY2UoL157fH0kL2csICcnKSk7XG4gICAgfSBlbHNlIGlmIChwb2ludGVyTWF0Y2hlcykge1xuICAgICAgICB2YWx1ZSA9IGV2YWwocG9pbnRlck1hdGNoZXNbMF0ucmVwbGFjZSgvW3t9XS9nLCAnJykpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIGdldENoaWxkcmVuKGVsKSB7XG4gICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHdoaWxlIChlbC5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbC5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyYWdtZW50O1xufVxuIl19
(1)
});
