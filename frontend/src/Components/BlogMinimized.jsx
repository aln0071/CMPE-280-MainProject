import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import EditorCustom from './EditorCustom';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function BlogMinimized(props) {
    let navigate = useNavigate();
    const blogdisplay = () => {
        navigate(`/blog/${props.blog._id}`)
    }

    const tagdisplay = (e,tag) => {
        e.preventDefault();
        console.log("her",tag)
        navigate(`/relatedReads/${tag}`)
    }
  
    return(<div>
            <Card style={{ width: '30rem',margin:'1rem',"backgroundColor":"#B6A6B6","opacity": "91%",
            fontFamily: "fangsong"}}>
            <Card.Header style={{"textAlign":"center"}}><h2>{props.blog.topic}</h2></Card.Header>
            <Card.Body>
                <Card.Text style={{height:"1.5rem"}}>
                    {/* <EditorCustom description={blog.description} color="#F6F0F6"></EditorCustom> */}

                    {props.blog.tags &&
                                    <div class="d-flex gs4">
                                                    {props.blog.tags.map(tag => 
                                                    {return(<div onClick={(e)=>tagdisplay(e,tag)}><Badge bg="secondary" style={{marginLeft:"0.5rem",
                                                    fontSize: "medium"}}>{tag}</Badge></div>)})}
                                    </div>}
                </Card.Text>
                <Button key={props.blog._id} onClick={blogdisplay} style={{'marginLeft':"3rem",
                    backgroundColor: "#F6F0F6",
                    width: "20rem",
                    color: "black"}}>View Blog</Button>
            </Card.Body>
            </Card>
        </div>)
  }
  
  export default BlogMinimized;