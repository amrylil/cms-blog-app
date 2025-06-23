import { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(data => {
        console.log('API response:', data);
        if (Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          console.warn('API did not return array in data field');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Daftar Postingan</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : posts.length === 0 ? (
        <p>Tidak ada postingan.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
