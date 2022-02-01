import { useQuery } from "react-query";
import styled from "styled-components"
import { fetchPriceChart } from "../api";

function PriceChart({ coinId }: { coinId: string }) {

    const { isLoading, data } = useQuery(['priceElem', coinId], () => fetchPriceChart(coinId));
    console.log(data);

    return (
        <>
            PriceChart
        </>
    )
}

export default PriceChart;