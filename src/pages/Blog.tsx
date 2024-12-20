import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { blogPosts } from "@/data/blogPosts";

const BlogCard = ({ post, isLoading }: { post: any, isLoading: boolean }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <Skeleton className="w-full h-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3 mt-2" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Link key={post.id} to={`/blog/${post.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader className="relative overflow-hidden" style={{ minHeight: '12rem' }}>
          {!imageLoaded && (
            <Skeleton className="absolute inset-0 w-full h-48" />
          )}
          <img
            src={post.featuredImage}
            alt={post.title}
            className={`w-full h-48 object-cover rounded-t-lg transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-2 line-clamp-2">{post.title}</CardTitle>
          <p className="text-muted-foreground line-clamp-3">{post.metaDescription}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const posts = Object.values(blogPosts);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
};

export default Blog;