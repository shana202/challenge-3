const EditPostPage = ({ posts, onUpdate }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find((post) => post.id === id);
  
    if (!post) return <p>Post not found.</p>;
  
    const handleSubmit = (data) => {
      onUpdate(id, data);
      navigate(`/posts/${id}`);
    };
  
    return <BlogPostForm post={post} onSubmit={handleSubmit} />;
  };
export default EditPostPage;  