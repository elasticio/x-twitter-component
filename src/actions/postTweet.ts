import { messages } from 'elasticio-node';
import Client from '../Client';

let client: Client;

export async function processAction(msg: any, cfg: any) {
  this.logger.info('"Post tweet" action started');
  client ||= new Client(this, cfg);
  client.setLogger(this.logger);
  const { text } = msg.body;
  const { data } = await client.postTweet(text);

  this.logger.info('"Post tweet" action is done, emitting...');
  return messages.newMessageWithBody(data);
}

module.exports.process = processAction;
