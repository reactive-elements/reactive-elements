!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ReactiveElements=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

},{}],2:[function(_dereq_,module,exports){
(function () {
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

},{"./utils":3}],3:[function(_dereq_,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImM6XFxQcm9qZWN0c1xcZm9ya3NcXFJlYWN0aXZlRWxlbWVudHNcXG5vZGVfbW9kdWxlc1xcZ3VscC1icm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsImM6L1Byb2plY3RzL2ZvcmtzL1JlYWN0aXZlRWxlbWVudHMvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwiYzovUHJvamVjdHMvZm9ya3MvUmVhY3RpdmVFbGVtZW50cy9zcmMvZmFrZV8yZjU3ZjI5Yy5qcyIsImM6L1Byb2plY3RzL2ZvcmtzL1JlYWN0aXZlRWxlbWVudHMvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLG51bGwsIihmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcmVnaXN0ZXJFbGVtZW50ID0gZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50IHx8IGRvY3VtZW50LnJlZ2lzdGVyO1xyXG4gICAgaWYgKHJlZ2lzdGVyRWxlbWVudCkge1xyXG4gICAgICAgIHJlZ2lzdGVyRWxlbWVudCA9IHJlZ2lzdGVyRWxlbWVudC5iaW5kKGRvY3VtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVGhlcmUgaXMgbm8gY3VzdG9tIGVsZW1lbnQgc3VwcG9ydCBvciBwb2x5ZmlsbC5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIFJlYWN0ID0gd2luZG93LlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbiAgICB2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XHJcblxyXG4gICAgZXhwb3J0cy5yZWdpc3RlclJlYWN0ID0gZnVuY3Rpb24gKGVsZW1lbnROYW1lLCBSZWFjdENvbXBvbmVudCkge1xyXG4gICAgICAgIHZhciBlbGVtZW50UHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShIVE1MRWxlbWVudC5wcm90b3R5cGUpO1xyXG4gICAgICAgIHZhciByZWFjdEVsZW1lbnQ7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZShwYXJlbnQsIHByb3BzKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdENvbXBvbmVudCwgcHJvcHMpO1xyXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QucmVuZGVyKGVsZW1lbnQsIHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmNyZWF0ZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHV0aWxzLmdldFByb3BzKHRoaXMpKTtcclxuICAgICAgICAgICAgdXRpbHMuZ2V0dGVyU2V0dGVyKHRoaXMsICdwcm9wcycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWFjdEVsZW1lbnQucHJvcHM7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChwcm9wcykge1xyXG4gICAgICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHByb3BzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5kZXRhY2hlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBSZWFjdC51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGVsZW1lbnRQcm90b3R5cGUuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzW25hbWVdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCB0aGlzLnByb3BzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoUmVhY3RDb21wb25lbnQub3ZlcnJpZGUpIHtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhSZWFjdENvbXBvbmVudC5vdmVycmlkZSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudFByb3RvdHlwZVtrZXlzW2ldXSA9IFJlYWN0Q29tcG9uZW50Lm92ZXJyaWRlW2tleXNbaV1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZWdpc3RlckVsZW1lbnQoZWxlbWVudE5hbWUsIHtwcm90b3R5cGU6IGVsZW1lbnRQcm90b3R5cGV9KTtcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0cy51dGlscyA9IHV0aWxzO1xyXG5cclxuICAgIGRvY3VtZW50LnJlZ2lzdGVyUmVhY3QgPSBleHBvcnRzLnJlZ2lzdGVyUmVhY3Q7XHJcbiAgICBpZiAod2luZG93Lnh0YWcpIHtcclxuICAgICAgICB3aW5kb3cueHRhZy5yZWdpc3RlclJlYWN0ID0gcmVnaXN0ZXJSZWFjdDtcclxuICAgIH1cclxufSgpKVxyXG4iLCJleHBvcnRzLmdldFByb3BzID0gZnVuY3Rpb24gKGVsKSB7XHJcbiAgICB2YXIgcHJvcHMgPSB7fTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgYXR0cmlidXRlID0gZWwuYXR0cmlidXRlc1tpXTtcclxuICAgICAgICB2YXIgbmFtZSA9IGV4cG9ydHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lKGF0dHJpYnV0ZS5uYW1lKTtcclxuICAgICAgICBwcm9wc1tuYW1lXSA9IGV4cG9ydHMucGFyc2VBdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGUudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3BzLmNvbnRhaW5lciA9IGVsO1xyXG4gICAgcHJvcHMuY2hpbGRyZW4gPSBnZXRDaGlsZHJlbihlbCk7XHJcblxyXG4gICAgcmV0dXJuIHByb3BzO1xyXG59O1xyXG5cclxuZXhwb3J0cy5nZXR0ZXJTZXR0ZXIgPSBmdW5jdGlvbiAodmFyaWFibGVQYXJlbnQsIHZhcmlhYmxlTmFtZSwgZ2V0dGVyRnVuY3Rpb24sIHNldHRlckZ1bmN0aW9uKSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhcmlhYmxlUGFyZW50LCB2YXJpYWJsZU5hbWUsIHtcclxuICAgICAgICAgICAgZ2V0OiBnZXR0ZXJGdW5jdGlvbixcclxuICAgICAgICAgICAgc2V0OiBzZXR0ZXJGdW5jdGlvblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZG9jdW1lbnQuX19kZWZpbmVHZXR0ZXJfXykge1xyXG4gICAgICAgIHZhcmlhYmxlUGFyZW50Ll9fZGVmaW5lR2V0dGVyX18odmFyaWFibGVOYW1lLCBnZXR0ZXJGdW5jdGlvbik7XHJcbiAgICAgICAgdmFyaWFibGVQYXJlbnQuX19kZWZpbmVTZXR0ZXJfXyh2YXJpYWJsZU5hbWUsIHNldHRlckZ1bmN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXJpYWJsZVBhcmVudFsnZ2V0JyArIHZhcmlhYmxlTmFtZV0gPSBnZXR0ZXJGdW5jdGlvbjtcclxuICAgIHZhcmlhYmxlUGFyZW50WydzZXQnICsgdmFyaWFibGVOYW1lXSA9IHNldHRlckZ1bmN0aW9uO1xyXG59O1xyXG5cclxuZXhwb3J0cy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUgPSBmdW5jdGlvbiAoYXR0cmlidXRlTmFtZSkge1xyXG4gICAgcmV0dXJuIGF0dHJpYnV0ZU5hbWVcclxuICAgICAgICAucmVwbGFjZSgvXih4fGRhdGEpWy1fOl0vaSwgJycpXHJcbiAgICAgICAgLnJlcGxhY2UoL1stXzpdKC4pL2csIGZ1bmN0aW9uICh4LCBjaHIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNoci50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0cy5wYXJzZUF0dHJpYnV0ZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICB2YXIgcG9pbnRlclJlZ2V4cCA9IC9eey4qP30kL2ksXHJcbiAgICAgICAganNvblJlZ2V4cCA9IC9ee3syfS4qfXsyfSQvLFxyXG4gICAgICAgIGpzb25BcnJheVJlZ2V4cCA9IC9ee1xcWy4qXFxdfSQvO1xyXG5cclxuICAgIHZhciBwb2ludGVyTWF0Y2hlcyA9IHZhbHVlLm1hdGNoKHBvaW50ZXJSZWdleHApLFxyXG4gICAgICAgIGpzb25NYXRjaGVzID0gdmFsdWUubWF0Y2goanNvblJlZ2V4cCkgfHwgdmFsdWUubWF0Y2goanNvbkFycmF5UmVnZXhwKTtcclxuXHJcbiAgICBpZiAoanNvbk1hdGNoZXMpIHtcclxuICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoanNvbk1hdGNoZXNbMF0ucmVwbGFjZSgvXnt8fSQvZywgJycpKTtcclxuICAgIH0gZWxzZSBpZiAocG9pbnRlck1hdGNoZXMpIHtcclxuICAgICAgICB2YWx1ZSA9IGV2YWwocG9pbnRlck1hdGNoZXNbMF0ucmVwbGFjZSgvW3t9XS9nLCAnJykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldENoaWxkcmVuKGVsKSB7XHJcbiAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICB3aGlsZSAoZWwuY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbC5jaGlsZE5vZGVzWzBdKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmcmFnbWVudDtcclxufVxyXG4iXX0=
(2)
});
