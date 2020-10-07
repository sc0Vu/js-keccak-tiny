EMCC_OPTIONS=(
    -O3
    -s MODULARIZE=1
    -s EXPORT_NAME="'KECCAK'"
    -s ALLOW_MEMORY_GROWTH=1
    -s INVOKE_RUN=1
    -s ERROR_ON_UNDEFINED_SYMBOLS=0
    -s NO_EXIT_RUNTIME=1
    -s NO_DYNAMIC_EXECUTION=1
    -s STRICT=1
)

EMCC_WEB_OPTIONS=(
    # -s ENVIRONMENT=web
    -s NO_FILESYSTEM=1
)

EMCC_KECCAK_OPTIONS=(
    -s EXPORTED_FUNCTIONS='["_shake128", "_shake256", "_sha3_224", "_sha3_256", "_sha3_384", "_sha3_512", "_keccak_224", "_keccak_256", "_keccak_384", "_keccak_512", "_malloc", "_free"]'
    -s EXPORTED_RUNTIME_METHODS='["getValue"]'
)

EMCC_WASM_OPTIONS=(
    -s WASM=1
    -s BINARYEN_IGNORE_IMPLICIT_TRAPS=1
    -mnontrapping-fptoint
)

echo "Build keccak tiny"
emcc "${EMCC_OPTIONS[@]}" "${EMCC_WEB_OPTIONS[@]}" "${EMCC_KECCAK_OPTIONS[@]}" "${EMCC_WASM_OPTIONS[@]}" nim-keccak-tiny/keccak_tiny/keccak-tiny.c -o lib/keccak-tiny.js
