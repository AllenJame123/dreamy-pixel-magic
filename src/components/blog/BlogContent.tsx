interface BlogContentProps {
  content: string;
}

const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <div className="text-lg text-muted-foreground whitespace-pre-wrap">
      {content}
    </div>
  );
};

export default BlogContent;