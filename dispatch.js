'use strict';

const addBirthday = require('./addBirthday');
const getBirthday = require('./getBirthday');
const getAllBirthdays = require('./getAllBirthdays');
const deleteBirthday = require('./deleteBirthday');
const clearBirthdays = require('./clearBirthdays');
const addTask = require('./addTask');
const getAllTasks = require('./getAllTasks');
const clearTasks = require('./clearTasks');
const addWorkout = require('./addWorkout');
const getAllWorkouts = require('./getAllWorkouts');
const clearWorkouts = require('./clearWorkouts');
const updateWorkout = require('./updateWorkout');
const updateProfile = require('./updateProfile');
const getProfile = require('./getProfile');
const greeting = require('./greeting');

module.exports = function(intentRequest, callback) {
  console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
  const intentName = intentRequest.currentIntent.name;

  if (intentName === 'UpdateProfile') {
    console.log(intentName + ' was called');
    return updateProfile(intentRequest, callback);
  }

  if (intentName === 'GetProfile') {
    console.log(intentName + ' was called');
    return getProfile(intentRequest, callback);
  }

  if (intentName === 'Greeting') {
    console.log(intentName + ' was called');
    return greeting(intentRequest, callback);
  }

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

  if (intentName === 'GetToDo') {
    console.log(intentName + 'was called');
    return getAllTasks(intentRequest, callback);
  }

  if (intentName === 'ClearToDo') {
    console.log(intentName + ' was called');
    return clearTasks(intentRequest, callback);
  }

  if (intentName === 'AddWorkout') {
    console.log(intentName + ' was called');
    return addWorkout(intentRequest, callback);
  }

  if (intentName === 'GetAllWorkouts') {
    console.log(intentName + 'was called');
    return getAllWorkouts(intentRequest, callback);
  }

  if (intentName === 'ClearWorkouts') {
    console.log(intentName + ' was called');
    return clearWorkouts(intentRequest, callback);
  }

  if (intentName === 'UpdateWorkout') {
    console.log(intentName + 'was called');
    return updateWorkout(intentRequest, callback);
  }

  throw new Error(`Intent with name ${intentName} not supported`);
};
