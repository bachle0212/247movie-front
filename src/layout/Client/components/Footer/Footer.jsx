import React from 'react';
import './style.scss';
// react-bootstrap
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

Footer.propTypes = {};

function Footer(props) {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <p className="title">Phim lẻ</p>
            <Link className="footer-link" to="/phim-le/hanh-dong">
              Phim hành động
            </Link>
            <Link className="footer-link" to="/phim-le/kiem-hiep">
              Phim kiếm hiệp
            </Link>
            <Link className="footer-link" to="/phim-le/kinh-di">
              Phim kinh dị
            </Link>
            <Link className="footer-link" to="/phim-le/vien-tuong">
              Phim viễn Tưởng
            </Link>
            <Link className="footer-link" to="/phim-le/hoat-hinh">
              Phim Hoạt hình
            </Link>
          </Col>
          <Col md={4}>
            <p className="title">Phim bộ</p>
            <Link className="footer-link" to="/phim-le/">
              Phim siêu anh hùng
            </Link>
            <Link className="footer-link" to="/phim-le/">
              Phim tình cảm
            </Link>
            <Link className="footer-link" to="/phim-le/">
              Phim tài liệu
            </Link>
            <Link className="footer-link" to="/phim-le/">
              Phim hài
            </Link>
            <Link className="footer-link" to="/phim-le/">
              Phim thảm họa
            </Link>
          </Col>
          <Col md={4}>
            <p className="title">TV Show</p>
            <Link className="footer-link" href="/phim-bo/">
              Phim bộ Hàn Quốc
            </Link>
            <Link className="footer-link" href="/phim-bo/">
              Phim bộ Trung Quốc
            </Link>
            <Link className="footer-link" href="/phim-bo/">
              Phim bộ Mỹ
            </Link>
            <Link className="footer-link" href="/phim-bo/">
              Phim bộ Việt Nam
            </Link>
            <Link className="footer-link" href="/phim-bo/">
              Phim bộ Hồng Kông
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
