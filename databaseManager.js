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
        var text = name + '\'s birthday is:\n' + data.Item.birthday;
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
        var text = 'Here\'s all the birthdays:\n';
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
  console.log('clearBirthdaysFromDatabase');

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
}

module.exports.getAllTasksFromDatabase = function(intentRequest, callback) {
  console.log('getAllTasksFromDatabase');

  const params = {
    TableName: 'todo-list',
    ProjectionExpression: "task"
  };

  dynamo.scan(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
      return;
    } else {
      if (data.Items === null) {
        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: "No Tasks Found"}));
      } else {
        console.log("Success", data.Items);
        var text = 'Here\'s your to-do list:\n';
        data.Items.forEach(function(item) {
          console.log(item.task);
          text += item.task + "\n";
        });
        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: text}));
      }
      return;
    }
  });
}

module.exports.clearTasksFromDatabase = function(intentRequest, callback) {
  console.log('clearTasksFromDatabase');

  const params = {
    TableName: 'todo-list',
    ProjectionExpression: "task"
  };

  dynamo.scan(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
      return;
    } else {
      if (data.Items === null) {
        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: "No Tasks Found"}));
      } else {
        console.log("Success", data.Items);
        var text = 'To-do list cleared';
        data.Items.forEach(function(item) {
          const p2 = {
            TableName: 'todo-list',
            Key: {
              "task": item.task
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

module.exports.addWorkoutToDatabase = function(workout, weight) {
  console.log('addWorkoutToDatabase');

  const item = {};
  item.workout = workout;
  item.weight = weight;

  const params = {
    TableName: 'workout-list',
    Item: item
  };

  dynamo.put(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}

module.exports.getAllWorkoutsFromDatabase = function(intentRequest, callback) {
  console.log('getAllWorkoutsFromDatabase');

  const params = {
    TableName: 'workout-list',
    ProjectionExpression: "workout, weight"
  };

  dynamo.scan(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
      return;
    } else {
      if (data.Items === null) {
        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: "No Workouts Found"}));
      } else {
        console.log("Success", data.Items);
        var text = 'Here\'s your workout list:\n';
        data.Items.forEach(function(item) {
          console.log(item.workout + ': ' + item.weight);
          text += item.workout + ': ' + item.weight + "\n";
        });

        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: text}));
      }
      return;
    }
  });
}

module.exports.clearWorkoutsFromDatabase = function(intentRequest, callback) {
  console.log('clearWorkoutsFromDatabase');

  const params = {
    TableName: 'workout-list',
    ProjectionExpression: "workout, weight"
  };

  dynamo.scan(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
      return;
    } else {
      if (data.Items === null) {
        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: "No Workouts Found"}));
      } else {
        console.log("Success", data.Items);
        var text = 'Workouts cleared';
        data.Items.forEach(function(item) {
          const p2 = {
            TableName: 'workout-list',
            Key: {
              "workout": item.workout
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

module.exports.updateWorkoutFromDatabase = function(workout, weight) {
  console.log('updateWorkoutFromDatabase');

  const params = {
    TableName: 'workout-list',
    Key: {
      "workout": workout,
    },
    UpdateExpression: "set weight = :w",
    ExpressionAttributeValues: {
      ":w": weight
    },
    ReturnValues: "UPDATED_NEW"
  };

  dynamo.update(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}

module.exports.updateProfileFromDatabase = function(firstName, lastName, birthday) {
  console.log('updateProfileFromDatabase');

  const param1 = {
    TableName: 'profile-list',
    Key: {
      "id": 1
    },
    ProjectionExpression: "id"
  };

  dynamo.get(param1, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      if (data.Item === undefined) {
        console.log('adding profile');

        const item = {};
        item.id = 1;
        item.firstName = firstName;
        item.lastName = lastName;
        item.birthday = birthday;

        const param2 = {
          TableName: 'profile-list',
          Item: item
        };

        dynamo.put(param2, function(err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            return;
          }
        });
      }
    }
  });

  const params = {
    TableName: 'profile-list',
    Key: {
      "id": 1,
    },
    UpdateExpression: "set firstName = :f, lastName = :l, birthday = :b",
    ExpressionAttributeValues: {
      ":f": firstName,
      ":l": lastName,
      ":b": birthday
    },
    ReturnValues: "UPDATED_NEW"
  };

  dynamo.update(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}

module.exports.getProfileFromDatabase = function(intentRequest, callback) {
  console.log('getProfileFromDatabase');

  const params = {
    TableName: 'profile-list',
    Key: {
      "id": 1
    },
    ProjectionExpression: "firstName, lastName, birthday"
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
        var text = data.Item.firstName + ' ' + data.Item.lastName + '\n' + data.Item.birthday;
        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: text}));
      }
      return;
    }
  });
}

module.exports.getFirstNameFromDatabase = function(intentRequest, callback) {
  console.log('getFirstNameFromDatabase');

  const params = {
    TableName: 'profile-list',
    Key: {
      "id": 1
    },
    ProjectionExpression: "firstName"
  };

  dynamo.get(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      callback(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
      return;
    } else {
      if (data.Item === undefined) {
        console.log("Success", data.Item);
        var text = 'Hi!';
        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: text}));
      } else {
        console.log("Success", data.Item);
        var text = 'Hey ' + data.Item.firstName + '!';
        callback(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', {contentType: 'PlainText', content: text}));
      }
      return;
    }
  });
}
