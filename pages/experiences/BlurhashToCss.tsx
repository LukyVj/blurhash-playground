import React, { useEffect, useState } from "react";

import Section from "../../components/Section";
import CodeBlock from "../../components/CodeBlock";
import { hashToCss } from "../../scripts/helpers";

const BlurhashToCss = ({ hash }: any) => {
  const [cssHash, setCssHash] = useState<string>(null);

  useEffect(() => {
    if (hash) {
      setCssHash(hashToCss(hash));
    }
  }, [hash]);
  return (
    <Section title="BlurHash to CSS" fold>
      <p>
        You can also use these blurhash values in your CSS. This is not really
        recommended, because produced CSS string is somewhat really heavy ( from
        10 to 25'ish kilobytes )
      </p>

      <CodeBlock value={`background: url(${cssHash});`} />
    </Section>
  );
};

export default BlurhashToCss;
