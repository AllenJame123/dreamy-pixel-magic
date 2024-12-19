import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with AI Image Generation",
    excerpt: "Learn how to create amazing images using our AI-powered tool.",
    thumbnail: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Best Practices for Prompt Engineering",
    excerpt: "Tips and tricks to get the best results from AI image generation.",
    thumbnail: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Understanding Image Generation Models",
    excerpt: "A deep dive into how AI models create images from text descriptions.",
    thumbnail: "/placeholder.svg",
  },
  {
    id: 4,
    title: "How to Make AI-Generated Images More Realistic",
    excerpt: "Expert tips and techniques for creating more lifelike and authentic AI-generated images.",
    thumbnail: "/placeholder.svg",
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