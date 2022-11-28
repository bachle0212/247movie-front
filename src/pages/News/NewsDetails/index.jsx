import React, { useState, useEffect } from 'react';
import './style.scss';
import {
  InputGroup,
  DropdownButton,
  Dropdown,
  Form,
  Navbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import BlogMovie from '../../../components/News/BlogMovie';
import RightBlog from '../../../components/News/RightBlog';
import ReviewMovie from '../../../components/News/ReviewMovie';
import { useLocation } from 'react-router-dom';
import newsApi from '../../../api/newsApi';

function NewsDetails(props) {
  let location = useLocation();
  const [data, setData] = useState([]);
  const [relativeNews, setRelativeNews] = useState([]);
  const [mostCountList, setMostCountList] = useState([]);

  const getRelativeNews = async () => {
    let dataReq = {
      category: data.category || 'review-phim',
    };
    let slug = location.pathname.split('/')[3];
    let relativeNews = await newsApi.getRelative(slug, dataReq);
    setRelativeNews(relativeNews.news);
  };
  const getNewData = async () => {
    let slug = location.pathname.split('/')[3];
    let data = await newsApi.getBySlug(slug);
    setData(data.news);
  };
  const getMostCount = async () => {
    let dataReq = {
      pageSize: 1,
      pageIndex: 10,
    };
    let data = await newsApi.getByCount();
    setMostCountList(data.news);
  };
  useEffect(() => {
    getNewData();
    getRelativeNews();
    getMostCount();
  }, []);
  return (
    <>
      <div className="new-container">
        <div className="container">
          <div className="title-cate mt-3">
            <h1>Tin tức</h1>
          </div>
          <div className="new_navbar">
            <Navbar bg="transparent" expand="lg">
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/news/review-phim" style={{ color: '#febb00' }}>
                    <h5>REVIEW PHIM</h5>
                  </Nav.Link>
                  <Nav.Link href="/news/phim-chieu-rap" style={{ color: '#febb00' }}>
                    <h5>PHIM CHIẾU RẠP</h5>
                  </Nav.Link>
                  <Nav.Link href="/news/blog-phim" style={{ color: '#febb00' }}>
                    <h5>BLOG PHIM</h5>
                  </Nav.Link>
                  <Nav.Link href="/news/blog-sao" style={{ color: '#febb00' }}>
                    <h5>BLOG SAO</h5>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <div className="focus-review-block">
            <InputGroup className="mb-3">
              <DropdownButton
                variant="outline-secondary"
                title="Tìm kiếm"
                id="input-group-dropdown-1"
              >
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Separated link</Dropdown.Item>
              </DropdownButton>
              <Form.Control
                aria-label="Text input with dropdown button"
                placeholder="Nhập từ khóa......"
                style={{ background: 'white-gray' }}
              />
            </InputGroup>
          </div>
        </div>
      </div>
      <div className="new-content">
        <div className="container">
          <div class="row blog-movie">
            <div className="left-container col-md-9 col-sm-12 col-xs-12">
              <div className="cate-title">{data?.category}</div>
              <div className="item-title">
                <h1>{data?.title}</h1>
              </div>
              <div className="item-date">{new Date(data?.createdAt).toLocaleString}</div>
              <div
                className="item-content"
                dangerouslySetInnerHTML={{ __html: data?.content }}
              ></div>
              <ReviewMovie title={'Post liên quan'} data={relativeNews} />
            </div>
            <div className="right-container col-md-3 col-sm-12 col-xs-12">
              <RightBlog title={'Xem nhiều nhất'} data={mostCountList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsDetails;
