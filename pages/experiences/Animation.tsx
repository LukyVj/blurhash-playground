import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { isBlurhashValid } from "blurhash";
import Section from "../../components/Section";

import { makeid, makeidOne } from "../../scripts/helpers";
import CodeBlock from "../../components/CodeBlock";

const Animation = () => {
  const [hash, setHash] = useState<string | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setHash(`${makeidOne(1)}${makeid(35)}`);
      hash && console.log(isBlurhashValid(hash));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section title="Random BlurHash Animation" fold>
      <div className="d-grid g-1 md:g-2">
        <div className=" mih-300">
          <CodeBlock
            value={`const Animation = () => {
  const [hash, setHash] = useState<string | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setHash(\`\${makeid(36)}\`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {hash && (
      <Blurhash
          hash={hash}         
      />
      )}
    </>
  );
};`}
          />
        </div>
        <div className="mih-300 pos-relative anim-blurhash">
          {hash && (
            <Blurhash
              hash={hash}
              resolutionX={120}
              resolutionY={120}
              width={"100%"}
              height={"100%"}
            />
          )}
        </div>
      </div>
    </Section>
  );
};

export default Animation;
