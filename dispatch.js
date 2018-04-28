'use strict';

const addTask = require('./addTask');

module.exports = function(intentRequest, callback) {
  console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
  const intentName = intentRequest.currentIntent.name;

  if (intentName === 'AddTaskInToDo') {
    console.log(intentName + ' was called');
    return addTask(intentRequest, callback);
  }

  throw new Error(`Intent with name ${intentName} not supported`);
};
