const BASE_URL = 'https://api.coinpaprika.com/';

export function fetchCoins() {
    return fetch(`${ BASE_URL }v1/coins`).then(res => res.json());
}

export function fetchInfo(coinId: string) {
    return fetch(`${ BASE_URL }v1/coins/${ coinId }`).then((res) => res.json());
}

export function fetchPrice(coinId: string) {
    return fetch(`${ BASE_URL }v1/tickers/${ coinId}`).then((res) => res.json());
}

export function fetchPriceChart(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 6;
    console.log(endDate);
    return fetch(`${ BASE_URL }v1/coins/${ coinId }/ohlcv/historical?start=${ startDate }&end=${ endDate }`)
        .then((res) => res.json());
}

export function fetchInfoChart(coinId: string) {
    return fetch(`${ BASE_URL }#tag/Coins/paths/~1coins~1${ coinId }~1ohlcv~1historical/get`)
        .then((res) => res.json());
}