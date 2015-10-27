!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ReactiveElements=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function() {
    var registerElement = document.registerElement || document.register;

    if (registerElement) {
        registerElement = registerElement.bind(document);
    } else {
        throw new Error('No custom element support or polyfill found!');
        return;
    }

    var React = _dereq_('react');
    var ReactDOM = _dereq_('react-dom');
    var utils = _dereq_('./utils');

    exports.registerReact = function (elementName, ReactComponent) {
        var elementPrototype = Object.create(HTMLElement.prototype);
        var reactElement;

        function create(parent, props) {
            var element = React.createElement(ReactComponent, props);
            parent.reactiveElement = element;
            return ReactDOM.render(element, parent, props.onRender);
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
            ReactDOM.unmountComponentAtNode(this);
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

},{"./utils":2,"react":"CwoHg3","react-dom":"NKHcwr"}],2:[function(_dereq_,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9rb2Yvd29yay9wcm9qZWN0cy91YmVyZ3JhcGUvcmVhY3RpdmUtZWxlbWVudHMvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2tvZi93b3JrL3Byb2plY3RzL3ViZXJncmFwZS9yZWFjdGl2ZS1lbGVtZW50cy9zcmMvZmFrZV81YjQwODNmNS5qcyIsIi9Vc2Vycy9rb2Yvd29yay9wcm9qZWN0cy91YmVyZ3JhcGUvcmVhY3RpdmUtZWxlbWVudHMvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlZ2lzdGVyRWxlbWVudCA9IGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCB8fCBkb2N1bWVudC5yZWdpc3RlcjtcblxuICAgIGlmIChyZWdpc3RlckVsZW1lbnQpIHtcbiAgICAgICAgcmVnaXN0ZXJFbGVtZW50ID0gcmVnaXN0ZXJFbGVtZW50LmJpbmQoZG9jdW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY3VzdG9tIGVsZW1lbnQgc3VwcG9ydCBvciBwb2x5ZmlsbCBmb3VuZCEnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG4gICAgdmFyIFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XG4gICAgdmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4gICAgZXhwb3J0cy5yZWdpc3RlclJlYWN0ID0gZnVuY3Rpb24gKGVsZW1lbnROYW1lLCBSZWFjdENvbXBvbmVudCkge1xuICAgICAgICB2YXIgZWxlbWVudFByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSFRNTEVsZW1lbnQucHJvdG90eXBlKTtcbiAgICAgICAgdmFyIHJlYWN0RWxlbWVudDtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGUocGFyZW50LCBwcm9wcykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0Q29tcG9uZW50LCBwcm9wcyk7XG4gICAgICAgICAgICBwYXJlbnQucmVhY3RpdmVFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdERPTS5yZW5kZXIoZWxlbWVudCwgcGFyZW50LCBwcm9wcy5vblJlbmRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmNyZWF0ZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwcm9wcyA9IHV0aWxzLmdldFByb3BzKHRoaXMpO1xuICAgICAgICAgICAgcHJvcHMuY2hpbGRyZW4gPSB1dGlscy5nZXRDaGlsZHJlbih0aGlzKTtcbiAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCBwcm9wcyk7XG4gICAgICAgICAgICBleHBvc2VNZXRob2RzKHJlYWN0RWxlbWVudCwgcmVhY3RFbGVtZW50LnByb3BzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBleHBvc2VEZWZhdWx0TWV0aG9kcyhyZWFjdEVsZW1lbnQsIHJlYWN0RWxlbWVudC5wcm9wcy5jb250YWluZXIpO1xuXG4gICAgICAgICAgICB1dGlscy5nZXR0ZXJTZXR0ZXIodGhpcywgJ3Byb3BzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWFjdEVsZW1lbnQucHJvcHM7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgcHJvcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5kZXRhY2hlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSB1dGlscy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUobmFtZSksXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB1dGlscy5wYXJzZUF0dHJpYnV0ZVZhbHVlKG5ld1ZhbHVlKTtcblxuICAgICAgICAgICAgdmFyIHByb3BlcnRpZXNPYmplY3QgPSB7fTtcbiAgICAgICAgICAgIHByb3BlcnRpZXNPYmplY3RbcHJvcGVydHlOYW1lXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICB0aGlzLnNldFByb3BzKHByb3BlcnRpZXNPYmplY3QsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHRoaXMucHJvcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJFbGVtZW50KGVsZW1lbnROYW1lLCB7cHJvdG90eXBlOiBlbGVtZW50UHJvdG90eXBlfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGV4cG9zZURlZmF1bHRNZXRob2RzIChyZWFjdENvbXBvbmVudCwgY3VzdG9tRWxlbWVudCkge1xuICAgICAgICBjdXN0b21FbGVtZW50LmZvcmNlVXBkYXRlID0gcmVhY3RDb21wb25lbnQuZm9yY2VVcGRhdGUuYmluZChyZWFjdENvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwb3NlTWV0aG9kcyAocmVhY3RDb21wb25lbnQsIGN1c3RvbUVsZW1lbnQpIHtcbiAgICAgICAgdXRpbHMuZXh0ZW5kKGN1c3RvbUVsZW1lbnQsIHJlYWN0Q29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBleHBvcnRzLnV0aWxzID0gdXRpbHM7XG5cbiAgICBkb2N1bWVudC5yZWdpc3RlclJlYWN0ID0gZXhwb3J0cy5yZWdpc3RlclJlYWN0O1xufSgpKVxuIiwidmFyIGdldEFsbFByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIHByb3BzID0ge307XG4gICAgd2hpbGUgKG9iaiAmJiBvYmogIT09IFJlYWN0LkNvbXBvbmVudC5wcm90b3R5cGUgJiYgb2JqICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgICAgIHZhciBwcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHJvcHNbcHJvcE5hbWVzW2ldXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgb2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgfVxuICAgIGRlbGV0ZSBwcm9wcy5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocHJvcHMpO1xufTtcblxuZXhwb3J0cy5leHRlbmQgPSBmdW5jdGlvbiAoZXh0ZW5zaWJsZSwgZXh0ZW5kaW5nKSB7XG4gICAgdmFyIHByb3BzID0gZ2V0QWxsUHJvcGVydGllcyhleHRlbmRpbmcpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgICAgaWYgKCEocHJvcCBpbiBleHRlbnNpYmxlKSkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IGV4dGVuZGluZ1twcm9wXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsLmJpbmQoZXh0ZW5kaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4dGVuc2libGVbcHJvcF0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnRzLmdldFByb3BzID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgdmFyIHByb3BzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IGVsLmF0dHJpYnV0ZXNbaV07XG4gICAgICAgIHZhciBuYW1lID0gZXhwb3J0cy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUoYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICBwcm9wc1tuYW1lXSA9IGV4cG9ydHMucGFyc2VBdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGUudmFsdWUpO1xuICAgIH1cblxuICAgIHByb3BzLmNvbnRhaW5lciA9IGVsO1xuXG4gICAgcmV0dXJuIHByb3BzO1xufTtcblxuZXhwb3J0cy5nZXR0ZXJTZXR0ZXIgPSBmdW5jdGlvbiAodmFyaWFibGVQYXJlbnQsIHZhcmlhYmxlTmFtZSwgZ2V0dGVyRnVuY3Rpb24sIHNldHRlckZ1bmN0aW9uKSB7XG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFyaWFibGVQYXJlbnQsIHZhcmlhYmxlTmFtZSwge1xuICAgICAgICAgICAgZ2V0OiBnZXR0ZXJGdW5jdGlvbixcbiAgICAgICAgICAgIHNldDogc2V0dGVyRnVuY3Rpb25cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRvY3VtZW50Ll9fZGVmaW5lR2V0dGVyX18pIHtcbiAgICAgICAgdmFyaWFibGVQYXJlbnQuX19kZWZpbmVHZXR0ZXJfXyh2YXJpYWJsZU5hbWUsIGdldHRlckZ1bmN0aW9uKTtcbiAgICAgICAgdmFyaWFibGVQYXJlbnQuX19kZWZpbmVTZXR0ZXJfXyh2YXJpYWJsZU5hbWUsIHNldHRlckZ1bmN0aW9uKTtcbiAgICB9XG5cbiAgICB2YXJpYWJsZVBhcmVudFsnZ2V0JyArIHZhcmlhYmxlTmFtZV0gPSBnZXR0ZXJGdW5jdGlvbjtcbiAgICB2YXJpYWJsZVBhcmVudFsnc2V0JyArIHZhcmlhYmxlTmFtZV0gPSBzZXR0ZXJGdW5jdGlvbjtcbn07XG5cbmV4cG9ydHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lID0gZnVuY3Rpb24gKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICByZXR1cm4gYXR0cmlidXRlTmFtZVxuICAgICAgICAucmVwbGFjZSgvXih4fGRhdGEpWy1fOl0vaSwgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bLV86XSguKS9nLCBmdW5jdGlvbiAoeCwgY2hyKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH0pO1xufTtcblxuZXhwb3J0cy5wYXJzZUF0dHJpYnV0ZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdmFyIHBvaW50ZXJSZWdleHAgPSAvXnsuKj99JC9pLFxuICAgICAgICBqc29uUmVnZXhwID0gL157ezJ9Lip9ezJ9JC8sXG4gICAgICAgIGpzb25BcnJheVJlZ2V4cCA9IC9ee1xcWy4qXFxdfSQvO1xuXG4gICAgdmFyIHBvaW50ZXJNYXRjaGVzID0gdmFsdWUubWF0Y2gocG9pbnRlclJlZ2V4cCksXG4gICAgICAgIGpzb25NYXRjaGVzID0gdmFsdWUubWF0Y2goanNvblJlZ2V4cCkgfHwgdmFsdWUubWF0Y2goanNvbkFycmF5UmVnZXhwKTtcblxuICAgIGlmIChqc29uTWF0Y2hlcykge1xuICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoanNvbk1hdGNoZXNbMF0ucmVwbGFjZSgvXnt8fSQvZywgJycpKTtcbiAgICB9IGVsc2UgaWYgKHBvaW50ZXJNYXRjaGVzKSB7XG4gICAgICAgIHZhbHVlID0gZXZhbChwb2ludGVyTWF0Y2hlc1swXS5yZXBsYWNlKC9be31dL2csICcnKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuZXhwb3J0cy5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uIChlbCkge1xuICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB3aGlsZSAoZWwuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWwuY2hpbGROb2Rlc1swXSk7XG4gICAgfVxuICAgIHJldHVybiBmcmFnbWVudDtcbn1cbiJdfQ==
(1)
});
