'use strict'

const lexResponses = require('./lexResponses');

module.exports = function(intentRequest, callback) {
  const source = intentRequest.invocationSource;
  if (source === "DialogCodeHook") {
    callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    return;
  }
}
