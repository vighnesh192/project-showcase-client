export const setTopCreators = (data) => {
    return {
        type: 'setTopCreators',
        payload: {
            data
        }
    }
}

export const setUserProfile = (data) => {
    console.log('IN PROFILE ACTION')
    return {
        type: 'setUserProfile',
        payload: {
            data
        }
    }
}