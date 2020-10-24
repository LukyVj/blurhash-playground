import React from "react";

const CodeBlock = ({ value }: any) => {
  return (
    <pre className="ta-left color-blue bdw-6 bdc-blue bds-solid fsz-16 p-16 h-500 ov-auto">
      <code className="wb-break-all ws-pre-wrap lsp-big lh-big">{value}</code>
    </pre>
  );
};

export default CodeBlock;
