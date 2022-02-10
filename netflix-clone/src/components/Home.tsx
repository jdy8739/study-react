import { AnimatePresence, motion } from "framer-motion";
import { off } from "process";
import { useState } from "react";
import { useQuery } from "react-query";
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
    title: string
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
    background-image: url(${ props => props.bg });
    height: 140px;
    background-size: cover;
    background-position: center center;
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

const offset = 6;

function Home() {
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
                                            <Box key={ i } bg={ getBg(a.backdrop_path) }>{ a.title }</Box>
                                        )
                                    })
                                }
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </>
            }
        </>
    )
}

export default Home;