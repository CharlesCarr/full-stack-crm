

const ProjectCard = ({ project }) => {
  return (
    <div className="w-1/8 border flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        <p>{project.name}</p>
        <a className="border rounded" href={`/projects/${project.id}`}>
          View
        </a>
      </div>
      <div>
        <p>Status:<span className="font-bold">{project.status}</span></p>
      </div>
    </div>
  );
};

export default ProjectCard;
