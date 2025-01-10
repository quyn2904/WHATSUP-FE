const setTokenToLS = (token: {
  accessToken: string;
  refreshToken: string;
  userId: string;
  tokenExpires: number;
}) => {
  localStorage.setItem("token", JSON.stringify(token));
};

const getTokenFromLS = (): {
  accessToken: string;
  refreshToken: string;
  userId: string;
  tokenExpires: number;
} => {
  return localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") as string)
    : {
        accessToken: "",
        refreshToken: "",
        userId: "",
        tokenExpires: 0
      };
};

const setProfileToLS = (profile: string) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

export { setTokenToLS, getTokenFromLS, setProfileToLS };
