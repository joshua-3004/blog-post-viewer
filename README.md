# Blog Post Viewer

A React application that fetches blog data from a public API, displays the list of posts, and implements proper error handling with Error Boundaries.

## Overview

This project demonstrates the implementation of:
- API integration using Axios
- React component structure and state management
- Error handling using both try/catch and Error Boundaries
- Loading states and error displays
- Responsive UI design

## Features

- Fetch blog posts from JSONPlaceholder API
- Display posts in a responsive grid layout
- Loading indicators during data fetching
- Error handling through Axios error catching
- Component-level error handling with React Error Boundaries
- Fallback UI when errors occur

## Technologies Used

- React.js
- Axios for API requests
- React Error Boundaries
- CSS for styling

## Implementation Details

### Axios Implementation

Axios is used to fetch data from the JSONPlaceholder API in the `App.js` component:

```javascript
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
```

Key aspects of the implementation:
- Async/await syntax for clean promise handling
- Try/catch/finally blocks for proper error handling
- Setting loading and error states to manage UI updates

### Error Boundary Implementation

The ErrorBoundary component is implemented as a class component (required for error boundaries in React):

```javascript
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details>
            <summary>Show Error Details</summary>
            <p>{this.state.error && this.state.error.toString()}</p>
            <p>Component Stack:</p>
            <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
          </details>
          <button 
            className="retry-button" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

The Error Boundary:
- Catches JavaScript errors in child components
- Logs error information to the console
- Displays a fallback UI when errors occur
- Provides a retry mechanism to reload the application

## Project Structure

```
blog-post-viewer/
├── public/
├── src/
│   ├── components/
│   │   ├── BlogPost.js
│   │   ├── BlogPost.css
│   │   ├── BlogPostList.js
│   │   ├── BlogPostList.css
│   │   ├── ErrorBoundary.js
│   │   ├── ErrorBoundary.css
│   │   ├── ErrorMessage.js
│   │   ├── ErrorMessage.css
│   │   ├── Loading.js
│   │   └── Loading.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Installation and Setup

1. Clone the repository:
```
git clone https://github.com/yourusername/blog-post-viewer.git
cd blog-post-viewer
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Challenges and Solutions

### Challenge 1: Error Handling Strategy
Initially, I needed to determine whether to handle API errors at the component level or through Error Boundaries. I decided to implement both approaches for different types of errors:
- API errors: Handled with try/catch in the data fetching logic
- UI rendering errors: Caught by the Error Boundary

### Challenge 2: Component Structure
Determining the right component structure was important for maintainability. I chose to separate the concerns:
- App.js: Data fetching and main layout
- BlogPostList.js: Rendering list of posts
- BlogPost.js: Individual post rendering
- ErrorBoundary.js: Error handling across the app

This separation makes the code more maintainable and testable.

## Future Improvements

- Add pagination for better performance with larger datasets
- Implement search functionality
- Add post detail views
- Create a form to add new posts (with API integration)
- Implement unit and integration tests

## License

MIT
