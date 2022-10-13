import React, { useState, useEffect, useCallback } from "react";
import * as Api from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import like from "../images/userLiked/like.png";
import liked from "../images/userLiked/liked.png";
const UserLike = () => {
  // const [like,setLike]= useState(false);
  const [countLike, setCountLike] = useState(0);
  const [heart, setHeart] = useState(like);
  // useEffect(()=>{
  //     Api.get('users',userId).then((res)=>
  //     setCountLike(res.data.likeCount));
  // },[userId])

  // useEffect(()=>{
  //     Api.get('like',userId).then((res)=>
  //     setLike(res.data.userStatus));
  // },[userId])

  // const handleClick=useCallback(
  //     async(e)=>{
  //         e.preventDefault();

  //         const res= await Api.put(`like/${user}`,{
  //             otherUserId: userId,
  //         });
  //         setCountLike(res.data.likeCount);
  //         setLike(res.data.status);
  //     },
  //     [userId, user]
  // );
  return (
    <div>
      <img
        onClick={() => {
          heart == like ? setHeart(liked) : setHeart(like);
        }}
        src={heart}
      />
      <span>{countLike}</span>
    </div>
  );
};

export default UserLike;
