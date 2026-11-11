/** Builds the microlink screenshot URL used as a project thumbnail. */
export const screenshotUrl = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url`;
