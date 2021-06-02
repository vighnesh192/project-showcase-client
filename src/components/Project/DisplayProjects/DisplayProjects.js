import React from 'react';
import { useSelector } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import withWidth from '@material-ui/core/withWidth';
import ProjectCard from '../ProjectCard/ProjectCard';
import { getProjectDetails } from '../../../services/projectService';

const DisplayProjects = (props) => {
    const components = {
		xs: 1,
		sm: 2,
		md: 2,
		lg: 2,
	};
    const { width } = props;
    
    const projectState = useSelector((state) => state.projects);

    const handleProjectCardClick = (id) => {
        getProjectDetails(id)
            .then((data) => {
                console.log(data)
            })
    }

    // @Doubt   Why does this not work if written directly in return()
    const renderedProjects = projectState.projects ? projectState.projects.map((project, index) => {
        return <ProjectCard onClick={() => handleProjectCardClick(projectState.queryState !== 'new' ? project.project : project.id)} href={`/project/${projectState.queryState !== 'new' ? project.project : project.id}`} style={{cursor : 'pointer'}} key={project.project} project={project} key={index} />   
    }) : ""

    return (
        <div id="display-projects">
            <Grid container spacing={components[width]}>
                {renderedProjects}
            </Grid>
        </div>
    )
}

export default withWidth()(DisplayProjects);
