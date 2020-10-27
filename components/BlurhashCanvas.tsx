import React, { useEffect, useRef } from "react";
import { decode } from "blurhash";

interface BlurhashCanvasProps {
  hash: string;
  height?: number;
  punch?: number;
  width?: number;
  rest?: any;
}

const BlurhashCanvas = ({
  height = 200,
  width = 200,
  punch,
  hash,
  rest,
}: BlurhashCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = () => {
    if (canvasRef && hash) {
      const pixels = decode(hash, width, height, punch);

      const ctx = canvasRef.current.getContext("2d");
      const imageData = ctx.createImageData(width, height);
      imageData.data.set(pixels);
      ctx.putImageData(imageData, 0, 0);
    }
  };

  useEffect(() => {
    draw();
  });

  useEffect(() => {
    canvasRef.current.style.width = "100%";
    canvasRef.current.style.height = "100%";
  }, [draw]);

  return (
    <canvas
      {...rest}
      height={height ? height : "100%"}
      width={width ? width : "100%"}
      ref={canvasRef}
    />
  );
};

export default BlurhashCanvas;
