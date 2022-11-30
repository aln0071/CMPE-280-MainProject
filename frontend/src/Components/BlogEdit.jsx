import React, { useState } from "react";
import EditorCustom from './EditorCustom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Background from "./Background";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { MESSAGE } from "../actions/messages";
import { getErrorMessage } from "../utils/utils";
import Badge from 'react-bootstrap/Badge';

function BlogEdit(props) {

    const [descripiton, setDescription] = useState("")
    const [imageArray, setImage] = useState([]);
    const [error, setError] = useState("");
    const [annon, setAnnon] = React.useState(false);
    const[tags,setTags]=useState(["Science","Technology","Travel","Thoughts","Romance"])
    const[selectedTags,setSelectedTags]=useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, user } = useSelector(state => state.auth);

    const trim = (x) => {
        return x.replace(/^\s+|\s+$/gm, '');
    }
    const deleteTag = (e,val) =>{
        e.preventDefault()
        console.log("Deleting Tag : ",e)
        var localSelectedTags = selectedTags.slice(0,)
        const index = localSelectedTags.indexOf(val);
        console.log("Deleting Tag : ",val)
        if (index > -1) {
          localSelectedTags.splice(index, 1); // 2nd parameter means remove one item only
        }
        setSelectedTags(localSelectedTags)
        console.log(selectedTags)
      }
    
    
      const chooseOther = function(e){
        e.preventDefault();
        var incominTag = e.target.value;
        console.log(selectedTags.includes(incominTag))
        if(selectedTags.includes(incominTag)==false){
        console.log(incominTag)
        // if(true){
          var localSelectedTags = selectedTags.slice()
          localSelectedTags.push(incominTag)
          setSelectedTags(localSelectedTags)
          console.log(selectedTags)
        }
    }


    const submitHandler = (e) => {
        console.log(e);
        console.log(descripiton);
        e.preventDefault();
        if (!trim(descripiton) || !trim(e.target.formBasicTitle.value)) {
            setError("Please Enter a valid Title and Description !")
        }
        else {
            const payload = {
                topic: e.target.formBasicTitle.value,
                description: descripiton,
                author: "Anonymous User",
                annonymusFlag: e.target.formBasicCheckbox.checked,
                tags: selectedTags,
                comments: []
            }

            if(isLoggedIn) {
                payload.author = user.username;
            }

            const api = "http://localhost:3001/createBlog"
            axios.post(api, payload).then(response => {
                if(response.status === 200) {
                    dispatch(MESSAGE.success("Blog created"));
                    navigate("/home")
                } else {
                    throw new Error("Status not 200");
                }
            }).catch(error => {
                dispatch(MESSAGE.error(getErrorMessage(error)));
            })
        }
    }

    return (<div><Background />
        <div style={{ marginTop: '10rem' }}>
            <center>
                <Form onSubmit={submitHandler}>
                    <Card className="cardBack" style={{ width: '70rem', align: 'center' }}>
                        <Card.Body>
                            <Card.Title>
                                <br></br>
                                <Form.Group className="mb-3 customHeader" controlId="formBasicTitle">
                                    <Form.Control type="text"
                                        className="headingTitle"
                                        style={{ "fontSize": "3rem" }}
                                        placeholder="Blog Title" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Text className="text-muted">
                                        <Form.Label>Publish annonymusly?</Form.Label>
                                        <Form.Check type="checkbox" style={{ display: 'inline', marginLeft: '1rem' }} />
                                    </Form.Text>
                                </Form.Group>
                            </Card.Title>
                            <Card.Text>
                                <br></br>
                                <EditorCustom setDescription={setDescription} setImage={setImage} color="#EDE1ED"></EditorCustom>
                                <br></br>
                                <Form.Text className="text-muted">
                                        <Form.Label  style={{float:"left"}}>Add tags to make your blog more discoverable</Form.Label>
                                    <Form.Group className="mb-3" controlId="formBasicTags" onChange={e=>chooseOther(e)}>
                                    <Form.Control as="select">
                                            {tags.map ( tag =>{
                                            return(
                                            <option value={tag} >{tag}</option>)})}
                                        </Form.Control>
                                    </Form.Group>
                                    </Form.Text>
                                    <div class="d-flex gs4">
                                    {selectedTags.map(tag => 
                                    {return(<Badge bg="secondary" style={{marginLeft:"0.5rem"}} >{tag} <div val={tag} style={{float:"right",paddingLeft:"1rem"}} onClick={(e)=>deleteTag(e,tag)}>X</div></Badge>)})}
                                </div>
                                {error && <div style={{ color: "red" }}>
                                    {error}
                                </div>}
                            </Card.Text>
                            <Button variant="primary" type="submit" style={{
                                'marginTop': "2rem",
                                "backgroundColor": "#B6A6B6",
                                width: "20rem"
                            }}>
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