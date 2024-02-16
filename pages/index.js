import Image from "next/image";
import { Inter } from "next/font/google";
import autoprefixer from "autoprefixer";
import Link from "next/link";
import { border, borderRadius } from "styled-system";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      className=" uppercase font-semibold min-h-screen min-w-screen flex flex-col align-middle justify-center text-blue-800 bg-pink-500 bg-  text-2xl text-center
"
    >

      <Image
      alt=""
      className=" full bottom-0 rounded-fill fixed hover:hue-rotate-60 hover:rotate-45 duration-1000 hover:scale-150 z-0 "
      src="/"
      height={1}
      width={1080}
    />
      <div></div>
      
    </div>
  );
}
