describe("utils", function() {
    window.items = {
        'city': 'Amsterdam',
        'weather': 'rainy'
    };

    describe(".parseAttributeValue", function(){
        it("should map 5 attribute to 5", function() {
            expect(window.ReactiveElements.utils.parseAttributeValue('5')).toEqual('5');
        });

        it("should convert {window.items} attribute to pointer", function() {
            expect(window.ReactiveElements.utils.parseAttributeValue('{window.items}')).toEqual(window.items);
        });

        it("should convert JSON object literal string to JSON object", function(){
            var jsonSerialized = "{{\"status\": \"active\", \"language\": \"javascript\"}}",
                jsonDeserialized = window.ReactiveElements.utils.parseAttributeValue(jsonSerialized);
            expect(jsonDeserialized.status).toEqual('active');
            expect(jsonDeserialized.language).toEqual('javascript');
        });

        it("should convert JSON array literal string to JSON object", function(){
            var jsonSerialized = "{[\"language\", \"javascript\"]}",
                jsonDeserialized = window.ReactiveElements.utils.parseAttributeValue(jsonSerialized);
            expect(jsonDeserialized[0]).toEqual('language');
            expect(jsonDeserialized[1]).toEqual('javascript');
        });
    });

    describe(".attributeNameToPropertyName", function(){
        var ATTRIBUTE_NAME_DELIMITERS =  ['-', '_', ':']

        ATTRIBUTE_NAME_DELIMITERS.forEach(function(delimiter) {
            it("should convert general attributes to React properties", function(){
                expect(window.ReactiveElements.utils.attributeNameToPropertyName('attribute' + delimiter + 'test')).toEqual('attributeTest');
                expect(window.ReactiveElements.utils.attributeNameToPropertyName('attribute' + delimiter + 'test' + delimiter + 'long')).toEqual('attributeTestLong');
            });

            it("should convert attributes prefixed with 'x" + delimiter + "' to React properties", function(){
                expect(window.ReactiveElements.utils.attributeNameToPropertyName('x' + delimiter + 'attribute')).toEqual('attribute');
                expect(window.ReactiveElements.utils.attributeNameToPropertyName('x' + delimiter + 'attribute' + delimiter + 'test')).toEqual('attributeTest');
            });

            it("should convert attributes prefixed with 'data" + delimiter + "' to React properties", function(){
                expect(window.ReactiveElements.utils.attributeNameToPropertyName('data' + delimiter + 'attribute')).toEqual('attribute');
                expect(window.ReactiveElements.utils.attributeNameToPropertyName('data' + delimiter + 'attribute' + delimiter + 'test')).toEqual('attributeTest');
            });

            it("should convert attributes containing 'x" + delimiter + "' not as a prefix to React properties", function(){
                expect(window.ReactiveElements.utils.attributeNameToPropertyName('max' + delimiter + 'attribute')).toEqual('maxAttribute');
            });

            it("should convert attributes containing 'data" + delimiter + "' not as a prefix to React properties", function(){
                expect(window.ReactiveElements.utils.attributeNameToPropertyName('attribute' + delimiter + 'data' + delimiter + 'test')).toEqual('attributeDataTest');
            });
        });
    });
});
