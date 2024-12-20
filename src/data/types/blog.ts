export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  content: string;
  featuredImage: string;
  metaDescription: string;
};

export type BlogPosts = {
  [key: string]: BlogPost;
};