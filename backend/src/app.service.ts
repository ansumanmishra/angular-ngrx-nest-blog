import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers(): {name: string; age: number}[] {
    return [
      {
      name: 'bryan',
      age: 25
      },
      {
      name: 'nicole',
      age: 26
      }
  ];
  }
}
