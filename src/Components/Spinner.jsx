import { CircularProgress } from "@mui/material"

const Spinner = ({color}) => {
  return (
        <CircularProgress sx={{color: color,  width: "25px !important", height: "25px !important", marginLeft: "0.8rem"}} />
  )
}

Spinner.defaultProps = {
  color: "white"
}

export default Spinner