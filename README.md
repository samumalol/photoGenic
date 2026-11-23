# PhotoGENic React prototype

Landscape shooting companion with the selected overlay map, an AI-generated sample photo background, contrast comparison controls, and a Last shot dialog. Uses React and Vite, with all image assets stored locally.

```sh
npm install
npm run dev
```

Open the URL printed by Vite. `npm run build` creates a static `dist` folder. `npm run preview` serves that build. No Mac or native build is needed for this web prototype.

Use the controls below the frame to compare photo/plain backgrounds and contrast protection. In compact landscape, the same controls are available through the settings button. Last shot lets you select a local JPEG, PNG, or WebP; the file stays in the browser. Advice stays explicitly labeled sample advice even after importing a photo.

The map is a qualitative suggestion diagram, not tracked positions. The camera is not connected. This prototype does not call the existing Python backend or OpenRouter, extract EXIF, or implement USB import. It is the React UI/readability prototype; the native camera experiment and backend remain in the parent project.
