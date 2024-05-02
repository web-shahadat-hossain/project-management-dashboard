import { useState } from "react";
import { Form, Input, Modal, message } from "antd";

const TaskModal = ({
  isAddTaskModalVisible,
  setIsAddTaskModalVisible,
  projectId,
  refetch,
}: any) => {
  const [form] = Form.useForm();

  const handleAddTask = async (values: any) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      // Task added successfully
      setIsAddTaskModalVisible(false);
      await refetch();
      message.success("Task added successfully");
    } catch (error) {
      console.error("Error adding task:", error.message);
      message.error("Failed to add task");
    }
  };

  return (
    <Modal
      title="Add Task"
      visible={isAddTaskModalVisible}
      onCancel={() => setIsAddTaskModalVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleAddTask}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the task title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the task description" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
