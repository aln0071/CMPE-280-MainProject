import React, { useState, useEffect } from "react";
import BlogMinimized from "./BlogMinimized";
import axios from 'axios';

function BlogEdit(props) {

    const [blogList, setblogList] = useState([]);
    // useEffect(() => {
    //       axios.post(""",payload)
    //       .then(response => {setblogList(response.data.data)})
    //     })
  
    return(<div>
        {[1,2,3,4,5].map((question) =>
        {  
            return (<div key={question}><hr />
            <BlogMinimized questions={question} />
            </div>)
        })}
        </div>)
  }
  
  export default BlogEdit;