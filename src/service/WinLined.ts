export const WIN_LINES = [
  // Horizontal lines
  [
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ], // Top row, 3 symbols
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 0],
    [0, 0, 0],
  ], // Middle row, 3 symbols
  [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 0],
    [0, 0, 0],
  ], // Bottom row, 3 symbols
  [
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
  ], // Top row, 5 symbols
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ], // Middle row, 5 symbols
  [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ], // Bottom row, 5 symbols

  // Diagonal lines
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [0, 0, 0],
    [0, 0, 0],
  ], // Diagonal from top-left to bottom-right, 3 symbols
  [
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ], // Diagonal from top-right to bottom-left, 3 symbols
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
  ], // Diagonal zig-zag from top-left to bottom-right, 5 symbols
  [
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ], // Diagonal zig-zag from top-right to bottom-left, 5 symbols

  // Mixed diagonal
  [
    [1, 0, 0],
    [0, 1, 0],
    [1, 0, 0],
    [0, 1, 0],
    [1, 0, 0],
  ], // Zig-zag short, 5 symbols
  [
    [0, 0, 1],
    [0, 1, 0],
    [0, 0, 1],
    [0, 1, 0],
    [0, 0, 1],
  ], // Zig-zag short reverse, 5 symbols

  // Partial vertical
  [
    [1, 0, 0],
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ], // First two columns top
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ], // First two columns middle
  [
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ], // First two columns bottom

  // Custom combinations
  [
    [1, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0],
  ], // Zig-zag double cross
  [
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, 1],
    [1, 0, 0],
    [0, 1, 0],
  ], // Cross from middle
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
    [0, 0, 0],
  ], // Double middle, 3 symbols
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [1, 0, 0],
  ], // Center stack
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 1, 1],
    [1, 0, 0],
    [0, 0, 0],
  ], // Mixed top
  [
    [0, 0, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 0, 0],
  ], // Mixed bottom

  // Random
  [
    [1, 1, 0],
    [1, 0, 1],
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ], // Random cross pattern
];
