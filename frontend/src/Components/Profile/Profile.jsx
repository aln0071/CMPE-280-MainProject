/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBCardTitle,
  MDBListGroup
} from 'mdb-react-ui-kit';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BlogList from './BlogList';
import UserList from './UserList';
import { getUser, followUser } from '../../services/user.service';
import { getImageStream } from '../../services/image.service';
import { MESSAGE } from '../../actions/messages';
import { getErrorMessage } from '../../utils/utils';
import { getBlogsByUser, getBookmarkedBlogs } from '../../services/blog.service';
import Background from "../Background";

export default function Profile(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const author = location.state?location.state.author:'';
  const defaultImg = "dummy.webp";
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [displayPicture, setDisplayPicture] = useState(defaultImg); 
  const [displayUser, setDisplayUser] = useState(user);
  
  const [blogs, setBlogs] = useState(null);
  const [annonblogs, setAnnonBlogs] = useState(null);
  const [bookmakredBlogs, setBookmarkedBlogs] = useState(null);
  const [followButton, setFollowButton] = useState(true);
  const [selfBoolean, setSelfBoolean] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0); 
  const [active, setActive] = useState('main')

  const getImage = (imgKey) => {
    if(!imgKey){
      setDisplayPicture(defaultImg)
    }
    else{
      getImageStream(imgKey)
      .then((response) => {
        if (response.status === 200) {
          const chunks = response.data;
          const blob = new Blob([chunks], { type: 'image/png' });
          setDisplayPicture(URL.createObjectURL(blob));

          // setDisplayUser(response.data);
        } else {
          throw new Error('Status code not 200');
        }
      })
      .catch((error) => {
        dispatch(MESSAGE.error(getErrorMessage(error)));
      });
    }
 
  };

  const getBlogs = async (username) => {
    try {
      const blogs = await getBlogsByUser(username);
      console.log("ppppppp",blogs)
      var annonBlogs=[]
      var restBlogs=[]
      console.log("ppppppp",annonBlogs,restBlogs)

        for (let i = 0; i < blogs.data.length; i++){        
          console.log(blog)
          var blog =blogs.data[i]
          if(blog.annonymusFlag==true){
            annonBlogs.push(blog)
          }
          else{
            restBlogs.push(blog)
          }
        }

        console.log("restBlogs",restBlogs)
        console.log("annonBlogs",annonBlogs)
      //console.log("popll",localStorage.getItem('user'),JSON.parse(localStorage.getItem('user')).username,displayUser.username,JSON.parse(localStorage.getItem('user')).username ==displayUser.username)
      annonBlogs=localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).username ==displayUser.username?annonBlogs:[]
      setBlogs(restBlogs);
      setAnnonBlogs(annonBlogs);
    } catch (error) {
      setBlogs(undefined);
      dispatch(MESSAGE.error(getErrorMessage(error)));
    }
  }

  const getBookmarkedBlogsList = async (username) => {
    try {
      const blogs = await getBookmarkedBlogs(username);
      setBookmarkedBlogs(blogs.data.bookmarks);
    } catch(error) {
      setBookmarkedBlogs(undefined);
      dispatch(MESSAGE.error(getErrorMessage(error)))
    }
  }

  const follow = async (userId, authorId) => {
    try {
      await followUser(userId, authorId);
      setFollowButton(false);
      setFollowing(following+1);
    } catch (error) {
      setFollowButton(true);
      dispatch(MESSAGE.error(getErrorMessage(error)))
    }
  }
  useEffect(() => {
    // window.location.reload();
    console.log("location", location);
    if (author) {
      getUser(author)
        .then((response) => {
          if (response.status === 200) {
            const u = response.data;
            const f = u.followers.map(({ username }) => username);
            console.log('followers', followers);
            console.log("profile user", u)
            setDisplayUser(u);
            getImage(u.imgKey);
            getBlogs(author);
            getBookmarkedBlogsList(author);

            if (f.length > 0 && isLoggedIn && f.includes(user.username)) {
              setFollowButton(false);
            }
            console.log('author', u)
            setFollowers((u.followers || []).length)
            setFollowing((u.following || []).length)
          } else {
            throw new Error('Status code not 200');
          }
        })
        .catch((error) => {
          dispatch(MESSAGE.error(getErrorMessage(error)));
        });
    } else {
      setFollowers((user.followers || []).length)
      setFollowing((user.following || []).length)
      getImage(user.imgKey);
      getBlogs(user.username)
      getBookmarkedBlogsList(user.username)
    }
  }, [location, location.state]);

  const renderUserList = (users) =>
  {
    return(
      <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <MDBCardText className="lead fw-normal mb-0">{active==='followers'?"Followers":"Following"}</MDBCardText>
      </div>
      <MDBListGroup style={{ minWidth: '40rem' }} light>
     { users.map((user) => {

       return (<UserList user={user} />);
      })}
      </MDBListGroup>
      </>
    ) 
 
  }

  const button = () => {
    if (author && author!==user.username) {
      return (
        <MDBBtn
          outline
          active
          color="dark"
          style={{
            height: '36px',
            overflow: 'visible',
            width: '150px',
            marginTop: '10px',
            zIndex: '1',
            border: '2px solid black'   
          }}
          disabled={!followButton}
          onClick={() => { follow(user._id, displayUser._id)}}
        >
          {followButton?'Follow':'Following'}
        </MDBBtn>
      );
    }

    return (
      <MDBBtn
        outline
        active
        color="dark"
        style={{
          height: '36px',
          overflow: 'visible',
          width: '150px',
          marginTop: '10px',
          zIndex: '1'
        }}
        onClick={() => {
          navigate('/editProfile');
        }}
      >
        Edit profile
      </MDBBtn>
    );
  };

  return (displayUser &&
    <>
    <Background />
    <div className="gradient-custom-2">
      {console.log(displayUser)}
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: '#000', height: '200px' }}
              >
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage
                    // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    src={displayPicture}
                    alt="Generic placeholder image"
                    className="mt-4 mb-2 img-thumbnail"
                    fluid
                    style={{ width: '150px', zIndex: '1' }}
                  />
                  {isLoggedIn && button()}
                </div>

                <div className="ms-3" style={{ marginTop: '110px' }}>
                  <MDBTypography tag="h5">{displayUser.name}</MDBTypography>
                  <MDBCardText>@{displayUser.username}<br/>{displayUser.city}</MDBCardText>
                </div>
              </div>

              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                <div>
                  <button className='button-link' onClick={()=> {setActive('main')}}>
                    <MDBCardText className="mb-1 h5">{Array.isArray(blogs) && Array.isArray(annonblogs) && blogs.length+annonblogs.length }</MDBCardText></button>
                    <MDBCardText className="small text-muted mb-0">Blogs</MDBCardText>
                  </div>
                  <div className="px-3">
                    <button className='button-link' onClick={()=> {setActive('followers')}}>
                    <MDBCardText className="mb-1 h5">{followers}</MDBCardText></button>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <button className='button-link' onClick={()=> {setActive('following')}}>
                    <MDBCardText className="mb-1 h5">{following}</MDBCardText> </button>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>

              <div className="mb-5" style={{padding:'7px'}}>
                {displayUser.aboutme && (
                <>
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{displayUser.aboutme}</MDBCardText>
                    </div>
                  </>)}
              </div>
              <MDBCardBody className="text-black p-9">
                {active === 'main' && blogs && annonblogs &&(<BlogList blogs={blogs} annonBlogs={annonblogs} bookmakredBlogs={bookmakredBlogs} displayUser={displayUser}/>)}
                {active === 'followers' && renderUserList(displayUser.followers)}
                {active === 'following' && renderUserList(displayUser.following)}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    </>
  );
}
