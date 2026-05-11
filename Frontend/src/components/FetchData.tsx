import { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import type { FormProps } from "antd";
import axios from "axios";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import dayjs from "dayjs";
import StudentTable from "./StudentTable";
import toast from "react-hot-toast";

type LayoutType = Parameters<typeof Form>[0]["layout"];

export default function FetchData() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");
  const [response, setResponse] = useState(null)

  type formData = {
    layout: string;
    firstName?: string;
    lastName?: string;
    bookName?: string;
    dates: dayjs.Dayjs[];
  };
  

  const handleSubmit = async (values: formData) => {
    if (!values.dates) {

      alert("Enter Date....");
      return;
    }

    const formattedData = {
      ...(values.firstName && { firstName: values.firstName }),
      ...(values.lastName && { lastName: values.lastName }),
      ...(values.bookName && { bookName: values.bookName }),

      issue_date: values.dates[0].format("YYYY-MM-DD"),
      sub_date: values.dates[1].format("YYYY-MM-DD"),
    };
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/fetch`,
        formattedData,{
          withCredentials:true
        }
      );

      setResponse(response.data)

      toast.success("Data Fetch Successfully");

      form.resetFields();
    } catch (error) {
      console.log("Failed to Fetch Data", error);
      toast.success("Failed to Fetch Data");
      form.resetFields();
    }
  };

  const onFormLayoutChange: FormProps<any>["onValuesChange"] = ({ layout }) => {
    setFormLayout(layout);
  };

  return (
    <div className="bg-teal-100">
      <div className="flex justify-center items-center h-screen flex-col">
        <p className="font-bold text-3xl">Fetch Data </p>
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

          <Form.Item label="first Name " name="firstName">
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item label="last Name" name="lastName">
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item label="book Name" name="bookName">
            <Input placeholder="input placeholder" />
          </Form.Item>

          <Form.Item label="Issue & Return Date" name="dates">
            <RangePicker
              style={{ width: "100%" }}
          
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <StudentTable response = {response} />

    </div>
  );
}
