'use strict'

const lexResponses = require('./lexResponses');
const databaseManager = require('./databaseManager');

module.exports = function(intentRequest, callback) {
  var name = intentRequest.currentIntent.slots.Name;
  const source = intentRequest.invocationSource;
  if (source === "DialogCodeHook") {
    callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    return;
  }

  if (source === "FulfillmentCodeHook") {
    console.log('FulfillmentCodeHook');
    databaseManager.getBirthdayFromDatabase(intentRequest, callback, name);
  }
}
