'use strict'

const lexResponses = require('./lexResponses');

module.exports = function(intentRequest, callback) {
  var firstName = intentRequest.currentIntent.slots.FirstName;
  var lastName = intentRequest.currentIntent.slots.LastName;
  var birthday = intentRequest.currentIntent.slots.Birthday;

  console.log(firstName + " " + lastName + " " + birthday);

  const source = intentRequest.invocationSource;
  if (source === "DialogCodeHook") {
    callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    return;
  }
}
