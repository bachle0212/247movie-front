import React from 'react';
import PropTypes from 'prop-types';
import { BsPersonFill } from 'react-icons/bs';
import { Row, Col } from 'react-bootstrap';
import './style.scss';

Comment.propTypes = {
  URL_avatar: PropTypes.string,
  username: PropTypes.string,
  content: PropTypes.string,
};

function Comment(props) {
  return (
    <Row className="comment">
      <Col xs={12} md={2} className="preview-user">
        <div className="preview-user-avatar">
          {props.URL_avatar ? (
            <img src={props.URL_avatar} alt="" />
          ) : (
            <BsPersonFill style={{ fontSize: '57px' }} />
          )}
        </div>
        <p className="preview-username ">{props.username}</p>
      </Col>
      <Col xs={12} md={10} className=" comment-content">
        <>
          <p style={{ fontSize: '14px', color: '#8f8f8f' }}>
            {new Date(props.create_at).toLocaleString('en-GB', { hour12: false })}
          </p>
        </>
        <p>{props.content}</p>
      </Col>
    </Row>
  );
}

export default Comment;
