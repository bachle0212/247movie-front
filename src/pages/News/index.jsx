import React from 'react';
import { useEffect, useState } from 'react';

import './style.scss';
import { InputGroup, DropdownButton, Dropdown, Form, Navbar, Nav } from 'react-bootstrap';
import FocusReview from '../../components/News/FocusReview';
import BlogMovie from '../../components/News/BlogMovie';
import ReviewMovie from '../../components/News/ReviewMovie';
import RightBlog from '../../components/News/RightBlog';
import newsApi from '../../api/newsApi';
// index.propTypes = {

// };

function NewsPage(props) {
  const [mostCountList, setMostCountList] = useState([]);
  const [blogMovieList, setBlogMovieList] = useState([]);
  const [reviewMovie, setReviewMovie] = useState([]);
  const [starMovieList, setStarMovieList] = useState([]);
  const getBlogMovie = async () => {
    let dataReq = {
      pageSize: 1,
      pageIndex: 10,
    };
    let data = await newsApi.getPagingByCate('blog-phim');
    setBlogMovieList(data.news);
  };
  const getReviewMovie = async () => {
    let dataReq = {
      pageSize: 1,
      pageIndex: 10,
    };
    let data = await newsApi.getPagingByCate('review-phim');
    setReviewMovie(data.news);
  };
  const getStarList = async () => {
    let dataReq = {
      pageSize: 1,
      pageIndex: 10,
    };
    let data = await newsApi.getPagingByCate('blog-sao');
    setStarMovieList(data.news);
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
    getMostCount();
    getBlogMovie();
    getStarList();
    getReviewMovie();
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

            <FocusReview data={mostCountList} />
          </div>
        </div>
      </div>
      <div className="new-content">
        <div className="container">
          <div class="row blog-movie">
            <div className="left-container col-md-9 col-sm-12 col-xs-12">
              <BlogMovie title={'Blog Phim'} data={blogMovieList} />
              <ReviewMovie title={'Review Phim'} data={reviewMovie} />
              <BlogMovie title={'Blog Sao'} data={starMovieList} />
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

export default NewsPage;
