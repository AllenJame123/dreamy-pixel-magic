interface BlogContentProps {
  content: string;
}

const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <div className="blog-content">
      <div 
        className="prose prose-slate lg:prose-lg max-w-none prose-img:rounded-lg prose-img:w-full prose-img:h-auto prose-img:object-cover"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default BlogContent;