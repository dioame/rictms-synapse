declare module "html-docx-js/dist/html-docx" {
    const asBlob: (html: string) => Blob;
    const asUint8Array: (html: string) => Uint8Array;
    export { asBlob, asUint8Array };
  }