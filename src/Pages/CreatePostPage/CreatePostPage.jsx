const CreatePostPage = ({ onCreate }) => {
    const navigate = useNavigate();
  
    const handleSubmit = (data) => {
      onCreate(data);
      navigate("/posts");
    };
  
    return <BlogPostForm onSubmit={handleSubmit} />;
  };
  
export default CreatePostPage;  