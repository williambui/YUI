'use strict'

const lexResponses = require('./lexResponses');
const databaseManager = require('./databaseManager');

function fulfillBirthday(name, birthday) {
  console.log('fulfillBirthday ' + name + ' ' + birthday);

  var item = databaseManager.saveBirthdayToDatabase(name, birthday);
  console.log(item.id);
}

module.exports = function(intentRequest, callback) {
  var birthday = intentRequest.currentIntent.slots.Birthday;
  var name = intentRequest.currentIntent.slots.Name;
  console.log(birthday);

  const source = intentRequest.invocationSource;
  if (source === "DialogCodeHook") {
    callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    return;
  }

  if (source === "FulfillmentCodeHook") {
    console.log('FulfillmentCodeHook');

    fulfillBirthday(name, birthday);
    var text = 'Ok! ' + name + '\'s birthday, ' + birthday + ', was added.';
    callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: text}));
    return;
  }
}
