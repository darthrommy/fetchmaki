# @darthrommy/fetches

## Code of conduct

### `src/core/**`

Must be exported to `src/index.ts`. You must define only methods related to `typedFetch` function and other small `fetch` utils inside this directory.

### `src/shared/**`

Must not be included in package entrypoints. Any codes that are shared across the entire library such as `queryParser` must be defined inside this directory.

### `src/xxx/**`

Must be exported to `src/xxx.ts`. Any functions that wrap core methods (e.g. `typedFetch`) in `src/core` directory must be defined inside this directory.
