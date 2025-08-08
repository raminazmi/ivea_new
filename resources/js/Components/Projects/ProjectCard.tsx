import React from 'react';

interface ProjectCardProps {
    project: {
        id: number;
        title?: string;
        description?: string;
        image?: string;
    };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
            {project.image && (
                <img src={project.image} alt={project.title} className="w-full h-40 object-cover rounded mb-4" />
            )}
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">{project.title}</h3>
            <p className="text-sm md:text-base text-gray-600">
                {project.description}
            </p>
        </div>
    );
};

export default ProjectCard;
