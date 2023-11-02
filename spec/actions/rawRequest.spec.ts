import chai, { expect } from 'chai';
import sinon from 'sinon';
import { getContext, StatusCodeError, creds } from '../common';
import Client from '../../src/Client';
import { processAction } from '../../src/actions/rawRequest';

chai.use(require('chai-as-promised'));

const fakeResponse: any = {
  data: { data: {} },
  headers: {}
};

describe('rawRequest action', () => {
  let execRequest;
  describe('succeed', () => {
    beforeEach(() => {
      execRequest = sinon.stub(Client.prototype, 'callHttpWrapper').callsFake(async () => fakeResponse);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('should make get request', async () => {
      const cfg = {};
      const msg = { body: { method: 'get', url: '/me' } };
      const { body } = await processAction.call(getContext(), msg, { ...cfg, ...creds });
      expect(execRequest.callCount).to.be.equal(1);
      expect(execRequest.getCall(0).args).to.be.deep.equal(['get', '/me', undefined]);
      expect(body).to.be.deep.equal({
        headers: fakeResponse.headers,
        responseBody: fakeResponse.data.data
      });
    });
  });
  describe('api error', () => {
    beforeEach(() => {
      execRequest = sinon.stub(Client.prototype, 'callHttpWrapper').callsFake(async () => { throw new StatusCodeError(403); });
    });
    afterEach(() => {
      sinon.restore();
    });
    it('api error', async () => {
      const cfg = {};
      const msg = { body: { method: 'get', url: '/example' } };
      await expect(processAction.call(getContext(), msg, { ...cfg, ...creds })).to.be.rejectedWith('StatusCodeError');
      expect(execRequest.callCount).to.be.equal(1);
      expect(execRequest.getCall(0).args).to.be.deep.equal(['get', '/example', undefined]);
    });
  });
});
