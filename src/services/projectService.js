import axios from "axios";

export function getProjects(query) {
    return axios.get('/projects/?sortBy='+query)
        .then(data => data.data);
}

export function getProjectsByUser(userId) {
    return axios.get(`/users/${userId}/projects`)
        .then(data => data.data);
}

export function getUpvotedProjectsByUser(userId) {
    return axios.get(`/users/${userId}/upvoted`)
        .then(data => data.data);
}

export function getProjectDetails(id) {
    return axios.get(`/projects/${id}`)
        .then(data => data.data);
}

// export function structureCommentsWithReplies(projectDetails) {
//     console.log(projectDetails)
//     let newProjObj = {...projectDetails};
//     console.log(newProjObj)
//     // Filtering the actual comments
//     let commsOnPost = newProjObj.comments.filter((comment) => comment.onPost);
//     // Filtering replies to the comments above
//     let commsOnComm = newProjObj.comments.filter((comment) => !comment.onPost);
//     // Looping to the actual comments
//     for(let [index, comment] of commsOnPost.entries()) {
//         // Created a property "replies" for every comment initialised to []
//         commsOnPost[index]["replies"] = []
//         // Looping through filtered replies
//         for(let reply of commsOnComm) {
//             if((!reply.onPost) && (reply.commentOnID === comment.id)) {
//                 // Push the reply into "replies" property of appropriate actual comment
//                 commsOnPost[index]["replies"].push(reply) 
//                 console.log(commsOnPost[index]['replies']) // Logs the pushed reply as expected => [{ id:17, onPost:false, ... }]
//                 console.log(commsOnPost[index]) // Logs the comment object with replies property as EMPTY ARRAY => { id: 1, onPost: true, replies: [], ... }
//             }
//         }
//     }
//     newProjObj.comments = commsOnPost;
//     console.log(newProjObj.comments[0]) // Logs the comment object with replies property as EMPTY ARRAY => { id: 1, onPost: true, replies: [], ... }
//     console.log(newProjObj.comments[0].replies) // Logs the pushed reply as expected => [{ id:17, onPost:false, ... }]
//     return newProjObj;
// }

export const structureCommentsWithReplies = ({ comments, ...details }) => {

    // classifying items - in one pass &
    // retrieving the two objects we need
    const { commsOnPost, commsOnComm } = comments.reduce(
      (a, { onPost, ...rest }) => {
        if (onPost) {
          a.commsOnPost[rest.id] = {
            onPost,
            replies: [],
            ...rest
          }
        } else {
          a.commsOnComm = [...a.commsOnComm, {
            onPost,
            ...rest
          }]
        }
        return a
      }, {
        commsOnPost: {},
        commsOnComm: []
    })
  
    // adding items to their parent comments'
    // replies array
    commsOnComm.forEach(({ commentOnID, ...rest }) => {
      commsOnPost[commentOnID].replies = [
        ...commsOnPost[commentOnID].replies,
        { commentOnID, ...rest }
      ]
    })
  
    // returning the object with updated
    // comments section
    return {
      ...details,
      comments: Object.values(commsOnPost)
    }
  }