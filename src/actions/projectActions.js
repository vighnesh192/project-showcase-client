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