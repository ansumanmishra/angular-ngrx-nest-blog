import { Injectable } from '@nestjs/common';

const users = [  {    "name": "John Doe",    "age": 30  },  {    "name": "Jane Doe",    "age": 25  },  {    "name": "Bob Smith",    "age": 35  },  {    "name": "Emma Watson",    "age": 28  },  {    "name": "Michael Johnson",    "age": 40  },  {    "name": "Sarah Brown",    "age": 32  },  {    "name": "David Lee",    "age": 27  },  {    "name": "Jessica Davis",    "age": 35  },  {    "name": "William Thompson",    "age": 30  },  {    "name": "Ashley Johnson",    "age": 29  }]

@Injectable()
export class AppService {

  getUsers(): {name: string; age: number}[] {
    return users;
  }

  createUser(user: any) {
    users.push(user);

    return users;
  }
}
