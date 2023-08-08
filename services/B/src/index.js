import 'dotenv/config'
import { Consumer } from 'sqs-consumer';
import { SQSClient } from '@aws-sdk/client-sqs';

const app = Consumer.create({
    sqs: new SQSClient({
        region: 'us-east-1',
        endpoint: 'http://localhost:4566',
        credentials: {
          accessKeyId: '123',
          secretAccessKey: '123'
        }
    }),
    queueUrl: process.env.QUEUE_URL,
    handleMessage: async (message) => {
      try {
        const parsedMessage = JSON.parse(message?.Body ?? '{}');

        const event = {
          id: parsedMessage.MessageId,
          publishedAt: parsedMessage.Timestamp,
          ...JSON.parse(parsedMessage?.Message ?? '{}'),
        };

        console.log('[*] Event received:', event);
      } catch(error) {
        console.log('Error parsing message', error);
      }
    }
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();
console.log('Listening for messages...');