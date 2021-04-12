import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { ConfigService } from './config.service';
import * as open from 'open';
import { launch, Launcher, killAll } from 'chrome-launcher';

@Injectable()
export class AppService {
  private chrome;

  constructor(private configService: ConfigService) {
    this.configService.complete().then(() => this.process());
  }

  async process() {
    this.chrome = await launch({
      startingUrl: `http://localhost:${this.configService.port}`,
      userDataDir: false,
    });
  }

  async killChrome() {
    // this.chrome.kill();
    const errors = await killAll();
    errors.length > 0 && console.log(errors);
  }

  getAuthUrl() {
    const client = new google.auth.OAuth2(
      this.configService.clientId,
      this.configService.clientSecret,
    );

    return client.generateAuthUrl({
      scope: this.configService.scopes,
      redirect_uri: this.configService.redirectUri,
      access_type: 'offline',
      include_granted_scopes: true,
    });
  }

  async displayTokens(code: string) {
    const tokens = await this.getTokens(code);
    console.log('Access Token:', tokens.tokens.access_token);
    console.log('Refresh Token:', tokens.tokens.refresh_token);
    console.log(
      'Expiry Date:',
      new Date(tokens.tokens.expiry_date).toLocaleString(),
    );
    process.exit(0);
  }

  async getTokens(code: string) {
    return new google.auth.OAuth2(
      this.configService.clientId,
      this.configService.clientSecret,
      this.configService.redirectUri,
    ).getToken(code);
  }
}
