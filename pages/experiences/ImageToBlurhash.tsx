import { encode } from "blurhash";
import React, { useState, useRef, useEffect } from "react";
import BlurhashCanvas from "../../components/BlurhashCanvas";

import Section from "../../components/Section";

const ImageToBlurhash = () => {
  const blurHashInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const [hash, setHash] = useState<string | any>(null);

  useEffect(() => {
    blurHashInputRef.current.addEventListener("change", (e) => {
      const that = e.currentTarget;
      if (that.files && that.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          const res = e.target.result as string;

          const image = new Image();
          const cv = previewRef.current;
          const ctx = cv.getContext("2d");

          image.onload = function () {
            ctx.drawImage(image, 0, 0, 200, 200);
          };
          image.src = res;
          image.style.width = "200px";
          image.style.height = "auto";

          var imageData = ctx.getImageData(0, 0, 100, 100);

          console.log(imageData.data);
          var buffer = encode(imageData.data, 100, 100, 5, 5);
          setHash(buffer);
        };
        reader.readAsDataURL(that.files[0]);
      }
    });
  });

  return (
    <Section title="Image to blurhash" fold>
      <div>
        <input
          type="file"
          ref={blurHashInputRef}
          placeholder="Open file"
          id="upload"
          multiple
          name="file"
        />
        <canvas ref={previewRef} className="w-200" />
        {hash && <BlurhashCanvas hash={hash} width={200} />}
      </div>
    </Section>
  );
};

export default ImageToBlurhash;
