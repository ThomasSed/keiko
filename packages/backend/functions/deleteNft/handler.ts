import { NFTEntity } from "libs/dynamodb-toolbox/nftEntity";
import { DeleteItemOutput } from "@aws-sdk/client-dynamodb";

export const main = async (event: { pathParameters: { id: string }}): Promise<Omit<DeleteItemOutput, "Attributes">> => {
  
  // Load the AWS SDK for Node.js
  var AWS = require('aws-sdk');
  // Set the region 
  AWS.config.update({region: 'eu-west-1'});

  // Create DynamoDB document client
  var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

  var params = {
    Key: {
      'HASH_KEY': event.pathParameters.id
    },
    TableName: process.env.NFT_TABLE_NAME
  };

  docClient.delete(params, function(err: any, data: any) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  })
    
  return NFTEntity.delete( {id: event.pathParameters.id} )
}
