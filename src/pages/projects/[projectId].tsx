import { SetStateAction, useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { Descriptions, Button, List, message, Select, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TaskModal from "@/components/UI/TaskModal";

const { Option } = Select;

const fetchProjectDetails = async (
  projectId: string | string[] | undefined
) => {
  // Mock API call to fetch project details
  const response = await fetch(`/api/projects/${projectId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch project details");
  }
  return response.json();
};

const ProjectDetails = () => {
  const router = useRouter();
  const { projectId } = router.query;

  const {
    data: projectDetails,
    isLoading,
    isError,
    refetch,
  } = useQuery(["projectDetails", projectId], () =>
    fetchProjectDetails(projectId)
  );

  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState(false);

  const [filter, setFilter] = useState<string | null>("All");

  const handleCompleteTask = async (taskId: any) => {
    await updateTaskStatus(taskId, "completed");
    await refetch();
    message.success("Task marked as completed");
  };

  const handleFilterChange = (value: any) => {
    setFilter(value);
  };

  const filteredTasks = projectDetails?.tasks?.filter(
    (task: { status: any }) => {
      if (!filter) return true;
      return task.status === filter;
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching project details</div>;

  return (
    <div style={{ padding: "50px" }}>
      <Button onClick={() => router.back()}>Go Back</Button>
      <Descriptions title="Project Details" bordered>
        <Descriptions.Item label="Name">
          {projectDetails.name}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {projectDetails.description}
        </Descriptions.Item>
      </Descriptions>
      <h2>Tasks</h2>
      <div style={{ marginBottom: "10px" }}>
        <Button
          type="primary"
          onClick={() => setIsAddTaskModalVisible(true)}
          icon={<PlusOutlined />}
        >
          Add Task
        </Button>
        <Select
          defaultValue="All"
          style={{ width: 120, marginLeft: "10px" }}
          onChange={handleFilterChange}
        >
          <Option value="All">All</Option>
          <Option value="todo">To Do</Option>
          <Option value="inProgress">In Progress</Option>
          <Option value="done">Done</Option>
        </Select>
      </div>
      <List
        dataSource={filteredTasks}
        renderItem={(task: any) => (
          <List.Item>
            <List.Item.Meta title={task.title} description={task.description} />
            {task.status !== "completed" && (
              <Tooltip title="Mark as Completed">
                <Button onClick={() => handleCompleteTask(task.id)}>
                  Complete
                </Button>
              </Tooltip>
            )}
          </List.Item>
        )}
      />
      {
        <TaskModal
          isAddTaskModalVisible={isAddTaskModalVisible}
          setIsAddTaskModalVisible={setIsAddTaskModalVisible}
          projectDetails={projectDetails}
        />
      }
    </div>
  );
};

export default ProjectDetails;
export function updateTaskStatus(
  tasks: any,
  taskId: string,
  status: string
): void {
  // Find the task in the tasks array using the taskId
  const taskToUpdate = tasks.find((task: { id: string }) => task.id === taskId);

  // Check if the task exists
  if (!taskToUpdate) {
    throw new Error(`Task with ID ${taskId} not found`);
  }

  // Update the status of the task
  taskToUpdate.status = status;

  console.log(`Task with ID ${taskId} updated successfully:`, taskToUpdate);
}
