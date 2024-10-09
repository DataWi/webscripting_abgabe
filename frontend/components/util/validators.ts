export type Validators = {
  REQUIRE: () => { type: string };
  FILE: () => { type: string };
  MINLENGTH: (val: number) => { type: string; val: number };
  MAXLENGTH: (val: number) => { type: string; val: number };
  MIN: (val: number) => { type: string; val: number };
  MAX: (val: number) => { type: string; val: number };
  EMAIL: () => { type: string };
  EQUALS: (val: string) => { type: string; val: string };
  REQUIRE_IF: (val: boolean) => { type: string; val: boolean };
};

type Input = string | number | boolean;

const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_EQUALS = "EQUALS";
const VALIDATOR_TYPE_FILE = "FILE";
const VALIDATOR_REQUIRE_IF = "REQUIRE_IF";

// export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
// export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
// export const VALIDATOR_MINLENGTH = (val: number) => ({
//   type: VALIDATOR_TYPE_MINLENGTH,
//   val: val,
// });
// export const VALIDATOR_MAXLENGTH = (val: number) => ({
//   type: VALIDATOR_TYPE_MAXLENGTH,
//   val: val,
// });
// export const VALIDATOR_MIN = (val: number) => ({
//   type: VALIDATOR_TYPE_MIN,
//   val: val,
// });
// export const VALIDATOR_MAX = (val: number) => ({
//   type: VALIDATOR_TYPE_MAX,
//   val: val,
// });
// export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
// export const VALIDATOR_EQUALS = (val: string) => ({
//   type: VALIDATOR_TYPE_EQUALS,
//   val: val,
// });
// export const VALIDATOR_IF = (val: boolean) => ({
//   type: VALIDATOR_REQUIRE_IF,
//   val: val,
// });

type Validator = {
  type: string;
  val?: number | string | boolean;
};

export const validate = (
  value: Input,
  validators: Validator[],
  cb?: Function
) => {
  let isValid = true;

  for (const validator of validators) {
    if (typeof value === "string") {
      if (validator.type === VALIDATOR_TYPE_REQUIRE) {
        isValid = isValid && value.trim().length > 0;
      }
      if (validator.type === VALIDATOR_TYPE_EMAIL) {
        isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
      }
      if (validator.type === VALIDATOR_TYPE_EQUALS) {
        isValid = isValid && value === validator.val;
      }

      if (typeof validator.val === "number") {
        if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
          isValid = isValid && value.trim().length >= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
          isValid = isValid && value.trim().length <= validator.val;
        }
      }
    }
    if (typeof validator.val === "number") {
      if (validator.type === VALIDATOR_TYPE_MIN) {
        isValid = isValid && +value >= validator.val;
      }
      if (validator.type === VALIDATOR_TYPE_MAX) {
        isValid = isValid && +value <= validator.val;
      }
    }
    if (
      validator.type === VALIDATOR_REQUIRE_IF &&
      typeof validator.val === "boolean"
    ) {
      isValid = isValid && validator.val;
    }
  }
  if (isValid && cb) {
    cb();
  }

  return isValid;
};
