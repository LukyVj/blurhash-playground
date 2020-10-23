import React, { useEffect, useState, useRef } from "react";
import { Blurhash } from "react-blurhash";
import useSWR from "swr";
import Section from "../../components/Section";

const Transformer = () => {
  const [hash, setHash] = useState<string | undefined>(undefined);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [url, setUrl] = useState("");
  const [ready, setReady] = useState(false);
  const [imgUrl, setImgUrl] = useState<string>();
  const [loader, setLoader] = useState<boolean>(false);
  let hashWidth, hashHeight;

  const { data, error } = useSWR(url, null);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (!data) {
      console.log("loading");
    }

    if (data && data.hash) {
      setHash(data.hash);
      setReady(true);
      setLoader(false);
    }
  }, [data]);

  if (
    imageRef.current &&
    imageRef.current.clientWidth &&
    imageRef.current &&
    imageRef.current.clientHeight
  ) {
    hashWidth = imageRef.current.clientWidth;
    hashHeight = imageRef.current.clientHeight;
  }

  return (
    <Section title="Convert any image url to a BlurHash" fold>
      <div>
        <input
          type="text"
          ref={imageInputRef}
          placeholder="Paste url and hit Convert"
        />
        <button
          ref={buttonRef}
          onClick={() => {
            if (imageInputRef && imageInputRef.current) {
              setUrl(
                `https://image-to-blurhash.herokuapp.com/?q=${imageInputRef?.current.value}`
              );
              setImgUrl(imageInputRef?.current.value);
              setLoader(true);
            }
          }}
        >
          Convert!
        </button>
      </div>
      {ready && hash !== undefined && (
        <>
          <img
            src={imgUrl}
            width="auto"
            height="200"
            ref={imageRef}
            style={{ maxWidth: 400 }}
          />{" "}
          <Blurhash
            hash={hash}
            width={hashWidth}
            height={hashHeight}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
          <br />
          <input type="text" value={hash} />
        </>
      )}
      {loader && (
        <>
          <br />
          <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" />
          <br />
        </>
      )}
    </Section>
  );
};

export default Transformer;
