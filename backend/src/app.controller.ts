import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getUsers(): { name: string; age: number }[] {
    return this.appService.getUsers();
  }

  @Post('createUser')
  async createUser(@Body() body) {
    return this.appService.createUser(body.user);
  }

  @Get('posts')
  getPosts(): any {
    return this.appService.getPosts();
  }

  @Post('posts/createOrUpdate')
  async createPost(@Body() body) {
    return this.appService.createOrUpdatePost(body.post);
  }

  @Delete('deletePost/:id')
  async deletePost(@Param() param) {
    return this.appService.deletePost(param.id);
  }
}
