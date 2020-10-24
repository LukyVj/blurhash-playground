import { decode } from "blurhash";

export const hashToCss = (hash: string) => {
  const cv = document.createElement("canvas") as HTMLCanvasElement;
  const ctx = cv.getContext("2d");
  const pixels = decode(hash, 100, 100, 1);
  const imgData = ctx.createImageData(100, 100);
  imgData.data.set(pixels);
  ctx.putImageData(imgData, 0, 0);
  if (cv.toDataURL()) {
    return cv.toDataURL();
  }
};

export const makeid = (length: number) => {
  var result = "";
  var characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#,!_.1234567890";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const makeidOne = (length: number) => {
  var result = "";
  var characters = "GU";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
