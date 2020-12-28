'use strict';
const AWS = require('aws-sdk');   
//Request Module to make HTTP Request to ReCapcha api                                               
const request = require('request');

const docClient = new AWS.DynamoDB.DocumentClient({region: 'ap-south-1'});     //Change Region

exports.handler = function(event, context, callback) {       
    console.log('[INFO]:'+ event);              //Log event                       
    
    const secret_key = '#####CHANGEME#####';              //Secret key of recapcha
    const token = event.recaptcha;                                              //clien side token 
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;  //recapcha api url

    //DynamoDB Parameters 
    var params = {                                                               
        Item: {
            Id: event.c_email,                     //Sort Key                                   
            c_fullname: event.c_fullname,                                               
            c_phone: event.c_phone,                                                   
            c_email: event.c_email,  
            submittedAt: new Date().getTime(),
        },
        TableName: 'formtable'      //Change table name                                        
    };
    request(url,function(error,response,body) {
      var dbody = JSON.parse(body);
  
      if(dbody.success == true){                            //captcha successful verification 
          console.log('[INFO]:captcha Sucess');

        //dynamo start
            docClient.put(params, function(err, data){                                  
                if(err){
                    callback(err, null);
                }else{
                    const responses = {
                        statusCode: 200,
                            headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Credentials': true,
                                    },
                            body: `Thank You ${c_fullname}`,
                                    };
                    callback(null, responses.body);
                }
            });
      }else{
          console.log('[WARNING]: Failed captcha verification');
          console.log('[ERROR]:'+error);
      }
      
    });
};
