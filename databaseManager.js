'use strict';

const uuidV1 = require('uuid/v1');
const AWS = require('aws-sdk');
const {promisify} = require('es6-promisify');
const _ = require('lodash');
const dynamo = new AWS.DynamoDB.DocumentClient();
const lexResponses = require('./lexResponses');

module.exports.saveBirthdayToDatabase = function(name, birthday) {
  console.log('saveBirthdayToDatabase');
  console.log(name + ' ' + birthday);

  const item = {};
  item.name = name;
  item.birthday = birthday;

  const params = {
    TableName: 'birthday-list',
    Item: item
  };

  dynamo.put(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });

  return item;
}

module.exports.getBirthdayFromDatabase = function(intentRequest, callback, name) {
  console.log('getBirthdayFromDatabase');

  const params = {
    TableName: 'birthday-list',
    Key: {
      "name": name
    },
    ProjectionExpression: "birthday"
  };

  dynamo.get(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
      return;
    } else {
      if (data.Item === undefined) {
        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: "Not Found"}));
      } else {
        console.log("Success", data.Item);
        var text = name + '\'s birthday is:\n ' + data.Item.birthday;
        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: text}));
      }
      return;
    }
  });
}

module.exports.getAllBirthdaysFromDatabase = function(intentRequest, callback) {
  console.log('getAllBirthdaysFromDatabase');

  const params = {
    TableName: 'birthday-list',
    ProjectionExpression: "#nme, birthday",
    ExpressionAttributeNames: {
      "#nme": "name"
    }
  };

  dynamo.scan(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
      return;
    } else {
      if (data.Items === null) {
        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: "No Birthdays Found"}));
      } else {
        console.log("Success", data.Items);
        var text = 'Here\'s all the birthdays:\n ';
        data.Items.forEach(function(item) {
          console.log(item.name + ": ", item.birthday);
          text += item.name + ": " + item.birthday + "\n";
        });
        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: text}));
      }
      return;
    }
  });
}

module.exports.deleteBirthdayFromDatabase = function(name) {
  console.log('deleteBirthdayFromDatabase');

  const params = {
    TableName: 'birthday-list',
    Key: {
      "name": name
    },
  };

  dynamo.delete(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}

module.exports.clearBirthdaysFromDatabase = function(intentRequest, callback) {
  console.log('getAllBirthdaysFromDatabase');

  const params = {
    TableName: 'birthday-list',
    ProjectionExpression: "#nme, birthday",
    ExpressionAttributeNames: {
      "#nme": "name"
    }
  };

  dynamo.scan(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
      return;
    } else {
      if (data.Items === null) {
        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: "No Birthdays Found"}));
      } else {
        console.log("Success", data.Items);
        var text = 'Birthdays cleared';
        data.Items.forEach(function(item) {
          const p2 = {
            TableName: 'birthday-list',
            Key: {
              "name": item.name
            },
          };

          dynamo.delete(p2, function(err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
            }
          });
        });
        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: text}));
      }
      return;
    }
  });
}

module.exports.addTaskToDatabase = function(task) {
  console.log('addTaskToDatabase');

  const item = {};
  item.task = task;

  const params = {
    TableName: 'todo-list',
    Item: item
  };

  dynamo.put(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });

  return item;
}
