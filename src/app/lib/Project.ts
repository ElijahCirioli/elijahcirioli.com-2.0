import ProjectButton from "./ProjectButton";

interface Project {
    title: string;
    date: string;
    image: string;
    description: string;
    buttons: ProjectButton[];
}

export default Project;
