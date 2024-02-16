import Image from "next/image"
import { Inter } from "next/font/google";
import autoprefixer from "autoprefixer";
import Link from "next/link";
import { border, borderRadius } from "styled-system";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
;
  return (
    <div
      className=" uppercase font-semibold min-h-screen min-w-screen flex flex-col align-middle justify-center text-blue-800 text-2xl text-center aspect-auto
"
    >
      <Image
        alt="Logo"
        className=" self-center rounded-full fixed hover:hue-rotate-180 hover:flip duration-500 transition-all border-pink-500 "
        src="/IMG_2637.jpg"
        height={1}
        width={500}
      />
      <Image
        alt="dead poodle"
        className="border rounded-xl bg-white border-white"
        src="/IMG1.jpg"
        height={200}
        width={200}
      />
      <Image
      alt="white dog"
      className="transform rounded-xl border border-white"
      src="/IMG2.jpg"
      height={200}
      width={200}
      />
      <Image
      alt=""
      className="transform rounded-xl border border-white"
      src="/IMG3.jpg"
      height={200}
      width={200}
    />
    </div>
  );
}