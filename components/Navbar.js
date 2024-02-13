import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div>
          <div className="h-[50px] w-full flex flex-row align-middle justify-around rounded-2xl  p-4 bg-black mx-auto" ><Link href="/">home</Link><Link href="/Newpage">Newpage</Link><Link href="/win">win</Link> </div>  
        </div>
    );
};

export default Navbar;