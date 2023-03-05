import { Paper, TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useFormik } from "formik"
import { guestSchema } from "../utilis/validation"
import { useUpdateGuestMutation } from "../services/guestApiSlice"
import Spinner from "./Spinner"

const EditGuest = ({guest, setEditGuest}) => {

    const {id} = JSON.parse(localStorage.getItem('user'))

    const [updateGuest, {isLoading}] = useUpdateGuestMutation()

    const formik = useFormik({
        initialValues: {
            id: guest.id,
            name: guest.name,
            email: guest.email !== null ? guest.email : "",
            phone: guest.phone !== null ? guest.phone : "",
            invitation_status: guest.invitation_status,
            topic: guest.topic,
            church_from: guest.church_from,
            updated_by: id,
            created_by:guest.created_by
        },
        validationSchema: guestSchema,
        onSubmit: async (values) => {
            
            const {data} = await updateGuest(values)

            console.log(data)

            if(data.StatusCode === 201){
                alert(data.msg)
            }else{
                alert(JSON.stringify(data.msg, null, 2));
            }
            setEditGuest(false)
        window.location.reload()

          },
    })

    console.log("errors:", formik.errors)
  return (
    <Paper elevation={5} sx={{ padding: '1rem', width: '30%' }}>
         <Typography variant="h5" sx={{ color: '#3c4858' }}>
            Edit Guest Preacher
        </Typography>
        <form onSubmit={formik.handleSubmit}>
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
        <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Invitation Status</InputLabel>
                <Select
                    variant="standard"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="invitation_status"
                    value={formik.values.invitation_status}
                    label="Invitation Status"
                    onChange={formik.handleChange}
                    error={formik.touched.invitation_status && Boolean(formik.errors.invitation_status)}
                >
                    <MenuItem value={1}>Pending</MenuItem>
                    <MenuItem value={2}>Accepted</MenuItem>
                    <MenuItem value={3} >Rejected</MenuItem>
                </Select>
        </FormControl>
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

                Edit
            </Button>
        </Box>
        </form>
    </Paper>
  )
}
export default EditGuest