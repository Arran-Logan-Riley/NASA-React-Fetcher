# NASA API FETCHER
A NASA API interactor tool. 
## What is this for?
### Current features:
* Latest image from a NASA satellite located at Lagrange point 1 (L1).
* NASA image direct URL generation.
* Live key URL transfer from server env.
### ToDo:

* Image date search
* Self-host image and self-URL generation.
* Mars weather
* NASA key-less data transfer (Server session IDs)

## Next.JS
Located [here](https://github.com/Arran-Logan-Riley/NASA-React-Fetcher/tree/master/Next-js/nasa-fetcher-server-js).
### NextJS Docker transformation
* Installed docker from [here](https://www.docker.com/)
* Added `Dockerfile` to [Next-JS](https://github.com/Arran-Logan-Riley/NASA-React-Fetcher/tree/master/Next-js/nasa-fetcher-server-js) file from [here](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
* Ran: `docker build -t nasa-fetcher-docker`.
* Ran: `docker run -p 3000:3000 nasa-fetcher-docker`.
## React
React app is an alfa build of the NASA API Fetcher tool as proof of concept.
