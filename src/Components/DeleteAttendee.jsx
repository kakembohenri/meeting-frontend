import { Paper, Button, Box, TextField, Typography } from "@mui/material"

import Spinner from "./Spinner"
import { useDeleteAttendeeMutation } from "../services/attendeeApiSlice"

const DeleteAttendee = ({user, setRemove}) => {

    // const dispatch = useDispatch()

    const [deleteAttendee, {isLoading}] = useDeleteAttendeeMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {data} = await deleteAttendee(user.id)

        alert(data.msg)

        setRemove(false)
    }
   
    return( 
    <Paper elevation={5} sx={{ padding: '1rem' }}>
    <Typography variant="h5" sx={{ color: '#3c4858' }}>
        My Profile
    </Typography>
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant='body1'>
            Are you sure you want to delete '{user.name}'?
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
export default DeleteAttendee