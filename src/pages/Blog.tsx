import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "AI Image Generators: Revolutionizing Digital Art and Design",
    excerpt: "Explore how AI is transforming the landscape of digital art and design, making creation more accessible than ever.",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    featuredImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  },
  {
    id: 2,
    title: "How to Choose the Best AI Image Generator for Your Needs",
    excerpt: "A comprehensive guide to selecting the right AI image generation tool for your specific requirements and goals.",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    featuredImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    id: 3,
    title: "The Future of AI in Visual Content Creation: Trends to Watch",
    excerpt: "Discover the emerging trends and future possibilities in AI-powered visual content creation.",
    thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    featuredImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  },
  {
    id: 4,
    title: "How to Make AI-Generated Images More Realistic",
    excerpt: "Expert tips and techniques for creating more lifelike and authentic AI-generated images.",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    featuredImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
  },
];

const Blog = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">{post.title}</CardTitle>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;