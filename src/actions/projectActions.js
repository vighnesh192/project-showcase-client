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

// Async Action using THUNK
export const postComment = (data) => {
    return (dispatch) => {
        axios.post(`/projects/${data?.projectID}/comment/`, data)
            .then((response) => {
                if(response.data.success) {
                   dispatch(postCommentSuccess(response.data.comment));
                }
            })
    }
}