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
  MDBCardTitle
} from 'mdb-react-ui-kit';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, followUser } from '../../services/user.service';
import { getImageStream } from '../../services/image.service';
import { MESSAGE } from '../../actions/messages';
import { getErrorMessage } from '../../utils/utils';
import { getBlogsByUser, getBookmarkedBlogs } from '../../services/blog.service';

export default function Profile(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const author = location.state?location.state.author:'';
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [displayPicture, setDisplayPicture] = useState("dummy.webp"); 
  const [displayUser, setDisplayUser] = useState(user);
  // can have 4 possible values
  // null => loading, undefined => load failed, [] => no data, array of blogs
  const [blogs, setBlogs] = useState(null);
  const [bookmakredBlogs, setBookmarkedBlogs] = useState(null);
  const [followButton, setFollowButton] = useState(true);
  const [followers, setFollowers] = useState(user.followers.length);
  const [following, setFollowing] = useState(user.following.length); 

  const getImage = (imgKey) => {
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
  };

  const getBlogs = async (username) => {
    try {
      const blogs = await getBlogsByUser(username);
      setBlogs(blogs.data);
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
    } catch (error) {
      setFollowButton(true);
      dispatch(MESSAGE.error(getErrorMessage(error)))
    }
  }
  useEffect(() => {
    console.log(location);
    if (author) {
      console.log(author);
      getUser(author)
        .then((response) => {
          if (response.status === 200) {
            const u = response.data;
            setDisplayUser(u);
            getImage(u.imgKey);
            getBlogs(author);
            getBookmarkedBlogsList(author);
            if (u.followers.includes(user._id)) {
              setFollowButton(false);
            }
            setFollowers(u.followers.length)
            setFollowing(u.following.length)
          } else {
            throw new Error('Status code not 200');
          }
        })
        .catch((error) => {
          dispatch(MESSAGE.error(getErrorMessage(error)));
        });

    } else {
      getImage(user.imgKey);
      getBlogs(user.username)
      getBookmarkedBlogsList(user.username)
    }
  }, []);

  const renderBlogList = (blogList, bookmarked = false) => {
    if (blogList === null) {
      return "Loading..."
    } else if (blogList === undefined) {
      return <div>Loading failed. <button onClick={() => {getBlogs(); getBookmarkedBlogs()}}>Retry</button></div>
    } else if (Array.isArray(blogList)) {
      if (blogList.length === 0) {
        return <div className='no-blogs-message'>
          {bookmarked ? <>No bookmarked blogs</> : <>No blogs from this user</>}
          </div>
      } else {
        return blogList.map(blog => {
          return (
            <MDBCol key={blog._id}>
              <MDBCard onClick={() => navigate(`/blog/${blog._id}`)} className="recent-blog">
                <MDBCardImage
                  src="https://mdbootstrap.com/img/new/standard/city/041.webp"
                  alt="..."
                  position="top"
                />
                <MDBCardBody>
                  <MDBCardTitle>{blog.topic}</MDBCardTitle>
                  <MDBCardText style={{maxHeight: "15rem", overflow: "hidden"}}>
                    {blog.description}
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          )
        })
      }
    }
    return "unhandled exception";
  }

  const button = () => {
    if (author) {
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

  return (
    <div className="gradient-custom-2">
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

                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{displayUser.name}</MDBTypography>
                  <MDBCardText>{displayUser.city}</MDBCardText>
                </div>
              </div>

              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                <div>
                    <MDBCardText className="mb-1 h5">{Array.isArray(blogs) && blogs.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Blogs</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{followers}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{following}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-9">
                <div className="mb-5">
                {displayUser.aboutme &&
                  <><p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1">{displayUser.aboutme}</MDBCardText>
                  </div></>}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent Blogs</MDBCardText>
                  <MDBCardText className="mb-0">
                    {/* <a href="#!" className="text-muted">
                      Show all
                    </a> */}
                  </MDBCardText>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Annonymus Blogs</MDBCardText>
                  <MDBCardText className="mb-0">
                    {/* <a href="#!" className="text-muted">
                      Show all
                    </a> */}
                  </MDBCardText>
                </div>


                {/* Start of blogs list */}
                <div
                  className="d-flex justify-content-between align-items-center mb-4"
                  style={{ backgroundColor: '#f8f9fa' }}
                >
                  <MDBRow className="row-cols-4 row-cols-md-3 g-4">
                    {
                      renderBlogList(blogs)
                    }
                  </MDBRow>
                </div>
                {/* End of blogs list */}

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Bookmarked Blogs</MDBCardText>
                </div>

                {/* Start of blogs list */}
                <div
                  className="d-flex justify-content-between align-items-center mb-4"
                  style={{ backgroundColor: '#f8f9fa' }}
                >
                  <MDBRow className="row-cols-4 row-cols-md-3 g-4">
                    {
                      renderBlogList(bookmakredBlogs, true)
                    }
                  </MDBRow>
                </div>
                {/* End of blogs list */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
