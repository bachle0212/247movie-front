import React from 'react';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import newsApi from '../../api/newsApi';
import { Table, Button, Space, Modal, Form, Input, Image, Select } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Editor } from '@tinymce/tinymce-react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import toSlug from '../../common/function';
function AdminNews(props) {
  const [pageSize, setPageSize] = useState(6);
  const [pageIndex, setPageIndex] = useState(1);
  const [search, setSearch] = useState('');
  const [newsList, setNewsList] = useState([]);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [modalHeader, setModalHeader] = useState('Add News');
  const [thumbnail, setThumbnail] = useState('');
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const editorContentRef = useRef(null);
  const [content, setContent] = useState('');

  const columns = [
    {
      dataIndex: 'id',
      key: 'id',
      hidden: true,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumb',
      key: 'thumb',
      render: (value) => <Image width={100} src={value} />,
    },
    {
      title: 'Views',
      dataIndex: 'count',
      key: 'count',
      render: (value) => <>{value}</>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (value) => <>{value}</>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (value) => <>{value}</>,
    },
    {
      title: 'Action',
      dataIndex: 'key',
      key: 'key',
      render: (value) => (
        <Space wrap>
          <Button type="primary" icon={<EditIcon />} onClick={() => onEdit(value)}></Button>
          <Button danger icon={<DeleteIcon />} onClick={() => showModalDelete(value)}></Button>
        </Space>
      ),
    },
  ];

  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };
  const showModalDelete = (value) => {
    setId(value);
    setIsDelete(true);
  };
  const handleOk = () => {
    handleSubmit();
  };

  const handleCancel = () => {
    setIsModalEditOpen(false);
    setIsDelete(false);
  };
  const getPagingNews = async () => {
    let data = {
      pageSize: pageSize || 6,
      pageIndex: pageIndex || 1,
      search: search || '',
    };
    let news = await newsApi.getPagingNews(data);
    toDataSource(news.news);
  };
  const toDataSource = (data) => {
    let a =
      data &&
      data.map((item, index) => {
        return {
          key: item._id,
          title: item.title || '',
          description: item.description || '',
          count: item.count || 0,
          thumb: item.thumb || '',
          category: item.category || '',
          slug: item.slug || '',
          content: item.content || '',
        };
      });
    setNewsList(a);
  };

  useEffect(() => {
    getPagingNews();
  }, []);
  const onEdit = async (key) => {
    setId(key);
    setContent('');
    setThumbnail('');
    const dataEdit = newsList.filter((item) => item.key === key);
    console.log(dataEdit);
    form.setFieldsValue({
      id: dataEdit[0]._id,
      title: dataEdit[0].title,
      slug: dataEdit[0].slug,
      count: dataEdit[0].count,
      thumb: dataEdit[0].thumb,
      category: dataEdit[0].category,
      description: dataEdit[0].description,
    });

    setFileList(
      [
        {
          url: dataEdit[0].thumb,
          name: dataEdit[0].title,
        },
      ] || []
    );
    setContent(dataEdit[0].content);
    setThumbnail(dataEdit[0].thumb);
    setModalHeader('Edit News');
    showModalEdit();
  };
  const handleAddNew = () => {
    form.resetFields();
    setContent('');
    setId('');
    setThumbnail('');
    setFileList([]);
    setModalHeader('Add News');
    showModalEdit();
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setThumbnail(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

    return isJpgOrPng && isLt2M;
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const handleChangeEditor = (e) => {
    console.log('dsdasd');
  };
  const handleSubmit = async (data) => {
    let content = '';
    if (editorContentRef.current) {
      content = editorContentRef.current.getContent() || '';
    }

    let dataReq = {
      title: data.title,
      slug: data.slug,
      count: parseInt(data.count),
      thumb: thumbnail,
      category: data.category,
      description: data.description,
      content: content,
    };
    if (!id) {
      const dataRes = await newsApi.insertNews(dataReq);
      if (dataRes.success === true) {
        setIsModalEditOpen(false);
        setIsDelete(false);
      }
    } else {
      const dataRes = await newsApi.updateNews(id, dataReq);
      if (dataRes.success === true) {
        setIsModalEditOpen(false);
        setIsDelete(false);
      }
    }
    getPagingNews(pageSize, pageIndex);
  };
  const handleDelete = async (data) => {
    if (!id) {
    } else {
      let res = await newsApi.deleteNews(id);
      if (res.success === true) {
        setIsModalEditOpen(false);
        setIsDelete(false);
      }
    }
    getPagingNews(pageSize, pageIndex);
  };
  const handleChangeTitle = (value) => {
    form.setFieldsValue({
      slug: toSlug(value),
    });
  };
  return (
    <div className="container">
      <div className="create-movie">
        <h1 className="create-movie-title">Tin tức</h1>
        <Button onClick={handleAddNew}>Thêm tin tức</Button>
        <Table columns={columns.filter((col) => col.dataIndex !== 'id')} dataSource={newsList} />
        <Modal title={modalHeader} open={isModalEditOpen} footer={false} onCancel={handleCancel}>
          <Form onFinish={handleSubmit} autoComplete="off" layout="vertical" form={form}>
            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input title!',
                },
              ]}
            >
              <Input
                onChange={(e) => handleChangeTitle(e.target.value)}
                placeholder="Please input title!"
              />
            </Form.Item>
            <Form.Item
              label="Đường dẫn"
              name="slug"
              rules={[
                {
                  required: true,
                  message: 'Please input slug!',
                },
              ]}
            >
              <Input placeholder="Please input slug!" />
            </Form.Item>
            <Form.Item label="Lượt xem" name="count">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Chuyên mục" name="category">
              <Select
                showSearch
                style={{
                  width: 200,
                }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  {
                    value: 'review-phim',
                    label: 'Review',
                  },
                  {
                    value: 'phim-chieu-rap',
                    label: 'Phim chiếu rạp',
                  },
                  {
                    value: 'blog-phim',
                    label: 'Blog phim',
                  },
                  {
                    value: 'blog-sao',
                    label: 'Blog sao',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Miêu tả" name="description">
              <Input.TextArea placeholder="Please input description!" />
            </Form.Item>
            <Form.Item label="Nội dung" name="content" htmlFor="content">
              <div>
                <Editor
                  apiKey={'inq28en58nysf40wc60roky9ar3xuxdpthtlfhjq20fccana'}
                  onInit={(evt, editor) => {
                    editorContentRef.current = editor;
                  }}
                  initialValue={content}
                  onEditorChange={handleChangeEditor}
                  // value={formVal?.post_description}
                  init={{
                    height: 400,
                    menubar: false,
                    file_picker_callback: function (cb, value, meta) {
                      var input = document.createElement('input');
                      input.setAttribute('type', 'file');
                      input.setAttribute('accept', 'image/*');
                      input.onchange = function () {
                        var file = this.files[0];

                        var reader = new FileReader();
                        reader.onload = function () {
                          var id = 'blobid1' + new Date().getTime();
                          var blobCache = editorContentRef.current.editorUpload.blobCache;
                          var base64 = reader.result.split(',')[1];
                          var blobInfo = blobCache.create(id, file, base64);
                          blobCache.add(blobInfo);
                          /* call the callback and populate the Title field with the file name */
                          cb(blobInfo.blobUri(), { title: file.name });
                        };
                        reader.readAsDataURL(file);
                      };
                      input.click();
                    },

                    paste_data_images: true,
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: 'image',
                    plugins: [
                      'advlist',
                      'autolink',
                      'lists',
                      'link',
                      'image',
                      'charmap',
                      'preview',
                      'anchor',
                      'searchreplace',
                      'visualblocks',
                      'code',
                      'fullscreen',
                      'insertdatetime',
                      'media',
                      'table',
                      'code',
                      'help',
                      'wordcount',
                      'image',
                    ],
                    toolbar:
                      'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image | code',
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item label="Thumbnail" name="thumb">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                beforeUpload={beforeUpload}
                multiple={false}
                onChange={handleChange}
                maxCount={1}
                fileList={fileList}
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload
                    </div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>

              <Button primary htmlType="submit">
                Ok
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Delete New"
          open={isDelete}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button danger onClick={handleDelete}>
              Delete
            </Button>,
          ]}
        >
          <span color="danger">Bạn có chắc muốn xóa tin tức này?</span>
        </Modal>
      </div>
    </div>
  );
}
export default AdminNews;
