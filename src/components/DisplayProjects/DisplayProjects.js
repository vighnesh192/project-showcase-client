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
    const renderedProjects = projectState.projects.map(project => {
        return <ProjectCard key={project.project} project={project} />
    })

    return (
        <div id="display-projects">
            <Grid container spacing={components[width]}>
                {renderedProjects}
            </Grid>
        </div>
    )
}

export default withWidth()(DisplayProjects);
