import React from 'react';
import { Card, CardGroup, Row, Col } from 'react-bootstrap';
import './style.scss';
import { Link } from 'react-router-dom';
function FocusReview(props) {
  let mostCountList = props.data || [];
  return (
    <div className="">
      <div className="title-cate">
        <h2> Tiêu điểm Review</h2>
      </div>
      <Row>
        {mostCountList &&
          mostCountList.slice(0, 4).map((item) => {
            return (
              <Col sm={3} key={item?._id}>
                <Card>
                  <Card.Img variant="top" src={item?.thumb} height={370} />
                  <Card.ImgOverlay>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        color: 'white',
                        margin: 0,
                        padding: '15px',
                        background: 'rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      <a href={`/news/${item?.category}/${item?.slug}`}>
                        <Card.Title style={{ textTransform: 'uppercase' }}>
                          {item?.title}
                        </Card.Title>
                      </a>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default FocusReview;
