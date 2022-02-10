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

function Home() {
    const { isLoading, data } = useQuery<IMovieList>(['movies', 'nowPlaying'], getMovies);
    console.log(data);
    return (
        <>
            {
                isLoading ?
                <h4>loading...</h4> :
                <Banner bg={ getBg(data?.results[0].backdrop_path || '') }>
                    <Title>{data?.results[0].title}</Title>
                    <Overview>{data?.results[0].overview}</Overview>
                </Banner>
            }
        </>
    )
}

export default Home;