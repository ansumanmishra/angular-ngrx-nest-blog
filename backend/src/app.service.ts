import { Injectable } from '@nestjs/common';

const users = [
  { name: 'John Doe', age: 30 },
  { name: 'Jane Doe', age: 25 },
  { name: 'Bob Smith', age: 35 },
  { name: 'Emma Watson', age: 28 },
  { name: 'Michael Johnson', age: 40 },
  { name: 'Sarah Brown', age: 32 },
  { name: 'David Lee', age: 27 },
  { name: 'Jessica Davis', age: 35 },
  { name: 'William Thompson', age: 30 },
  { name: 'Ashley Johnson', age: 29 },
];

const posts = [
  {
    id: 1,
    article: 'The Top 10 Destinations for Solo Travelers',
    desc: 'Solo travel can be an exciting and empowering experience. Here are 10 of the best destinations for solo travelers looking for adventure, culture, and relaxation.',
    userId: 123,
  },
  {
    id: 2,
    article: '5 Simple Steps for Planning Your Next Vacation',
    desc: "Vacation planning can be overwhelming, but it doesn't have to be. Follow these 5 simple steps to make the process easier and ensure you have a great trip.",
    userId: 456,
  },
  {
    id: 3,
    article: 'The Benefits of Learning a New Language',
    desc: 'Learning a new language can be a fun and rewarding experience. It can improve communication skills, enhance career opportunities, and expand your cultural horizons.',
    userId: 789,
  },
  {
    id: 4,
    article: 'How to Stay Motivated While Working from Home',
    desc: 'Working from home can be challenging, especially when it comes to staying motivated. Here are some tips to help you stay focused and productive while working from the comfort of your own home.',
    userId: 246,
  },
  {
    id: 5,
    article: 'The Best Foods for a Healthy Diet',
    desc: 'Eating a healthy and balanced diet is essential for overall health and well-being. Here are some of the best foods to include in your diet for optimal health.',
    userId: 369,
  },
  {
    id: 6,
    article: 'The Advantages of Owning a Pet',
    desc: 'Pets can bring a lot of joy and companionship into our lives. Here are some of the benefits of owning a pet, including improved physical and mental health.',
    userId: 159,
  },
  {
    id: 7,
    article: 'The Benefits of Yoga for Physical and Mental Health',
    desc: 'Yoga is a powerful tool for promoting physical and mental health. It can help improve flexibility, balance, and strength, as well as reduce stress and anxiety.',
    userId: 357,
  },
  {
    id: 8,
    article: '10 Easy Ways to Save Money on Groceries',
    desc: "Grocery shopping can be a major expense, but it doesn't have to be. Here are 10 easy ways to save money on groceries, so you can stick to your budget.",
    userId: 258,
  },
  {
    id: 9,
    article: 'The Benefits of Traveling for Personal Growth',
    desc: 'Traveling can be a transformative experience. It can help you learn about new cultures, challenge your beliefs, and foster personal growth and self-discovery.',
    userId: 654,
  },
  {
    id: 10,
    article: 'The Advantages of a Plant-Based Diet',
    desc: 'A plant-based diet has numerous health benefits, including improved heart health, weight management, and a reduced risk of chronic diseases. Here are some',
    userId: 2,
  },
];

@Injectable()
export class AppService {
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
    users.push(user);

    return users;
  }
}
