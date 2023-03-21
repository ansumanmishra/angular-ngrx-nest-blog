import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { throwError } from 'rxjs';

const users = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Doe', age: 25 },
  { id: 3, name: 'Bob Smith', age: 35 },
  { id: 4, name: 'Emily Davis', age: 28 },
  { id: 5, name: 'Michael Johnson', age: 32 },
  { id: 6, name: 'Sophie Wilson', age: 27 },
  { id: 7, name: 'William Brown', age: 33 },
  { id: 8, name: ' Olivia Green', age: 29 },
  { id: 9, name: 'Noah Baker', age: 31 },
  { id: 10, name: 'Isabelle Chen', age: 26 },
];

const posts = [
  {
    id: 1,
    article: '10 Healthy Snacks to Eat While Working from Home',
    desc: "If you're working from home and need some healthy snack options to keep you fueled throughout the day, here are some ideas to try. These include sliced veggies and hummus, fruit and nut butter, rice cakes with avocado and sea salt, and more.",
    userId: 1,
  },
  {
    id: 2,
    article: 'The Benefits of Meditation: Why You Should Start Today',
    desc: "Meditation has been shown to have a number of benefits for both the mind and body, including reduced stress and anxiety, improved focus and concentration, and better sleep. If you're new to meditation, there are many resources available to help you get started.",
    userId: 2,
  },
  {
    id: 3,
    article: 'The Top 5 National Parks to Visit in the United States',
    desc: "The United States is home to many stunning national parks, but if you're not sure where to start, here are five of the most popular parks to consider. These include Yellowstone, Grand Canyon, Yosemite, Zion, and Rocky Mountain National Parks.",
    userId: 3,
  },
  {
    id: 4,
    article: 'How to Build a Successful E-Commerce Business',
    desc: "If you're interested in starting an e-commerce business, there are a number of steps you'll need to take to ensure success. These include identifying your niche, creating a website, choosing the right products to sell, and marketing your business effectively.",
    userId: 4,
  },
  {
    id: 5,
    article: '5 Easy DIY Home Improvement Projects to Try',
    desc: "If you're looking to spruce up your home but don't want to spend a lot of money, there are plenty of easy DIY projects to consider. These include painting a room, adding a backsplash to your kitchen, creating a gallery wall, and more.",
    userId: 5,
  },
];

@Injectable()
export class AppService {
  getLoggedInUserData(email: string, password: string) {
    if (email !== 'test@test.com' && password !== 'test') {
      throw new UnauthorizedException(
        'Invalid login, Username or Password is wrong',
      );
    }
    return {
      name: 'John Doe',
      email: 'john@test.com',
      token: 'token',
    };
  }

  deleteUser(userId: any) {
    const index = users.findIndex((p) => p.id === +userId);
    if (index > -1) {
      users.splice(index, 1);
      return true;
    }
    return false;
  }

  getUserById(id: string): any {
    return users.find((user) => user.id === +id);
  }

  deletePost(id: string) {
    const index = posts.findIndex((p) => p.id === +id);
    if (index > -1) {
      posts.splice(index, 1);
      return true;
    }
    return false;
  }

  createOrUpdatePost(post: any) {
    post.id ? this.editPost(post) : this.createPost(post);

    return posts;
  }

  createPost(post: any) {
    post.id = posts.length + 1;
    posts.push(post);

    return posts;
  }

  editPost(post: any) {
    const isPostExist = posts.find((p) => p.id === post.id);
    if (isPostExist) {
      isPostExist.article = post.article;
      isPostExist.desc = post.desc;
      isPostExist.userId = post.userId;
    }
  }

  getPosts(): any {
    return posts;
  }

  getUsers(): { name: string; age: number }[] {
    return users;
  }

  createUser(user: any) {
    user.id = users.length + 1;
    users.push(user);

    return user;
  }

  editUser(user: any) {
    const isUserExist = users.find((p) => p.id === user.id);
    if (isUserExist) {
      isUserExist.name = user.name;
      isUserExist.age = user.age;
    } else {
      throw Error('User not present!');
    }

    return { updated: true };
  }
}
