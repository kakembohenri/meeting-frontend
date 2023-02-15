import { Paper, TextField, Button, Box, Typography } from "@mui/material"
import { useFormik } from "formik"
import { registerUser } from "../utilis/validation"
import { useCreateAttendeeMutation } from "../services/attendeeApiSlice"
import Spinner from "./Spinner"

const Attendee = ({setAttendee}) => {

    const [createAttendee, {isLoading}] = useCreateAttendeeMutation();

    const {id} = JSON.parse(localStorage.getItem("user"))

    const formik = useFormik({
        initialValues: {
            email: "",
            phone: "",
            name: "",
            collegeORunit: "",
            created_by: id
        },
        validationSchema: registerUser,
        onSubmit:  async (values) => {
            const {data} = await createAttendee(values);

            if(data.StatusCode === 204){
                return alert(data.msg)
            }else{
                alert(JSON.stringify(data.msg, null, 2));

            }
            setAttendee(false)
          },
    })
  return (
    <Paper elevation={3} sx={{ padding: '1rem', display: "flex", justifyContent: "center" }}>
        <form action="" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" sx={{ margin: "0.7rem 0", textAlign: "center" }}>
            New Meeting Attendee
        </Typography>
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
                label="College/Unit"
                value={formik.values.collegeORunit}
                onChange={formik.handleChange}
                error={formik.touched.collegeORunit && Boolean(formik.errors.collegeORunit)}
                helperText={formik.touched.collegeORunit && formik.errors.collegeORunit}
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
                Register
            </Button>
        </Box>
        </form>
       
    </Paper>
  )
}
export default Attendee