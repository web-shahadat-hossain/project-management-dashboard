// pages/projects.js
import { useQuery } from "react-query";
import { List, Button } from "antd";
import { useRouter } from "next/router";

const fetchProjects = async () => {
  // Mock API call to fetch projects
  const response = await fetch("/api/projects");
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
};

const Projects = () => {
  const router = useRouter();
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery("projects", fetchProjects);

  const handleProjectClick = (projectId: any) => {
    router.push(`/project/${projectId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching projects</div>;

  return (
    <div style={{ padding: "50px" }}>
      <h1>Projects</h1>
      <List
        dataSource={projects}
        renderItem={(project: any) => (
          <List.Item>
            <List.Item.Meta
              title={project.name}
              description={project.description}
            />
            <Button
              type="primary"
              onClick={() => handleProjectClick(project.id)}
            >
              View
            </Button>
            <Button>Edit</Button>
            <Button danger>Delete</Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Projects;
