const isLocalhost = ["localhost", "127.0.0.1", "0.0.0.0"].includes(
  window.location.hostname,
);

if (isLocalhost) {
  import("/src/main.tsx");
} else {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("./assets/index-Dd4GwITf.css", import.meta.url).href;
  document.head.appendChild(stylesheet);

  import(new URL("./assets/index-DXXKcDT2.js", import.meta.url).href);
}
