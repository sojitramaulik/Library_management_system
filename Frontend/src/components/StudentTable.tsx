import { Table, Tag } from "antd";

interface Book {
  id: number;
  bookName: string;
  sem: string;
}

interface Issue {
  book: Book;
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  phoneNo: string;
  issues: Issue[];
}

interface Props {
  response: {
    data: Student[];
  } | null ;
}

export default function StudentTable({ response }: Props) {

  if (!response){
       return <p>Loading.....</p>
  }

  // Main Student Table Columns
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },

    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },

    {
      title: "Phone Number",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },

    {
      title: "Books Count",
      key: "booksCount",

      render: (_: unknown, record: Student) => (
        <Tag color="blue">{record.issues.length}</Tag>
      ),
    },
  ];

  // Expanded Row Table
  const expandedRowRender = (record: Student) => {
    const bookColumns = [
      {
        title: "Book Name",

        render: (_: unknown, issue: Issue) => issue.book.bookName,
      },

      {
        title: "Semester",

        render: (_: unknown, issue: Issue) => issue.book.sem,
      },
    ];

    return (
      <Table
        columns={bookColumns}
        dataSource={record.issues}
        pagination={false}
        rowKey={(issue) => issue.book.id}
      />
    );
  };

  return (
    <div className="p-5">
      <Table
        columns={columns}
        dataSource={response.data}
        expandable={{
          expandedRowRender,
        }}
        rowKey="id"
      />
    </div>
  );
}
