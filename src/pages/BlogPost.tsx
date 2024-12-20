import { useParams, Navigate } from "react-router-dom";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogContent from "@/components/blog/BlogContent";
import RecentPosts from "@/components/blog/RecentPosts";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const post = Object.values(blogPosts).find(post => post.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="lg:col-span-9 bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            <BlogHeader title={post.title} featuredImage={post.featuredImage} />
            <BlogContent content={post.content} />
          </article>
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <RecentPosts />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;