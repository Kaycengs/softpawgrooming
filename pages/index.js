import Image from "next/image";
import { Inter } from "next/font/google";
import autoprefixer from "autoprefixer";
import Link from "next/link";
import { border, borderRadius } from "styled-system";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      className=" fit uppercase font-semibold min-h-screen min-w-screen flex flex-col align-middle justify-center text-blue-800 bg-pink-500 bg-  text-2xl text-center"
      >
      <Image
      alt="Logo"
      src="/dog bath.gif"
      className="align center"
      height={1}
      width={1920}
    />
    
      <div></div>
    </div>
  );
}
