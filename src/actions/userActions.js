export const setTopCreators = (data) => {
    console.log('IN USER ACTIONS')
    return {
        type: 'setTopCreators',
        payload: {
            data
        }
    }
}