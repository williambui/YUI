'use strict'

const lexResponses = require('./lexResponses');
const databaseManager = require('./databaseManager');

module.exports = function(intentRequest, callback) {
 var workout = intentRequest.currentIntent.slots.Workout;
 var weight = intentRequest.currentIntent.slots.Weight;

 console.log(workout + ": " + weight);

 const source = intentRequest.invocationSource;
 if (source === "DialogCodeHook") {
   callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
   return;
 }

 if (source === "FulfillmentCodeHook") {
   console.log('FulfillmentCodeHook');

   databaseManager.addWorkoutToDatabase(workout, weight);
   var text = 'Okay, I added the workout \"' + workout + '\".';
   callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: text}));
   return;
 }
}
