import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/')
  async redirectToAuthUrl(@Res() res: Response) {
    const authUrl = this.appService.getAuthUrl();
    res.redirect(authUrl);
  }

  @Get('/gac')
  async processCallback(@Query('code') code: string, @Res() res: Response) {
    this.appService.displayTokens(code);
    this.appService.killChrome();
    // won't work, as the window wasn't opened by this req.
    res.send('<script>window.close();</script>');
  }
}
