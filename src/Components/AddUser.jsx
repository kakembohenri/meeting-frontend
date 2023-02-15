import { Paper, TextField, Button, Box, Typography } from "@mui/material"
import { useFormik } from "formik"
import { addUserSchema } from "../utilis/validation"
import { useCreateAdminMutation } from "../services/userApiSlice"
import { useCreateUserMutation } from "../services/userApiSlice"
import { useState } from "react"
import Spinner from "./Spinner"

const AddUser = ({setUser}) => {

    const [isLoading, setLoading] = useState(false)
    const {id} = JSON.parse(localStorage.getItem("user"))

    const [createAdmin] = useCreateAdminMutation()

    const [createUser] = useCreateUserMutation()

    const formik = useFormik({
        initialValues: {
            email: "",
            phone: "",
            name: "",
            pass: "",
            collegeORunit: "",
            passConf: "",
            created_by: id
        },
        validationSchema: addUserSchema,
        onSubmit: async (values) => {
            setLoading(true)
            console.log(values)
            if(values.pass !== "" || values.passConf !== ""){
                if(values.pass !== values.passConf){
                    alert("Passwords do not match!")
                    return setUser(false)
                }

                const {data} = await createAdmin(values);

                console.log(data)
                if(data.StatusCode === 201){
                    
                    alert("Created admin")
                }else{
                    alert(JSON.stringify(data.msg, null, 2));
    
                }

            }else{

                const {data} = await createUser(values);

                if(data.StatusCode === 201){
                    
                    alert("Created User")
                }else{
                    alert(JSON.stringify(data.msg, null, 2));
    
                }

            }
            setUser(false)
            setLoading(false)
          },
    })
  return (
    <Paper elevation={3} sx={{ padding: '0.5rem', width: "40%" }}>
        <Typography variant="h5" sx={{ margin: "0.7rem 0", textAlign: "center" }}>
            New User
        </Typography>
        <form  onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextField
                fullWidth
                sx={{ ".MuiInputBase-root ": {
                    background: "white"
                }, margin: '0.5rem 0' }}
                variant="filled"
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                />
        </Box>
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
                sx={{ ".MuiInputBase-root ": {
                    background: "white"
                }, margin: '0.5rem 0' }}
                variant="filled"
                id="phone"
                name="phone"
                label="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextField
                fullWidth
                sx={{ ".MuiInputBase-root ": {
                    background: "white"
                }, margin: '0.5rem 0' }}
                variant="filled"
                id="collegeORunit"
                name="collegeORunit"
                label="College / Unit"
                value={formik.values.collegeORunit}
                onChange={formik.handleChange}
                error={formik.touched.collegeORunit && Boolean(formik.errors.collegeORunit)}
                helperText={formik.touched.collegeORunit && formik.errors.collegeORunit}
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
                id="pass"
                name="pass"
                label="Password"
                value={formik.values.pass}
                onChange={formik.handleChange}
                error={formik.touched.pass && Boolean(formik.errors.pass)}
                helperText={formik.touched.pass && formik.errors.pass}
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
                id="passConf"
                name="passConf"
                label="Confirm Password"
                value={formik.values.passConf}
                onChange={formik.handleChange}
                error={formik.touched.passConf && Boolean(formik.errors.passConf)}
                helperText={formik.touched.passConf && formik.errors.passConf}
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
                Add
            </Button>
        </Box>
        </form>
    </Paper>
  )
}
export default AddUser