interface BlogContentProps {
  content: string;
}

const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <div className="prose prose-slate lg:prose-lg max-w-none">
      <div 
        className="text-lg text-muted-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default BlogContent;