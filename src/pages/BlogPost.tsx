import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type BlogPost = {
  title: string;
  content: string;
};

type BlogPosts = {
  [key: string]: BlogPost;
};

const blogPosts: BlogPosts = {
  "1": {
    title: "Getting Started with AI Image Generation",
    content: "This is a detailed guide about getting started with AI image generation...",
  },
  "2": {
    title: "Best Practices for Prompt Engineering",
    content: "Learn about the best practices for writing effective prompts...",
  },
  "3": {
    title: "Understanding Image Generation Models",
    content: "Explore the technical details behind AI image generation models...",
  },
  "4": {
    title: "How to Make AI-Generated Images More Realistic",
    content: `Creating realistic AI-generated images requires attention to detail and understanding of key techniques. Here are some essential tips to enhance the realism of your AI-generated artwork:

1. Be Specific in Your Prompts
- Use detailed descriptions including lighting, perspective, and style
- Mention specific camera settings (e.g., "shot with a Canon 5D, 50mm lens, f/1.8")
- Include environmental details like time of day and weather conditions

2. Reference Real-World Elements
- Include specific materials and textures
- Mention real brands or models when applicable
- Reference specific art styles or photographers

3. Focus on Lighting and Shadows
- Specify lighting direction and type (natural, studio, etc.)
- Include details about shadows and reflections
- Mention time of day for natural lighting effects

4. Add Technical Photography Terms
- Include terms like "depth of field," "bokeh," or "golden hour"
- Specify aspect ratio and resolution
- Mention post-processing techniques

5. Common Pitfalls to Avoid
- Don't overcomplicate prompts with contradicting elements
- Avoid vague descriptions
- Don't mix too many different styles or concepts

6. Iterative Refinement
- Start with a basic prompt and gradually refine
- Save successful prompts for future reference
- Learn from less successful attempts

Remember that achieving photorealism often requires multiple attempts and refinements. Pay attention to what works and what doesn't, and keep refining your approach based on the results.`,
  },
};

const BlogPost = () => {
  const { id } = useParams();
  const post = id ? blogPosts[id] : null;

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
        <div className="text-lg text-muted-foreground whitespace-pre-wrap">
          {post.content}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;