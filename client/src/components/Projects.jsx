import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROSPECTS } from "../queries/prospectQueries";
import ProjectCard from "./ProjectCard";

const Projects = () => {

    const { loading, error, data} = useQuery(GET_PROSPECTS);

    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong...</p>;

    return (
        <div>
            {data.projects.length > 0 ? (<div>
                {data.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>) : (<p>No projects</p>)}
        </div>
    )
};

export default Projects;