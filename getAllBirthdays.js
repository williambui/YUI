'use strict'

const lexResponses = require('./lexResponses');
const databaseManager = require('./databaseManager');

module.exports = function(intentRequest, callback) {
  const source = intentRequest.invocationSource;
  if (source === "DialogCodeHook") {
    callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    return;
  }

  if (source === "FulfillmentCodeHook") {
    console.log('FulfillmentCodeHook');
    databaseManager.getAllBirthdaysFromDatabase(intentRequest, callback);
  }
}
