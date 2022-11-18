const { v4 } = require('uuid')
const AWS = require('aws-sdk');


const addTask = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
  
    const { title, description } = JSON.parse(event.body);
    const createdAt = new Date().toUTCString();
    const id = v4();
  

    console.log(title +"@@♠4@"+description)
    const newTask = {
      id,
      title:title,
      description:description,
      createdAt,
      done: false,
    };
  
    await dynamodb
      .put({
        TableName: "TaskTable",
        Item: newTask,
      })
      .promise();
  
    return {
      status: 200,
      body: JSON.stringify(newTask),
    };
  };

module.exports = {
    addTask,
};