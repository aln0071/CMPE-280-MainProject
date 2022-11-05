import React, { useState } from "react";
import EditorCustom from './EditorCustom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Background from "./Background";

function BlogEdit(props) {

    const[descripiton,setDescription]=useState("")
    const [imageArray, setImage] = useState([]);
    const [error,setError] = useState("");

    const trim=(x)=>{
        return x.replace(/^\s+|\s+$/gm, '');
      }

    const submitHandler =(e)=>{
        console.log(e);
        console.log(descripiton);
        e.preventDefault();
        if(!trim(descripiton) || !trim(e.target.formBasicTitle.value)){
        setError("Please Enter a valid Title and Description !")
        }
        else{
        var payload ={
            topic:e.target.formBasicTitle.value,
            description: descripiton,
            author: "Snigdha Chaturvedi",
            annonymusFlag: false,
            tags:[],
            comments:[]
            }
        
        var api="http://localhost:3001/createBlog"
          axios.post(api,payload).then(response => {
            console.log(response.data);
            console.log(response.data.result);
          })
        }
    }
  
    return(<div><Background/>
        <div style={{ marginTop: '10rem'}}>
        <center>
        <Form onSubmit={submitHandler}>
            <Card style={{ width: '70rem', align:'center' }}> 
            <Card.Body>
                <Card.Title>
                    <br></br>
                    <Form.Group className="mb-3 customHeader" controlId="formBasicTitle">
                        <Form.Control type="text" 
                        style={{"font-size": "3rem"}}
                        placeholder="Blog Title" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Text className="text-muted">
                        <Form.Label>Publish annonymusly?</Form.Label>
                        <Form.Check type="checkbox"/>
                    </Form.Text>
                    </Form.Group>
                </Card.Title>
                <Card.Text>
                    <br></br>
                    <EditorCustom setDescription={setDescription} setImage={setImage}></EditorCustom>
                    <br></br>      
                    {error && <div style={{color: "red"}}>
                        {error}
                    </div>}
                </Card.Text>
                <Button variant="primary" type="submit" style={{'marginTop':"2rem"}}>
                    Publish
                </Button>
                    <br></br>
                    <br></br>
            </Card.Body>
            </Card>
        </Form>
        </center>
        </div></div>)
  }
  
  export default BlogEdit;