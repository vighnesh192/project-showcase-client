import React from 'react'
import { connect } from 'react-redux'
import Comment from '../Comment/Comment'
import './CommentList.css'

function CommentList(props) {
    const renderComment = props.comments?.map((comment, index) => {
        return (
            <React.Fragment key={index}>
                <Comment comment={comment}/>
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