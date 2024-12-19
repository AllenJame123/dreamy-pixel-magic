import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BlogHeaderProps {
  title: string;
  featuredImage: string;
}

const BlogHeader = ({ title, featuredImage }: BlogHeaderProps) => {
  return (
    <>
      <Link to="/blog">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
      </Link>
      <img
        src={featuredImage}
        alt={title}
        className="w-full h-[400px] object-cover rounded-lg mb-8"
      />
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
    </>
  );
};

export default BlogHeader;