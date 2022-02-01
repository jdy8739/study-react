import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { fetchCoins } from "../api";

const Title = styled.h1`
    font-size: 55px;
    display: block;
    text-align: center;
    margin-top: 260px;
`;

const CoinName = styled.h5`
    color: ${ props => props.theme.textColor };
    text-align: left;
    font-size: 18px;
    transition: all 0.4s;
    width: 380px;
    padding: 20px 0;
`;

const ListBox = styled.div`
    width: 430px;
    height: 75px;
    border: 1px solid ${ props => props.theme.boxColor };
    border-radius: 20px;
    background-color: ${ props => props.theme.bgColor };
    margin: 12px auto;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        ${ CoinName } {
            color: ${ props => props.theme.accentColor };
        }
    }
`;

const LoadingText = styled.h5`
    font-size: 20px;
    text-align: center;
`;

const CoinLogo = styled.img`
    width: 40px;
    height: 40px;
`;

interface ICoinList {
    id: string,
    is_active: true,
    is_new: false,
    name: string,
    rank: number,
    symbol: string,
    type: string
}

function Coin() {
    
    const { isLoading, data } = useQuery<ICoinList[]>('allCoins', fetchCoins);

    return (
        <>
            <Helmet><title>Coins</title></Helmet>
            <Title>COINS</Title>
            <br></br>
            {
                !isLoading ? 
                data?.slice(0, 30).map((coin, i) => {
                    return (
                        <div key={i}>
                        <ListBox>
                            <Link to={{
                                pathname: `detail/${ coin.id }`,
                                state: { name: coin.name }
                            }} style={{ display: 'flex', alignItems: 'center' }}>
                            &emsp;
                                <CoinLogo src={`https://cryptoicon-api.vercel.app/api/icon/${ coin.symbol.toLocaleLowerCase() }`}/>
                                <CoinName>&ensp; { coin.name } &rarr;</CoinName>
                            </Link>
                        </ListBox>
                        </div>
                    )
                })
                : <LoadingText>now on loading... please wait.</LoadingText>
            }
        </>
    )
}

export default Coin;
export { Title, LoadingText, CoinLogo };