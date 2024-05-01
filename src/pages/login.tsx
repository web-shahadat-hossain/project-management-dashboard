// pages/login.tsx

import { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onFinish = (values: any) => {
    setLoading(true);
    // Mock API call for authentication
    setTimeout(() => {
      setLoading(false);
      if (values.username === "admin" && values.password === "password") {
        router.push("/projects");
      } else {
        message.error("Invalid username or password");
      }
    }, 1000);
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <div className="mx-auto shadow-lg md:w-2/4 flex flex-col justify-center items-center h-full">
        <h1 className="mt-10 mb-5 text-3xl">Login</h1>
        <Form
          name="normal_login"
          className="md:w-2/4"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
