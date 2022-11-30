import React, {useEffect, useState} from 'react';
import {MDBBadge, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'; 

import { getImageStream } from '../../services/image.service';


export default function UserList(props) {
  const user=props.user;
  const [img,setImg] = useState();

  useEffect(() => {
    console.log(props)
    getImageStream(props.user.imgKey)
    .then((response) => {
    if (response.status === 200) {
      const chunks = response.data;
      const blob = new Blob([chunks], { type: 'image/png' });
      setImg(URL.createObjectURL(blob));
    } else {
      throw new Error('Status code not 200');
    }
  })
    
  }, [])
  
  return (
      <MDBListGroup style={{ minWidth: '40rem' }} light>
      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          <img
            src={img}
            alt=''
            style={{ width: '45px', height: '45px' }}
            className='rounded-circle'
          />
          <div className='ms-3'>
            <p className='fw-bold mb-1'>{user.name}</p>
            <p className='text-muted mb-0'>{user.username}</p>
          </div>
        </div>
        <div>
        <Link to="/profile" state={{ author:`${user.username}` }}>                  
        <MDBBtn outline
          active
          color='white'
          style={{
            height: '36px',
            overflow: 'visible',
            width: '150px',
            marginTop: '10px',
            zIndex: '1',
            border: '2px solid black'   
          }}>
          View
        </MDBBtn>
        </Link>
        </div>
      </MDBListGroupItem>
    
    </MDBListGroup>
  );
};