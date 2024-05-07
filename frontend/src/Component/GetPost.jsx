import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getPost, deletePost } from "../Connection/vichar";
import { MdDelete } from "react-icons/md";
import { getCurrentUser } from "../Connection/auth";
import { deleteLike } from "../Connection/likes";
import { LikedBtn, Comment, AuthLayout } from "./index";
import { deleteComment } from "../Connection/comment";

function GetPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  let postData;

  useEffect(() => {
    getPost(id)
      .then((postResponse) => {
        postData = postResponse.data;
        setPost(postData);

        return getCurrentUser();
      })
      .then((userResponse) => {
        const userData = userResponse.data.data;

        setUser(userData);
        if (userData.username === postData.username) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setUser(null);
      });
  }, [id]);

  const handleDelete = async () => {
    deletePost(id)
      .then(() => {
        deleteLike(id);
      })
      .then(() => {
        deleteComment(id);
      })
      .then(() => {
        navigate("/");
      });
  };

  function changeFormat(passDate) {
    const createdAt = passDate;
    const date = new Date(createdAt);
    const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (zero-based) and pad with leading zero if needed
    const year = date.getFullYear(); // Get full year

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  return (
    <div className="h-full bg-orange-200">
      {post && (
        <div className="max-w-4xl mx-auto p-10 pt-20">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-4 relative">
            {auth && (
              <button
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                onClick={handleDelete}
              >
                <MdDelete />
              </button>
            )}
            <p className="text-gray-800 text-lg">{post.content}</p>
            <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              {post.tag.toUpperCase()}
            </button>
            <p className="text-gray-800 mt-4">
              {`Posted on `}
              <span className="text-gray-400">
                {changeFormat(post.createdAt)}
              </span>{" "}
              {`by ${post.username}`}
            </p>
            <LikedBtn id={post._id} />
          </div>
          <Comment id={post._id} />
        </div>
      )}
    </div>
  );
}

export default GetPost;
