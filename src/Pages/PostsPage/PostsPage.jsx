import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogPostList from './components/BlogPostList/BlogPostList';
import './PostsPage.css';

export default function PostsPage({ posts }) {
  const navigate = useNavigate();

  const handleSelect = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="postsPage">
      <div className="postsHeader">
        <h2 className="postsTitle">Blog Posts</h2>
        <button
          className="newPostButton"
          onClick={() => navigate('/posts/new')}
        >
          + New Post
        </button>
      </div>

      <BlogPostList posts={posts} onSelect={handleSelect} />
    </div>
  );
} 