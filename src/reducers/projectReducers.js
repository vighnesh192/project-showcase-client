const initialState = {
    projects: undefined,
    queryType: 'popular',
    projectDetails: undefined
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                projects: action.payload.projects,
                queryType: action.payload.queryType
            }
        
        case 'SET_PROJECT_DETAILS':
            return {
                ...state,
                projects: action.payload.projects,
                queryType: action.payload.queryType,
                projectDetails: action.payload.projectDetails
            }

        case 'POST_COMMENT_SUCCESS':
            return {
                ...state,
                projectDetails: {
                    ...state.projectDetails,
                    comments: [...state.projectDetails.comments, action.payload]
                }
            }
        
        case 'POST_REPLY_SUCCESS':
            let index = state.projectDetails.comments.findIndex(comment => comment.id === action.payload.commentOnID)
            let newReplies = [...state.projectDetails.comments[index].replies, action.payload]
            let newObj = {
                ...state,
                projectDetails: {
                    ...state.projectDetails,
                    comments: JSON.parse(JSON.stringify(state.projectDetails.comments))
                },
            }
            newObj.projectDetails.comments[index].replies = newReplies;
            return newObj;

        case 'EDIT_COMMENT_SUCCESS':
            const { onPost, id, body, commentOnID } = action.payload;
            let newState = {
                ...state,
                projectDetails: {
                    ...state.projectDetails,
                    comments: [
                        ...state.projectDetails.comments,
                    ]
                }
            }
            if(onPost) {
                let index = state.projectDetails.comments.findIndex(comment => comment.id === id && comment.onPost === onPost)
                newState.projectDetails.comments[index].body = body;
                return newState;
            }
            let commentIndex = state.projectDetails.comments.findIndex(comment => comment.id === commentOnID)
            let replyIndex = state.projectDetails.comments[commentIndex].replies.findIndex(reply => reply.id === id)
            newState.projectDetails.comments[commentIndex].replies = [...state.projectDetails.comments[commentIndex].replies]
            newState.projectDetails.comments[commentIndex].replies[replyIndex].body = body;
            return newState;

        default:
            return {
                ...state
            };
    }
}

export default projectReducer;