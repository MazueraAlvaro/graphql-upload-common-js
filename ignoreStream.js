"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ignoreStream;
// @ts-check

/**
 * Safely ignores a Node.js readable stream.
 * @param {import("node:stream").Readable} stream Node.js readable stream.
 */
function ignoreStream(stream) {
  // Prevent an unhandled error from crashing the process.
  stream.on("error", () => {});

  // Waste the stream.
  stream.resume();
}
