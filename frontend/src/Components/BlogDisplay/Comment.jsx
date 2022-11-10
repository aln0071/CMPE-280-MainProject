import React from "react";
import './comment.css';

export default function Comment({ description, createdAt, userId }) {
    const time = new Date(createdAt);
    const timeString = time.toLocaleDateString('en-US', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
    })

    const author = userId?.username || 'Anonymous User';

    return <div className="comment-container">
        <div className="comment-header">
            <div className="comment-author">{author}</div>
            <div className="comment-time">{timeString}</div>
        </div>
        {description}
    </div>
}
