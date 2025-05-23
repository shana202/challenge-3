import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import BlogPostList from "./components/BlogPostList/BlogPostList";
import BlogPostDetail from "./components/BlogPostDetail/BlogPostDetail";
import BlogPostForm from "./components/BlogPostForm/BlogPostForm";

// Sample post data
const samplePosts = [
  {
    id: "1",
    title: "Getting Started with React",
    summary: "Learn the basics of React and build your first application.",
    date: "01-01-2023",
    url: "/posts/1",
    content: `
      <p>React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of developers.</p>
      <h2>Why React?</h2>
      <p>React makes it easy to create interactive UIs. It efficiently updates and renders just the right components when your data changes.</p>
      <ul>
        <li>Component-based</li>
        <li>Declarative</li>
        <li>Learn Once, Write Anywhere</li>
      </ul>
    `,
    author: "John Doe",
  },
  {
    id: "2",
    title: "CSS Grid vs. Flexbox",
    summary: "A comparison of two powerful layout systems in CSS.",
    date: "02-15-2023",
    url: "/posts/2",
    content: `
      <p>Both CSS Grid and Flexbox are modern layout systems. Choosing the right one depends on your layout needs.</p>
      <h2>CSS Grid</h2>
      <p>Best for two-dimensional layouts (rows and columns).</p>
      <h2>Flexbox</h2>
      <p>Best for one-dimensional layouts (rows <strong>or</strong> columns).</p>
      <ol>
        <li>Use Grid when you need a full page layout.</li>
        <li>Use Flexbox when you're aligning items in a single row or column.</li>
      </ol>
    `,
    author: "Jane Smith",
  },
  {
    id: "3",
    title: "Accessibility in Web Development",
    summary: "Tips for making your web applications more accessible.",
    date: "03-10-2023",
    url: "/posts/3",
    content: `
      <p>Accessibility ensures that websites are usable by everyone, including people with disabilities.</p>
      <h2>Best Practices</h2>
      <ul>
        <li>Use semantic HTML</li>
        <li>Provide alt text for all meaningful images</li>
        <li>Ensure sufficient color contrast</li>
        <li>Use ARIA roles where appropriate</li>
      </ul>
    `,
    author: "Alex Johnson",
  },
];

// Blog list page with navigation
const PostsPage = ({ posts }) => {
  const navigate = useNavigate();

  const handleSelect = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Blog Posts</h2>
        <button
          onClick={() => navigate("/posts/new")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: "pointer",
            marginRight: "40px",
          }}
        >
          + New Post
        </button>
      </div>

      <BlogPostList posts={posts} onSelect={handleSelect} />
    </div>
  );
};

// Blog detail page
const PostPage = ({ posts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === id);

  if (!post) return <p>Blog post not found.</p>;
  return (
    <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
      <button
        onClick={() => navigate(`/posts/${id}/edit`)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "10px 15px",
          fontSize: "14px",
          marginRight: "40px",
          marginTop: "20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Edit Post
      </button>
      <BlogPostDetail {...post} />
    </div>
  );
};

const CreatePostPage = ({ onCreate }) => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    onCreate(data);
    navigate("/posts");
  };

  return <BlogPostForm onSubmit={handleSubmit} />;
};

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

// App component with routing
const App = () => {
  const [posts, setPosts] = useState(samplePosts);

  const handleCreatePost = (newPost) => {
    const newId = (posts.length + 1).toString();
    const summary = newPost.content.slice(0, 60) + "...";
    setPosts([...posts, { ...newPost, id: newId, summary }]);
  };

  const handleUpdatePost = (id, updatedPost) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          ...updatedPost,
          summary: updatedPost.content.slice(0, 60) + "...",
        };
      } else {
        return post;
      }
    });
    setPosts(updatedPosts);
  };

  return (
    <Router>
      <div>
        <h1>Blog Posts</h1>
        <Routes>
          <Route path="/posts" element={<PostsPage posts={posts} />} />
          <Route
            path="/posts/new"
            element={<CreatePostPage onCreate={handleCreatePost} />}
          />
          <Route path="/posts/:id" element={<PostPage posts={posts} />} />
          <Route
            path="/posts/:id/edit"
            element={<EditPostPage posts={posts} onUpdate={handleUpdatePost} />}
          />
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

