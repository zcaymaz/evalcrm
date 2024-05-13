import React from "react";
import { Button, Flex, Form, Input, Select, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from 'axios'

interface User {
  username: string
  password: string
}

const Login = () => {
  const [form] = Form.useForm();
  const onFinish = async (user: User) => {
    try {
      const res = await axios.post(`http://localhost:3001/user/login`, user)
      localStorage.setItem('token', res.data.token)
      window.location.href = '/'
    } catch (err: any) {
      alert(err.response.data.msg)
    }
    message.success("Müşteri başarıyla kaydedildi!");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Formu kontrol edin ve tekrar deneyin.");
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="username"
          name="username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="username"
            type="username"
            size="large"
          />
        </Form.Item>
        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="password"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
