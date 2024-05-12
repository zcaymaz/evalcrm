import React, { useState } from 'react';
import { Button, Flex, Form, Input, Select, message } from 'antd';

const CustomerRegistrationForm = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        message.success('Müşteri başarıyla kaydedildi!');
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error('Formu kontrol edin ve tekrar deneyin.');
    };

    return (
        <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
        style={{ paddingBlock: 32 }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
  
        <Form.Item name="username" label="UserName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
  
        <Form.Item label="Occupation" name="occupation">
          <Select
            options={[
              { label: 'Designer', value: 'designer' },
              { label: 'Developer', value: 'developer' },
              { label: 'Product Manager', value: 'product-manager' },
            ]}
          />
        </Form.Item>
  
        <Form.Item name="motto" label="Motto">
          <Input.TextArea rows={4} />
        </Form.Item>
  
        <Form.Item name="bio" label="Bio" rules={[{ required: true }]}>
          <Input.TextArea rows={6} />
        </Form.Item>
  
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Flex gap="small">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button danger onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    );
};

export default CustomerRegistrationForm;