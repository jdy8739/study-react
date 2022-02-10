const API_KEY = '9c36f611665ed3d1958c18199f8785ea';
const BASE_PATH = 'https://api.themoviedb.org/3';

export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
        .then((res) => res.json());
}

export function getBg(path: string, format?: string) {
    return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${path}`;
}