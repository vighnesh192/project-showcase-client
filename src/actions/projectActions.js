export const setProjects = (projects, query) => {
    return {
        type: 'SET',
        payload: {
            projects,
            queryType: query
        }
    }
}