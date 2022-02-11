import { useLocation } from "react-router-dom";




function Search() {
    const location  = useLocation();
    console.log(location);

    const keyword = new URLSearchParams(location.search).get('keyword');
    console.log(keyword);
    return (
        <>
            <h1
            style={{
                position: 'absolute',
                left: '0',
                right: '0',
                margin: '300px auto',
                textAlign: 'center'
            }}
            >{`You have searched ${ keyword }.`}</h1>
        </>
    )
}

export default Search;