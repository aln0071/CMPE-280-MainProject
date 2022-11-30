import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogMinimized from "./BlogMinimized";
import Background from "./Background";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import '../App.css';

function RelatedGenre() {
  let params = useParams();
  const [blogList, setblogList] = useState([]);
  const[tags,setTags]=useState(["Science","Technology","Travel","Thoughts","Romance"])
  

  useEffect(async () => {
      var api="http://localhost:3001/getAllBlogs"
      var temp =[]
      await axios.get(api).then(response => {
        response.data.map(sing => {
        if(sing.tags.includes(params.tag)){
          temp.push(sing)
        }})})
      setblogList(temp)
      console.log(params.tag,temp)
      },[params.tag])

  return (blogList!=[] && (<div><Background/>   
  <div className="mt-3"style={{fontFamily: "fangsong"}}>
  <center><h4>
    Here are all the blogs on {params.tag} theme 
    </h4></center>
  </div>
    <Row xs={1} md={2} className="m-3 p-5">
      {blogList.map((blog) => 
        <Col key={blog._id}>
        <BlogMinimized blog={blog}/>
        </Col>
      )}
    </Row></div>));
}

export default RelatedGenre;