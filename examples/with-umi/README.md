# with umi example

## How to use

Download the example:

```
curl https://codeload.github.com/rsuite/rsuite/tar.gz/main | tar -xz --strip=2 rsuite-main/examples/with-umi
cd with-umi
```

With Node.js 24, install from the lockfile and run:

```
npm ci
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The default Webpack build runs Umi's helper conflict checker in `postbuild`.
The Vite override applies only to `@umijs/bundler-vite@4.7.26`; review it when upgrading Umi.
