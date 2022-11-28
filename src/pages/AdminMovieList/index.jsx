import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import adminApi from '../../api/adminApi';
import CreateEpisodeModal from '../../components/CreateEpisodeModal';
import MovieModal from '../../components/MovieModal';
import { adminActions } from '../../redux-toolkit/slice/admin';
import './style.scss';

function MovieList(props) {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.admin.movieList);
  const [showModalUpdateMovie, setShowModalUpdateMovie] = useState(false);
  const [data, setData] = useState([]);
  const [idMovieAddEpisode, setIdMovieAddEpisode] = useState('');
  const [showModalAddEpisode, setShowModalAddEpisode] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const fetchAllMovie = async () => {
    const res = await adminApi.getAllMovies();
    let newData = [];
    res.movies.map((movie) =>
      newData.push([
        movie.name,
        movie.other_name,
        movie.type_movie,
        movie.views,
        movie.likes,
        new Date(movie.createdAt).toLocaleString(),
        movie,
      ])
    );
    setData(newData);
  };

  useEffect(() => {
    dispatch(adminActions.fetchMovieList());
  }, [dispatch]);

  useEffect(() => {
    let newData = [];
    movieList.map((movie) =>
      newData.push([
        movie.name,
        movie.other_name,
        movie.type_movie,
        movie.views,
        movie.likes,
        new Date(movie.createdAt).toLocaleString(),
        movie,
      ])
    );
    setData(newData);
  }, [movieList]);

  const columns = [
    'Tên phim',
    'Tên khác',
    'Loại phim',
    'Lượt xem',
    'Lượt thích',
    'Ngày tạo',
    {
      name: 'Chỉnh sửa',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <>
            <Button
              variant="warning"
              className="button-edit"
              onClick={() => {
                setMovieSelected(value);
                setShowModalUpdateMovie(!showModalUpdateMovie);
              }}
            >
              {' '}
              Chỉnh sửa phim
            </Button>
            <Button
              onClick={() => {
                handleRemoveMovie(value);
              }}
              variant="danger"
              className="button-edit"
            >
              Xóa phim
            </Button>

            <Button
              onClick={() => {
                setShowModalAddEpisode(true);
                setIdMovieAddEpisode(value._id);
              }}
              variant="success"
              className="button-edit"
            >
              Thêm tập mới
            </Button>
          </>
        ),
      },
    },
  ];

  const options = {
    selectableRows: 'none',

    download: false,
    print: false,
  };

  const handleRemoveMovie = async (movie) => {
    if (window.confirm(`Bạn chắc chắn muốn xóa phim: ${movie.name}`) === true) {
      const res = await adminApi.removeMovie(movie._id);
      if (res.success === true) fetchAllMovie();
    }
  };

  const handleHideModalAddEpisode = () => {
    setShowModalAddEpisode(false);
  };

  const handleAddEpisode = async (data) => {
    console.log({
      name: data.name,
      movie: idMovieAddEpisode,
      sources: [
        {
          server: 'local',
          src: data.srcLocal,
        },
        {
          server: 'abyss',
          src: data.srcAbyss,
        },
        {
          server: 'mega',
          src: data.srcMega,
        },
        {
          server: 'ok',
          src: data.srcOk,
        },
      ],
    });
    const res = await adminApi.addNewEpisode({
      name: data.name,
      movie: idMovieAddEpisode,
      sources: [
        {
          server: 'local',
          src: data.srcLocal,
        },
        {
          server: 'abyss',
          src: data.srcAbyss,
        },
        {
          server: 'mega',
          src: data.srcMega,
        },
        {
          server: 'ok',
          src: data.srcOk,
        },
      ],
    });
    console.log(res);
    if (res.success) {
      handleHideModalAddEpisode();
      // setVideoUrl('');
      setIdMovieAddEpisode(undefined);
      reset();
    }
  };

  const handleUpdateMovie = (value) => {
    let update = {
      URL_image: value.URL_image,
      casts: value.cast,
      country: value.country,
      description: value.description,
      director: value.director,
      duration: value.duration,
      language: value.language,
      name: value.name,
      name_URL: value.name_URL,
      other_name: value.other_name,
      type_movie: value.type_movie,
      year: value.year,
    };
    if (value.genres !== undefined) {
      let newGenres = [];
      value.genres.forEach((genre) => newGenres.push(genre.value));
      update = { ...update, genres: newGenres };
    }
    dispatch(adminActions.updateMovie({ movieID: movieSelected._id, update }));
    setShowModalUpdateMovie(!showModalUpdateMovie);
  };

  const handleAddNewEpisode = (value) => {};
  return (
    <div className="">
      <MUIDataTable title={'Danh sách phim'} data={data} columns={columns} options={options} />

      {/* modal import video */}

      {showModalAddEpisode ? (
        <CreateEpisodeModal
          show={showModalAddEpisode}
          onHide={() => {
            window.confirm('ban khong tao tap phim moi');
            setShowModalAddEpisode(!showModalAddEpisode);
          }}
        />
      ) : (
        <></>
      )}

      {showModalUpdateMovie ? (
        <MovieModal
          show={showModalUpdateMovie}
          data={movieSelected}
          onHide={() => setShowModalUpdateMovie(!showModalUpdateMovie)}
          onSubmit={(update) => handleUpdateMovie(update)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default MovieList;
