/* eslint-disable no-restricted-syntax, class-methods-use-this */
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TwitterApi } from 'twitter-api-v2';
import { axiosReqWithRetryOnServerError } from '@elastic.io/component-commons-library';

export default class Client {
  private logger: any;

  private cfg: any;

  private twitterClient: TwitterApi;

  constructor(context, cfg) {
    this.logger = context.logger;
    this.cfg = cfg;
    const {
      consumer_key,
      consumer_secret,
      access_token_key,
      access_token_secret,
    } = cfg;
    this.twitterClient = new TwitterApi({
      appKey: consumer_key,
      appSecret: consumer_secret,
      accessToken: access_token_key,
      accessSecret: access_token_secret,
    });
  }

  setLogger(logger) { this.logger = logger; }

  async getLoggedUserInfo() {
    return this.twitterClient.v2.me();
  }

  async callHttpWrapper(method: string, url: string, bodyOrParams: any = {}) {
    return this.twitterClient.v2[method](url.replace(/^\/2\/|^\/|^2\//, ''), bodyOrParams, { fullResponse: true });
  }

  async postTweet(text: string) {
    return this.twitterClient.v2.tweet(text);
  }
}
