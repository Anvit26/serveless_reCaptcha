# serveless_reCaptcha
Architecture Diagram:-<br/>

![alt text](https://github.com/Anvit26/serveless_reCaptcha/blob/main/reCaptcha.png)


In this article we are not going to see how to create server-less web form,you can find about it [here](https://aws.amazon.com/blogs/architecture/create-dynamic-contact-forms-for-s3-static-websites-using-aws-lambda-amazon-api-gateway-and-amazon-ses/) . However,I will give glimpse of steps of AWS configuration.

<br/>
1) Create client side page and host it in s3.<br/>
2) Create dynamoDB table.<br/>
3) Create Lambda function with dynamoDB write policy.<br/>
4) Get Client Secret and Server Secret from reCaptcha service.<br/>
5) Past it in lambda code.<br/>
6) Create API Gateway with for Post request.<br/>
7) npm install request.<br/>
8) zip the lambda code and uplaod on lambda function.<br/>

<br/>
###Directory Structure<br/>
lambda/index.js --> This file has lambda code for which has reCaptcha verification, DynamoDB Put data.<br/>
index.html --> This file has client side JS and html code for transfering data to backend<br/>

[Article for understanding](https://medium.com/) 
