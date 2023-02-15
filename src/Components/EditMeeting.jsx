import { Paper, TextField, Button, Box, Typography, FormControl,InputLabel, Select, MenuItem } from "@mui/material"
import { useFormik } from "formik"
import { editMeetingSchema } from "../utilis/validation"
import { useUpdateMeetingMutation } from "../services/meetingApiSlice"
import Spinner from "./Spinner"

const EditMeeting = ({meeting, setEditMeeting}) => {

    const [updateMeeting, {isLoading}] = useUpdateMeetingMutation()

    const {id} = JSON.parse(localStorage.getItem("user"))

    const formik = useFormik({
        initialValues: {
            id: meeting.id,
            name: meeting.name,
            date: meeting.date,
            start_time: meeting.start_time,
            status: meeting.status,
            end_time: meeting.end_time,
            location: meeting.location,
            updated_by: id
        },
        validationSchema: editMeetingSchema,
        onSubmit: async (values) => {
            
            const {data} = await updateMeeting(values)

            console.log(data)

            if(data.StatusCode === 204){
                alert(data.msg)
            }else{
                alert(JSON.stringify(data.msg, null, 2));
            }
            setEditMeeting(false)
          },
    })
  return (
    <Paper elevation={3} sx={{ padding: '1rem', width: "30%" }}>
        <Typography variant="h5" sx={{ margin: "0.7rem 0", textAlign: "center" }}>
            Edit Meeting 
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
        <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Meeting Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="status"
                    value={formik.values.status}
                    label="Invitation Status"
                    onChange={formik.handleChange}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                >
                    <MenuItem value={1}>Pending</MenuItem>
                    <MenuItem value={2}>Happened</MenuItem>
                    <MenuItem value={3} >Cancelled</MenuItem>
                </Select>
        </FormControl>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextField
                fullWidth
                type="date"
                sx={{ ".MuiInputBase-root ": {
                    background: "white"
                }, margin: '0.5rem 0' }}
                variant="filled"
                id="date"
                name="date"
                label="Date"
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
                />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextField
                fullWidth
                type="time"
                sx={{ ".MuiInputBase-root ": {
                    background: "white"
                }, margin: '0.5rem 0' }}
                variant="filled"
                id="start_time"
                name="start_time"
                label="Start Time"
                value={formik.values.start_time}
                onChange={formik.handleChange}
                error={formik.touched.start_time && Boolean(formik.errors.start_time)}
                helperText={formik.touched.start_time && formik.errors.start_time}
                />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextField
                fullWidth
                type="time"
                sx={{ ".MuiInputBase-root ": {
                    background: "white"
                }, margin: '0.5rem 0' }}
                variant="filled"
                id="end_time"
                name="end_time"
                label="End Time"
                value={formik.values.end_time}
                onChange={formik.handleChange}
                error={formik.touched.end_time && Boolean(formik.errors.end_time)}
                helperText={formik.touched.end_time && formik.errors.end_time}
                />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <TextField
                fullWidth
                sx={{ ".MuiInputBase-root ": {
                    background: "white"
                }, margin: '0.5rem 0' }}
                variant="filled"
                id="location"
                name="location"
                label="Venue"
                value={formik.values.location}
                onChange={formik.handleChange}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
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
export default EditMeeting