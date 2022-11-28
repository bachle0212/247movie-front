import React from 'react';
import { Card, CardGroup, Row, Col, Image, Button } from 'react-bootstrap';
import './style.scss';
import { Link } from 'react-router-dom';
function ReviewMovie(props) {
  let title = props.title;
  let data = props.data || [];
  return (
    <div className="">
      <div className="title-cate" style={{ marginTop: '50px' }}>
        <h2>{title}</h2>
      </div>
      <Row>
        {data &&
          data.slice(0, 6).map((item) => {
            return (
              <Col lg={4} key={item?._id}>
                <Card style={{ width: '16rem', background: 'rgb(7,24,41)', marginTop: '10px' }}>
                  <Card.Img
                    variant="top"
                    src={item?.thumb}
                    style={{ objectFit: 'cover' }}
                    height="120px"
                  />
                  <Card.Body>
                    <Card.Title className="item-title">
                      <a href={`/news/${item?.category}/${item?.slug}`}>{item?.title}</a>
                    </Card.Title>
                    <Card.Text className="item-description">{item?.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default ReviewMovie;
