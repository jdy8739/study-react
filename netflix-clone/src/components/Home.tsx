import { AnimatePresence, motion } from "framer-motion";
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
    gap: 10px;
    position: absolute;
    width: 100%;
    margin-top: -150px;
`;

const Box = styled(motion.div)`
    background-color: red;
    height: 140px;
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

function Home() {
    const { isLoading, data } = useQuery<IMovieList>(['movies', 'nowPlaying'], getMovies);

    const [index, setIndex] = useState(0);
    const handleSetIndex = () => {
        setIndex(index => index + 1);
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
                        <AnimatePresence>
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
                                    [0, 1, 2, 3, 4, 5].map((a, i) => {
                                        return (
                                            <Box  key={ i }>{ a }</Box>
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