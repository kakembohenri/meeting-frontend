import Layout from "../Components/Layout"
import { Grid, Paper, Typography, Box } from "@mui/material"
import { People, CalendarToday, HourglassTop, HourglassFull, CheckCircle, DoNotDisturb, MoreHoriz } from "@mui/icons-material"
import { useGetCurrentMeetingQuery } from "../services/meetingApiSlice"
import { useDispatch } from "react-redux"
import Spinner from "../Components/Spinner"
import Alert from "@mui/material/Alert"

const Dashboard = () => {

  const {data, isLoading} = useGetCurrentMeetingQuery()

  console.log(data)
  return (
    <Layout>
      <Box>
        <Typography variant="h5" sx={{ margin: '0.8rem 0rem' }}>Current meeting</Typography>
      </Box>
      {isLoading ? (
        <Spinner color="blue" />
      ): (
        data.meeting !== null ? (
        <Grid container spacing={2} sx={{ flexWraap: 'wrap' }}>
          <Grid item xs={3}>
            <Paper elevation={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', padding:'0.8rem', justifyContent:' space-around' }}>
              <Box sx={{ margin: '0 0.4rem', display: 'flex' }}>
                  <People />
                <Typography sx={{ margin:'0 0.3rem' }}>
                  Attendees
                </Typography>
                </Box>
                <Typography variant="h5" sx={{ margin: '0 0.3rem' }}>
                  {data.attendees}
                </Typography>
                
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', padding:'0.8rem', justifyContent:' space-around' }}>
                <Box sx={{ margin: '0 0.4rem', display: 'flex' }}>
                  <CalendarToday />
                <Typography sx={{ margin:'0 0.3rem' }}>
                  Date
                </Typography>
                </Box>
                <Typography variant="h5" sx={{ margin: '0 0.3rem' }}>
                  {data.meeting.date}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', padding:'0.8rem', justifyContent:' space-around' }}>
                <Box sx={{ margin: '0 0.4rem', display: 'flex' }}>
                  <HourglassTop />
                <Typography sx={{ margin:'0 0.3rem' }}>
                  Start time
                </Typography>
                </Box>
                <Typography variant="h5" sx={{ margin: '0 0.3rem' }}>
                  {data.meeting.start_time}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper elevation={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', padding:'0.8rem', justifyContent:' space-around' }}>
                <Box sx={{ margin: '0 0.4rem', display: 'flex' }}>
                  <HourglassFull />
                <Typography sx={{ margin:'0 0.3rem' }}>
                  End time
                </Typography>
                </Box>
                <Typography variant="h5" sx={{ margin: '0 0.3rem' }}>
                  {data.meeting.end_time}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        ): (
          <p>No current meeting set</p>
        )

      )}
      {isLoading ? (
        <Spinner color="blue" />
      ): (

        data.guest === null ? (
          <p>Guest preacher hasnt been set!</p>
        ):(
        <Box sx={{ margin: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>

          <Box sx={{ width: '45%' }}>
            <Typography variant="h5" sx={{ margin: '0.8rem 0rem' }}>
              Topic
            </Typography>
            <Paper sx={{ padding:'0.8rem' }}>
              <Typography>
                {data.guest.topic}
              </Typography>
            </Paper>
          </Box>
          <Box sx={{ width: '45%' }}>
            <Typography variant="h5" sx={{ margin: '0.8rem 0rem' }}>
              Guest preacher
            </Typography>
            <Box>
              <Paper sx={{ padding: '0.8rem' }}>
                <Box sx={{ margin: '0.5rem' }}>
                  <Typography>
                    Name: {data.guest.name}
                  </Typography>
                </Box>
                <Box sx={{ margin: '0.5rem' }}>
                  <Typography>
                    Email: {data.guest.email}
                  </Typography>
                </Box>
                <Box sx={{ margin: '0.5rem' }}>
                  <Typography>
                    Phone number: {data.guest.phone}
                  </Typography>
                </Box>
                <Box sx={{ margin: '0.5rem' }}>
                  <Typography>
                    From: {data.guest.church_from}
                  </Typography>
                </Box>
                <Box sx={{ margin: '0.5rem', textAlign: 'center' }}>
                  <Typography>
                    Invitaion Status
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: 'center', margin: '0.5rem 0' }}>
                  {data.guest.invitation_status === 2 && (
                    <Typography variant="span" sx={{ display: 'flex', alignItems: 'center', padding: '0.3rem', color: '#303841', border: '3px solid #7dd87d', borderRadius: '0.3rem' }}>
                      Accepted <CheckCircle sx={{ margin: '0 0.3rem', color: "#7dd87d" }} />
                    </Typography>

                  ) }
                  {data.guest.invitation_status === 3 && (

                    <Typography variant="span" sx={{ display: 'flex', alignItems: 'center', padding: '0.3rem', color: '#303841', border: '3px solid #eb2632', borderRadius: '0.3rem' }}>
                      Declined <DoNotDisturb sx={{ margin: '0 0.3rem', color: "#eb2632" }} />
                    </Typography>
                  )}
                  {data.guest.invitation_status === 1 && (

                    <Typography variant="span" sx={{ display: 'flex', alignItems: 'center', padding: '0.3rem', color: '#303841', border: '3px solid #ffc93c', borderRadius: '0.3rem' }}>
                      Pending <MoreHoriz sx={{ margin: '0 0.3rem', color: "#ffc93c" }} />
                    </Typography>
                  )}
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>

        )
      )}
    </Layout>
  )
}
export default Dashboard