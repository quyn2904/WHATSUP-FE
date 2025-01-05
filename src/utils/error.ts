import axios, { AxiosError, HttpStatusCode } from "axios";
import {
  ResponseApiBadRequestError,
  ResponseApiUnprocessableEntityError
} from "../types/error";

const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  return axios.isAxiosError(error);
};

const isAxiosUnprocessableEntityError = <FormError>(
  error: unknown
): error is AxiosError<ResponseApiUnprocessableEntityError<FormError>> => {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.UnprocessableEntity
  );
};

const isAxiosBadRequestError = (
  error: unknown
): error is AxiosError<ResponseApiBadRequestError> => {
  return (
    isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
  );
};

export {
  isAxiosError,
  isAxiosUnprocessableEntityError,
  isAxiosBadRequestError
};
