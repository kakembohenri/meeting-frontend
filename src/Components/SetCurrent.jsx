import { Box, Button, Paper, Typography } from "@mui/material"
import { useSetCurrentMeetingMutation } from "../services/meetingApiSlice"
import Spinner from "./Spinner"

const SetCurrent = ({meeting, setCurrent}) => {

    const [setCurrentMeeting, {isLoading}] = useSetCurrentMeetingMutation();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {data} = await setCurrentMeeting(meeting.id)

        console.log(data)
        alert(data.msg)

        setCurrent(false)
    }
   
    return( 
    <Paper elevation={5} sx={{ padding: '1rem' }}>
    <Typography variant="h5" sx={{ color: '#3c4858' }}>
        Set current meeting
    </Typography>
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant='body1'>
            Are you sure you want to set '{meeting.name}' as the current meeting?
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

            Set
        </Button>
      </Box>
    </form>
    <Box>

    </Box>
    </Paper>
    )
}
export default SetCurrent