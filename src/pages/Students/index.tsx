import { useState, useEffect, useCallback } from "react";
import { Table, Button, Space, Modal, Form, Input, Select, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { PageHeader, SearchFilter, StudentStatusTag } from "@/components/Common";
import studentService from "@/services/student.service";
import { STUDENT_STATUS_LABELS, DEFAULT_PAGE_SIZE } from "@/config/constants";
import type { Student, StudentCreateRequest, StudentUpdateRequest } from "@/types";
import type { ColumnsType } from "antd/es/table";

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [form] = Form.useForm();

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await studentService.getStudents({
        page,
        page_size: pageSize,
        search: search || undefined,
      });
      setStudents(res.data);
      setTotal(res.total);
    } catch {
      // handled
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleCreate = () => {
    setEditingStudent(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record: Student) => {
    setEditingStudent(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: "Bạn có chắc chắn muốn xoá sinh viên này?",
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      onOk: async () => {
        await studentService.deleteStudent(id);
        message.success("Đã xoá sinh viên");
        fetchStudents();
      },
    });
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (editingStudent) {
      await studentService.updateStudent(
        editingStudent.id,
        values as StudentUpdateRequest,
      );
      message.success("Cập nhật thành công");
    } else {
      await studentService.createStudent(values as StudentCreateRequest);
      message.success("Thêm sinh viên thành công");
    }
    setModalOpen(false);
    fetchStudents();
  };

  const columns: ColumnsType<Student> = [
    { title: "Mã SV", dataIndex: "student_code", key: "student_code", width: 120 },
    { title: "Họ tên", dataIndex: "full_name", key: "full_name" },
    { title: "Lớp", dataIndex: "class_code", key: "class_code", width: 120 },
    { title: "Email", dataIndex: "email", key: "email", responsive: ["lg"] as const },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status: string) => <StudentStatusTag status={status} />,
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Quản lý Sinh viên"
        subtitle="Danh sách sinh viên trong hệ thống"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Thêm sinh viên
          </Button>
        }
      />

      <SearchFilter
        placeholder="Tìm theo mã SV hoặc họ tên..."
        onSearch={(value) => { setSearch(value); setPage(1); }}
      />

      <Table
        rowKey="id"
        loading={loading}
        dataSource={students}
        columns={columns}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          showTotal: (t) => `Tổng ${t} sinh viên`,
          onChange: (p, ps) => { setPage(p); setPageSize(ps); },
        }}
      />

      <Modal
        title={editingStudent ? "Cập nhật sinh viên" : "Thêm sinh viên"}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => setModalOpen(false)}
        okText={editingStudent ? "Cập nhật" : "Thêm"}
        cancelText="Huỷ"
        destroyOnHidden
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="student_code"
            label="Mã sinh viên"
            rules={[{ required: true, message: "Nhập mã sinh viên" }]}
          >
            <Input disabled={!!editingStudent} />
          </Form.Item>
          <Form.Item
            name="full_name"
            label="Họ tên"
            rules={[{ required: true, message: "Nhập họ tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="class_code" label="Lớp">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input type="email" />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item name="enrollment_year" label="Năm nhập học">
            <Input type="number" />
          </Form.Item>
          {editingStudent && (
            <Form.Item name="status" label="Trạng thái">
              <Select
                options={Object.entries(STUDENT_STATUS_LABELS).map(
                  ([value, label]) => ({ value, label }),
                )}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default StudentsPage;