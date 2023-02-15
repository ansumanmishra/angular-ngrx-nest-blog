import { Injectable } from '@nestjs/common';

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
    article: 'How to Make the Perfect Cup of Coffee',
    desc: 'A step-by-step guide to brewing the perfect cup of coffee.',
    userId: 1,
  },
  {
    id: 2,
    article: 'The Benefits of Meditation',
    desc: 'Discover the many benefits of a regular meditation practice.',
    userId: 2,
  },
  {
    id: 3,
    article: 'The Art of Baking Bread',
    desc: 'Learn how to bake delicious bread in your own kitchen.',
    userId: 3,
  },
  {
    id: 4,
    article: 'The Science of Sleep',
    desc: 'Explore the latest research on the importance of sleep for our health.',
    userId: 4,
  },
  {
    id: 5,
    article: 'The Best Ways to Stay Motivated',
    desc: 'Discover tips and tricks for staying motivated and reaching your goals.',
    userId: 5,
  },
  {
    id: 6,
    article: 'The Benefits of Plant-Based Eating',
    desc: 'Learn about the health and environmental benefits of a plant-based diet.',
    userId: 6,
  },
  {
    id: 7,
    article: 'The Art of Calligraphy',
    desc: 'Discover the beautiful world of calligraphy and learn how to get started.',
    userId: 7,
  },
  {
    id: 8,
    article: 'The Importance of Exercise',
    desc: 'Learn about the many benefits of regular exercise for our health and well-being.',
    userId: 8,
  },
  {
    id: 9,
    article: 'The Secrets of Successful Relationships',
    desc: 'Discover tips for building and maintaining successful relationships.',
    userId: 9,
  },
  {
    id: 10,
    article: 'The Power of Positive Thinking',
    desc: 'Explore the benefits of positive thinking and how to cultivate a positive mindset.',
    userId: 10,
  },
];

@Injectable()
export class AppService {
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
    post.userId = 2;

    posts.push(post);

    return posts;
  }

  editPost(post: any) {
    const isPostExist = posts.find((p) => p.id === post.id);
    if (isPostExist) {
      isPostExist.article = post.article;
      isPostExist.desc = post.desc;
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

    return users;
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
