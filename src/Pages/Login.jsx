import { useState } from "react"
import { Paper, TextField, Button, Box, Typography } from "@mui/material"
import { useFormik } from "formik"
import { loginSchema } from "../utilis/validation"
import { handleLogin } from "../services/api/signup"
import Spinner from "../Components/Spinner"
import { useNavigate } from "react-router"
import { setCredentials } from "../services/authSlice"
import { useLoginMutation } from "../services/authApiSlice"
import { useDispatch } from "react-redux"

const Login = () => {

    const [login, {isLoading, isSuccess}] = useLoginMutation();
  const navigate = useNavigate();
const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {

            const {data} = await login(values);

            if(data.StatusCode === 200){
                let token = data.token;
                let user = data.user;
                dispatch(setCredentials({ token, user }));
                navigate("/dashboard");

            }else{
                alert(JSON.stringify(data.msg, null, 2));

            }
            // navigate("/dashboard")
          },
    })

   
  return (
    <Box sx={{ padding: '1rem', display:"flex", width: "100%", height: "100vh", justifyContent:"center", alignItems: "center", background: '#80808038' }}>
        <Paper elevation={3} sx={{ padding: "1rem" }}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
                Login
            </Typography>
            <form action="" onSubmit={formik.handleSubmit}>
            
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                <TextField
                    fullWidth
                    sx={{ ".MuiInputBase-root ": {
                        background: "white"
                    }, margin: '0.5rem 0' }}
                    variant="filled"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    />
            </Box>
            
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                <TextField
                    fullWidth
                    type="password"
                    sx={{ ".MuiInputBase-root ": {
                        background: "white"
                    }, margin: '0.5rem 0' }}
                    variant="filled"
                    id="password"
                    name="password"
                    label="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    />
            </Box>
            <Box sx={{ margin: '1rem 0', display: 'flex', justifyContent: 'center'  }}>
                <Button type="submit" variant="text" sx={{ color: "#fff",
                            textDecoration: "none",
                            background: "#35013f",
                            padding: '0.5rem 1rem',
                            margin: "0.5rem",
                            borderRadius: '0.4rem',
                            fontFamily: "sans-serif", "&:hover":{
                                background: "#35013f",
                                color: "#fff"
                            } }} disabled={isLoading ? true : false}>
                    {isLoading && <Spinner />}
                    Login
                </Button>
            </Box>
            </form>

        </Paper>
    </Box>
  )
}
export default Login