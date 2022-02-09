import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { motion, useViewportScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { useState } from 'react';

const HeaderForm = styled(motion.div)`
    background-color: black;
    width: 100vw;
    height: 90px;
    position: fixed;
    top: 0px;
`;

const Nav = styled.div`
    display: flex;
    height: 100%;
`;

const Col = styled.div<{ width: number }>`
    width: ${ props => props.width }%;
    display: flex;
    align-items: center;
`;

const Logo = styled(motion.svg)`
    width: 150px;
    min-width: 150px;
    margin: 0 50px;
`;

const Item = styled.p`
    color: white;
    font-size: 18px;
    margin: 0 15px;
    position: relative;
`;

const Dot = styled(motion.div)`
    background-color: red;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    position: absolute;
    left: 40%;
    top: 120%;
    translate: (-50%, -50%);
`;

const Input = styled(motion.input)`
    background-color: transparent;
    padding: 6px;
    color: white;
    transform-origin: right center;
`;

const aStyle = { 
    textDecoration: 'none', 
    color: 'white' 
};

const logoVariants = {
    normal: {
        fillOpacity: 1
    },
    active: {
        fillOpacity: [1, 0,3, 1, 0.6, 1, 0.6, 1, 0.3, 1],
        transition: {
            duration: 3,
            repeat: Infinity
        }
    }
};



function Header() {

    const homeMatch = useMatch('/');
    const tvMatch = useMatch('/tv');

    const [isShowBar, setIsShowBar] = useState(false);
    const showSearchBar = () => {
        setIsShowBar(prev => !prev);
    };

    const [isHeaderBlack, setIsHeaderBlack] = useState(true);
    const { scrollY } = useViewportScroll();
    scrollY.onChange(() => {
        if(scrollY.get() > 30) setIsHeaderBlack(false);
        else setIsHeaderBlack(true);
    })

    return (
        <>
            <HeaderForm animate={{ backgroundColor: !isHeaderBlack ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 1)' }}>
                <Nav>
                    <Col width={40}>
                        <Logo
                        variants={logoVariants}
                        whileHover="active"
                        initial="normal"
                        xmlns="http://www.w3.org/2000/svg"
                        width="1024"
                        height="276.742"
                        viewBox="0 0 1024 276.742"
                        fill='red'
                        >
                        <motion.path 
                        d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" 
                        />
                        </Logo>
                        <Item>
                            <Link to='/' style={aStyle}>
                                Home{ homeMatch !== null && <Dot layoutId="dot"/> }
                            </Link>
                        </Item>
                        <Item>
                            <Link to='/tv' style={aStyle}>
                                Tv Shows{ tvMatch !== null && <Dot layoutId="dot"/> }
                            </Link>
                        </Item>
                    </Col>
                    <Col width={60} style={{ justifyContent: 'flex-end' }}>
                        <motion.div
                        initial={{
                            x: 190
                        }}
                        animate={{
                            x: isShowBar ? 0 : 190
                        }}
                        >
                            <FontAwesomeIcon icon={faMagnifyingGlass} 
                            color='white'
                            onClick={showSearchBar}
                            />
                        </motion.div>
                        &emsp;
                        <Input placeholder="Title, Peoples, Genres"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isShowBar ? 1 : 0 }}
                        />
                        <div style={{ width: '70px' }}></div>
                    </Col>
                </Nav>
            </HeaderForm>
        </>
    )
}

export default Header;