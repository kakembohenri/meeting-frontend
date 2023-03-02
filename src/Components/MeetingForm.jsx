import { Paper, TextField, Button, Box, Typography } from "@mui/material"
import { useFormik } from "formik"
import { addMeetingSchema } from "../utilis/validation"
import { useCreateMeetingMutation } from "../services/meetingApiSlice"
import Spinner from "./Spinner"

const MeetingForm = ({setMeeting}) => {

    function formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    let currentDate = formatDate()

    const [createMeeting, {isLoading}] = useCreateMeetingMutation()

    const {id} = JSON.parse(localStorage.getItem("user"))

    const formik = useFormik({
        initialValues: {
            name: "",
            date: currentDate,
            start_time: "",
            end_time: "",
            location: "",
            created_by: id
        },
        validationSchema: addMeetingSchema,
        onSubmit: async (values) => {
            
            const {data} = await createMeeting(values)

            console.log(data)

            if(data.StatusCode === 200){
                alert(data.msg)
            }else{
                alert(JSON.stringify(data.msg, null, 2));
            }
            setMeeting(false)
            window.location.reload()

          },
    })
  return (
    <Paper elevation={3} sx={{ padding: '1rem', width: "30%" }}>
        <Typography variant="h5" sx={{ margin: "0.7rem 0", textAlign: "center" }}>
            New Meeting 
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

                Add
            </Button>
        </Box>
        </form>
    </Paper>
  )
}
export default MeetingForm