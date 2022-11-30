import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import BlogMinimized from "./BlogMinimized";
import Background from "./Background";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";

function HomepageListing() {
  let navigate = useNavigate();
  const [blogList, setblogList] = useState([]);
  const[tags,setTags]=useState(["Science","Technology","Travel","Thoughts","Romance"])

  useEffect(() => {
      var api="http://localhost:3001/getAllBlogs"
      axios.get(api).then(response => {setblogList(response.data)})
      },[])

  const blogdisplay = (e,tag) => {
      e.preventDefault();
      console.log("her",tag)
      navigate(`/relatedReads/${tag}`)}

  return (<div><Background/>
    <div className="mt-3"style={{fontFamily: "fangsong"}}>
      <center><h4>
        These topics are trending today ...... what do you feel like reading ?
        </h4></center>
    </div>
    <Row xs={1} md={5} className="m-1 mt-2">
      {tags.map((tag) => (
        <Col key={tag}><div onClick={(e)=>blogdisplay(e,tag)}>
        <Card classsName="tagBody" style={{ width: '10rem',margin:'1rem',"opacity": "91%",
        fontFamily: "fangsong",
        height: "10rem",
          fontSize: "x-large",
          backgroundColor: "#F6F0F6",
          "hover": {
            background: "#BBADBC"
          },    borderRadius: "77px"}}>
        <Card.Body className="pt-5">
            <center>
            {tag}
            </center>
        </Card.Body>
        </Card></div>
        </Col>
      ))}
    </Row>
    <Row xs={1} md={2} className="m-1 p-5">
      {blogList.map((blog) => (
        <Col key={blog._id}>
        <BlogMinimized blog={blog}/>
        </Col>
      ))}
    </Row></div>
  );
}

export default HomepageListing;