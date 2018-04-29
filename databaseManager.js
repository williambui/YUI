'use strict';

const uuidV1 = require('uuid/v1');
const AWS = require('aws-sdk');
const {promisify} = require('es6-promisify');
const _ = require('lodash');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.saveBirthdayToDatabase = function(name, birthday) {
  console.log('saveBirthdayToDatabase');
  console.log(name + ' ' + birthday);

  const item = {};
  item.id = uuidV1();
  item.name = name;
  item.birthday = birthday;

  const params = {
    TableName: 'birthday-table',
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
