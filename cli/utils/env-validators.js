import { makeValidator } from "envalid";

/**
 * `envalid` custom validator that validates if a variable is a string and is not empty
 */
export const isNotEmptyStr = makeValidator((x) => {
  if (/^.+$/.test(x)) return x;
  throw new Error("Expected variable to have non-empty string value");
});