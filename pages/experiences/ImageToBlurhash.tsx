import { encode } from "blurhash";
import React, { useState, useRef, useEffect } from "react";
import BlurhashCanvas from "../../components/BlurhashCanvas";

import Section from "../../components/Section";

const ImageToBlurhash = () => {
  const blurHashInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const [hash, setHash] = useState<string | any>(null);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    blurHashInputRef.current.addEventListener("change", (e: any) => {
      const that = e.currentTarget;
      if (that.files && that.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          const res = e.target.result as string;

          const image = new Image();
          const cv = previewRef.current;
          const ctx = cv.getContext("2d");

          image.onload = function () {
            ctx.clearRect(0, 0, 200, 200);
            ctx.drawImage(image, 0, 0, 200, 200);
            setReady(true);
          };
          image.src = res;
          image.style.width = "200px";
          image.style.height = "auto";

          setTimeout(() => {
            var imageData = ctx.getImageData(0, 0, 150, 150);
            var buffer = encode(imageData.data, 150, 150, 5, 5);
            setHash(buffer);
          }, 500);
        };
        reader.readAsDataURL(that.files[0]);
      }
    });
  });

  return (
    <Section title="Image to blurhash" fold>
      <style jsx>
        {`
          .d-grid {
            outline: 4px dashed blue;
          }

          .d-grid > *:not(:last-child) {
            border-right: 4px dashed blue;
          }
        `}
      </style>
      <div>
        <input
          type="file"
          ref={blurHashInputRef}
          placeholder="Open file"
          id="upload"
          name="file"
          className="w-100p"
        />
        <div className="d-grid g-2">
          <div style={{ width: "100%", height: "100%", maxHeight: 400 }}>
            <canvas
              ref={previewRef}
              className="w-100p h-100p obf-cover obp-center"
            />
          </div>
          <div style={{ width: "100%", height: "100%", maxHeight: 400 }}>
            {hash && <BlurhashCanvas hash={hash} />}
          </div>
        </div>
        <div className="mt-32 w-100p">
          <label htmlFor="resHash">Result blurhash</label>
          <input type="text" id="resHash" value={hash} className="w-100p" />
        </div>
      </div>
    </Section>
  );
};

export default ImageToBlurhash;
