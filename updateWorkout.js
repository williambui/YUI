'use strict'

const lexResponses = require('./lexResponses');
const databaseManager = require('./databaseManager');

module.exports = function(intentRequest, callback) {
 var workout = intentRequest.currentIntent.slots.Workout;
 var weight = intentRequest.currentIntent.slots.Weight;

 console.log(workout);

 const source = intentRequest.invocationSource;
 if (source === "DialogCodeHook") {
   callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
   return;
 }

 if (source === "FulfillmentCodeHook") {
   console.log('FulfillmentCodeHook');

   databaseManager.updateWorkoutFromDatabase(workout, weight);
   var text = 'Okay, I updated \"' + workout + '\" with the weight ' + weight;
   callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: text}));
   return;
 }
}
