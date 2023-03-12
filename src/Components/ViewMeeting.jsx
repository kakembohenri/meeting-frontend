import { Paper, Typography, Box, Button } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect } from "react"
import { useState } from "react"
import { useGetAttendeesByMeetingIdMutation } from "../services/attendeeApiSlice"

const ViewMeeting = ({meeting, setView}) => {

    const [loading, setLoading] = useState(true)

    const [rows, setRows] = useState([])

    const [getAttendeesByMeetingId, {isLoading}] = useGetAttendeesByMeetingIdMutation()
    
    const columns = [
        {field: 'name', headerName: "Name", flex: 1},
        {field: 'email', headerName: "Email", flex: 1},
        {field: 'phone', headerName: "Phone", flex: 1},
        {field: 'college/unit', headerName: "College/Unit", flex: 1},
    ]

    useEffect(() => {
        fetchMeetings()
    }, [meeting])

    useEffect(() => {
        if(!isLoading){
            setTimeout(() => {
                setLoading(() => false)
            }, 1500)
        }
    }, [isLoading])

    const fetchMeetings = async() => {
        const {data} = await getAttendeesByMeetingId(meeting.id)

        setRows(data.result)
    }

  return (
    <Paper elevation={3} sx={{ padding: "1rem", width: "60%", }}>
        <Typography variant="h5">
            {meeting.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
                <Typography sx={{ margin: "0.3rem 0" }}>
                    Attendees: {rows.length}
                </Typography>
                <Typography>
                    Date: {meeting.end_time}
                </Typography>
                <Typography>
                    Location: {meeting.location}
                </Typography>
            </Box>
            <Box>
                <Typography>
                    Date: {meeting.date}
                </Typography>
                <Typography>
                    Start Time: {meeting.start_time}
                </Typography>
                <Typography>
                    End Time: {meeting.end_time}
                </Typography>
            </Box>
        </Box>
        <Box sx={{ margin: "0.6rem 0" }}>
            <Typography>
                Attendees
            </Typography>
            <Box sx={{ margin: "0.5rem 0", height: "13rem" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    />
            </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right", margin: "0.4rem 0" }}>
            <Button variant="contained" sx={{ color: "white", background: "#35013f", ":hover":{
                      background: "#35013f"
                    }, textTransform: "capitalize" }} onClick={() => setView(false)}>
                Close
            </Button>
        </Box>
    </Paper>
  )
}
export default ViewMeeting