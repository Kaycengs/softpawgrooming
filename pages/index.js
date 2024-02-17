import Image from "next/image";
import { Inter } from "next/font/google";
import autoprefixer from "autoprefixer";
import Link from "next/link";
import { border, borderRadius } from "styled-system";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const embedUrl = `https://www.youtube.com/embed/kuYVEbNKOag?autoplay=1&mute=1&controls=0&loop=1&playlist=kuYVEbNKOag`;

  return (
    <div className="relative fit uppercase font-semibold min-h-screen min-w-screen flex flex-col align-middle justify-center text-blue-800 bg-pink-500 bg-  text-2xl text-center">
      {/*       <div className="text-white text-7xl font-bold  ">Bubbles</div> */}
      <div className="video-container mx-auto">
        <iframe
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; nocontrols; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="video-iframe"
        ></iframe>
      </div>
    </div>
  );
}
