import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <><a href="/">home</a><Component {...pageProps} /></>;
}
