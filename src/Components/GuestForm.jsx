import { Paper, TextField, Button, Box, Typography } from "@mui/material"
import { useFormik } from "formik"
import { guestSchema } from "../utilis/validation"
import { useCreateGuestsMutation } from "../services/guestApiSlice"
import Spinner from "./Spinner"

const GuestForm = ({setGuest}) => {

    const {id} = JSON.parse(localStorage.getItem('user'))

    const [createGuests, {isLoading}] = useCreateGuestsMutation()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            topic: "",
            church_from: "",
            created_by: id
        },
        validationSchema: guestSchema,
        onSubmit: async (values) => {
            
            const {data} = await createGuests(values)

            console.log(data)

            if(data.StatusCode === 201){
                alert(data.msg)
            }else{
                alert(JSON.stringify(data.msg, null, 2));
            }
            setGuest(false)
        window.location.reload()

          },
    })
  return (
    <Paper elevation={3} sx={{ padding: '1rem', width: "30%" }}>
         <Typography variant="h5" sx={{ margin: "0.7rem 0", textAlign: "center" }}>
            Add new guest preacher
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
                type="email"
                sx={{ ".MuiInputBase-root ": {
                    background: "white"
                }, margin: '0.5rem 0' }}
                variant="filled"
                id="email"
                name="email"
                label="Email Address"
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
                label="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextField
                fullWidth
                multiline
                rows={3}
                sx={{ ".MuiInputBase-root ": {
                    background: "white"
                }, margin: '0.5rem 0' }}
                variant="filled"
                id="topic"
                name="topic"
                label="Topic"
                value={formik.values.topic}
                onChange={formik.handleChange}
                error={formik.touched.topic && Boolean(formik.errors.topic)}
                helperText={formik.touched.topic && formik.errors.topic}
                />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextField
                fullWidth
                sx={{ ".MuiInputBase-root ": {
                    background: "white"
                }, margin: '0.5rem 0' }}
                variant="filled"
                id="church_from"
                name="church_from"
                label="Church from"
                value={formik.values.church_from}
                onChange={formik.handleChange}
                error={formik.touched.church_from && Boolean(formik.errors.church_from)}
                helperText={formik.touched.church_from && formik.errors.church_from}
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
export default GuestForm