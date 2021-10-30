import React from 'react'
import Avatar from "@material-ui/core/Avatar";

import './Comment.css';
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";

function Comment(props) {
    const useStyles = makeStyles((theme) => ({
        sizeAvatar: {
          height: theme.spacing(4.5),
          width: theme.spacing(4.5),
        },
    }));

    const classes = useStyles();

    return (
        <div className="comment">
            <Avatar
                className={clsx(classes.sizeAvatar)}
                src={
                    JSON.parse(localStorage.getItem("User")).profilePic.url
                }
            />
            <div className="right">
                <div className="comment-body">
                    {props.comment.body}
                </div>
                {props.comment.onPost ? <div className="reply">Reply</div> : ""}
            </div>
        </div>
    )
}

export default Comment
