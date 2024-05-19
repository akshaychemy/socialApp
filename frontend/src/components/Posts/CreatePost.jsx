import React, { useState } from 'react';
import { createPost } from '../../services/api';

const CreatePost = () => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("content",content)
      await createPost({ content });
      setContent('');
      alert('Post created successfully');
    } catch (err) {
      console.error(err);
      alert('Error creating post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="content"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default CreatePost;
