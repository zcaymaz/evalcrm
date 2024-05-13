/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from 'react';
import { Button, Flex, Form, Input, Select, message } from "antd";
const CustomerAdd = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
        style={{ paddingBlock: 32 }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item name="name" label="İsim" rules={[{ required: true, message: "Lütfen isim giriniz..." }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="surname"
          label="Soyisim"
          rules={[{ required: true, message: "Lütfen soyisim giriniz..." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Telefon" rules={[{ required: true, message: "Lütfen telefon numarası giriniz..." }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Geçerli bir e-posta giriniz...",
            },
            {
              required: true,
              message: "Lütfen e-posta giriniz...",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item label="Occupation" name="occupation">
          <Select
            options={[
              { label: "Designer", value: "designer" },
              { label: "Developer", value: "developer" },
              { label: "Product Manager", value: "product-manager" },
            ]}
          />
        </Form.Item>
        <Form.Item name="motto" label="Motto">
          <Input.TextArea rows={4} />
        </Form.Item> 
        <Form.Item name="bio" label="Bio" rules={[{ required: true }]}>
          <Input.TextArea rows={6} />
        </Form.Item>*/}
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Flex gap="small">
            <Button type="primary" htmlType="submit">
              Tamamla
            </Button>
            <Button danger onClick={() => form.resetFields()}>
              Temizle
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default CustomerAdd;
