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
        it("should convert general attributes to React properties", function(){
            expect(window.ReactiveElements.utils.attributeNameToPropertyName('attribute-test')).toEqual('attributeTest');
            expect(window.ReactiveElements.utils.attributeNameToPropertyName('attribute-test-long')).toEqual('attributeTestLong');
        });

        it("should convert attributes prefixed with 'x-' to React properties", function(){
            expect(window.ReactiveElements.utils.attributeNameToPropertyName('x-attribute')).toEqual('attribute');
            expect(window.ReactiveElements.utils.attributeNameToPropertyName('x-attribute-test')).toEqual('attributeTest');
        });

        it("should convert attributes prefixed with 'data-' to React properties", function(){
            expect(window.ReactiveElements.utils.attributeNameToPropertyName('data-attribute')).toEqual('attribute');
            expect(window.ReactiveElements.utils.attributeNameToPropertyName('data-attribute-test')).toEqual('attributeTest');
        });

        it("should convert attributes containing 'x-' not as a prefix to React properties", function(){
            expect(window.ReactiveElements.utils.attributeNameToPropertyName('max-attribute')).toEqual('maxAttribute');
        });

        it("should convert attributes containing 'data-' not as a prefix to React properties", function(){
            expect(window.ReactiveElements.utils.attributeNameToPropertyName('attribute-data')).toEqual('attributeData');
        });
    });
});
