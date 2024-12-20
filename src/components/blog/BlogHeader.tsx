import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BlogHeaderProps {
  title: string;
  featuredImage: string;
}

const BlogHeader = ({ title, featuredImage }: BlogHeaderProps) => {
  return (
    <div className="space-y-6">
      <Link to="/blog">
        <Button variant="ghost" className="mb-4 hover:bg-gray-100">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
      </Link>
      <img
        src={featuredImage}
        alt={title}
        className="w-full h-[400px] object-cover rounded-xl shadow-md mb-8"
      />
      <h1 className="blog-title">{title}</h1>
    </div>
  );
};

export default BlogHeader;