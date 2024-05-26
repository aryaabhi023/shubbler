import React, { useEffect, useState } from "react";
import { addComment, getComment, removeComment } from "../Connection/comment";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LikedBtn } from "./index";

function Comment(id) {
  const [postContent, setPostContent] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  if (user === null) {
    navigate("/login");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({ ...id, postContent }).then(() => {
      load();
    });
    setPostContent("");
  };

  const load = () => {
    getComment(id).then((res) => {
      setComments(res.data);
    });
  };

  useEffect(() => {
    load();
  }, []);

  function changeFormat(passDate) {
    const createdAt = passDate;
    const date = new Date(createdAt);
    const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (zero-based) and pad with leading zero if needed
    const year = date.getFullYear(); // Get full year

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  const handleDelete = (id) => {
    removeComment(id).then(() => {
      load();
    });
  };

  return (
    <div className="bg-neutral-100 text-white p-6">
      <h2 className="text-2xl text-slate-800 font-bold mb-4">Comments</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-neutral-300 py-2 px-4 rounded flex items-center">
            <svg
              className="w-6 h-6 text-zinc-400 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M7 14h10M4 6h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
              ></path>
            </svg>
            <span className="text-zinc-500">{comments.length} Comments</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-zinc-300 p-4 rounded mb-4">
          <textarea
            className="w-full bg-zinc-200 text-zinc-800 p-2 mt-2 rounded"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Leave a comment"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-400 w-full rounded mb-4">
          Post
        </button>
      </form>
      <div className="space-y-4">
        {comments.length > 0 &&
          comments.map((comment) => (
            <div key={comment._id} className="w-full mx-auto">
              <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500 mb-2">
                    {comment.username} {changeFormat(comment.createdAt)}
                  </div>
                  <p className="text-gray-800">{comment.content}</p>
                </div>
                {user.username === comment.username && (
                  <button
                    className="text-red-500 text-sm"
                    onClick={() => handleDelete(comment._id)}
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Comment;
