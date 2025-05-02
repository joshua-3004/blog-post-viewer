import React from 'react';
import BlogPost from './BlogPost';
import './BlogPostList.css';

const BlogPostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <div className="no-posts">No posts available</div>;
  }

  return (
    <div className="blog-post-list">
      <h2>Latest Posts</h2>
      <div className="post-count">{posts.length} posts found</div>
      <div className="posts-container">
        {posts.map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPostList;