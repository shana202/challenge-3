// Blog post form page
const BlogPostFormPage = () => {
    const { id } = useParams();
    const post = samplePosts.find((p) => p.id === id);
  
    const handleSubmit = (postData) => {
      // Handle form submission logic here
      console.log("Post submitted:", postData);
    };
  
    return <BlogPostForm post={post} onSubmit={handleSubmit} />;
  };
    export default BlogPostFormPage;  