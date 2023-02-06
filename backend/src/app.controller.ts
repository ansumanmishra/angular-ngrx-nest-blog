import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsers(): {name: string; age: number}[] {
    return this.appService.getUsers();
  }

  @Post('createUser')
  async createUser(@Body() body) {
    return this.appService.createUser(body.user);
  }
}
