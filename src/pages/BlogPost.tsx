import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const blogPosts = {
  1: {
    title: "Getting Started with AI Image Generation",
    content: "This is a detailed guide about getting started with AI image generation...",
  },
  2: {
    title: "Best Practices for Prompt Engineering",
    content: "Learn about the best practices for writing effective prompts...",
  },
  3: {
    title: "Understanding Image Generation Models",
    content: "Explore the technical details behind AI image generation models...",
  },
};

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="space-y-6">
      <Link to="/blog">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
      </Link>
      <article className="prose prose-slate max-w-none">
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        <p className="text-lg text-muted-foreground">{post.content}</p>
      </article>
    </div>
  );
};

export default BlogPost;