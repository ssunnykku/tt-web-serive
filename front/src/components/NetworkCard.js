import React, { useState } from 'react'
import data from './network/data';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/network/networkcard.css'
const NetworkCard = ({item}) => {
    const [challange]=useState(data)
  return (
    <Card className='mb-3 ms-3 mr-5' style={{ width: '15rem' }}>
      <Card.Body>
        <div className='imageWrap'>
            <Card.Img
                className='mb-3'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM79qhm5WWiW46jcsrREwPVX87kZygj9CQDw&usqp=CAU'
                alt='대표 사진'
            />
        </div>
        <Card.Subtitle>{item?.title}</Card.Subtitle>
        <Card.Title className='mb-2 text-muted cardtitle'>{item?.description}</Card.Title>
        <div className='cardtext'>👨‍👧‍👧 100 ❤️</div>
        <div className='duration'><a className='cardSubText'>{item?.fromDate}-{item?.toDate}</a> </div>
      </Card.Body>
    </Card>
  )
}

export default NetworkCard;
