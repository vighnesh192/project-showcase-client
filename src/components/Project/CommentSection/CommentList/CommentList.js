import React from 'react'
import { connect } from 'react-redux'
import Comment from '../Comment/Comment'
import './CommentList.css'

function CommentList(props) {

    const renderComment = props.commentList?.map((comment, index) => {
        return <Comment comment={comment} key={index}/>
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