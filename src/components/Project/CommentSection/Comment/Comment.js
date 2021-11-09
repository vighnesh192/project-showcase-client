import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";

import './Comment.css';
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";
import CommentInput from '../CommentInput/CommentInput';
import { connect } from 'react-redux';

function Comment(props) {
    const [replyToggle, setReplyToggle] = useState(false);

    const refReply = useRef(null);
    const refComment = useRef(null);

    const useStyles = makeStyles((theme) => ({
        sizeAvatar: {
          height: theme.spacing(4.5),
          width: theme.spacing(4.5),
        },
    }));

    const classes = useStyles();

    const clickedReply = () => {
        setReplyToggle(!replyToggle);
        refReply.current.className = !replyToggle ? "reply reply-active" : "reply";
    }

    const onCreatorClick = (id) => {
        props.history.push(`/user/${id}`);
    }

    return (
        <div ref={refComment} id={props.comment.id}>
            <div className={props.comment.onPost ? "comment" : "replies"}>
                <Avatar
                    className={clsx(classes?.sizeAvatar, "comment-avatar")}
                    src={props?.comment?.profilePic?.url}
                    onClick={() => onCreatorClick(props?.comment?.userID)}
                >
                    {/* {props?.comment?.first_name ? props?.comment?.first_name[0]?.toUpperCase() : props?.comment?.username[0].toUpperCase()} */}
                </Avatar>
                <div className="right">
                    <div className="comment-by" onClick={() => onCreatorClick(props?.comment?.userID)}>
                        {`${props?.comment?.first_name ? props?.comment?.first_name : ''} ${props?.comment?.last_name ? props.comment.last_name : ''}`}
                    </div>  
                    <div className="comment-body">
                        {props.comment.body}
                    </div>
                    {props.comment.onPost ? <div className="reply" ref={refReply} onClick={() => clickedReply()}>Reply</div> : ""}
                </div>
            </div>
            {!props.onPost && replyToggle ? <div className={"reply-input"}><CommentInput onPost={false} data={props.data} handleReplySubmit={clickedReply} /></div> : ""}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        commentList: state.projects.projectDetails?.comments
    }
}

export default withRouter(connect(mapStateToProps)(Comment));
