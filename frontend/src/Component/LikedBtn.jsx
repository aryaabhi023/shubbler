import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { addLike, totalLikes, removeLike } from "../Connection/likes";
import { useSelector } from "react-redux";

function LikedBtn(id) {
  const [likeCount, setLikeCount] = useState(0);
  const [color, setColor] = useState("text-black");
  const user = useSelector((state) => state.auth.userData);

  const loadLikes = async () => {
    totalLikes(id).then((res) => {
      setLikeCount(res.count);
      res.arr.forEach((doc) => {
        if (doc.userId === user._id) setColor("text-red-600");
      });
    });
  };

  useEffect(() => {
    loadLikes();
  }, []);

  const handleLikeBtn = async (e) => {
    e.stopPropagation();
    const coll = e.currentTarget.classList;
    if (coll.contains("text-black")) {
      coll.remove("text-black");
      coll.add("text-red-600");
      await addLike(id).then(() => {
        loadLikes();
      });
    } else {
      coll.remove("text-red-600");
      coll.add("text-black");
      removeLike(id).then(() => {
        loadLikes();
      });
    }
  };

  return (
    <div className="absolute grid grid-cols-2 bottom-4 right-4">
      <AiFillLike
        className={`text-xl cursor-pointer ${color}`}
        onClick={handleLikeBtn}
      />
      <p className="text-gray-600">{likeCount} likes</p>
    </div>
  );
}

export default LikedBtn;
