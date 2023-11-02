import chai, { expect } from 'chai';
import sinon from 'sinon';
import { getContext, creds } from '../common';
import Client from '../../src/Client';
import { processAction } from '../../src/actions/postTweet';

chai.use(require('chai-as-promised'));

const fakeResponse = { data: [1, 2, 3, 4, 5, 6, 7, 8, 9] } as any;

describe('Post tweet action', () => {
  let execRequest;
  describe('success', () => {
    beforeEach(() => {
      execRequest = sinon.stub(Client.prototype, 'postTweet').callsFake(async () => fakeResponse);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should ', async () => {
      const cfg = {};
      const msg = { body: { text: 'Hello world' } };
      const { body } = await processAction.call(getContext(), msg, { ...cfg, ...creds });
      expect(execRequest.callCount).to.be.equal(1);
      expect(body).to.be.deep.equal(fakeResponse.data);
      expect(execRequest.getCall(0).args[0]).to.be.deep.equal(msg.body.text);
    });
  });
});
