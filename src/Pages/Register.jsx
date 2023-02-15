import { Box, Typography, Paper, Button } from "@mui/material"
import { ArrowLeft } from "@mui/icons-material"
import { Link } from "react-router-dom"
import "../form.css"

const Register = () => {
  return (
    <Box>
       
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", height: "4rem" }}>
        <Link to="/dashboard" style={{ display: 'flex', color: "#fff",
    textDecoration: "none",
    background: "#35013f",
    padding: '1rem',
    margin: "0.5rem",
    borderRadius: '0.4rem',
    fontFamily: "sans-serif",
    cursor:"pointer"  }}>
                Back to Dashboard
        </Link>
        </Box>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
                Current meeting
            </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center',  width: "60%", justifyContent: 'space-between', height: '80vh' }}>
            
            <Paper elevation={3} sx={{ padding: "0.8rem", margin: "0 0.8rem", display: "flex", flexDirection: "column", justifyContent: "column", alignItems: "center" }}>
                <Typography variant="h5">
                    User Found
                </Typography>
                <Box>
                    <Typography sx={{ margin: "0.4rem 0rem" }}>
                        Name: name
                    </Typography>
                    <Typography sx={{ margin: "0.4rem 0rem" }}>
                        Email: email
                    </Typography>
                    <Typography sx={{ margin: "0.4rem 0rem" }}>
                        Phone: phone
                    </Typography>
                </Box>
                <Button variant="filled" sx={{ color: "#fff",
                        textDecoration: "none",
                        background: "#35013f",
                        padding: '0.3rem 0.6rem',
                        margin: "0.5rem",
                        borderRadius: '0.4rem',
                        fontFamily: "sans-serif", "&:hover":{
                            background: "#35013f",
                            color: "#fff"
                        } }}>
                    Include in meeting
                </Button>
            </Paper>
            
            
        </Box>
    </Box>
  )
}
export default Register