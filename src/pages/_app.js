// pages/_app.js
import "@/styles/globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={poppins.variable}>
      <Component {...pageProps} />
    </main>
  );
}
