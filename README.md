
# Flood Monitoring Tool - UK

The Flood Monitoring Tool is a website that enables users to search for and view flood readings across various locations in the UK, presented in both graphical and tabular formats.




## Tech Stack

**Client:** React, CSS, Chart.js, Vite

**Server:** Real Time flood-monitoring API, Vercel


## Run Locally

Clone the project

```bash
  git clone https://github.com/judebaptista18/flood-monitoring-tool.git
```

Go to the project directory

```bash
  cd flood-monitoring-tool
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Demo

https://flood-monitoring-tool.vercel.app/


## Authors

- [@judebaptista18](https://github.com/judebaptista18)


## Acknowledgements

 - [Department for Environment Food & Rural Affairs](https://environment.data.gov.uk/flood-monitoring/doc/reference)



## Optimizations

Implemented accessibility (a11y) principles using ARIA attributes and tab navigation for improved usability. Optimized API requests by utilizing debouncing and AbortController for efficient data fetching. Leveraged the useCallback hook to prevent unnecessary function recreations. Ensured proper image formatting to maintain the correct aspect ratio and enhance performance. Designed the page to be fully responsive across both mobile and desktop devices.

