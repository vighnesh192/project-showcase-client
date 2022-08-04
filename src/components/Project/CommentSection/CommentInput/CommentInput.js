import React from 'react'
import { connect } from 'react-redux';
import { editComment, postComment } from '../../../../actions/projectActions';
import './CommentInput.css'

function CommentInput(props) {
    const [values, setValues] = React.useState({
        body: props.commentToEdit ? props.commentToEdit.body : '',
        onPost: props.onPost,
    });

    const handleChange = (e, onPost) => {
        setValues({ ...values, body: e.target.value, onPost });
    };

    const handleSubmit = () => {
        const data = {
            ...props.data,
            onPost: props.onPost,
            body: values.body
        }
        if(!props.onPost && !props.commentToEdit) {
            props.handleReplySubmit();
        }
        console.log("commentToEdit:- ", props.commentToEdit);
        if(!props.commentToEdit) {
            props.postComment(data);
        }
        else {
            props.editComment({ commentID: props.commentToEdit.id, body: values.body });
            props.submitEditToggle();
        }
    }
    
    return (
        <div id="feedback-input">
            <textarea 
                value={values.body}
                onChange={(e) => handleChange(e, true)}
                id="feedback-input-box" 
                placeholder="Leave your feedback!"
            />
            <button id="feedback-submit" onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        projectDetails: state.projectDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postComment: (data) => dispatch(postComment(data)), 
        editComment: (data) => dispatch(editComment(data)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput)
