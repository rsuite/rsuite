# Gatsby example

## How to use

Download the example:

```
curl https://codeload.github.com/rsuite/rsuite/tar.gz/main | tar -xz --strip=2 rsuite-main/examples/with-gatsby
cd with-gatsby
```

Install it and run:

```
npm install
npm run start
# or
yarn
yarn start
```

## npm install error

if download "sharp" error，you need:

```
npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp/"
npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips/"
```
