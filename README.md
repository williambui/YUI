# YUI
Your Universal Interface
389L AWS Spring 2018 Project

YUI is an interactive chatbot that will store and retrieve information. Current functions include putting, updating, deleting and getting: birthdays, to-do tasks, and workouts

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=3 orderedList=false} -->

### Overview
* YUI is an interactive chatbot that will store and retrieve information
* Amazon Lex, Connected to Slack
* YUI will validate and fulfill intents
* Intents include putting, getting, deleting, updating:
  * birthdays
  * to-do tasks
  * workouts
  
<!-- /code_chunk_output -->
### AWS Services:
* Lambda
* API Gateway
* Amazon Lex
* DynamoDB

### Video Demonstration:
https://www.useloom.com/share/797f0ab12f4b49ffa34f0b9b2eda5045 

### Architecture Diagram:
https://cloudcraft.co/view/e8c16e94-fd42-455e-85bb-2aa601d52716?key=BRcypBkTGFQD4bh0i-PYEQ

### Recreate this application:
1. Download the files by cloning this repository using git clone
2. Go into the directory using a terminal of your choice
3. Enter the "aws configure" command to set up your AWS CLI installation and enter your AWS credentials
4. Go to the AWS console and create a lambda function using Node.js 6.10 with triggers to DynamoDB and Cloudwatch Logs
5. Create a chatbot of your choice using Amazon Lex. All validation and fulfillment will use your lambda function.
6. Adjust the code to correlate to your intents
7. Use the "sls deploy" command to deploy the entire service via CloudFormation
8. Integrate Slack and Amazon Lex
