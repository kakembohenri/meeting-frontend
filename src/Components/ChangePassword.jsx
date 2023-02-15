import { Paper, Button, Box, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { changePasswordSchema } from "../utilis/validation"
import { useChangePasswordMutation } from "../services/userApiSlice"
import Spinner from "./Spinner"

const ChangePassword = ({handlePassword}) => {

    const [changePassword, {isLoading, isSuccess}] = useChangePasswordMutation()

    const {id} = JSON.parse(localStorage.getItem("user"))

    const formik = useFormik({
        initialValues: {
            id: id,
            oldPass: "",
            newPass: "",
            confPass: ""
        },
        validationSchema: changePasswordSchema,
        onSubmit: async (values) => {

            console.log(values)
            if(values.newPass !== values.confPass){

                alert("Passwords dont match!")
                return handlePassword(false)
            }

            const {data} = await changePassword(values);

            if(data.StatusCode === 204){
                alert(JSON.stringify(data.msg, null, 2))

            }else{
                alert(JSON.stringify(data.msg, null, 2));

            }
            handlePassword(false)
        }
    })

  return (
    <Paper elevation={5} sx={{ padding: '1rem' }}>
    <Typography variant="h5" sx={{ color: '#3c4858' }}>
        Change password
    </Typography>
    <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', margin: '0.6rem 0rem', justifyContent: 'space-between' }}>
        
           <TextField
            type="password"           
            sx={{ ".MuiInputBase-root ": {
                background: "white"
            } }}
            variant="filled"
            id="oldPass"
            name="oldPass"
            label="Current Password"
            value={formik.values.oldPass}
            onChange={formik.handleChange}
            error={formik.touched.oldPass && Boolean(formik.errors.oldPass)}
            helperText={formik.touched.oldPass && formik.errors.oldPass}
            />
        </Box>
        <Box sx={{ display: 'flex', margin: '0.6rem 0rem', justifyContent: 'space-between' }}>
        
           <TextField
            type="password"           
            sx={{ ".MuiInputBase-root ": {
                background: "white"
            } }}
            variant="filled"
            id="newPass"
            name="newPass"
            label="New Password"
            value={formik.values.newPass}
            onChange={formik.handleChange}
            error={formik.touched.newPass && Boolean(formik.errors.newPass)}
            helperText={formik.touched.newPass && formik.errors.newPass}
            />
        </Box>
        <Box sx={{ display: 'flex', margin: '0.6rem 0rem', justifyContent: 'space-between' }}>
        
           <TextField
            type="password"           
            sx={{ ".MuiInputBase-root ": {
                background: "white"
            } }}
            variant="filled"
            id="confPass"
            name="confPass"
            label="Confirm Password"
            value={formik.values.confPass}
            onChange={formik.handleChange}
            error={formik.touched.confPass && Boolean(formik.errors.confPass)}
            helperText={formik.touched.confPass && formik.errors.confPass}
            />
        </Box>
       
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        
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

            Save
        </Button>
      </Box>
    </form>
    <Box>

    </Box>
</Paper>
  )
}
export default ChangePassword