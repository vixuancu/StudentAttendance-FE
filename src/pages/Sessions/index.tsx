import { useState, useEffect, useCallback } from "react";
import { Table, Button, Space, Modal, Form, Input, Select, DatePicker, message, Tag } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { PageHeader, SearchFilter, SessionStatusTag } from "@/components/Common";
import sessionService from "@/services/session.service";
import { SESSION_SLOT_LABELS, DEFAULT_PAGE_SIZE } from "@/config/constants";
import type { ClassSession, SessionCreateRequest, SessionUpdateRequest } from "@/types";
import type { ColumnsType } from "antd/es/table";

const SessionsPage = () => {
  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<ClassSession | null>(null);
  const [form] = Form.useForm();

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await sessionService.getSessions({
        page,
        page_size: pageSize,
      });
      setSessions(res.data);
      setTotal(res.total);
    } catch {
      // handled
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const handleCreate = () => {
    setEditingSession(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record: ClassSession) => {
    setEditingSession(record);
    form.setFieldsValue({
      ...record,
    });
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xác nhận xoá",
      content: "Xoá buổi học này?",
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      onOk: async () => {
        await sessionService.deleteSession(id);
        message.success("Đã xoá buổi học");
        fetchSessions();
      },
    });
  };

  const handleActivate = async (id: number) => {
    await sessionService.activateSession(id);
    message.success("Đã kích hoạt buổi học");
    fetchSessions();
  };

  const handleClose = async (id: number) => {
    await sessionService.closeSession(id);
    message.success("Đã kết thúc buổi học");
    fetchSessions();
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const payload = {
      ...values,
      session_date: values.session_date?.format?.("YYYY-MM-DD") ?? values.session_date,
    };
    if (editingSession) {
      await sessionService.updateSession(editingSession.id, payload as SessionUpdateRequest);
      message.success("Cập nhật thành công");
    } else {
      await sessionService.createSession(payload as SessionCreateRequest);
      message.success("Thêm buổi học thành công");
    }
    setModalOpen(false);
    fetchSessions();
  };

  const columns: ColumnsType<ClassSession> = [
    { title: "Môn học", dataIndex: "course_name", key: "course_name" },
    { title: "Ngày", dataIndex: "session_date", key: "session_date", width: 120 },
    {
      title: "Ca",
      dataIndex: "session_slot",
      key: "session_slot",
      width: 120,
      render: (slot: string) => (
        <Tag>{SESSION_SLOT_LABELS[slot] ?? slot}</Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status: string) => <SessionStatusTag status={status} />,
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 200,
      render: (_, record) => (
        <Space>
          {record.status === "PENDING" && (
            <Button
              type="primary"
              size="small"
              icon={<PlayCircleOutlined />}
              onClick={() => handleActivate(record.id)}
            >
              Kích hoạt
            </Button>
          )}
          {record.status === "ACTIVE" && (
            <Button
              size="small"
              danger
              icon={<StopOutlined />}
              onClick={() => handleClose(record.id)}
            >
              Kết thúc
            </Button>
          )}
          <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Quản lý Buổi học"
        subtitle="Tạo, kích hoạt và quản lý buổi học theo ca"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Tạo buổi học
          </Button>
        }
      />

      <SearchFilter
        placeholder="Tìm theo tên môn..."
        onSearch={(val) => { setSearch(val); setPage(1); }}
      />

      <Table
        rowKey="id"
        loading={loading}
        dataSource={sessions}
        columns={columns}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          showTotal: (t) => `Tổng ${t} buổi`,
          onChange: (p, ps) => { setPage(p); setPageSize(ps); },
        }}
      />

      <Modal
        title={editingSession ? "Cập nhật buổi học" : "Tạo buổi học"}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => setModalOpen(false)}
        okText={editingSession ? "Cập nhật" : "Tạo"}
        cancelText="Huỷ"
        destroyOnHidden
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="course_id"
            label="Môn học"
            rules={[{ required: true, message: "Chọn môn học" }]}
          >
            {/* TODO: load courses from API → Select */}
            <Input type="number" placeholder="ID môn học (tạm)" />
          </Form.Item>
          <Form.Item
            name="session_date"
            label="Ngày học"
            rules={[{ required: true, message: "Chọn ngày" }]}
          >
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="session_slot"
            label="Ca học"
            rules={[{ required: true, message: "Chọn ca" }]}
          >
            <Select
              options={Object.entries(SESSION_SLOT_LABELS).map(([value, label]) => ({
                value,
                label,
              }))}
            />
          </Form.Item>
          <Form.Item name="start_time" label="Giờ bắt đầu">
            <Input placeholder="HH:mm" />
          </Form.Item>
          <Form.Item name="end_time" label="Giờ kết thúc">
            <Input placeholder="HH:mm" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SessionsPage;
