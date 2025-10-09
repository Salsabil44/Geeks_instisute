import React from "react";
import posts from "./posts.json";

export default function PostList() {
  return (
    <div style={{ padding: "20px" }}>
      <h2> Blog Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "20px" }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>{post.date}</small>
          <hr />
        </div>
      ))}
    </div>
  );
}