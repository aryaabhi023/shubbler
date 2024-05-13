import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPost } from "../Connection/vichar";
import { LikedBtn } from "./index";

function Home() {
  const [vichars, setVichars] = useState([]);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus);
  useEffect(() => {
    getAllPost().then((res) => {
      setVichars([...res.data]);
    });
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

  return (
    <div className="min-h-screen grid items-center justify-center pt-16 bg-gray-100 dark:bg-gray-800">
      {!authStatus ? (
        <h1 className="text-4xl text-center text-gray-800 dark:text-gray-200">
          Login to read Vichars
        </h1>
      ) : (
        vichars.length &&
        vichars.map((vichar) => (
          <div
            key={vichar._id}
            className="w-4/5 max-w-4xl mx-auto p-4"
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
                {`by ${vichar.username}`}
              </p>
              <p className="text-gray-800 text-lg">{vichar.content}</p>
              <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                {vichar.tag.toUpperCase()}
              </button>

              <LikedBtn id={vichar._id} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
