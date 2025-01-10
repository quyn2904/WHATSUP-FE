import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const nav = useNavigate();
  return (
    <div>
      <Button onClick={() => nav("/login")}>Login</Button>
      <Button onClick={() => nav("/register")}>Register</Button>
      <Button onClick={() => nav("/reset-password")}>Reset Password</Button>
    </div>
  );
};

export default Homepage;
