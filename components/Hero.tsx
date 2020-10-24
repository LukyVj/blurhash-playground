import { useRef, useState, useEffect } from "react";

const Hero = ({ setReload, reload, hash }: any) => {
  const heroRef = useRef<HTMLHeadElement>(null);
  const sectionsArray = [];

  const [nav, setNav] = useState<any>(sectionsArray);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    document.querySelectorAll("[data-section]").forEach((section: any) => {
      sectionsArray.push({ id: section.id });
      setNav(sectionsArray);

      if (document.querySelectorAll("[data-section]") === nav.length) {
        setReady(true);
      }
    });
  }, []);

  return (
    <>
      <header
        className={`ta-left p-32 pos-relative top-0 z-2 mih-300`}
        ref={heroRef}
      >
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
            <code style={{ background: "blue" }} className="color-white p-8">
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

        <ul> {ready && nav.map((item) => <li>{item.id}</li>)}</ul>
      </header>
    </>
  );
};

export default Hero;
