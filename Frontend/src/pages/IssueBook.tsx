import { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import type { FormProps } from "antd";
import axios from "axios";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";

type LayoutType = Parameters<typeof Form>[0]["layout"];

import Navbar from "../components/Navbar.tsx";

export default function IssueBook() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  type formData = {
    layout: string;
    s_id: number;
    b_id: number;
    dates: dayjs.Dayjs[];
  };

  const handleSubmit = async (values: formData) => {

    if (!values.s_id || !values.b_id || !values.dates || !values.layout ){
         alert("All Feilds are required")
         return 
    }
    
    
    const formattedData = {
        
        s_id: values.s_id,
        b_id: values.b_id,
        iss_date: values.dates[0].format("YYYY-MM-DD"),
        sub_date: values.dates[1].format("YYYY-MM-DD"),
      };

    console.log(formattedData)

     try {
       const response = await axios.post(
         `${import.meta.env.VITE_API_URL}/book/issue`,
         formattedData,
       );

      console.log(response);

      alert("Data Added Successfully");

      form.resetFields();

    } catch (error) {
      console.error("Failed to add Book", error);
      form.resetFields();
    }
  };

  const onFormLayoutChange: FormProps<any>["onValuesChange"] = ({ layout }) => {
    setFormLayout(layout);
  };

  return (
    <div className="bg-teal-100">
      <Navbar />

      <div className="flex justify-center items-center h-screen flex-col">
        <p className="font-bold text-3xl">IssueBook</p>
        <Form
          layout={formLayout}
          form={form}
          onFinish={handleSubmit}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
          style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
        >
          <Form.Item label="Form Layout" name="layout">
            <Radio.Group value={formLayout}>
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
              <Radio.Button value="inline">Inline</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Student_ID" name="s_id">
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item label="Book_ID" name="b_id">
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item label="Issue & Return Date" name="dates">
            <RangePicker
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
