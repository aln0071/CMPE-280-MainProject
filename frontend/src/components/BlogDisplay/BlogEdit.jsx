import React, { useState } from "react";
import EditorCustom from './EditorCustom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Background from "../Utilities/Background";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { MESSAGE } from "../../actions/messages";
import { getErrorMessage } from "../../utils/utils";

function BlogEdit(props) {

    const [descripiton, setDescription] = useState("")
    const [imageArray, setImage] = useState([]);
    const [error, setError] = useState("");
    const [annon, setAnnon] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn, user } = useSelector(state => state.auth);

    const trim = (x) => {
        return x.replace(/^\s+|\s+$/gm, '');
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
                tags: [],
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
        <div style={{ marginTop: '1rem' }}>
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