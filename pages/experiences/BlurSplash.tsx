/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { decode } from "blurhash";
import Unsplash, { toJson } from "unsplash-js";
import BlurhashCanvas from "../../components/BlurhashCanvas";
import Section from "../../components/Section";

const unsplash = new Unsplash({
  accessKey: process.env.UNSPLASH_KEY,
  timeout: 500, // values set in ms
});

const CanvasComp = ({ item, size }: any) => {
  // const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState<boolean>(false);

  // useEffect(() => {
  //   const pixels = decode(item.blur_hash, size, size);

  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");
  //   const imageData = ctx?.createImageData(size, size);
  //   canvas.style.width=size;
  //   canvas.style.height=size;

  //   imageData && imageData.data.set(pixels);

  //   imageData && ctx?.putImageData(imageData, 0, 0);

  //   canvasContainerRef &&
  //     canvasContainerRef.current &&
  //     canvasContainerRef.current.appendChild(canvas);
  // }, []);

  return (
    <div
      style={{
        minWidth: size,
        minHeight: size,
        position: "relative",
        marginBottom: 8,
      }}
      onMouseOver={() => setReveal(true)}
      onMouseLeave={() => setReveal(false)}
      className="w-100p h-100p"
    >
      <BlurhashCanvas hash={item.blur_hash} width={size} height={size} />
      <img
        src={item.urls.small}
        alt={item.description}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          minWidth: size,
          minHeight: size,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: reveal ? 1 : 0,
        }}
      />
    </div>
  );
};

const BlurSplash = () => {
  const [data, setData] = useState<any[]>([]);
  const [query, setQuery] = useState<{ q: string; n: number; s: number }>({
    q: "dogs",
    n: 10,
    s: 100,
  });

  const inputQueryRef = useRef<HTMLInputElement>(null);
  const inputNumberRef = useRef<HTMLInputElement>(null);
  const inputSizeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dataFetch = async () => {
      unsplash.search
        .photos(query.q, 1, query.n - 1 || 10)
        .then(toJson)
        .then((json) => {
          setData(json.results);
        });
    };

    dataFetch();
  }, [setQuery]);

  return (
    <Section title="BlurSplash ( blur_hash from unsplash )" fold>
      <div>
        <input
          type="text"
          ref={inputQueryRef}
          placeholder="Query"
          style={{ width: "25%" }}
        />
        <input
          type="number"
          ref={inputNumberRef}
          placeholder="Number of result"
          style={{ width: "25%" }}
        />
        <input
          type="number"
          ref={inputSizeRef}
          placeholder="Size images"
          style={{ width: "25%" }}
        />
        <button
          onClick={() => {
            if (
              inputQueryRef &&
              inputQueryRef.current &&
              inputNumberRef &&
              inputNumberRef.current &&
              inputSizeRef &&
              inputSizeRef.current
            ) {
              setQuery({
                q: inputQueryRef.current.value,
                n: parseInt(inputNumberRef.current.value),
                s: parseInt(inputSizeRef.current.value),
              });
            }
          }}
          style={{ width: "25%" }}
        >
          GO!
        </button>
        <ul className="lis-none d-grid g-2 md:g-4 p-0 m-0 ggap-8">
          {data &&
            data.map((item: any) => {
              return (
                <li key={item.id} className="mih-200">
                  <CanvasComp item={item} size={query.s} />
                </li>
              );
            })}
        </ul>
      </div>
    </Section>
  );
};

export default BlurSplash;
