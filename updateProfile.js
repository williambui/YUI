'use strict'

const lexResponses = require('./lexResponses');
const databaseManager = require('./databaseManager');

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

  if (source === "FulfillmentCodeHook") {
    console.log('FulfillmentCodeHook');

    databaseManager.updateProfileFromDatabase(firstName, lastName, birthday);
    var text = 'Profile Updated!';
    callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: text}));
    return;
  }
}
