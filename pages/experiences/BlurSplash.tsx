/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import BlurhashCanvas from "../../components/BlurhashCanvas";
import Section from "../../components/Section";
import { getLocalWithExpiry, setLocalWithExpiry } from "../../scripts/helpers";

const dateInPast = function (firstDate, secondDate) {
  if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
    return true;
  }

  return false;
};

const CanvasComp = ({ item, size }: any) => {
  // const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState<boolean>(false);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
      onMouseOver={() => setReveal(true)}
      onMouseLeave={() => setReveal(false)}
      className="w-100p h-100p pos-relative ov-hidden"
    >
      <BlurhashCanvas hash={item.blur_hash} />
      <img
        src={item.urls.small}
        alt={item.description}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: reveal ? 1 : 0,
          transition: "opacity .2s ease",
        }}
      />
      {reveal && (
        <div
          className="pos-absolute bot-0 left-0 p-16 color-white fsz-14 w-100p"
          style={{ background: "rgba(0, 0, 0, 0.9)" }}
        >
          <small>
            By{" "}
            <a href={item.user.links.self} className="p-0 pv-0">
              {item.user.name}
            </a>{" "}
          </small>
        </div>
      )}
    </div>
  );
};

const BlurSplash = () => {
  const [images, setImages] = useState<object[]>();

  const TTL = 2 * 60 * 1000;
  const localDataName = "UnsplashImages";

  const { data, error } = useSWR(
    `https://api.unsplash.com/photos/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
    null
  );
  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (!data) {
      console.log("loading images");
    }

    if (getLocalWithExpiry(localDataName)) {
      console.log("Loaded from localStorage");
      getLocalWithExpiry(localDataName) &&
        setImages(getLocalWithExpiry(localDataName));
    } else {
      console.log(`Load localStorage with new data and ${TTL} seconds of TTL`);
      setLocalWithExpiry(localDataName, data, TTL);
      setImages(getLocalWithExpiry(localDataName));
    }
  }, [data]);

  return (
    <Section title="BlurSplash ( blur_hash from unsplash )" fold>
      <p>
        If you don't see any images, it means the app got rate limited. It gets
        reset every hour.
      </p>
      <div>
        <ul className="lis-none d-grid g-2 md:g-4 p-0 m-0 ggap-8">
          {images &&
            images.map((item: any) => {
              return (
                <li key={item.id} className="mih-200">
                  <CanvasComp item={item} />
                </li>
              );
            })}
        </ul>
      </div>
    </Section>
  );
};

export default BlurSplash;
