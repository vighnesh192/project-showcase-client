import React from 'react';
import { useSelector } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import withWidth from '@material-ui/core/withWidth';
import ProjectCard from '../ProjectCard/ProjectCard';

const DisplayProjects = (props) => {
    const components = {
		xs: 1,
		sm: 2,
		md: 2,
		lg: 2,
	};
    const { width } = props;
    
    const projectState = useSelector((state) => state.projects);
    console.log('DISPLAY PROJECTS', projectState);

    // @Doubt   Why does this not work if written directly in return()
    const renderedProjects = projectState.projects ? projectState.projects.map((project, index) => {
        return <ProjectCard key={project.project} project={project} key={index}/>
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
