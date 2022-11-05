import React, { useState } from "react";
import EditorCustom from './EditorCustom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function BlogMinimized(props) {
  
    return(<div>
            <Card style={{ width: '40rem'}}>
            <Card.Header>{props.blog.topic}</Card.Header>
            <Card.Body>
                <Card.Text>
                    {/* <EditorCustom description={blog.description} color="#F6F0F6"></EditorCustom> */}
                </Card.Text>
                <Button variant="primary">View Blog</Button>
            </Card.Body>
            </Card>
        </div>)
  }
  
  export default BlogMinimized;