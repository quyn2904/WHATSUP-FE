import { SuccessResponse } from "../../utils/http";

interface LoginResponseType
  extends SuccessResponse<{
    userId: string;
    accessToken: string;
    refreshToken: string;
    tokenExpires: number;
  }> {}

export type { LoginResponseType };
