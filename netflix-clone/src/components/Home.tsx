import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { off } from "process";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getBg, getMovies } from "../api";

const Banner = styled.div<{ bg?: string }>`
    width: 100vw;
    height: 100vh;
    background-image: 
    linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url(${props => props.bg});
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    padding: 50px;
    color: white;
`;

const Title = styled.h2`
    font-size: 48px;
    margin-bottom: 0px;
`;

const Overview = styled.p`
    margin-top: 0px;
    font-size: 18px;
    width: 600px;
`;

interface IMovieData {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    original_language: string,
    overview: string,
    release_data: string,
    title: string,
    id: number
}

interface IMovieList {
    page: number,
    results: IMovieData[],
    total_pages: number,
    total_results: number
}

const Slider = styled.div`
    position: relative;
`;

const Row = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    position: absolute;
    width: 100%;
    margin-top: -150px;
`;

const Box = styled(motion.div)<{ bg?: string }>`
    background-color: red;
    height: 140px;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

const Thumbnail = styled.img`
    width: 100%;
    height: 100%;
`;

const Info = styled(motion.div)`
    background-color: red;
    width: 100%;
    height: 40px;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`;

const Modal = styled(motion.div)`
    background-color: grey;
    width: 45%;
    min-width: 490px;
    height: 60%;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto auto;
    border-radius: 20px;
    overflow: hidden;
    text-align: center;
    color: white;
`;

const Overlay = styled(motion.div)`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    opacity: 0;
`;

const rowVariant = {
    start: {
        x: window.innerWidth + 10
    },
    end: {
        x: 0,
    },
    exit: {
        x: -window.innerWidth - 10
    }
};

const boxVariant = {
    hover: {
        scale: 1.4,
        y: -100,
        transition: {
            delay: 0.5,
            type: 'tween'
        },
        opacity: 1,
        zIndex: 99
    }
};

const infoVariant = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5
        }
    }
};

const offset = 6;

function Home() {

    const navi = useNavigate();

    const movieMatch = useMatch('/movie/:id');
    console.log(movieMatch);

    const showModal = (id: number) => navi(`/movie/${id}`);

    const hideModal = () => {
        navi('/');
    };

    const { isLoading, data } = useQuery<IMovieList>(['movies', 'nowPlaying'], getMovies);

    const [leaving, setLeaving] = useState(false);

    const [index, setIndex] = useState(0);

    const handleSetIndex = () => {
        if(leaving) return;
        toggleLeaving();
        if(data) {
            setIndex(index => (data?.results.length - 1) / offset - 2 > index ? index + 1 : 0);
        }
    };

    const toggleLeaving = () => {
        setLeaving(leaving => !leaving);
    };

    const { scrollY } = useViewportScroll();

    const clickedMovie = data?.results.find(movie => movieMatch?.params.id === movie.id + '');
    console.log(clickedMovie);

    return (
        <>
            {
                isLoading ?
                <h4>loading...</h4> :
                <>
                    <Banner bg={ getBg(data?.results[0].backdrop_path || '') } onClick={handleSetIndex}>
                        <Title>{data?.results[0].title}</Title>
                        <Overview>{data?.results[0].overview}</Overview>
                    </Banner>
                    <Slider>
                        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                            <Row 
                            key={index}
                            variants={rowVariant}
                            initial="start"
                            animate="end"
                            exit="exit"
                            transition={{
                                type: 'tween',
                                duration: 1
                            }}
                            >
                                {
                                    data?.results.slice(offset * index + 1, offset * index + offset + 1).map((a: IMovieData, i) => {
                                        return (
                                            <Box
                                            layoutId={a.id + ''}
                                            onClick={() => showModal(a.id)}
                                            variants={boxVariant}
                                            whileHover="hover"
                                            transition={{
                                                type: 'tween'
                                            }}
                                            key={ i } bg={ getBg(a.backdrop_path) }>
                                                <Thumbnail src={ getBg(a.backdrop_path, 'w500') }/>
                                                <Info variants={infoVariant}>
                                                    <h4>{ a.title }</h4>
                                                </Info>
                                            </Box>
                                        )
                                    })
                                }
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    {
                        movieMatch === null ? null :
                        <>
                            <Overlay 
                            onClick={hideModal} 
                            animate={{ opacity: 1 }}
                            />
                            <AnimatePresence>
                                <Modal 
                                layoutId={movieMatch.params.id}
                                style={{
                                    top: scrollY.get() + 150
                                }}
                                >
                                    <div style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '70%',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center center',
                                        backgroundImage: `linear-gradient(to top, black, transparent), 
                                            url(${ getBg(clickedMovie ? clickedMovie?.backdrop_path : '') })`
                                    }}>
                                        <h1 style={{
                                            position: 'absolute',
                                            left: '20px',
                                            bottom: '0px'
                                        }}>{ clickedMovie?.title }
                                        </h1>
                                    </div>
                                    {
                                        !clickedMovie ? null :
                                        <div style={{ padding: '10px' }}>
                                            <p>{ clickedMovie?.overview.length > 170 
                                            ? clickedMovie?.overview.slice(0, 170) + '...'
                                            : clickedMovie?.overview }</p>
                                        </div>
                                    }
                                </Modal>
                            </AnimatePresence> 
                        </>
                    }
                </>
            }
        </>
    )
}

export default Home;