# min-gzip.com

This is a simple web app that allows you to copy and paste Typescript or JavaScript and see the size of the file after it has been minified + gzipped/brotlied. Although the code needs to be valid in order to be minified, the Typescript typings are automatically striped.

This is particularly helpful when you are trying to optimize the size of your JavaScript bundle, and need to understand which implementation techniques are the most size efficient when went "over the wire".

👉 [min-gzip.com](https://min-gzip.com)

## How to use

1. Copy and paste your code into the text area.
2. Check the min/gzip size in the header.

## Things to know

Gzip and Brotli gain in their compression efficiency the larger the artifact so often it is helpful to copy and paste your entire file and then make adjustments to see the impact on total size.
