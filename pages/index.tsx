import { useEffect, useState } from "react";
import Head from "next/head";

import BlurSplash from "./experiences/BlurSplash";
import HashToImage from "./experiences/HashToImage";
import Transformer from "./experiences/Transformer";
import Animation from "./experiences/Animation";
import { Blurhash } from "react-blurhash";

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
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
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
                className="w-100p cursor-pointer"
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
          <section>
            <header>
              <h2 style={{ textAlign: "left" }}>Credits & MISC:</h2>

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
            </header>
          </section>
          <hr />

          <footer style={{ padding: "2em" }}>
            Built with TypeScript &{" "}
            <a href="https://github.com/woltapp/blurhash/tree/master/TypeScript">
              BlurHash TypeScript
            </a>
            {"  "}
            by{"  "}
            <a href="https://twitter.com/lukyvj">@Lukyvj</a> - Hosted on{" "}
            <a href="https://vercel.app/">https://vercel.app/</a>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Home;
