import { messages } from 'elasticio-node';
import Client from '../Client';
import inSchema from '../schemas/actions/rawRequest.in.json';

const allowedMethods = inSchema.properties.method.enum;
let client: Client;

export async function processAction(msg, cfg) {
  this.logger.info('"Make Raw Request" action started');
  client ||= new Client(this, cfg);
  client.setLogger(this.logger);
  const { url, method, data } = msg.body;
  if (!allowedMethods.includes(method)) {
    throw new Error(`Method "${method}" is not supported! Supported methods are: ${JSON.stringify(allowedMethods)}`);
  }
  try {
    const response = await client.callHttpWrapper(method, url, data);
    this.logger.info('request is done, emitting...');
    return messages.newMessageWithBody({
      headers: response.headers,
      responseBody: response.data.data
    });
  } catch (e) {
    const errorMessage = e.data ? `${e.message} - ${JSON.stringify(e.data)}` : e.message;
    this.logger.error(errorMessage);
    throw new Error(errorMessage);
  }
}

module.exports.process = processAction;
