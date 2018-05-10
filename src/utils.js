var React = window.React || require('react');
var noBooleanTransformName = 'reactive-elements-no-boolean-transform';

var getAllProperties = function(obj) {
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

exports.extend = function(extensible, extending) {
  var props = getAllProperties(extending);
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    if (!(prop in extensible)) {
      var val = extending[prop];
      extensible[prop] = val;
    }
  }
};

var elementHasNoBooleanTransformAttribute = function(el) {
  var foundAttribute = false;
  for (var i = 0; i < el.attributes.length; i++) {
    var attribute = el.attributes[i];
    if (attribute.name === noBooleanTransformName) {
      foundAttribute = true;
      break;
    }
  }
  return foundAttribute;
};

exports.getProps = function(el) {
  var props = {};
  var noBooleanTransforms = elementHasNoBooleanTransformAttribute(el);

  for (var i = 0; i < el.attributes.length; i++) {
    var attribute = el.attributes[i];
    if (attribute.name === noBooleanTransformName) continue;

    var name = exports.attributeNameToPropertyName(attribute.name);
    props[name] = exports.parseAttributeValue(attribute.value, {
      noBooleanTransforms: noBooleanTransforms,
    });
  }

  props.container = el;

  return props;
};

exports.getterSetter = function(
  variableParent,
  variableName,
  getterFunction,
  setterFunction
) {
  if (Object.defineProperty) {
    Object.defineProperty(variableParent, variableName, {
      get: getterFunction,
      set: setterFunction,
    });
  } else if (document.__defineGetter__) {
    variableParent.__defineGetter__(variableName, getterFunction);
    variableParent.__defineSetter__(variableName, setterFunction);
  }

  variableParent['get' + variableName] = getterFunction;
  variableParent['set' + variableName] = setterFunction;
};

exports.attributeNameToPropertyName = function(attributeName) {
  return attributeName
    .replace(/^(x|data)[-_:]/i, '')
    .replace(/[-_:](.)/g, function(x, chr) {
      return chr.toUpperCase();
    });
};

exports.parseAttributeValue = function(value, transformOptions) {
  if (!value) {
    return null;
  }

  if (!transformOptions) {
    transformOptions = {};
  }

  // Support attribute values with newlines
  value = value.replace(/[\n\r]/g, '');

  var pointerRegexp = /^{.*?}$/i,
    jsonRegexp = /^{{2}.*}{2}$/,
    jsonArrayRegexp = /^{\[.*\]}$/;

  var pointerMatches = value.match(pointerRegexp),
    jsonMatches = value.match(jsonRegexp) || value.match(jsonArrayRegexp);

  if (jsonMatches) {
    value = JSON.parse(jsonMatches[0].replace(/^{|}$/g, ''));
  } else if (pointerMatches) {
    value = eval(pointerMatches[0].replace(/[{}]/g, ''));
  } else if (
    (value === 'true' || value === 'false') &&
    !transformOptions.noBooleanTransforms
  ) {
    // convert the value to its actual boolean
    value = value === 'true';
  }

  return value;
};

exports.getChildren = function(el) {
  var fragment = document.createDocumentFragment();
  while (el.childNodes.length) {
    fragment.appendChild(el.childNodes[0]);
  }
  return fragment;
};

exports.shallowCopy = function(a, b) {
  for (var key in b) a[key] = b[key];
  return a;
};
