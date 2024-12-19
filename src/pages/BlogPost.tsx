import { useParams } from "react-router-dom";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogContent from "@/components/blog/BlogContent";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { id } = useParams();
  const post = id ? blogPosts[id] : null;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="space-y-6">
        <BlogHeader title={post.title} featuredImage={post.featuredImage} />
        <BlogContent content={post.content} />
      </article>
    </div>
  );
};

export default BlogPost;