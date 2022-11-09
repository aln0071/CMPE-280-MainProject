import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditorCustom from './BlogReadOnly';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Background from "../Background";

function BlogEdit(props) {
    let params = useParams();
    const [blog, setblogList] = useState([]);
    const [error, setError] = useState("");
    const [imageArray, setImage] = useState([]);

    useEffect(() => {
        var api = "http://localhost:3001/getBlog/" + params.id
        axios.get(api).then(response => { setblogList(response.data) })
    }, [])

    return (<div><Background />
        <div style={{ marginTop: '10rem' }}>
            <center>
                <Card className="cardBack" style={{ width: '70rem', align: 'center' }}>
                    <Card.Body>
                        <Card.Title>
                            <br></br>
                            <Form.Group className="mb-3 customHeader" controlId="formBasicTitle">
                                <Form.Control type="text"
                                    className="headingTitle"
                                    style={{ "fontSize": "3rem" }}
                                    placeholder={blog.topic} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Text className="text-muted">
                                    <Form.Label>-
                                        {blog.annonymusFlag ? "Annon" : blog.author}
                                    </Form.Label>
                                </Form.Text>
                            </Form.Group>
                        </Card.Title>
                        <Card.Text>
                            <br></br>
                            <EditorCustom description={blog.description} color="#F6F0F6"></EditorCustom>
                            <br></br>
                            {error && <div style={{ color: "red" }}>
                                {error}
                            </div>}
                        </Card.Text>
                        <br></br>
                        <br></br>
                    </Card.Body>
                    <Card.Footer>
                        <div style={{ textAlign: 'left' }}>
                            <h5>Comments</h5>
                            <div>
                                some comments...
                            </div>
                            <div>
                                <Form onSubmit={e => {
                                    e.preventDefault();
                                }}>
                                    <Form.Group>
                                        {/* <Form.Text>Write your comment</Form.Text> */}
                                        <Form.Control type="text" placeholder="Write your comment" style={{ margin: "10px 0px" }}></Form.Control>
                                        <Button type="submit">Submit</Button>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </center>
        </div></div>)
}

export default BlogEdit;