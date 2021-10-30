import React from "react";
import './CommentSection.css';
import CommentInput from "./CommentInput/CommentInput";
import CommentList from "./CommentList/CommentList";

function CommentSection(props) {
    return (
        <div id="comment-section">
            {props.onPost ? <CommentInput onPost={props.onPost} data={props.data}/> : ''}
            <CommentList comments={props.comments}/>
        </div>
    )
}

export default CommentSection;