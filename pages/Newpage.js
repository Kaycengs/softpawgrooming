import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

const Newpage = () => {
    const [click, setClick] = useState(0)
    return (
        <div>
            <button onClick={()=> setClick(click+1)}>{click}wheels</button>
        </div>
    );
};

export default Newpage;

