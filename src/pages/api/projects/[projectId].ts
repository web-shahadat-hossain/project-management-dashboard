import { v4 as uuidv4 } from "uuid";

const projectsData = [
  {
    id: "1",
    name: "Project A",
    description: "Description for Project A",
    tasks: [],
  },
  {
    id: "2",
    name: "Project B",
    description: "Description for Project B",
    tasks: [],
  },
  {
    id: "3",
    name: "Project C",
    description: "Description for Project C",
    tasks: [],
  },
];

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    const { projectId } = req.query;

    const project = projectsData.find((p) => p.id === projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json(project);
  } else if (req.method === "POST") {
    const { projectId } = req.query;
    const { title, description } = req.body;

    // Find the project by ID and add the new task to its task list
    const projectIndex = projectsData.findIndex(
      (project) => project.id === projectId
    );
    if (projectIndex === -1) {
      return res.status(404).json({ message: "Project not found" });
    }

    const newTask: {
      id: string;
      title: string; // Assuming title is a string
      description: string; // Assuming description is a string
      status: string;
    } = { id: uuidv4(), title, description, status: "todo" };
    projectsData[projectIndex].tasks.push(newTask);

    return res.status(201).json(projectsData[projectIndex]);
  } else {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
