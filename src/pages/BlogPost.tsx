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
    <div className="space-y-6">
      <article className="prose prose-slate max-w-none">
        <BlogHeader title={post.title} featuredImage={post.featuredImage} />
        <BlogContent content={post.content} />
      </article>
    </div>
  );
};

export default BlogPost;