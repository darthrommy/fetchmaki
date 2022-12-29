import typescript from "@rollup/plugin-typescript";
import path from "path";
import { defineConfig } from "rollup";

const { root } = path.parse(process.cwd());

/**
 * @param {string} id
 */
function external(id) {
  return !id.startsWith(".") && !id.startsWith(root);
}

/**
 * @param {string} input
 * @param {string} output
 */
function createEsmBuild(input, output) {
  return defineConfig({
    input,
    output: {
      file: output,
      format: "esm",
    },
    external,
    plugins: [typescript()],
  });
}

/**
 * @param {string} input
 * @param {string} output
 */
function createDeclaration(input, output) {
  return defineConfig({
    input,
    output: {
      dir: output,
    },
    external,
    plugins: [
      typescript({
        outDir: output,
        declaration: true,
        emitDeclarationOnly: true,
      }),
    ],
  });
}

/**
 * @param {string} input
 * @param {string} output
 */
function createCJSBuild(input, output) {
  return defineConfig({
    input,
    output: {
      file: output,
      format: "cjs",
    },
    external,
    plugins: [typescript()],
  });
}

export default (args) => {
  let c = Object.keys(args).find((key) => key.startsWith("config-"));
  if (c) {
    c = c.slice("config-".length).replace(/_/g, "/");
  } else {
    c = "index";
  }
  return [
    ...(c === "index" ? [createDeclaration(`src/${c}.ts`, "dist/types")] : []),
    createEsmBuild(`src/${c}.ts`, `dist/${c}.js`),
    createCJSBuild(`src/${c}.ts`, `dist/cjs/${c}.js`),
  ];
};
