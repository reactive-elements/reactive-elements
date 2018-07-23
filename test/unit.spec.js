var ReactiveElements = require('../dist/reactive-elements');

describe('utils', function() {
  window.items = {
    city: 'Amsterdam',
    weather: 'rainy',
  };

  describe('.parseAttributeValue', function() {
    it('should map 5 attribute to 5', function() {
      expect(ReactiveElements.utils.parseAttributeValue('5')).toEqual('5');
    });

    it('should convert {window.items} attribute to pointer', function() {
      expect(
        ReactiveElements.utils.parseAttributeValue('{window.items}')
      ).toEqual(window.items);
    });

    it('should convert JSON object literal string to JSON object', function() {
      var jsonSerialized = '{{"status": "active", "language": "javascript"}}',
        jsonDeserialized = ReactiveElements.utils.parseAttributeValue(
          jsonSerialized
        );
      expect(jsonDeserialized.status).toEqual('active');
      expect(jsonDeserialized.language).toEqual('javascript');
    });

    it('should pass through the empty string', function() {
      var emptyStringAttr = ReactiveElements.utils.parseAttributeValue('');
      expect(emptyStringAttr).toEqual('');
    });

    it("should convert string 'true' to boolean", function() {
      var boolAttr = ReactiveElements.utils.parseAttributeValue('true');
      expect(boolAttr).toEqual(true);
    });

    it("should convert string 'false' to boolean", function() {
      var boolAttr = ReactiveElements.utils.parseAttributeValue('false');
      expect(boolAttr).toEqual(false);
    });

    it('should not convert string booleans when it is disabled', function() {
      var boolAttr = ReactiveElements.utils.parseAttributeValue('false', {
        noBooleanTransforms: true,
      });
      expect(boolAttr).toEqual('false');
    });

    it('should convert JSON array literal string to JSON object', function() {
      var jsonSerialized = '{["language", "javascript"]}',
        jsonDeserialized = ReactiveElements.utils.parseAttributeValue(
          jsonSerialized
        );
      expect(jsonDeserialized[0]).toEqual('language');
      expect(jsonDeserialized[1]).toEqual('javascript');
    });
    it('should not replace single quotes in json', function() {
      var jsonSerialized =
          '{{"status": "I\'m active", "language": "I\'m javascript"}}',
        jsonDeserialized = ReactiveElements.utils.parseAttributeValue(
          jsonSerialized
        );
      expect(jsonDeserialized.status).toEqual("I'm active");
      expect(jsonDeserialized.language).toEqual("I'm javascript");
    });
  });

  describe('.attributeNameToPropertyName', function() {
    var ATTRIBUTE_NAME_DELIMITERS = ['-', '_', ':'];

    ATTRIBUTE_NAME_DELIMITERS.forEach(function(delimiter) {
      it('should convert general attributes to React properties', function() {
        expect(
          ReactiveElements.utils.attributeNameToPropertyName(
            'attribute' + delimiter + 'test'
          )
        ).toEqual('attributeTest');
        expect(
          ReactiveElements.utils.attributeNameToPropertyName(
            'attribute' + delimiter + 'test' + delimiter + 'long'
          )
        ).toEqual('attributeTestLong');
      });

      it(
        "should convert attributes prefixed with 'x" +
          delimiter +
          "' to React properties",
        function() {
          expect(
            ReactiveElements.utils.attributeNameToPropertyName(
              'x' + delimiter + 'attribute'
            )
          ).toEqual('attribute');
          expect(
            ReactiveElements.utils.attributeNameToPropertyName(
              'x' + delimiter + 'attribute' + delimiter + 'test'
            )
          ).toEqual('attributeTest');
        }
      );

      it(
        "should convert attributes prefixed with 'data" +
          delimiter +
          "' to React properties",
        function() {
          expect(
            ReactiveElements.utils.attributeNameToPropertyName(
              'data' + delimiter + 'attribute'
            )
          ).toEqual('attribute');
          expect(
            ReactiveElements.utils.attributeNameToPropertyName(
              'data' + delimiter + 'attribute' + delimiter + 'test'
            )
          ).toEqual('attributeTest');
        }
      );

      it(
        "should convert attributes containing 'x" +
          delimiter +
          "' not as a prefix to React properties",
        function() {
          expect(
            ReactiveElements.utils.attributeNameToPropertyName(
              'max' + delimiter + 'attribute'
            )
          ).toEqual('maxAttribute');
        }
      );

      it(
        "should convert attributes containing 'data" +
          delimiter +
          "' not as a prefix to React properties",
        function() {
          expect(
            ReactiveElements.utils.attributeNameToPropertyName(
              'attribute' + delimiter + 'data' + delimiter + 'test'
            )
          ).toEqual('attributeDataTest');
        }
      );
    });
  });
});
