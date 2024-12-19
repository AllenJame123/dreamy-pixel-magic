import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "AI Image Generators: Revolutionizing Digital Art and Design",
    excerpt: "Explore how AI is transforming the landscape of digital art and design, making creation more accessible than ever.",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  },
  {
    id: 2,
    title: "How to Choose the Best AI Image Generator for Your Needs",
    excerpt: "A comprehensive guide to selecting the right AI image generation tool for your specific requirements and goals.",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  },
  {
    id: 3,
    title: "The Future of AI in Visual Content Creation: Trends to Watch",
    excerpt: "Discover the emerging trends and future possibilities in AI-powered visual content creation.",
    thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
  },
  {
    id: 4,
    title: "How to Make AI-Generated Images More Realistic",
    excerpt: "Expert tips and techniques for creating more lifelike and authentic AI-generated images.",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
  },
  {
    id: 5,
    title: "Mastering AI Image Generation: A Beginner's Guide to Perfect Prompts",
    excerpt: "Learn the essential techniques for writing effective prompts that generate exactly the images you want.",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
  }
];

const BlogCard = ({ post, isLoading }: { post: typeof blogPosts[0], isLoading: boolean }) => {
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
    <Link key={post.id} to={`/blog/${post.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader className="relative overflow-hidden" style={{ minHeight: '12rem' }}>
          {!imageLoaded && (
            <Skeleton className="absolute inset-0 w-full h-48" />
          )}
          <img
            src={post.thumbnail}
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
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
};

export default Blog;