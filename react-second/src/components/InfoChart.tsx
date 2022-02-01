import { useQuery } from "react-query";
import styled from "styled-components"
import { fetchInfoChart } from "../api";

function InfoChart({ coinId }: { coinId: string }) {

    const { isLoading, data } = useQuery(['infoElem', coinId], () => fetchInfoChart(coinId));
    console.log(data);

    return (
        <>
            <div>InfoChart</div>
        </>
    )
}

export default InfoChart;