import Client from './src/Client';

export = async function verifyCredentials(cfg: any) {
  const client = new Client(this, cfg);
  try {
    await client.getLoggedUserInfo();
    this.logger.info('Verification completed successfully');
    return { verified: true };
  } catch (e) {
    this.logger.error('Verification failed');
    const errorMessage = e.data ? `${e.message} - ${JSON.stringify(e.data)}` : e.message;
    this.logger.error(errorMessage);
    throw e;
  }
}
