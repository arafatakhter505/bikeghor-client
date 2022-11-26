import React from "react";

const BlogCard = ({ title, text }) => {
  return (
    <div className="p-6 shadow-lg border rounded-lg mb-12">
      <h2 className="text-2xl text-primary mb-3">{title}</h2>
      <p>{text}</p>
    </div>
  );
};

export default BlogCard;
