import Image from "next/image";
import { Inter } from "next/font/google";
import autoprefixer from "autoprefixer";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const something = [
    { name: "something" },
    { name: "else" },
    { name: "hello" },
  ];
  return (
    <div
      className=" uppercase font-semibold min-h-screen min-w-screen flex flex-col align-middle justify-center text-blue-800 text-2xl text-center
"
    >
      <Image
        alt=""
        className="w w-full h-full cover fixed top-0 left-0 right-0 bottom-0 z-[-1]"
        src="/vette.jpg"
        height={100}
        width={100}
      />
      <Link href="/win">hello</Link> <Link href="/Newpage">Newpage</Link>
      <div className="bg-green-800 transition-all duration-500 hover:text-red-500 hover:scale-150">
        {something.map((something2, i) => (
          <div key={i}>
            {something2.name} {i}
          </div>
        ))}
      </div>{" "}
      <Link
        rel="noopener"
        target="_blank"
        href="https://www.topgear.com/car-reviews/chevrolet/2dr/first-drive"
      >
        this is my first job{" "}
      </Link>
    </div>
  );
}
