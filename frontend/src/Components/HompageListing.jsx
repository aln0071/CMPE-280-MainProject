import React, { useState } from "react";
import BlogMinimized from "./BlogMinimized";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";

function HomepageListing() {

  const [blogList, setblogList] = useState([]);

  React.useEffect(() => {
      var api="http://localhost:3001/getAllBlogs"
      axios.get(api).then(response => {setblogList(response.data)})
      },[])

  return (
    <Row xs={1} md={2} className="g-4 m-5 p-5">
      {blogList.map((blog) => (
        <Col>
        <BlogMinimized blog={blog}/>
        </Col>
      ))}
    </Row>
  );
}

export default HomepageListing;