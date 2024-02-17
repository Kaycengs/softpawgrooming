import Image from "next/image";
import { Inter } from "next/font/google";
import autoprefixer from "autoprefixer";
import Link from "next/link";
import { border, borderRadius } from "styled-system";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="relative fit uppercase font-semibold min-h-screen min-w-screen flex flex-col align-middle justify-center text-blue-800 bg-pink-500 bg-  text-2xl text-center">
      {/*       <div className="text-white text-7xl font-bold  ">Bubbles</div> */}
      <Image
        alt="Logo"
        src="/dog-bath.gif"
        className="w-[100vmin] h-auto aspect-square left-[50%] hover:scale-105 hover:translate-y-[-2.5%] transition-all duration-300 translate-x-[-50%]  absolute bottom-0"
        height={1}
        width={1920}
      />
    </div>
  );
}
