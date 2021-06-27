export function getBase64Image(img: any): string {
  if (!img) return "";
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  // @ts-ignore
  ctx.drawImage(img, 0, 0);
  const dataURL = canvas.toDataURL("image/png");
  // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  return dataURL;
}
