import { useNavigate } from "react-router";
import { setCredentials } from "../authSlice";
import { useLoginMutation } from "../authApiSlice";

export const handleLogin = async (data) => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  try {
    const { token, user } = await login(data).unwrap();
    dispatch(setCredentials({ token, user }));
    navigate("/dashboard");
    return "Success";
  } catch (error) {
    console.log(error);
    return error;
  }
};
