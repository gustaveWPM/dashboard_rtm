import { describe, expect, it } from 'vitest';

import pipeable from '../pipeable';

describe('sortNumbers', () => {
  it('should compose correctly', () => {
    // eslint-disable-next-line no-magic-numbers
    const incr = pipeable((x: number) => x + 1);

    // eslint-disable-next-line no-magic-numbers
    const double = pipeable((x: number) => x * 2);

    const a = incr;
    const b = incr.then(double);
    const c = incr.then(double).then(incr).then(incr).then(double);

    // eslint-disable-next-line no-magic-numbers
    expect(a(1)).toBe(2);
    // eslint-disable-next-line no-magic-numbers
    expect(b(10)).toBe(22);
    // eslint-disable-next-line no-magic-numbers
    expect(c(10)).toBe(48);
  });
});
