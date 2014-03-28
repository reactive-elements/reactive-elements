(function (w) {
    if (w.xtag === undefined) return;

    var propertiesMapping = {
        'class': 'className',
        'onclick': 'onClick',
        'onmousedown': 'onMouseDown'
    };

    var extend = function (extandable, extending) {
        for (var i in extending) {
            if (extandable[i] === undefined) {

                if (typeof extending[i] === 'function') {
                    extandable[i] = extending[i].bind(extending);
                } else {
                    extandable[i] = extending[i];
                }
            }
        }
    }

    var getPropertiesFromAttributes = function (attributes) {
        var result = {};

        for (var i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];

            result[attribute.name] = parseAttributeValue(attributes[i].value);
        }
        return result;
    };

    var parseAttributeValue = function (value) {
        var regexp = /\{.*?\}/g;
        var matches = value.match(regexp);

        if (matches !== null && matches !== undefined && matches.length > 0) {
            value = eval(matches[0].replace('{', '').replace('}', ''));
        }

        return value;
    }

    w.xtag.registerReact = function (elementName, reactClass) {
        var reactiveElement = this.reactiveElement = {};

        w.xtag.register(elementName, {
            extends: 'div',
            lifecycle: {
                created: function () {
                    reactiveElement = new reactClass(getPropertiesFromAttributes(this.attributes));
                    extend(this, reactiveElement);
                    getterSetter(this, 'props', function(){ return reactiveElement.props; }, function(value){ reactiveElement.props = value; })
                    React.renderComponent(reactiveElement, this);
                },
                attributeChanged: function () {
                    reactiveElement.props = getPropertiesFromAttributes(this.attributes);
                    reactiveElement.forceUpdate();
                }
            }
        })
    };
})(window)

function getterSetter(variableParent, variableName, getterFunction, setterFunction){
    if (Object.defineProperty)
    {
        Object.defineProperty(variableParent, variableName, {
            get: getterFunction,
            set: setterFunction
        });
    }
    else if (document.__defineGetter__)
    {
        variableParent.__defineGetter__(variableName, getterFunction);
        variableParent.__defineSetter__(variableName, setterFunction);
    }

    variableParent["get" + variableName] = getterFunction;
    variableParent["set" + variableName] = setterFunction;
}