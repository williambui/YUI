'use strict';

module.exports.delegate = function(sessionAttributes, slots) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Delegate',
      slots
    }
  };
};

module.exports.close = function(sessionAttributes, fulfillmentState, message) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Close',
      fulfillmentState,
      message
    }
  };
};
