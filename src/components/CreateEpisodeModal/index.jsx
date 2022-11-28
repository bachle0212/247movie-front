import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { Controler, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

CreateEpisodeModal.propTypes = {};

function CreateEpisodeModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [sources, setSources] = useState([{ source_name: '', src: '' }]);

  const handleAddNew = () => {
    setSources([...sources, { source_name: '', src: '' }]);
  };

  const handleRemove = (index) => {
    const list = [...sources];
    list.splice(index, 1);
    setSources(list);
  };
  return (
    <Modal show={props.show} onHide={props.onHide} size={'lg'}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Tập phim mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>Tên tập phim</Form.Label>
          <Form.Control type="text" {...register('name')} placeholder="Tên tập phim" />
          <Form.Label>Sources</Form.Label>
          {sources.map((source, index) => (
            <Row key={index} style={{ marginTop: '10px' }}>
              <Col md={4}>
                <Form.Control type="text" {...register('sourceName')} placeholder="Server name" />
              </Col>
              <Col md={6}>
                <Form.Control type="text" {...register('src')} placeholder="Url server" />
              </Col>

              <Col md={1}>
                <Button onClick={handleAddNew}>Thêm</Button>
              </Col>
              {index !== 0 ? (
                <Col md={1}>
                  <Button onClick={() => handleRemove(index)} variant="danger">
                    Xóa
                  </Button>
                </Col>
              ) : (
                <></>
              )}
            </Row>
          ))}

          <Button
            type="button"
            variant="success"
            size="lg"
            style={{ float: 'right', margin: '20px 10px' }}
            onClick={handleSubmit()}
          >
            Thêm tập mới
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateEpisodeModal;
