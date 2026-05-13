import { Table, Tag } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

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

export default function StudentTable() {
  const response = useSelector((state: RootState) => state.auth.students);

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
        <Tag
          color="cyan"
          className="px-3 py-1 rounded-full text-sm font-semibold"
        >
          {record.issues.length}
        </Tag>
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
        className="custom-table"
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021414] via-[#042f2e] to-[#134e4a] p-8">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white">Student Records</h1>

        <p className="text-slate-300 mt-2 text-lg">
          Manage issued books and students
        </p>
      </div>

      {/* Table Card */}
      <div
        className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          shadow-2xl
          overflow-hidden
          p-5
        "
      >
        <Table
          columns={columns}
          dataSource={Array.isArray(response) ? response : []}
          expandable={{
            expandedRowRender,
          }}
          rowKey="id"
          className="custom-table"
        />
      </div>
    </div>
  );
}
