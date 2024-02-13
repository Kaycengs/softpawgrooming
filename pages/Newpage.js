import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

const Newpage = () => {
    const [click, setClick] = useState(0)
    const [tab, setTab] = useState(false)
    return (
        <div className='ksdjflj uppercase font-semibold min-h-screen min-w-screen flex flex-col align-middle justify-center' >
            <button onClick={()=> setClick(click+8)}>i have {click} wheels</button><br/>
            <button onClick={()=> setTab(!tab)}>toggle buttons</button><br/>
            {tab && <button onClick={()=> setClick(0)}>i have {click} wheels</button>}<br/>
        </div>
    );
};

export default Newpage;

