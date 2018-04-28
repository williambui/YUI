'use strict'

const lexResponses = require('./lexResponses');

module.exports = function(intentRequest, callback) {
  var task = intentRequest.currentIntent.slots.TaskInput;
  console.log(task);

  const source = intentRequest.invocationSource;
  if (source === "DialogCodeHook") {
    callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    return;
  }
}
