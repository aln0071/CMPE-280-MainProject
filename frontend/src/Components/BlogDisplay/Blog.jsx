import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditorCustom from './BlogReadOnly';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'; 
import Background from "../Background";
import { getErrorMessage } from "../../utils/utils";
import { getBlog } from '../../services/blog.service'
import { postComment } from "../../services/comment.service";
import { useDispatch, useSelector } from 'react-redux';
import { MESSAGE } from '../../actions/messages';
import CommentsList from "./CommentsList";

function BlogEdit() {
    let params = useParams();
    const [blog, setBlog] = useState([]);
    const [error, setError] = useState("");
    const [imageArray, setImage] = useState([]);
    const [comment, setComment] = useState('')
    const { isLoggedIn } = useSelector(state => state.auth);
    const [isAnonymous, setIsAnonymous] = useState(false || !isLoggedIn);
    const dispatch = useDispatch()

    const handleCommentSubmission = () => {
        postComment(params.id, comment, isAnonymous)
            .then(response => {
                if(response.status === 200) {
                    dispatch(MESSAGE.success(response.data));
                    setComment('');
                } else {
                    throw new Error("Status code not 200");
                }
            }).catch(error => {
                dispatch(MESSAGE.error(getErrorMessage(error)));
            })
    }

    useEffect(() => {
        getBlog(params.id)
            .then(response => {
                if(response.status === 200) {
                    setBlog(response.data);
                } else {
                    throw new Error("Status code not 200");
                }
            }).catch(error => {
                setError(getErrorMessage(error));
            })
    }, [])

    return (<div><Background />
        <div style={{ marginTop: '10rem' }}>
            <center>
                <Card className="cardBack" style={{ width: '70rem', align: 'center' }}>
                    <Card.Body>
                        <Card.Title>
                            <br></br>
                            <Form.Group className="mb-3 customHeader" controlId="formBasicTitle">
                                <div style={{ "fontSize": "3rem","color": "grey" }}>{blog.topic} </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Text className="text-muted">
                                    <Form.Label>-
                                    {blog.annonymusFlag ? 'Annon' : (
                                     <Link to="/profile" state={{ author:`${blog.author}` }}>
                                         {blog.author}
                                    </Link>
                
                                      )}
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
                    { error === "" && <Card.Footer>
                        <div style={{ textAlign: 'left' }}>
                            <h5>Comments</h5>
                            <div>
                                <Form onSubmit={e => {
                                    e.preventDefault();
                                    handleCommentSubmission();
                                }}>
                                    <Form.Group>
                                        {/* <Form.Text>Write your comment</Form.Text> */}
                                        <Form.Control value={comment} onChange={e => setComment(e.target.value)} type="text" placeholder="Write your comment" style={{ margin: "10px 0px" }}></Form.Control>
                                        <Form.Check type='checkbox' defaultChecked={isAnonymous} onClick={() => setIsAnonymous(!isAnonymous)} label="Comment anonymously" disabled={!isLoggedIn} />
                                        <Button type="submit">Submit</Button>
                                    </Form.Group>
                                </Form>
                            </div>
                            <hr />
                            <CommentsList blogId={params.id} />
                        </div>
                    </Card.Footer>}
                </Card>
            </center>
        </div></div>)
}

export default BlogEdit;