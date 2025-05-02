import React from 'react';
import './BlogPost.css';

const BlogPost = ({ post }) => {
  // This could throw an error if post structure is incorrect
  const renderContent = () => {
    // Simulating a potential error scenario
    if (!post.title || !post.body) {
      throw new Error('Post data is incomplete');
    }
    
    return (
      <>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </>
    );
  };

  return (
    <div className="blog-post">
      {renderContent()}
      <div className="post-meta">
        <span>Post ID: {post.id}</span>
        {post.userId && <span>Author ID: {post.userId}</span>}
      </div>
    </div>
  );
};

export default BlogPost;