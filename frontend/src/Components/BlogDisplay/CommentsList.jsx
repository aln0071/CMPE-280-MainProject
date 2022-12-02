import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MESSAGE } from "../../actions/messages";
import { getComments } from "../../services/comment.service";
import { getErrorMessage } from "../../utils/utils";
import Comment from "./Comment";

export default function CommentsList({ blogId, commentPostNotification }) {

    const [commentsList, setCommentsList] = useState([]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        getComments(blogId)
            .then(response => {
                console.log(response)
                if(response.status === 200) {
                    setCommentsList(response.data);
                } else {
                    throw new Error("Status not 200");
                }
            })
            .catch(error => {
                dispatch(MESSAGE.error(getErrorMessage(error)));
            })
    }, [commentPostNotification])

    return <div>
        {
            commentsList.map(comment => <Comment {...comment} />)
        }
    </div>
}
