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


export default function BlogList(props) {
    const {blogs, bookmakredBlogs, displayUser} = props
    const navigate = useNavigate();

  const renderBlogList = (blogList, bookmarked = false) => {
        if (blogList === null) {
          return "Loading..."
        } if (blogList === undefined) {
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

  return (
    <>
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
        <MDBRow className="row-cols-4 row-cols-md-3 g-4">{renderBlogList(blogs)}</MDBRow>
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
          {renderBlogList(bookmakredBlogs, true)}
        </MDBRow>
  </div>
    </>
  );
}
