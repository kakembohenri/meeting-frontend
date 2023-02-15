import { Box, Button, Paper, Typography } from "@mui/material"
import { useDeleteMeetingMutation } from "../services/meetingApiSlice"
import Spinner from "./Spinner"

const DelMeeting = ({meeting, setDelMeeting}) => {

console.log(meeting)
    const [deleteMeeting, {isLoading}] = useDeleteMeetingMutation();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {data} = await deleteMeeting(meeting.id)

        console.log(data)
        alert(data.msg)

        setDelMeeting(false)
    }
   
    return( 
    <Paper elevation={5} sx={{ padding: '1rem' }}>
    <Typography variant="h5" sx={{ color: '#3c4858' }}>
        My Profile
    </Typography>
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant='body1'>
            Are you sure you want to delete '{meeting.name}'?
        </Typography>
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

            Delete
        </Button>
      </Box>
    </form>
    <Box>

    </Box>
    </Paper>
    )
}
export default DelMeeting