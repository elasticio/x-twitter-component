import { expect } from 'chai';
import { getContext, creds } from './common';
import verifyCredentials from '../verifyCredentials';

describe.only('verifyCredentials', () => {
  it('should verify', async () => {
    const cfg = {};
    const result = await verifyCredentials.call(getContext(), { ...creds, ...cfg });
    expect(result.verified).to.be.equal(true);
  });
});
