import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";

module.exports = {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "esm",
    globals: {
      react: "React",
      "react-dom": "ReactDOM"
    }
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs()
  ],
  external: ["react", "react-dom", "lodash"]
};
