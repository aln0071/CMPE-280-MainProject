import React, { useState, useEffect } from "react";
import BlogMinimized from "./BlogMinimized";
import axios from 'axios';

function BlogEdit(props) {

    const [blogList, setblogList] = useState([]);
    useEffect(() => {
        var api="http://localhost:3001/getAllBlogs"
        axios.get(api).then(response => {setblogList(response.data)})
        },[])
  
    return(<div>
        {blogList.map((blog) =>
        {  
            return (<div key={blog._id}><hr />
            <BlogMinimized blog={blog} />
            </div>)
        })}
        </div>)
  }
  
  export default BlogEdit;