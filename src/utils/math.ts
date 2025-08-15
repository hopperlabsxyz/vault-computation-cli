export function min<T>(a: T, b: T) {
  if (a < b) return a;
  return b;
}

export function max<T>(a: T, b: T) {
  if (a > b) return a;
  return b;
}

/**
 * Standard math utilities missing in JavaScript.
 */
export type Rounding =
  (typeof SolidityMath.Rounding)[keyof typeof SolidityMath.Rounding];
export class SolidityMath {
  /**
   * Muldiv operation overflow error.
   */
  static MathOverflowedMulDiv = new Error("MathOverflowedMulDiv");

  static Rounding = {
    Floor: 0, // Toward negative infinity
    Ceil: 1, // Toward positive infinity
    Trunc: 2, // Toward zero
    Expand: 3, // Away from zero
  } as const;

  /**
   * Calculates floor(x * y / denominator) with full precision. Throws if result overflows a uint256 or
   * denominator == 0.
   * @dev Original credit to Remco Bloemen under MIT license (https://xn--2-umb.com/21/muldiv) with further edits by
   * Uniswap Labs also under MIT license.
   */
  static mulDiv(x: bigint, y: bigint, denominator: bigint): bigint {
    if (denominator === 0n) {
      throw new Error("Division by zero");
    }

    // 512-bit multiply [prod1 prod0] = x * y
    let prod0 = x * y;
    let prod1: bigint;

    // Use assembly-like approach to handle 512-bit multiplication
    const mm = (x * y) % 2n ** 256n;
    prod1 = (mm - prod0 - (mm < prod0 ? 1n : 0n)) % 2n ** 256n;

    // Handle non-overflow cases, 256 by 256 division
    if (prod1 === 0n) {
      return prod0 / denominator;
    }

    // Make sure the result is less than 2^256. Also prevents denominator == 0.
    if (denominator <= prod1) {
      throw this.MathOverflowedMulDiv;
    }

    ///////////////////////////////////////////////
    // 512 by 256 division.
    ///////////////////////////////////////////////

    // Make division exact by subtracting the remainder from [prod1 prod0]
    let remainder: bigint;
    remainder = (x * y) % denominator;

    // Subtract 256 bit number from 512 bit number
    prod1 = (prod1 - (remainder > prod0 ? 1n : 0n)) % 2n ** 256n;
    prod0 = (prod0 - remainder) % 2n ** 256n;

    // Factor powers of two out of denominator
    let twos = denominator & (~denominator + 1n);

    // Divide denominator by twos
    denominator = denominator / twos;

    // Divide [prod1 prod0] by twos
    prod0 = prod0 / twos;

    // Flip twos such that it is 2^256 / twos
    twos = 2n ** 256n / twos;

    // Shift in bits from prod1 into prod0
    prod0 |= prod1 * twos;

    // Invert denominator mod 2^256
    let inverse = (3n * denominator) ^ 2n;

    // Newton-Raphson iteration to improve precision
    inverse = (inverse * (2n - denominator * inverse)) % 2n ** 256n; // inverse mod 2^8
    inverse = (inverse * (2n - denominator * inverse)) % 2n ** 256n; // inverse mod 2^16
    inverse = (inverse * (2n - denominator * inverse)) % 2n ** 256n; // inverse mod 2^32
    inverse = (inverse * (2n - denominator * inverse)) % 2n ** 256n; // inverse mod 2^64
    inverse = (inverse * (2n - denominator * inverse)) % 2n ** 256n; // inverse mod 2^128
    inverse = (inverse * (2n - denominator * inverse)) % 2n ** 256n; // inverse mod 2^256

    // Final result by multiplying with the modular inverse of denominator
    const result = (prod0 * inverse) % 2n ** 256n;
    return result;
  }

  /**
   * Calculates x * y / denominator with full precision, following the selected rounding direction.
   */
  static mulDivRounding(
    x: bigint,
    y: bigint,
    denominator: bigint,
    rounding: Rounding
  ): bigint {
    const result = this.mulDiv(x, y, denominator);
    if (this.unsignedRoundsUp(rounding) && (x * y) % denominator > 0n) {
      return result + 1n;
    }
    return result;
  }

  /**
   * Returns whether a provided rounding mode is considered rounding up for unsigned integers.
   */
  static unsignedRoundsUp(rounding: Rounding): boolean {
    return rounding % 2 === 1;
  }
}
