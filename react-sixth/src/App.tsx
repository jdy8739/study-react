import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AniBox = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: tomato;
`;

function App() {
  return (
    <div className="App">
     <AniBox
      transition={{ type: 'spring', damping: 5, delay: 2 }}
      initial={{ scale: 0.3 }}
      animate={{ scale: 1, rotateZ: 360 }}
     />
    </div>
  );
}

export default App;
