import React, { useEffect, useRef, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import videojs from 'video.js';
import './style.scss';
// components
import poster from '../../assets/photos/logo.svg';
import CommentSection from '../../components/CommentSection';
import InformationMovie from '../../components/InformationMovie';
import MovieList from '../../components/Movie/MovieList';
import VideoJS from '../../components/VideoJS';
import { movieActions } from '../../redux-toolkit/slice/movie';
import convertToUrl from '../../utils/convertToUrl';
// import { BsEmojiSmileUpsideDown } from 'react-icons/bs';

Watch.propTypes = {};

function Watch(props) {
  const playerRef = useRef(null);
  const currentEpisode = useSelector((state) => state.movie.currentEpisode);
  // const [currentSource, setCurrentSource] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const currentMovie = useSelector((state) => state.movie.currentMovie);
  const [serverVideo, setServerVideo] = useState({});

  useEffect(() => {
    const updateCurrentEpisode = (episodes) => {
      episodes.forEach((episode) => {
        if (episode.name_URL === location.pathname.split('/')[3]) {
          dispatch(movieActions.updateCurrentEpisode(episode));
          setServerVideo(episode.sources[0]);
        }
      });
    };
    if (currentMovie) updateCurrentEpisode(currentMovie?.episodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMovie, location.pathname]);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    // player.on('dispose', () => {
    //   videojs.log('player will dispose');
    // });
  };

  // useEffect(() => {
  //   currentMovie?.sources?.map((source) => {
  //     if (source.server === serverVideo) setCurrentSource(source.src);
  //   });
  // }, [serverVideo]);

  const handleChangeEpisode = (e) => {
    // currentMovie.episodes.foreach((episode) => {
    //   if (episode.name === e.target.innerText) {
    //     dispatch(movieActions.updateView(currentMovie._id));
    //     window.scrollTo(0, 0);
    //   }
    // });
  };
  const handleChooseSrc = () => {
    let src = '';
    currentEpisode.sources.forEach((source) => {
      if (source.server === serverVideo) src = source.src;
    });
    return src;
  };
  return (
    <>
      {/* watch movie section  */}
      <div className="player">
        <Container style={{ backgroundColor: '#000' }}>
          {/* player */}
          {!currentEpisode ? (
            <>{console.log(123)}</>
          ) : (
            <>
              <iframe
                title="video abyss"
                width="100%"
                height="600"
                src={serverVideo.src}
                frameborder="0"
                scrolling="0"
                allowfullscreen
              ></iframe>
              {console.log(
                currentEpisode.sources.find((source) => {
                  if (source.server === 'abyss') return source;
                })
              )}
            </>
          )}
          {/* {serverVideo === 'local' ? (
            <VideoJS
              options={{
                autoplay: false,
                controls: true,
                responsive: true,
                fluid: true,
                playbackRates: [0.5, 1, 1.5, 2],
                controlBar: {
                  subsCapsButton: true,
                },
                poster: poster,
                sources: [
                  {
                    src: currentEpisode ? currentEpisode.sources[0].src : '',
                    type: 'video/mp4',
                  },
                ],
              }}
              onReady={handlePlayerReady}
            />
          ) : serverVideo === 'abyss' ? (
            <iframe
              title="video abyss"
              width="100%"
              height="600"
              src={currentEpisode ? currentEpisode.sources[0].src : ''}
              frameborder="0"
              scrolling="0"
              allowfullscreen
            ></iframe>
          ) : serverVideo === 'mega' ? (
            <iframe
              title="video mega"
              width="100%"
              height="600"
              frameborder="0"
              src={currentEpisode ? currentEpisode.sources[3].src : ''}
              allowfullscreen
            ></iframe>
          ) : serverVideo === 'ok' ? (
            <iframe
              title="video ok"
              width="100%"
              height="600"
              src={currentEpisode ? currentEpisode.sources[2].src : ''}
              frameborder="0"
              allow="autoplay"
              allowfullscreen
            ></iframe>
          ) : (
            <></>
          )} */}
          {/* section change server video */}
          <div className="servers" style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="button"
              variant="info"
              onClick={() =>
                currentEpisode.sources.find((source) => {
                  if (source.server === 'local') setServerVideo(source);
                })
              }
              className={`change-server  ${serverVideo.server === 'local' ? 'disabled' : ''} `}
            >
              Server local
            </Button>
            <Button
              variant="info"
              onClick={() =>
                currentEpisode.sources.find((source) => {
                  if (source.server === 'abyss') setServerVideo(source);
                })
              }
              className={`change-server  ${serverVideo.server === 'abyss' ? 'disabled' : ''} `}
            >
              Server abyss
            </Button>
            <Button
              variant="info"
              onClick={() =>
                currentEpisode.sources.find((source) => {
                  if (source.server === 'mega') setServerVideo(source);
                })
              }
              className={`change-server  ${serverVideo.server === 'mega' ? 'disabled' : ''} `}
            >
              Server mega
            </Button>
            <Button
              variant="info"
              onClick={() =>
                currentEpisode.sources.find((source) => {
                  if (source.server === 'ok') setServerVideo(source);
                })
              }
              className={`change-server  ${serverVideo.server === 'ok' ? 'disabled' : ''} `}
            >
              Server ok
            </Button>
          </div>
          {/* movie summary */}
          <InformationMovie type="summary" />
          {/* {infomationMovie ? (
            <div className="summary">
              <h2 className="summary__name">{infomationMovie.name}</h2>
              <h4 className="summary__othername">
                {infomationMovie.other_name}({infomationMovie.year})
              </h4>
            </div>
          ) : (
            <></>
          )}

          <Rating /> */}
          {/* episode section */}
          <div className="episode-section">
            <div className="episode-section-title">
              <h3 className="title">Tập phim</h3>
            </div>
            <ul className="list-movie-episodes">
              {currentMovie?.episodes?.map((item, index) => (
                <li className={'movie-episode '} key={index}>
                  <Link
                    onClick={handleChangeEpisode}
                    to={`/xem-phim/${currentMovie.name_URL}/` + convertToUrl(item.name)}
                  >
                    {' '}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* nominations section */}
          <div className="nominations">
            <div className="container">
              <MovieList
                movieListTitle="Phim liên quan"
                query={{
                  // genres: infomationMovie?.genres[0]._id,
                  _page: '1',
                  _limit: '12',
                }}
              />
            </div>
          </div>
          {/* Comment section */}
          <CommentSection />
        </Container>
      </div>
    </>
  );
}

export default Watch;
