import { HttpStatusCode } from "axios";
import ERROR_CONSTANTS from "../constants/error";

interface ResponseApiUnprocessableEntityError<Data> {
  details: {
    property: keyof Data;
    code: string;
    message: string;
  }[];
  error: string;
  message: string;
  statusCode: HttpStatusCode;
  timeStamp: string;
}

interface ResponseApiBadRequestError {
  error: string;
  errorCode: keyof typeof ERROR_CONSTANTS;
  statusCode: HttpStatusCode;
  timeStamp: string;
}

export type { ResponseApiUnprocessableEntityError, ResponseApiBadRequestError };
