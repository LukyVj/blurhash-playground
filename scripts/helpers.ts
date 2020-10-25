import { decode } from "blurhash";

export const hashToCss = (hash: string) => {
  const cv = document.createElement("canvas") as HTMLCanvasElement;
  const ctx = cv.getContext("2d");
  const pixels = decode(hash, 300, 300, 1);
  const imgData = ctx.createImageData(300, 300);
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

export const slugify = (str): string => {
  str = str.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;$!";
  const to = "aaaaeeeeiiiioooouuuunc--------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

export const setLocalWithExpiry = (key, value, ttl) => {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);

  // if the item doesn't exist, return null
  if (!itemStr) {
    return false;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return false;
  }
  return item.value;
};
