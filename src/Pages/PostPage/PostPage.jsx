import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogPostDetail from './components/BlogPostDetail/BlogPostDetail';
import BlogPostList from './components/BlogPostList/BlogPostList';
import samplePosts from '../../Data/posts'; // Sample posts data
import BlogPostForm from './components/BlogPostForm/BlogPostForm';
import CreatePostPage from '../CreatePostPage/CreatePostPage';
import EditPostPage from '../EditPostPage/EditPostPage';
import PostsPage from '../PostsPage/PostsPage';
import './PostPage.css';

const PostPage = ({ posts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === id);

  if (!post) return <p className="postPageNotFound">Blog post not found.</p>;

  return (
    <div className="postPageContainer">
      <button
        className="editPostButton"
        onClick={() => navigate(`/posts/${id}/edit`)}
      >
        Edit Post
      </button>
      <BlogPostDetail {...post} />
    </div>
  );
};

export default PostPage;