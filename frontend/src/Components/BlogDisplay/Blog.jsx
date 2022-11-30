import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import EditorCustom from './BlogReadOnly';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'; 
import Background from "../Background";
import { getErrorMessage } from "../../utils/utils";
import { getBlog, toggleBookmark } from '../../services/blog.service'
import { postComment } from "../../services/comment.service";
import { useDispatch, useSelector } from 'react-redux';
import { MESSAGE } from '../../actions/messages';
import CommentsList from "./CommentsList";
import BookmarkSymbol from "./BookmarkSymbol";
import { addBookmarkAction, removeBookmarkAction } from "../../actions/auth";
import Badge from 'react-bootstrap/Badge';

function BlogEdit() {
    let params = useParams();
    let navigate = useNavigate();
    const tagdisplay = (e,tag) => {
        e.preventDefault();
        console.log("her",tag)
        navigate(`/relatedReads/${tag}`)
    }
    const [blog, setBlog] = useState({});
    const [error, setError] = useState("");
    const [imageArray, setImage] = useState([]);
    const[tags,setTags]=useState(["Science","Technology","Travel","Thoughts","Romance"])
    const[selectedTags,setSelectedTags]=useState([])
    const [comment, setComment] = useState('')
    const { isLoggedIn, user } = useSelector(state => state.auth);
    const [isAnonymous, setIsAnonymous] = useState(false || !isLoggedIn);
    const dispatch = useDispatch()

    const isBookmarked = isLoggedIn && user.bookmarks.includes(blog._id);

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
                    setSelectedTags(response.data.tags)
                } else {
                    throw new Error("Status code not 200");
                }
            }).catch(error => {
                setError(getErrorMessage(error));
            })
    }, [])

    const toggleBookmarkHandler = () => {
        toggleBookmark(blog._id)
            .then(response => {
                if(response.status === 200) {
                    dispatch(MESSAGE.success(isBookmarked ? "Bookmark removed" : "Bookmark added"))
                    if(isBookmarked)
                        dispatch(removeBookmarkAction(blog._id))
                    else
                        dispatch(addBookmarkAction(blog._id))
                } else {
                    throw new Error("Response status not 200");
                }
            }).catch(error => {
                dispatch(MESSAGE.error(getErrorMessage(error)))
            })
    }

    return (<div><Background />
        <div style={{ marginTop: '10rem' }}>
            <center>
                <Card className="cardBack" style={{ width: '70rem', align: 'center' }}>
                    <Card.Body>
                        <Card.Title>
                            <br></br>
                            <Form.Group className="mb-3 customHeader" controlId="formBasicTitle">
                                <div className="blog-title-readonly">
                                    <div></div>
                                    <div style={{ "fontSize": "3rem","color": "grey" }}>{blog.topic}</div>
                                    {isLoggedIn ?
                                        <div className="bookmark-symbol" onClick={() => toggleBookmarkHandler()}>
                                            <BookmarkSymbol
                                                filled={isBookmarked}
                                            />
                                        </div>
                                        :
                                        <div></div>
                                    }
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Text className="text-muted">
                                    <Form.Label>-
                                    {blog.annonymusFlag ? 'Annon' : (
                                     <Link to="/profile" state={{ author:`${blog.author}` }}>
                                         {blog.author}
                                    </Link>
                
                                      )}                                    <br></br>
                                    <br></br>
                                    {selectedTags &&
                                    <div class="d-flex gs4">
                                                    {selectedTags.map(tag => 
                                                    {return(<div onClick={(e)=>tagdisplay(e,tag)}><Badge bg="secondary" style={{marginLeft:"0.5rem"}} >{tag}</Badge></div>)})}
                                    </div>}
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