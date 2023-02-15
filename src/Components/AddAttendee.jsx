import { Box, Button, Paper, Typography } from "@mui/material"
import Spinner from "./Spinner"
import { useAddUserToAttendeeMutation } from "../services/attendeeApiSlice"

const AddAttendee = ({user, setAdd}) => {

    const [addUserToAttendee, {isLoading}] = useAddUserToAttendeeMutation()

    const {id} = JSON.parse(localStorage.getItem("user"))

    const handleSubmit = async (e) => {
        e.preventDefault()

        let attendee = {
            user_id: user.id,
            created_by: id
        }
        const {data} = await addUserToAttendee(attendee)

        alert(data.msg)

        setAdd(false)
    }
   
    return( 
    <Paper elevation={5} sx={{ padding: '1rem' }}>
    <Typography variant="h5" sx={{ color: '#3c4858' }}>
        Add user to attendees list
    </Typography>
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant='body1'>
            Are you sure you want to add '{user.name}' to the current meetings attendees list?
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

            Add
        </Button>
      </Box>
    </form>
    <Box>

    </Box>
    </Paper>
    )
}
export default AddAttendee