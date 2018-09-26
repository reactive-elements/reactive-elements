import * as React from 'react';
const noBooleanTransformName = 'reactive-elements-no-boolean-transform';

function getAllProperties(obj) {
  const props = {};
  while (obj && obj !== React.Component.prototype && obj !== Object.prototype) {
    var propNames = Object.getOwnPropertyNames(obj);
    for (var i = 0; i < propNames.length; i++) {
      props[propNames[i]] = null;
    }
    obj = Object.getPrototypeOf(obj);
  }
  delete props.constructor;
  return Object.keys(props);
}

function extend(extensible, extending) {
  const props = getAllProperties(extending);
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    if (!(prop in extensible)) {
      var val = extending[prop];
      extensible[prop] = val;
    }
  }
}

function elementHasNoBooleanTransformAttribute(el) {
  let foundAttribute = false;
  for (var i = 0; i < el.attributes.length; i++) {
    var attribute = el.attributes[i];
    if (attribute.name === noBooleanTransformName) {
      foundAttribute = true;
      break;
    }
  }
  return foundAttribute;
}

function getProps(el) {
  const props = {};
  const noBooleanTransforms = elementHasNoBooleanTransformAttribute(el);

  for (var i = 0; i < el.attributes.length; i++) {
    var attribute = el.attributes[i];
    if (attribute.name === noBooleanTransformName) continue;

    var name = attributeNameToPropertyName(attribute.name);
    props[name] = parseAttributeValue(attribute.value, {
      noBooleanTransforms: noBooleanTransforms,
    });
  }

  props.container = el;

  return props;
}

function getterSetter(
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
}

function attributeNameToPropertyName(attributeName) {
  return attributeName
    .replace(/^(x|data)[-_:]/i, '')
    .replace(/[-_:](.)/g, function(x, chr) {
      return chr.toUpperCase();
    });
}

function parseAttributeValue(value, transformOptions) {
  if (value == undefined) {
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
}

function getChildren(el) {
  const fragment = document.createDocumentFragment();
  while (el.childNodes.length) {
    fragment.appendChild(el.childNodes[0]);
  }
  return fragment;
}

function shallowCopy(a, b) {
  for (const key in b) a[key] = b[key];
  return a;
}

export {
  getAllProperties,
  extend,
  elementHasNoBooleanTransformAttribute,
  getProps,
  getterSetter,
  attributeNameToPropertyName,
  parseAttributeValue,
  getChildren,
  shallowCopy,
};
