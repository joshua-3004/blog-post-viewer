import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPostList from './components/BlogPostList';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch posts: ${err.message}`);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Blog Post Viewer</h1>
      </header>
      <main className="app-content">
        <ErrorBoundary>
          {loading ? (
            <Loading />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <BlogPostList posts={posts} />
          )}
        </ErrorBoundary>
      </main>
      <footer className="app-footer">
        <p>Created for Laboratory Assessment: API Integration with Axios</p>
      </footer>
    </div>
  );
}

export default App;