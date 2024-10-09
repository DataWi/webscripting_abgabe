import { useReducer } from "react";

type InputState = {
  value: string;
  isTouched: boolean;
};

type InputAction = {
  type: "INPUT" | "BLUR" | "RESET";
  value?: string;
};

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state: InputState, action: InputAction) => {
  if (action.type === "INPUT") {
    return { value: action.value!, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return state;
};

type useInput = {
  value: string;
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputBlurHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
  reset: () => void;
};

const useInput = (validateValue: (val: string) => boolean): useInput => {
  const [inputState, dispatch] = useReducer<
    React.Reducer<InputState, InputAction>
  >(inputStateReducer, initialInputState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    if (!inputState.isTouched) return;
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
