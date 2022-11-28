import { useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { movieActions } from '../../redux-toolkit/slice/movie';
import Comment from '../Comment';
import './style.scss';

function CommentSection(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const movie = useSelector((state) => state.movie.currentMovie);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const commentOption = {
    comment: { required: 'Bạn chưa nhập nội dung bình luận' },
  };

  const handleComment = (data) => {
    if (isLoggedIn && data) {
      dispatch(movieActions.addNewComment({ content: data.comment, movie: movie._id }));
      setValue('comment', '');
    }
    if (!isLoggedIn) {
      alert('Bạn chưa đăng nhập. Vui lòng đăng nhập trước khi bình luận');
      navigate('/dang-nhap');
    }
  };

  return (
    <div className="comment-section">
      <div className="section-title">
        <h3>Comment</h3>
      </div>
      <Container>
        <div className="comment-list">
          {movie ? (
            <>
              {movie.comments.map((comment, index) => (
                <Comment
                  key={index}
                  content={comment.content}
                  create_at={comment.createdAt}
                  URL_avatar={comment.user.URL_avatar}
                  username={comment.user.username}
                />
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
        <Form className="comment-create">
          <Form.Control
            as="textarea"
            name="comment"
            className="text-input-comment"
            {...register('comment', commentOption.comment)}
          />
          <Button
            className="btsubmit "
            style={{ width: '150px', marginTop: '20px' }}
            variant="info"
            type="submit"
            onClick={handleSubmit(handleComment)}
          >
            Bình luận
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default CommentSection;
