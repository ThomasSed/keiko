import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import crypto from "crypto"

export const main = async (event: any): Promise<any> => {
    const randomIntFromInterval = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);	

    const id = crypto.randomUUID()

    const Item = {
        PK: { S: 'Nft' },
        SK: { S: id },
        id: { S : id },
        positionx: { N: randomIntFromInterval(10, 90).toString() },
        positiony: { N: randomIntFromInterval(10, 90).toString() },
        imageIndex: { N: Math.floor(Math.random() * 5).toString() },
    }
    const params = {
        TableName:process.env.NFT_TABLE_NAME,
        Item
    }

    // enreg bdd
    const client = new DynamoDBClient({region: 'eu-west-1'})
    const command = new PutItemCommand(params)
    await client.send(command)
    
    return Item
}