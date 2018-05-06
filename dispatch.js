'use strict';

const addBirthday = require('./addBirthday');
const getBirthday = require('./getBirthday');
const getAllBirthdays = require('./getAllBirthdays');
const deleteBirthday = require('./deleteBirthday');
const clearBirthdays = require('./clearBirthdays');
const addTask = require('./addTask');
const greeting = require('./greeting');
const updateProfile = require('./updateProfile');

module.exports = function(intentRequest, callback) {
  console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
  const intentName = intentRequest.currentIntent.name;

  if (intentName === 'AddBirthday') {
    console.log(intentName + 'was called');
    return addBirthday(intentRequest, callback);
  }

  if (intentName === "GetBirthday") {
    console.log(intentName + 'was called');
    return getBirthday(intentRequest, callback);
  }

  if (intentName === "GetAllBirthdays") {
    console.log(intentName + 'was called');
    return getAllBirthdays(intentRequest, callback);
  }

  if (intentName === "DeleteBirthday") {
    console.log(intentName + 'was called');
    return deleteBirthday(intentRequest, callback);
  }

  if (intentName === "clearBirthdays") {
    console.log(intentName + 'was called');
    return clearBirthdays(intentRequest, callback);
  }

  if (intentName === 'AddTaskInToDo') {
    console.log(intentName + ' was called');
    return addTask(intentRequest, callback);
  }

  if (intentName === 'Greeting') {
    console.log(intentName + ' was called');
    return greeting(intentRequest, callback);
  }

  if (intentName === 'UpdateProfile') {
    console.log(intentName + ' was called');
    return updateProfile(intentRequest, callback);
  }

  throw new Error(`Intent with name ${intentName} not supported`);
};
