import { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import type { FormProps } from "antd";
import { useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type LayoutType = Parameters<typeof Form>[0]["layout"];

import Navbar from "../components/Navbar.tsx";

export default function AddBook() {

   const formRef = useRef(null)
   const [form] = Form.useForm();
   const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

   type formData = {
      layout: string,
      BookName:string,
      sem:number
   }

   const handleSubmit = async (values :formData) => {
        
        if (!values.BookName || !values.sem){
              alert("Enter All Data")
              return 
        }

        const bookData = {

          bookName: values.BookName,
          sem: values.sem

        }
        
        try {
           const response = await axios.post(`${import.meta.env.VITE_API_URL}/book`,bookData,{
             withCredentials:true
           });

           console.log(response)

           toast.success("Book Added Successfully")

           form.resetFields()

        } catch (error) {

          console.log("Failed to add Book",error)
          toast.error("Failed to add Book");
          form.resetFields()
          
        }
       

   }

   const onFormLayoutChange: FormProps<any>["onValuesChange"] = ({
     layout,
   }) => {
     setFormLayout(layout);
   };

  return (
    <div className="bg-teal-100">
      <Navbar />

      <div className="flex justify-center items-center h-screen flex-col">
        <p className="font-bold text-3xl">AddBook</p>
        <Form
          layout={formLayout}
          form={form}
          onFinish={handleSubmit}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
          ref={formRef}
          style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
        >
          <Form.Item label="Form Layout" name="layout">
            <Radio.Group value={formLayout}>
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
              <Radio.Button value="inline">Inline</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Book Name" name="BookName">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Sem" name="sem">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
