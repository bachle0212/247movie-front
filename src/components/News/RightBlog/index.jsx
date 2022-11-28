import React from 'react';
import { Card, CardGroup, Row, Col, Image } from 'react-bootstrap';
import './style.scss';
import { Link, redirect } from 'react-router-dom';
function RightBlog(props) {
  let title = props.title;
  let data = props.data || [];
  return (
    <div className="" style={{ marginTop: '50px' }}>
      <div className="title-cate" style={{ borderBottom: '1px solid #405266' }}>
        <h2> {title}</h2>
      </div>
      <br />
      <div>
        {data &&
          data.slice(0, 10).map((item) => {
            return (
              <Row style={{ marginTop: '10px' }}>
                <Col lg={4}>
                  <a href={`/news/${item?.category}/${item.slug}`}>
                    <Image src={item?.thumb} className="right-image"></Image>
                  </a>
                </Col>
                <Col lg={8}>
                  <div className="item-description">
                    <a href={`/news/${item?.category}/${item.slug}`}>
                      <h6>{item?.description}</h6>
                    </a>
                  </div>
                </Col>
              </Row>
            );
          })}
      </div>
    </div>
  );
}

export default RightBlog;
