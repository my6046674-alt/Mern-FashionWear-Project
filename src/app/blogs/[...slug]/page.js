import React from "react";

const BlogsDetailsPage = async ({ params }) => {
  const { slug } = await params;

  return (
    <div className="flex gap-8">
      <aside className="w-40 shrink-0 text-sm text-gray-500">
        <p className="font-semibold text-gray-700">Menu</p>
        <ul className="mt-2 space-y-1">
          <li>Recent posts</li>
          <li>Categories</li>
        </ul>
      </aside>
      <div>
        <h1 className="text-2xl font-bold">Blog post</h1>
        <p className="mt-2 text-gray-600">
          Slug segments: {slug.join(" / ")}
        </p>
      </div>
    </div>
  );
};

export default BlogsDetailsPage;
