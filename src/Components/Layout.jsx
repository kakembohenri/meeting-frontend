import { Box, CssBaseline } from "@mui/material"
import SideBar from "./SideBar"

const Layout = ({children}) => {
  return (
    <Box sx={{ display: 'flex',  background: "#8080802e" }}>
      <CssBaseline />
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3,   display: 'flex', flexDirection: "column", height: '100vh', overflowY: 'auto'}}>
          {/* <Box sx={{ display: "flex", justifyContent: 'flex-end', alignItems: 'center' }}>
            
            
          </Box> */}
        {/* <DrawerHeader /> */}
        <Box sx={{ marginTop: "3rem" }}>
          {children}
        </Box>
        </Box>
    </Box>
  )
}
export default Layout