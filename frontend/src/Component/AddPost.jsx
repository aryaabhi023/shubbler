import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../Connection/vichar";

function AddPost() {
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ content, tag }).then(() => {
      navigate("/", { replace: true });
    });
    setContent("");
    setTag("");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-300 dark:bg-zinc-800">
      <div className="w-1/2 max-w-xl mx-auto p-6 space-y-6 bg-white dark:bg-zinc-700 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="tweet" className="block text-lg font-semibold mb-2">
              Write Your Vichar
            </label>
            <textarea
              id="tweet"
              name="tweet"
              rows="4"
              className="w-full p-2 border border-zinc-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Enter Your Tweet"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="title" className="block text-lg font-semibold mb-2">
              Tag
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              className="w-full p-2 border border-zinc-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>
          <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
