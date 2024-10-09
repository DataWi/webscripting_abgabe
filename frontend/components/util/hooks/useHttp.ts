import { useReducer, useCallback } from "react";
type HttpState = {
  loading: boolean;
  error: string | null;
  data: any;
  extra: any;
  identifier: string | null;
};

type ActionTypes = "SEND" | "RESPONSE" | "ERROR" | "CLEAR";

type HttpAction = {
  type: ActionTypes;
  responseData?: any;
  extra?: any;
  errorMessage?: string;
  identifier?: string;
};

const initialState: HttpState = {
  loading: false,
  error: null,
  data: null,
  extra: null,
  identifier: null,
};

const httpReducer = (curHttpState: HttpState, action: HttpAction) => {
  switch (action.type) {
    case "SEND":
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier ?? null,
      };
    case "RESPONSE":
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
        extra: action.extra,
      };
    case "ERROR":
      return {
        loading: false,
        error: action.errorMessage ?? null,
        data: null,
        extra: null,
        identifier: null,
      };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("Should not be reached!");
  }
};

export type sendRequestParams = {
  url: string;
  method: string;
  reqIdentifer: string;
  body?: any;
  csrf?: string;
  reqExtra?: any;
  token?: string;
};

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer<
    React.Reducer<HttpState, HttpAction>
  >(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);

  const sendRequest = useCallback(
    ({
      url,
      method,
      reqIdentifer,
      body,
      csrf,
      reqExtra,
      token,
    }: sendRequestParams) => {
      let reqHeaders: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (csrf) {
        reqHeaders = {
          ...reqHeaders,
          "X-CSRF-Token": csrf,
        };
      }
      if (token) {
        reqHeaders = {
          ...reqHeaders,
          Authorization: `Bearer ${token}`,
        };
      }

      dispatchHttp({ type: "SEND", identifier: reqIdentifer });
      fetch(url, {
        method: method,
        body: body || null,
        headers: reqHeaders,
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          dispatchHttp({
            type: "RESPONSE",
            responseData: responseData,
            extra: reqExtra,
          });
        })
        .catch((error) => {
          dispatchHttp({
            type: "ERROR",
            errorMessage: "Something went wrong!",
          });
        });
    },
    []
  );

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    reqExtra: httpState.extra,
    reqIdentifer: httpState.identifier,
    clear: clear,
  };
};

export default useHttp;
