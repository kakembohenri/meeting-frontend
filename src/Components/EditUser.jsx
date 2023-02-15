import { Paper, Button, Box, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { profileSchema } from "../utilis/validation"
import { useUpdateUserMutation } from "../services/userApiSlice"
import { useDispatch } from "react-redux"
import {setUser} from "../services/authSlice"
import Spinner from "./Spinner"

const EditUser = ({user, setEdit}) => {

    // const dispatch = useDispatch()

    console.log(user)
    const [updateUser, {isLoading, isSuccess}] = useUpdateUserMutation();

    const {id} = JSON.parse(localStorage.getItem("user"))

    const formik = useFormik({
        initialValues: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            updated_by: id
        },
        validationSchema: profileSchema,
        onSubmit: async (values) => {

            const {data} = await updateUser(values);

            if(data.StatusCode === 204){
                let user = data.user;
                alert("Edited profile")
            }else{
                alert(JSON.stringify(data.msg, null, 2));

            }
            setEdit(false)

            
        }
    })
    return( 
    <Paper elevation={5} sx={{ padding: '1rem' }}>
    <Typography variant="h5" sx={{ color: '#3c4858' }}>
        My Profile
    </Typography>
    <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', margin: '0.6rem 0rem', justifyContent: 'space-between' }}>
        
           <TextField
            
            sx={{ ".MuiInputBase-root ": {
                background: "white"
            } }}
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
        <Box sx={{ display: 'flex', margin: '0.6rem 0rem', justifyContent: 'space-between' }}>
        
           <TextField
            
            sx={{ ".MuiInputBase-root ": {
                background: "white"
            } }}
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
        <Box sx={{ display: 'flex', margin: '0.6rem 0rem', justifyContent: 'space-between' }}>
        
           <TextField
            
            sx={{ ".MuiInputBase-root ": {
                background: "white"
            } }}
            variant="filled"
            id="phone"
            name="phone"
            label="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
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
export default EditUser