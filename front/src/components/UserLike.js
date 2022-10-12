import React, { useState, useEffect, useCallback } from "react";
import React from 'react'
import * as Api from '../api'
const UserLike = () => {
    const [like,setLike]= useState(false);
    const [countLike,setCountLike]=useState(0);

    useEffect(()=>{
        Api.get('users',userId).then((res)=>
        setCountLike(res.data.likeCount));
    },[userId])

    useEffect(()=>{
        Api.get('like',userId).then((res)=>
        setLike(res.data.userStatus));
    },[userId])

    const handleClick=useCallback(
        async(e)=>{
            e.preventDefault();
            
            const res= await Api.put(`like/${user}`,{
                otherUserId: userId,
            });
            setCountLike(res.data.likeCount);
            setLike(res.data.status);
        },
        [userId, user]
    );
  return (
    <div onClick={handleClick}>
      ❤️<span>{countLike}</span>
    </div>
  )
}

export default UserLike
