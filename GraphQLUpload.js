"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _graphql = require("graphql");
var _Upload = _interopRequireDefault(require("./Upload.mjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-check

/** @typedef {import("./processRequest.mjs").FileUpload} FileUpload */

/**
 * A GraphQL `Upload` scalar that can be used in a
 * [`GraphQLSchema`](https://graphql.org/graphql-js/type/#graphqlschema). It’s
 * value in resolvers is a promise that resolves
 * {@link FileUpload file upload details} for processing and storage.
 * @example
 * A schema built using the function
 * [`makeExecutableSchema`](https://www.graphql-tools.com/docs/api/modules/schema_src#makeexecutableschema)
 * from [`@graphql-tools/schema`](https://npm.im/@graphql-tools/schema):
 *
 * ```js
 * import { makeExecutableSchema } from "@graphql-tools/schema/makeExecutableSchema";
 * import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
 *
 * const schema = makeExecutableSchema({
 *   typeDefs: `
 *     scalar Upload
 *   `,
 *   resolvers: {
 *     Upload: GraphQLUpload,
 *   },
 * });
 * ```
 * @example
 * A manually constructed schema with an image upload mutation:
 *
 * ```js
 * import { GraphQLBoolean, GraphQLObjectType, GraphQLSchema } from "graphql";
 * import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
 *
 * const schema = new GraphQLSchema({
 *   mutation: new GraphQLObjectType({
 *     name: "Mutation",
 *     fields: {
 *       uploadImage: {
 *         description: "Uploads an image.",
 *         type: GraphQLBoolean,
 *         args: {
 *           image: {
 *             description: "Image file.",
 *             type: GraphQLUpload,
 *           },
 *         },
 *         async resolve(parent, { image }) {
 *           const { filename, mimetype, createReadStream } = await image;
 *           const stream = createReadStream();
 *           // Promisify the stream and store the file, then…
 *           return true;
 *         },
 *       },
 *     },
 *   }),
 * });
 * ```
 * @example
 * In a [TypeScript](https://typescriptlang.org) module, how to import the type
 * for the {@link FileUpload file upload details} that the
 * {@linkcode GraphQLUpload} scalar resolver value promise resolves:
 *
 * ```ts
 * import type { FileUpload } from "graphql-upload/processRequest.mjs";
 * ```
 */
const GraphQLUpload = new _graphql.GraphQLScalarType({
  name: "Upload",
  description: "The `Upload` scalar type represents a file upload.",
  parseValue(value) {
    if (value instanceof _Upload.default) return value.promise;
    throw new _graphql.GraphQLError("Upload value invalid.");
  },
  parseLiteral(node) {
    throw new _graphql.GraphQLError("Upload literal unsupported.", {
      nodes: node
    });
  },
  serialize() {
    throw new _graphql.GraphQLError("Upload serialization unsupported.");
  }
});
var _default = GraphQLUpload;
exports.default = _default;
