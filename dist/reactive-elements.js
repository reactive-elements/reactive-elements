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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9rb2Yvd29yay9wcm9qZWN0cy91YmVyZ3JhcGUvcmVhY3RpdmUtZWxlbWVudHMvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2tvZi93b3JrL3Byb2plY3RzL3ViZXJncmFwZS9yZWFjdGl2ZS1lbGVtZW50cy9zcmMvZmFrZV9lOGM2MDg4NS5qcyIsIi9Vc2Vycy9rb2Yvd29yay9wcm9qZWN0cy91YmVyZ3JhcGUvcmVhY3RpdmUtZWxlbWVudHMvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuICAgIHZhciByZWdpc3RlckVsZW1lbnQgPSBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQgfHwgZG9jdW1lbnQucmVnaXN0ZXI7XG4gICAgaWYgKHJlZ2lzdGVyRWxlbWVudCkge1xuICAgICAgICByZWdpc3RlckVsZW1lbnQgPSByZWdpc3RlckVsZW1lbnQuYmluZChkb2N1bWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhlcmUgaXMgbm8gY3VzdG9tIGVsZW1lbnQgc3VwcG9ydCBvciBwb2x5ZmlsbC5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBSZWFjdCA9IHdpbmRvdy5SZWFjdCB8fCByZXF1aXJlKCdyZWFjdCcpO1xuICAgIHZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuICAgIGV4cG9ydHMucmVnaXN0ZXJSZWFjdCA9IGZ1bmN0aW9uIChlbGVtZW50TmFtZSwgUmVhY3RDb21wb25lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRQcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSk7XG4gICAgICAgIHZhciByZWFjdEVsZW1lbnQ7XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlKHBhcmVudCwgcHJvcHMpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdENvbXBvbmVudCwgcHJvcHMpO1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LnJlbmRlcihlbGVtZW50LCBwYXJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5jcmVhdGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgdXRpbHMuZ2V0UHJvcHModGhpcykpO1xuICAgICAgICAgICAgdXRpbHMuZ2V0dGVyU2V0dGVyKHRoaXMsICdwcm9wcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RFbGVtZW50LnByb3BzO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHByb3BzKcKge1xuICAgICAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCBwcm9wcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmRldGFjaGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBSZWFjdC51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGVsZW1lbnRQcm90b3R5cGUuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHRoaXMucHJvcHMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVyRWxlbWVudChlbGVtZW50TmFtZSwge3Byb3RvdHlwZTogZWxlbWVudFByb3RvdHlwZX0pO1xuICAgIH07XG5cbiAgICBleHBvcnRzLnV0aWxzID0gdXRpbHM7XG5cbiAgICBkb2N1bWVudC5yZWdpc3RlclJlYWN0ID0gZXhwb3J0cy5yZWdpc3RlclJlYWN0O1xuICAgIGlmICh3aW5kb3cueHRhZykge1xuICAgICAgICB3aW5kb3cueHRhZy5yZWdpc3RlclJlYWN0ID0gcmVnaXN0ZXJSZWFjdDtcbiAgICB9XG59KCkpXG4iLCJleHBvcnRzLmdldFByb3BzID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgdmFyIHByb3BzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IGVsLmF0dHJpYnV0ZXNbaV07XG4gICAgICAgIHZhciBuYW1lID0gZXhwb3J0cy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUoYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICBwcm9wc1tuYW1lXSA9IGV4cG9ydHMucGFyc2VBdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGUudmFsdWUpO1xuICAgIH1cblxuICAgIHByb3BzLmNvbnRhaW5lciA9IGVsO1xuICAgIHByb3BzLmNoaWxkcmVuID0gZ2V0Q2hpbGRyZW4oZWwpO1xuXG4gICAgcmV0dXJuIHByb3BzO1xufTtcblxuZXhwb3J0cy5nZXR0ZXJTZXR0ZXIgPSBmdW5jdGlvbiAodmFyaWFibGVQYXJlbnQsIHZhcmlhYmxlTmFtZSwgZ2V0dGVyRnVuY3Rpb24sIHNldHRlckZ1bmN0aW9uKSB7XG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFyaWFibGVQYXJlbnQsIHZhcmlhYmxlTmFtZSwge1xuICAgICAgICAgICAgZ2V0OiBnZXR0ZXJGdW5jdGlvbixcbiAgICAgICAgICAgIHNldDogc2V0dGVyRnVuY3Rpb25cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRvY3VtZW50Ll9fZGVmaW5lR2V0dGVyX18pIHtcbiAgICAgICAgdmFyaWFibGVQYXJlbnQuX19kZWZpbmVHZXR0ZXJfXyh2YXJpYWJsZU5hbWUsIGdldHRlckZ1bmN0aW9uKTtcbiAgICAgICAgdmFyaWFibGVQYXJlbnQuX19kZWZpbmVTZXR0ZXJfXyh2YXJpYWJsZU5hbWUsIHNldHRlckZ1bmN0aW9uKTtcbiAgICB9XG5cbiAgICB2YXJpYWJsZVBhcmVudFsnZ2V0JyArIHZhcmlhYmxlTmFtZV0gPSBnZXR0ZXJGdW5jdGlvbjtcbiAgICB2YXJpYWJsZVBhcmVudFsnc2V0JyArIHZhcmlhYmxlTmFtZV0gPSBzZXR0ZXJGdW5jdGlvbjtcbn07XG5cbmV4cG9ydHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lID0gZnVuY3Rpb24gKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICByZXR1cm4gYXR0cmlidXRlTmFtZVxuICAgICAgICAucmVwbGFjZSgvXih4fGRhdGEpWy1fOl0vaSwgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bLV86XSguKS9nLCBmdW5jdGlvbiAoeCwgY2hyKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH0pO1xufTtcblxuZXhwb3J0cy5wYXJzZUF0dHJpYnV0ZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdmFyIHBvaW50ZXJSZWdleHAgPSAvXnsuKj99JC9pLFxuICAgICAgICBqc29uUmVnZXhwID0gL157ezJ9Lip9ezJ9JC8sXG4gICAgICAgIGpzb25BcnJheVJlZ2V4cCA9IC9ee1xcWy4qXFxdfSQvO1xuXG4gICAgdmFyIHBvaW50ZXJNYXRjaGVzID0gdmFsdWUubWF0Y2gocG9pbnRlclJlZ2V4cCksXG4gICAgICAgIGpzb25NYXRjaGVzID0gdmFsdWUubWF0Y2goanNvblJlZ2V4cCkgfHwgdmFsdWUubWF0Y2goanNvbkFycmF5UmVnZXhwKTtcblxuICAgIGlmIChqc29uTWF0Y2hlcykge1xuICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoanNvbk1hdGNoZXNbMF0ucmVwbGFjZSgvXnt8fSQvZywgJycpKTtcbiAgICB9IGVsc2UgaWYgKHBvaW50ZXJNYXRjaGVzKSB7XG4gICAgICAgIHZhbHVlID0gZXZhbChwb2ludGVyTWF0Y2hlc1swXS5yZXBsYWNlKC9be31dL2csICcnKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuZnVuY3Rpb24gZ2V0Q2hpbGRyZW4oZWwpIHtcbiAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgd2hpbGUgKGVsLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsLmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gZnJhZ21lbnQ7XG59XG4iXX0=
(1)
});
