/**
 * Generates string representations of numbers from stop to start, in steps of 1.0 and rounded
 * to the nearest tenths place
 */
export function* floatAsStringGenerator(start: number, stop: number): Generator<string> {
  for (let num = start; num < stop; num += 1.0) {
    yield num.toFixed(1);
  }
}
