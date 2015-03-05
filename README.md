valid
=====

A validator
###Installation

```npm install git://github.com/scrollback/valid.git#v0.0.1```

##Usage

### creating new Object
``` javascript 
var valid = require('valid')();
```

### functions
1. ***valid.registerType(name, validatorFunction)***: To add new type to the valid object.
  E.g: 
```javascript
valid.registerType('id', function(object) {
  return typeof object === 'string' && object.length && object.length === 32;
});

```
2. ***valid.registerGlobalType(name, validatorFunction)*** : Register new type to global memory of validator.
3. ***valid.validate(object, validator)***: validate ```object``` using ```validator``` Object.

### validation 
Creating a validation object.
e.g:
``` javascript
var validator = {
        ref: ['string', 'undefined'],
        id: ['undefined', 'string'],
        type: ['nonEmptyString'],
        to: [function(object) {
          return typeof object !== "undefined";
        }],
        time: ['undefined', 'number'],
        session: ['string'],
        resource: ['undefined', 'string'],
        origin: ['strictObject', 'undefined', {
          //anothor validation object(recursive)
        }]
    };
```
Each key of validation object is an array with a new validation objects, predefined global types, newly added types and functions.
To validate an object against validator object.
``` javascript 
var result = valid.validate(object, validator); 
```
It will return an object of type Result:
```javascript
{ 
  status: true | false,
  info: 'string'
}
```

