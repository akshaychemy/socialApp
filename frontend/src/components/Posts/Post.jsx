import React from 'react';
import { likePost, commentOnPost } from '../../services/api';

const Post = ({ post }) => {
  const handleLike = async () => {
    try {
      await likePost(post._id);
      alert('Post liked');
    } catch (err) {
      console.error(err);
      alert('Error liking post');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const content = e.target.elements.comment.value;
    try {
      await commentOnPost(post._id, { content });
      e.target.elements.comment.value = '';
      alert('Comment added');
    } catch (err) {
      console.error(err);
      alert('Error adding comment');
    }
  };

  return (
    <div>
      <p>{post.content}</p>
      <button onClick={handleLike}>Like</button>
      <form onSubmit={handleComment}>
        <input name="comment" placeholder="Add a comment" />
        <button type="submit">Comment</button>
      </form>
      {post.comments.map((comment) => (
        <p key={comment._id}>{comment.content}</p>
      ))}
    </div>
  );
};

export default Post;
