export interface Post {
  article: string;
  desc: string;
  userId: number;
  id?: number | undefined;
}

export interface PostsWithUser extends Post {
  username: string | undefined;
}
