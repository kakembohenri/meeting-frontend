import { useState } from "react";
import { Box, Paper, Typography, Button, Modal } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Download, Add, Calculate } from "@mui/icons-material";
import getColumns from "../utilis/GetColumns";
import AddUser from "./AddUser";
import Attendee from "./Attendee";
import MeetingForm from "./MeetingForm";
import GuestForm from "./GuestForm";
import Spinner from "./Spinner";

const Table = ({title, data, isLoading}) => {

    const [user, setUser] = useState(false)
    const [attendee, setAttendee] = useState(false)
    const [meeting, setMeeting] = useState(false)
    const [guest, setGuest] = useState(false)

    const columns = getColumns(title);

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer sx={{ marginTop: '3rem' }}>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: "space-between" }}>
                        <Box sx={{ width: "30%", display: 'flex', justifyContent: 'space-between' }}>
                            {title === "Users" ? (

                            <Button sx={{ color: '#3c4858', border: "3px solid #35013f" }} onClick={() => setUser(true)} >
                                <Add />
                                Add User
                            </Button>
                            ): title === "Attendee" ? (
                                <Button sx={{ color: '#3c4858', border: "3px solid #35013f" }} onClick={() => setAttendee(true)} >
                                <Add />
                                Add Meeting Attendee
                            </Button>
                            ): title === "Meeting" ? (
                                <Button sx={{ color: '#3c4858', border: "3px solid #35013f" }} onClick={() => setMeeting(true)} >
                                <Add />
                                Add Meeting
                            </Button>
                            ): title === "guest" && (
                                <Button sx={{ color: '#3c4858', border: "3px solid #35013f" }} onClick={() => setGuest(true)} >
                                <Add />
                                Add Guest Preacher
                            </Button>
                            )}
                            
                        </Box>
                    <GridToolbarQuickFilter sx={{width: "60%"}}/>
                </Box>
                
            </GridToolbarContainer>
    )
        }

    return (
        <Box m="2rem 0rem">
            {/* Modals */}
            <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={user} onClose={() => setUser(false)}>
                <>
                <AddUser setUser={setUser} />
                </>
            </Modal>
            <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={attendee} onClose={() => setAttendee(false)}>
                <>
                    <Attendee setAttendee={setAttendee} />
                </>
            </Modal>

            <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={meeting} onClose={() => setMeeting(false)}>
                <>
                <MeetingForm setMeeting={setMeeting} />
                </>
            </Modal>
            <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={guest} onClose={() => setGuest(false)}>
                <>
                <GuestForm setGuest={setGuest} />
                </>
            </Modal>
            {/* Modals */}
            <Box
                m="40px 0 0 0"
                
                height="20rem"
                sx={{ 
                    "& .MuiDataGrid-root":{
                        // border: 'none'
                        background: 'white'
                    },
                    "& .MuiDataGrid-cell": {
                        // borderBottom: "none"
                    },
                    "& .name-column--cell":{
                        // color: 'green'
                    },
                    "& .MuiDataGrid-columnHeaders":{
                        
                        // marginTop: "3rem"
                        marginTop: "1rem"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        // backgroundColor: 'red'
                        // marginTop: "7rem !important"
                        marginTop: "4rem !important"
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        // backgroundColor: 'orange'
                    },
                    "& .MuiDataGrid-root--densityStandard": {
                        height: '26rem'
                    }
                 }}
            >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Paper elevation={3} sx={{ position: "relative",
                            bottom: "-2rem",
                            zIndex: "1",
                            padding: '1rem',
                            width: '95%',
                            background: "#35013f",
                            color: "white" }}>
                        {title}
                    </Paper>
                </Box>
                
                <DataGrid 
                rows={data}
                columns={columns}
                getRowId={(row) => data.indexOf(row)}
                components={{ 
                    Toolbar: CustomToolbar
                 }}
                >
                </DataGrid> 
                
            </Box>
            {isLoading && (

           <Spinner color="blue" />
            )}

        </Box>
    )

}

Table.defaultProps = {
    color: "linear-gradient(60deg,#ef5350,#e53935)"
}


export default Table