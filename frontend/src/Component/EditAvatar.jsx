import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateAvatar } from "../Connection/auth";
import { storeUpdateAvatar } from "../Store/authSlice.js";

function EditAvatar() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.userData);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null); // Clear selection if invalid file
      console.error("Invalid file type. Please select an image.");
    }
  };

  const handleUpload = () => {
    updateAvatar(selectedFile)
      .then((res) => {
        if(res)
          dispatch(storeUpdateAvatar(res))
        })
      .then(() => navigate("/profile/" + auth.username));
  };

  useEffect(() => {
    getCurrentUser().then((res) => {
      setUser(res.data.data);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
      <div className="bg-white dark:bg-zinc-700 p-6 rounded-lg shadow-md flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">
          Upload Your Avatar
        </h1>
        <label
          htmlFor="avatar"
          className="cursor-pointer flex items-center justify-center  w-32 h-32 bg-zinc-200 dark:bg-zinc-600 rounded-lg"
        >
          {selectedFile ? (
            <img
              id="avatar-preview"
              src={URL.createObjectURL(selectedFile)}
              alt="Selected Avatar"
              className="w-32 h-32 object-cover rounded-lg"
            />
          ) : (
            <img
              id="avatar-preview"
              src={user?.avatar}
              alt="Avatar Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          )}
          <input
            type="file"
            id="avatar"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <button
          type="button"
          onClick={handleUpload}
          className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default EditAvatar;
