# ArcGIS Maps SDKs for JavaScript: Building Utility Network Applications

Esri's next-generation network technology, the utility network, is completely based on web services, which makes it ideally suited for building web applications. Are you ready to move beyond the desktop and develop browser-based applications for your user community? This technical session covers the growing utility network capabilities using the ArcGIS Maps SDK for JavaScript. Speakers will discuss editing, visualizing, and tracing utility networks in a web browser.

## Slides and recording

Most of the slides are made available at [Esri Events > Proceedings](https://www.esri.com/en-us/about/events/index/proceedings).

## Related sessions

...

## Getting started

1. Install the dependencies:

   ```sh
   npm install
   ```

2. Run the Vite dev server:

   ```sh
   npm run dev
   ```

3. Access the dev server by navigating to `http://localhost:5173/`.

## Configuration

Specify an enterprise portal as `esriConfig.portalUrl` in `main.tsx`:

```ts
esriConfig.portalUrl = "https://myHostName.esri.com/arcgis";
```

Update the `id` property on the `App` component in `main.tsx` with your own map ID:

```tsx
<App webmapId={"map-id-goes-here"}></App>
```
