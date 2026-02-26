import { useState, useEffect, useCallback } from "react";
import { Table, Button, Space, Modal, Form, Input, Select, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, TeamOutlined } from "@ant-design/icons";
import { PageHeader, SearchFilter } from "@/components/Common";
import courseService from "@/services/course.service";
import { DEFAULT_PAGE_SIZE } from "@/config/constants";
import type { Course, CourseCreateRequest, CourseUpdateRequest } from "@/types";
import type { ColumnsType } from "antd/es/table";

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form] = Form.useForm();

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await courseService.getCourses({
        page,
        page_size: pageSize,
        search: search || undefined,
      });
      setCourses(res.data);
      setTotal(res.total);
    } catch {
      // handled
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleCreate = () => {
    setEditingCourse(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record: Course) => {
    setEditingCourse(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: "Xoá môn tín chỉ này?",
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      onOk: async () => {
        await courseService.deleteCourse(id);
        message.success("Đã xoá môn tín chỉ");
        fetchCourses();
      },
    });
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (editingCourse) {
      await courseService.updateCourse(editingCourse.id, values as CourseUpdateRequest);
      message.success("Cập nhật thành công");
    } else {
      await courseService.createCourse(values as CourseCreateRequest);
      message.success("Thêm môn tín chỉ thành công");
    }
    setModalOpen(false);
    fetchCourses();
  };

  const columns: ColumnsType<Course> = [
    { title: "Mã môn", dataIndex: "course_code", key: "course_code", width: 130 },
    { title: "Tên môn học", dataIndex: "course_name", key: "course_name" },
    { title: "Học kỳ", dataIndex: "semester", key: "semester", width: 120 },
    { title: "Giảng viên", dataIndex: "lecturer_name", key: "lecturer_name", responsive: ["lg"] as const },
    {
      title: "SV đăng ký",
      dataIndex: "student_count",
      key: "student_count",
      width: 110,
      render: (val: number) => val ?? 0,
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<TeamOutlined />} title="DS Sinh viên" />
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Quản lý Môn tín chỉ"
        subtitle="Danh sách môn tín chỉ & danh sách sinh viên đăng ký"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Thêm môn
          </Button>
        }
      />

      <SearchFilter
        placeholder="Tìm theo mã môn hoặc tên môn..."
        onSearch={(val) => { setSearch(val); setPage(1); }}
        extra={
          <Select
            placeholder="Lọc học kỳ"
            allowClear
            style={{ width: 160 }}
            options={[
              { value: "2025-1", label: "HK1 2025-2026" },
              { value: "2025-2", label: "HK2 2025-2026" },
            ]}
          />
        }
      />

      <Table
        rowKey="id"
        loading={loading}
        dataSource={courses}
        columns={columns}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          showTotal: (t) => `Tổng ${t} môn`,
          onChange: (p, ps) => { setPage(p); setPageSize(ps); },
        }}
      />

      <Modal
        title={editingCourse ? "Cập nhật môn tín chỉ" : "Thêm môn tín chỉ"}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => setModalOpen(false)}
        okText={editingCourse ? "Cập nhật" : "Thêm"}
        cancelText="Huỷ"
        destroyOnHidden
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="course_code"
            label="Mã môn"
            rules={[{ required: true, message: "Nhập mã môn" }]}
          >
            <Input disabled={!!editingCourse} />
          </Form.Item>
          <Form.Item
            name="course_name"
            label="Tên môn học"
            rules={[{ required: true, message: "Nhập tên môn" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="semester"
            label="Học kỳ"
            rules={[{ required: true, message: "Chọn học kỳ" }]}
          >
            <Input placeholder="VD: 2025-1" />
          </Form.Item>
          <Form.Item
            name="lecturer_id"
            label="Giảng viên"
            rules={[{ required: true, message: "Chọn giảng viên" }]}
          >
            {/* TODO: load from API → Select with lecturer options */}
            <Input type="number" placeholder="ID giảng viên (tạm)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CoursesPage;
