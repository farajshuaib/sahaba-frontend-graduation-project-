import "@testing-library/jest-dom/extend-expect";

declare module "*.mp3" {
  const value: any;
  export default value;
}
declare global {
  interface Window {
    grecaptcha: any;
  }
}
