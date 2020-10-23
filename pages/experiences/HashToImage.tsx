import React, { useState, useRef } from "react";
import { isBlurhashValid } from "blurhash";
import { Blurhash } from "react-blurhash";

const HashToImage = () => {
  const blurHashInputRef = useRef<HTMLInputElement>(null);
  const [hashFromInput, setHashFromInput] = useState<string | undefined>(
    undefined
  );

  const handleHashFromInput = () => {
    if (blurHashInputRef && blurHashInputRef.current)
      setHashFromInput(blurHashInputRef.current.value);
  };

  return (
    <section>
      <header>
        <h2 style={{ textAlign: "left" }}>BlurHash to canvas</h2>
      </header>
      <div>
        <input
          type="text"
          ref={blurHashInputRef}
          onInput={() => handleHashFromInput()}
          placeholder="Paste BlurHash here"
        />
      </div>
      <br />
      {hashFromInput !== undefined && isBlurhashValid(hashFromInput).result && (
        <div>
          Blur Hash representation:
          <Blurhash
            hash={isBlurhashValid(hashFromInput) && hashFromInput}
            width={200}
            height={200}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      )}
      {hashFromInput !== undefined &&
        !isBlurhashValid(hashFromInput).result && (
          <strong style={{ color: "red" }}>Blur hash invalid</strong>
        )}
    </section>
  );
};

export default HashToImage;
