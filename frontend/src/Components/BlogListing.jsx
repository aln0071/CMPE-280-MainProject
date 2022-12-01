import React, { useState, useEffect } from "react";
import BlogMinimized from "./BlogMinimized";
import axios from 'axios';
import URLS from '../services/urls'

function BlogEdit(props) {

    const [blogList, setblogList] = useState([]);
    useEffect(() => {
        const api = URLS.GET_ALL_BLOGS;
        axios.get(api).then(response => {setblogList(response.data)})
        },[])
  
    return(<div>
        {blogList.map((blog) =>
        {  
            return (<div key={blog._id}>
            <BlogMinimized blog={blog} />
            </div>)
        })}
        </div>)
  }
  
  export default BlogEdit;