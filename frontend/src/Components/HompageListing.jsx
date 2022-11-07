import React, { useState,useEffect } from "react";
import BlogMinimized from "./BlogMinimized";
import Background from "./Background";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";

function HomepageListing() {

  const [blogList, setblogList] = useState([]);

  useEffect(() => {
      var api="http://localhost:3001/getAllBlogs"
      axios.get(api).then(response => {setblogList(response.data)})
      },[])

  return (<div><Background/>
    <Row xs={1} md={2} className="m-3 p-5">
      {blogList.map((blog) => (
        <Col key={blog._id}>
        <BlogMinimized blog={blog}/>
        </Col>
      ))}
    </Row></div>
  );
}

export default HomepageListing;