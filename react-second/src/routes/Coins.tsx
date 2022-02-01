import { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { Title, LoadingText, CoinLogo } from './Coin';
import { IPriceData, IInfoData } from "../DataInterfaces";
import { useQuery } from "react-query";
import { fetchInfo, fetchPrice } from "../api";
import PriceChart from '../components/PriceChart';
import InfoChart from '../components/InfoChart';
import { Helmet } from "react-helmet";

interface IParams {
    id: string
}

interface ILocation {
    name: string
}


const SubTitle = styled(Title)`
    font-size: 25px;
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Bar = styled.div`
    width: 420px;
    height: 75px;
    background-color: ${ props => props.theme.boxColor };
    border-radius: 22px;
    margin: 30px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
`;

const TabContainer = styled.div`
    margin: auto;
    width: 450px;
    display: flex;
    justify-content: space-between;
`;

const Tab = styled.button<{ isActive?: boolean }>`
    width: 135px;
    height: 30px;
    border: 1px solid ${ props => props.theme.textColor };
    background-color: ${ props => props.theme.bgColor };
    color: ${ props => props.isActive ? props.theme.accentColor : 'inherit' };
    border-radius: 12px;
    cursor: pointer;
    transition: color 1s;
`;

function Coins() {
    const { id } = useParams<IParams>();
    const { state } = useLocation<ILocation>();

    const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(['infoData', id], () => fetchInfo(id));
    const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(['priceData', id], () => fetchPrice(id));

    const isLoading = infoLoading || priceLoading;
    
    const infoMatch = useRouteMatch('/detail/:id/info');
    const priceMatch = useRouteMatch('/detail/:id/price');

    return (
        <>
            <Helmet><title>{ id }</title></Helmet>
            <Title>{ state?.name ? state.name : isLoading ? 'loading...' : infoData?.id }</Title>
            <SubTitle>
                <p>{ id }</p>
                &ensp;
                <CoinLogo src={`https://cryptoicon-api.vercel.app/api/icon/${ infoData?.symbol?.toLocaleLowerCase() }`}/>
            </SubTitle>
            {
                isLoading ?
                <LoadingText>loading ...</LoadingText>
                :
                <>
                    <Bar>
                    <p>Rank: { infoData?.rank }</p>
                        <p>Symbol: { infoData?.symbol }</p>
                        <p>Open Source: { infoData?.open_source ? 'yes' : 'no' }</p>
                    </Bar>
                    <p style={{ width: '400px', margin: 'auto' }}>{ infoData?.description === '' ? 'No Descriptions' : infoData?.description }</p>
                    <Bar>
                        <p>Total Supply: { priceData?.total_supply }</p>
                        <p>Max Supply: { priceData?.max_supply }</p>
                    </Bar>
                    <TabContainer>
                        <Link to={`/detail/${ id }/info`}>
                            <Tab isActive={ infoMatch?.isExact }>info</Tab>
                        </Link>
                        <Link to={`/detail/${ id }/price`}>
                            <Tab isActive={ priceMatch?.isExact }>price</Tab>
                        </Link>
                        <Link to={`/`}>
                            <Tab>home</Tab>
                        </Link>
                    </TabContainer>
                    <Switch>
                        <Route path={`/detail/${ id }/info`}>
                            <InfoChart coinId={ id }/>
                        </Route>
                        <Route path={`/detail/${ id }/price`}>
                            <PriceChart coinId={ id }/>
                        </Route>
                    </Switch>
                </>
            }
        </>
    )
}

export default Coins;