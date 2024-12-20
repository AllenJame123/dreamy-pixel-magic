import { useParams, Navigate } from "react-router-dom";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogContent from "@/components/blog/BlogContent";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { id } = useParams();
  const post = id ? blogPosts[id] : null;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="space-y-6 bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <BlogHeader title={post.title} featuredImage={post.featuredImage} />
          <BlogContent content={post.content} />
        </article>
      </div>
    </div>
  );
};

export default BlogPost;