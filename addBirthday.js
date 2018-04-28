'use strict'

const lexResponses = require('./lexResponses');

module.exports = function(intentRequest, callback) {
  var birthday = intentRequest.currentIntent.slots.Birthday;
  console.log(birthday);

  const source = intentRequest.invocationSource;
  if (source === "DialogCodeHook") {
    callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    return;
  }
}
