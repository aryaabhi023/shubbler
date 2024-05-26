import React, { useEffect, useState } from "react";
import avatar from "../image/avatar.jpg";
import { useParams } from "react-router-dom";
import { getUserByUsername } from "../Connection/auth";
import { getPostByUsername } from "../Connection/vichar";
import { useNavigate, Link } from "react-router-dom";
import { LikedBtn } from "./index.js";

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const changeFormat = (passDate) => {
    const createdAt = passDate;
    const date = new Date(createdAt);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const navToProfile = (username) => {
    navigate(`/profile/${username}`);
  };

  const [vichars, setVichars] = useState([]);
  useEffect(() => {
    getUserByUsername(username).then((res) => {
      setUser(res);
    });
  }, []);

  useEffect(() => {
    getPostByUsername(username).then((res) => {
      setVichars(res?.data);
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-8 md:p-8 rounded-lg shadow-md w-screen h-screen">
      <div className="flex items-center mb-4 mt-10">
        <img
          src={avatar}
          alt="Avatar"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="text-lg font-bold">{user?.username}</h2>
          <p className="text-sm">{user?.fullName}</p>
        </div>
      </div>
      <p className="mb-4">Total Posts: {vichars.length}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vichars.length &&
          vichars.map((vichar) => (
            <div
              key={vichar._id}
              className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg"
              onClick={() => navigate("/get-post/" + vichar._id)}
            >
              <div
                key={`${vichar._id}1`}
                className="bg-white mt-1 shadow-lg rounded-lg p-6 mb-4 relative"
              >
                <p className="text-orange-900 mb-4">
                  {`Posted on `}
                  <span className="text-gray-400">
                    {changeFormat(vichar.createdAt)}
                  </span>{" "}
                  <Link
                    onClick={(e) => {
                      e.stopPropagation();
                      navToProfile(vichar.username);
                    }}
                  >{`by ${vichar.username}`}</Link>
                </p>
                <p className="text-gray-800 text-lg">{vichar.content}</p>
                <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  {vichar.tag.toUpperCase()}
                </button>

                <LikedBtn id={vichar._id} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Profile;
