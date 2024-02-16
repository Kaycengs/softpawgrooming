import Image from "next/image"
import { Inter } from "next/font/google";
import autoprefixer from "autoprefixer";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
;
  return (
    <div
      className=" uppercase font-semibold min-h-screen min-w-screen flex flex-col align-middle justify-center text-blue-800 text-2xl text-center
"
    >
      <Image
        alt=""
        className="self-center"
        src="/IMG_2637.jpg"
        height={540}
        width={810}
      />
      <Image
        alt=""
        className="w-200px h-100px cover bottom-0 fixed left-1 z-[1]"
        src="/IMG1.jpg"
        height={200}
        width={200}
      />
      <Image
      alt=""
      className="w-200px h-200px cover fixed top-0 left-0 right-0 bottom-0 z-[0]"
      src="/IMG2.jpg"
      height={200}
      width={200}
    />
    </div>
  );
}
