(function (w) {
    if (w.xtag === undefined) return;

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
        w.xtag.register(elementName, {
            lifecycle: {
                created: function () {
                    this.reactiveElement = {};
                    this.reactiveElement = new reactClass(getPropertiesFromAttributes(this.attributes));
                    extend(this, this.reactiveElement);
                    getterSetter(this, 'props', function(){
                        return this.reactiveElement.props;
                    }, function(value){
                        this.reactiveElement.props = value;
                    });
                    React.renderComponent(this.reactiveElement, this);
                },
                accessors: {
                    'props': {
                        get: function(){
                            return this.reactiveElement.props;
                        },
                        set: function(newProps){
                            return this.reactiveElement.props = newProps;
                        }
                    }
                },
                attributeChanged: function () {
                    this.reactiveElement.props = getPropertiesFromAttributes(this.attributes);
                    this.reactiveElement.forceUpdate();
                }
            }
        });
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