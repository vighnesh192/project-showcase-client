import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Comment from '../Comment/Comment'
import './CommentList.css'

function CommentList(props) {
    useEffect(() => {
    }, [props.commentList])
    const renderComment = props.comments?.map((comment, index) => {
        return (
            <React.Fragment key={index}>
                <Comment comment={comment} data={{...props.data, commentOnID: comment.id}}/>
                <CommentList comments={comment["replies"]}/> 
            </React.Fragment>
        )
    })

    return (
        <div className="comment-list">
            {renderComment}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        commentList: state.projects.projectDetails?.comments
    }
}

export default connect(mapStateToProps)(CommentList)