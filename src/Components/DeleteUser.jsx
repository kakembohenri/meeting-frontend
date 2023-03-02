import { Box, Button, Paper, Typography } from "@mui/material"
import { useDeleteUserMutation } from "../services/userApiSlice"
import Spinner from "./Spinner"

const DeleteUser = ({user, setRemove}) => {


    const [deleteUser, {isLoading}] = useDeleteUserMutation();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {data} = await deleteUser(user)

        alert(data.msg)

        setRemove(false)

        window.location.reload()
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
export default DeleteUser