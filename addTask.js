 'use strict'

const lexResponses = require('./lexResponses');
const databaseManager = require('./databaseManager');

module.exports = function(intentRequest, callback) {
  var task = intentRequest.currentIntent.slots.TaskInput;
  console.log(task);

  const source = intentRequest.invocationSource;
  if (source === "DialogCodeHook") {
    callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    return;
  }

  if (source === "FulfillmentCodeHook") {
    console.log('FulfillmentCodeHook');

    databaseManager.addTaskToDatabase(task);
    var text = 'Okay, I added \"' + task + '\" to your to-do list.';
    callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: text}));
    return;
  }
}
