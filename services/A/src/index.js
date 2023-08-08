import 'dotenv/config'
import { SNSClient, PublishCommand} from "@aws-sdk/client-sns";

const client = new SNSClient({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
    credentials: {
        accessKeyId: '123',
        secretAccessKey: '123',
    },
});

export const publish = async (
    event,
  ) => {
    const response = await client.send(
      new PublishCommand({
        Message: JSON.stringify(event),
        TopicArn: process.env.APP_EVENTS_TOPIC_ARN,
      })
    );   
    return response;
  };
(() => {
    publish({
        type: 'MY_EVENT',
        payload: {
            entityId: '123'
        }
    });
})()
