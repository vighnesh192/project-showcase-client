import axios from "axios"

export const setProjects = (projects, query) => {
    return {
        type: 'SET',
        payload: {
            projects,
            queryType: query
        }
    }
}

export const setProjectDetails = (projects, queryType, projectDetails) => {
    return {
        type: 'SET_PROJECT_DETAILS',
        payload: {
            projects,
            queryType,
            projectDetails
        }
    }
}

const postCommentSuccess = (data) => {
    return {
        type: 'POST_COMMENT_SUCCESS',
        payload: data
    }
}

const postReplySuccess = (data) => {
    return {
        type: 'POST_REPLY_SUCCESS',
        payload: data
    }
}

const editCommentSuccess = (data) => {
    return {
        type: 'EDIT_COMMENT_SUCCESS',
        payload: data
    }
}

// Async Action using THUNK
export const postComment = (data) => {
    return (dispatch) => {
        axios.post(`/projects/${data?.projectID}/comment/`, data)
            .then((response) => {
                if(response.data.success) {
                    if(response.data.comment.onPost) {
                        dispatch(postCommentSuccess(response.data?.comment));
                    }
                    else {
                        dispatch(postReplySuccess(response.data?.comment));
                    }
                }
            })
    }
}

export const editComment = (data) => {
    return (dispatch) => {
        axios.patch(`/projects/${data?.projectID}/comment/${data?.commentID}`, {body: data.body})
            .then((response) => {
                if(response.data.success) {
                    dispatch(editCommentSuccess(response.data.comment))
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}