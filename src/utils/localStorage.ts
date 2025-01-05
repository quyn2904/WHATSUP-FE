const setTokenToLS = (token: { accessToken: string; refreshToken: string }) => {
  localStorage.setItem("token", JSON.stringify(token));
};

const getTokenFromLS = (): {
  accessToken: string;
  refreshToken: string;
} => {
  return localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") as string)
    : {
        accessToken: "",
        refreshToken: ""
      };
};

const setProfileToLS = (profile: string) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

export { setTokenToLS, getTokenFromLS, setProfileToLS };
