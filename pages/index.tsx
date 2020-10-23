import { useEffect, useState } from "react";
import Head from "next/head";

import BlurSplash from "./experiences/BlurSplash";
import HashToImage from "./experiences/HashToImage";
import Transformer from "./experiences/Transformer";
import Animation from "./experiences/Animation";
import { Blurhash } from "react-blurhash";
import Section from "../components/Section";

const makeidOne = (length: number) => {
  var result = "";
  var characters = "GU";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
const makeid = (length: number) => {
  var result = "";
  var characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#,!_.1234567890";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const Home = () => {
  const [hash, setHash] = useState<string | null>(null);
  let [reload, setReload] = useState<boolean>(false);
  useEffect(() => {
    setHash(`${makeidOne(1)}${makeid(35)}`);

    console.log("click");
  }, [reload]);
  return (
    <div className="container">
      <Head>
        <title>BlurHash Playground - @LukyVj</title>
        {/* <link rel="icon" href="/favicon.svg" /> */}
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%220%22 fill=%22%230000ff%22></rect><path stroke-width=%223%22 stroke=%22white%22 d=%22M28.77 80L9.04 80L9.04 23.13L27.64 23.13Q36.89 23.13 41.56 26.95Q46.23 30.78 46.23 38.28L46.23 38.28Q46.23 42.27 43.96 45.33Q41.70 48.40 37.79 50.08L37.79 50.08Q42.40 51.37 45.08 54.98Q47.75 58.59 47.75 63.59L47.75 63.59Q47.75 71.25 42.79 75.63Q37.83 80 28.77 80L28.77 80ZM29.04 53.40L16.54 53.40L16.54 73.87L28.93 73.87Q34.16 73.87 37.19 71.15Q40.21 68.44 40.21 63.67L40.21 63.67Q40.21 53.40 29.04 53.40L29.04 53.40ZM16.54 29.30L16.54 47.38L27.87 47.38Q32.79 47.38 35.74 44.92Q38.69 42.46 38.69 38.24L38.69 38.24Q38.69 33.55 35.96 31.43Q33.22 29.30 27.64 29.30L27.64 29.30L16.54 29.30ZM64.94 20L64.94 42.85Q69.75 36.95 77.44 36.95L77.44 36.95Q90.84 36.95 90.96 52.07L90.96 52.07L90.96 80L83.73 80L83.73 52.03Q83.69 47.46 81.64 45.27Q79.59 43.09 75.25 43.09L75.25 43.09Q71.74 43.09 69.08 44.96Q66.43 46.84 64.94 49.88L64.94 49.88L64.94 80L57.71 80L57.71 20L64.94 20Z%22 fill=%22%23fff%22></path></svg>"
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5NNPGVRWNF"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag("js", new Date()); gtag("config", "G-5NNPGVRWNF"); `,
          }}
        />
      </Head>

      <main>
        {hash && (
          <div className="page-background">
            <Blurhash hash={hash} width="100%" height="100%" />
          </div>
        )}
        <div className="page-content">
          <header className="ta-left p-32 pos-realtive">
            <h1 className="m-0">BlurHash Playground</h1>
            <p>
              Read more about <a href="https://blurha.sh">BlurHash</a>.
            </p>

            <div className="md:pos-absolute top-0 md:right-0 md:m-32 d-flex ai-center ta-center fxd-column">
              <button
                className="w-100p cursor-pointer m-0"
                onClick={() => setReload(!reload)}
              >
                I don't like this background
              </button>

              <pre>
                <code
                  style={{ background: "blue" }}
                  className="color-white p-8"
                >
                  {hash}
                </code>
              </pre>
            </div>
            <article>
              <p>
                Welcome to BlurHash Playground! Here you'll find a collection of
                small tools and experiment with blurhash!
              </p>
              <p>
                To quickly explain what BlurHash is, it's a blurred image
                representation, encoded in a string of 30'ish characters.
              </p>
              <p>Now go explore the blurry world of blurhash!</p>
            </article>
          </header>
          <hr />
          <Animation />
          <hr />
          <HashToImage />
          <hr />
          <Transformer />
          <hr />
          <BlurSplash />
          <hr />
          <Section title="Credits & MISC:" fold>
            <p className="lh-big">
              I've built this, not sure anyone would ever use this but myself
              but here it is:{" "}
              <a href="https://github.com/LukyVj/cloudinary-blurhash">
                https://github.com/LukyVj/cloudinary-blurhash
              </a>
            </p>

            <p>
              I've used this to render some of the BluHash:
              <a href="https://github.com/woltapp/react-blurhash">
                https://github.com/woltapp/react-blurhash
              </a>
            </p>
          </Section>
          <hr />

          <footer style={{ padding: "2em" }}>
            Built with TypeScript &{" "}
            <a href="https://github.com/woltapp/blurhash/tree/master/TypeScript">
              BlurHash TypeScript
            </a>
            {"  "}
            by{"  "}
            <a href="https://twitter.com/lukyvj">@Lukyvj</a> - Hosted on{" "}
            <a href="https://vercel.app/">▲ https://vercel.app/</a>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Home;
