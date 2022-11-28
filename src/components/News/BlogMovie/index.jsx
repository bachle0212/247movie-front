import React from 'react';
import { Card, CardGroup, Row, Col, Image } from 'react-bootstrap';
import './style.scss';
import { Link } from 'react-router-dom';
function BlogMovie(props) {
  let title = props.title;
  let data = props.data || [];
  console.log(title);
  return (
    <div className="">
      <div className="title-cate" style={{ marginTop: '50px' }}>
        <h2>{title}</h2>
      </div>
      {data &&
        data.slice(0, 5).map((item) => {
          return (
            <div className="blog-movie-item" key={item?._id}>
              <Row style={{ marginTop: '20px' }}>
                <Col lg={4}>
                  <Image
                    src={item?.thumb}
                    width="300px"
                    height="166px"
                    style={{ objectFit: 'cover' }}
                    className="image-content"
                  />
                </Col>

                <Col lg={7}>
                  <div className="item-infor">
                    <div className="item-title">
                      <a href={`/news/${item?.category}/${item?.slug}`}>{item?.title}</a>
                    </div>
                    <div className="item-description">
                      <p>{item?.description}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}
    </div>
  );
}

export default BlogMovie;
