import { Link, useParams } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Card, CardContent } from "@/components/ui/card";
import { Menu } from "lucide-react";

const RecentPosts = () => {
  const { slug } = useParams();

  const recentPosts = Object.values(blogPosts)
    .filter(post => post.slug !== slug) // Filter out current post
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 5);

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Menu className="w-4 h-4" />
        <h3 className="font-semibold">Recent Posts</h3>
      </div>
      <CardContent className="p-0">
        <ul className="space-y-3">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link
                to={`/${post.slug}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentPosts;