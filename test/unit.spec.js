describe("utils", function() {
    window.items = {
        'city': 'Amsterdam',
        'weather': 'rainy'
    };

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