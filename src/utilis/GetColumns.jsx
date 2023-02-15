import { Box, Button, Paper, Tooltip, Modal, CircularProgress } from "@mui/material";
import { Download, Edit, Delete, AttachFile, Add, Addchart  } from "@mui/icons-material";
import { useState } from "react";
import EditUser from "../Components/EditUser";
import DeleteUser from "../Components/DeleteUser";
import DeleteAttendee from "../Components/DeleteAttendee";
import AddAttendee from "../Components/AddAttendee";
import EditGuest from "../Components/EditGuest";
import DeleteGuest from "../Components/DeleteGuest";
import EditMeeting from "../Components/EditMeeting";
import DelMeeting from "../Components/DelMeeting";
import SetCurrent from "../Components/SetCurrent";
import Upload from "../Components/Upload";
import { useDownloadMinutesMutation } from "../services/meetingApiSlice";

const getColumns = (title) => {
  const [edit, setEdit] = useState(false)
  const [user, setUser] = useState(null)
  const [meeting, setMeeting] = useState(null)
  const [current, setCurrent] = useState(null)
  const [guest, setGuest] = useState(null)
  const [remove, setRemove] = useState(null)
  const [add, setAdd] = useState(false)
  const [editGuest, setEditGuest] = useState(false)
  const [delGuest, setDelGuest] = useState(false)
  const [editMeeting, setEditMeeting] = useState(false)
  const [delMeeting, setDelMeeting] = useState(false)
  const [upload, setUpload] = useState(false)
  const [file, setFile] = useState(null)

  const [downloadMinutes, {isLoading}] = useDownloadMinutesMutation()
  if (title === "Users") {
    return [
     
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      { field: "email", headerName: "email", flex: 1 },
      {field: "role", headerName: "Role", flex: 1},
      { field: "phone", headerName: "Phone", flex: 1 },
      { field: "college/unit", headerName: "College/Unit", flex: 1 },
      { field: "created_at", headerName: "Created At", flex: 1 },
      { field: "created", headerName: "Created By", flex: 1 },
      {field: "id",
        headerName: "Actions",
        renderCell: ( {row} ) => {
          return (
            <>
            {/* Modals */}
            <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={edit} onClose={() => setEdit(false)}>
              <EditUser user={user} setEdit={setEdit} />
            </Modal>
            <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={remove} onClose={() => setRemove(false)}>
              <DeleteUser user={user} setRemove={setRemove} />
            </Modal>
            <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={add} onClose={() => setAdd(false)}>
              <AddAttendee user={user} setAdd={setAdd} />
            </Modal>
            {/* End Modals */}

            <Box sx={{ padding: "0.4rem" }}>
              <Tooltip title='Edit' arrow placement='bottom-end'>
                <Edit  sx={{ cursor: 'pointer', color: 'green' }} onClick={() => {
                  setUser(row)
                  setEdit(true)
                }} />

              </Tooltip>
              <Tooltip title="Delete" arrow placement='bottom-end'>
                <Delete  sx={{ cursor: 'pointer', color: 'crimson' }} onClick={() => {
                  setUser(row)
                  setRemove(true)
                }}/>

              </Tooltip>
              {row.attendee === null && (

              <Tooltip title="Add to attendees list" arrow placement='bottom-end'>
                <Add  sx={{ cursor: 'pointer', color: 'blue' }} onClick={() => {
                  setUser(row)
                  setAdd(true)
                }}/>

              </Tooltip>
              )}
            </Box>
            
            </>
          );
        },
      },
    ];
  } else if (title === "Attendee") {
    return [
      { field: "name", headerName: "Name", flex: 1 },
      { field: "meeting", headerName: "Meeting", flex: 1 },
      { field: "date", headerName: "Meetings Date", flex: 1 },
      { field: "start", headerName: "Start", flex: 1 },
      { field: "end", headerName: "End", flex: 1 },
      {
        field: "id",
        headerName: "Actions",
        renderCell: ({ row  }) => {
          return (
            <>
              <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={remove} onClose={() => setRemove(false)}>
              <DeleteAttendee user={user} setRemove={setRemove} />
            </Modal>
            <Box>
            <Tooltip title="Delete" arrow placement='bottom-end'>
                <Delete  sx={{ cursor: 'pointer', color: 'crimson' }} onClick={() => {
                  setUser(row)
                  setRemove(true)
                }}/>

              </Tooltip>
            </Box>
            </>
          );
        },
      },
    ];
  } else if (title === "Meeting") {
    return [
      { field: "name", headerName: "Name", flex: 0.3 },
      {filed:"current_meeting", headerName: "Current Meeting", renderCell: ({row})=>{
        return(
          <>
            {row.current_meeting === null ? (
              <span>No</span>
            ):(
              <span>Yes</span>
            )}
          </>
        )
      } },
      { field: "date", headerName: "Date", flex: 0.2 },
      { field: "start_time", headerName: "Start", flex: 0.2 },
      { field: "end_time", headerName: "End", flex: 0.2 },
      { field: "location", headerName: "Venue",  flex: 0.3 },
      {field: "minutes", headerName: "Minutes", flex: 0.2,renderCell: ({row}) => {

        const handleDownload = async (fileName) => {
          setFile(fileName)
          // console.log({fileName: fileName})
          const {data} = await downloadMinutes(fileName)
          console.log(data)
        }
        return (
          <>
          <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={upload} onClose={() => setUpload(false)}>
            <Upload meeting={meeting} setUpload={setUpload} />
          </Modal>
          {row.minutes === null ? (
          <Paper elevation={3} sx={{ padding: "0.4rem",
            display: "flex",
            alignItems: "center",
            cursor: "pointer" }} onClick={() => {
              setUpload(true)
              setMeeting(row)
            }}>
            <AttachFile />
            Upload
          </Paper>

          ):(
            <Paper elevation={3} sx={{ padding: "0.4rem",
            display: "flex",
            alignItems: "center",
            cursor: "pointer" }} onClick={() => handleDownload(row.minutes)}>
              {/* <a href={row.minutes} download="file.pdf"> */}
              {(isLoading && row.minutes === file) ? (
                <CircularProgress />
              ):(
              <>
              
              <Download />
              Download
              </>

              )}
              {/* </a> */}
          </Paper>
          )}
          </>
        )
      }},
      { field: "status_name", headerName: "Status", renderCell: ({ row }) => {
        return (
          <Paper elevation={3} sx={{ padding: '0.2rem', display: 'flex', alignItems: 'center'}}>
            <div style={{ height: "0.6rem",
    width: "0.6rem",
    background: `${row.status_name === 'pending' ? 'yellow': row.status_name === 'happened' ? 'green': row.status_name === 'cancelled' && 'red'}`,
    borderRadius: '50%',
    margin: "0 0.3rem" }}>

            </div>
            {row.status_name}
          </Paper>
        )
      } },
      {
        field: "id",
        headerName: "Action",
        renderCell: ({ row }) => {
          return (
            <>
            <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={editMeeting} onClose={() => setEditMeeting(false)}>
              <EditMeeting meeting={meeting} setEditMeeting={setEditMeeting} />
            </Modal>
            <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={delMeeting} onClose={() => setDelMeeting(false)}>
              <DelMeeting meeting={meeting} setDelMeeting={setDelMeeting} />
            </Modal>
            <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={current} onClose={() => setCurrent(false)}>
              <SetCurrent meeting={meeting} setCurrent={setCurrent} />
            </Modal>

            <Box sx={{ padding: "0.4rem" }}>
              <Tooltip title='Edit' arrow placement='bottom-end'>
                <Edit  sx={{ cursor: 'pointer', color: 'green' }} onClick={() => {
                  setMeeting(row)
                  setEditMeeting(true)
                }} />

              </Tooltip>
              <Tooltip title="Delete" arrow placement='bottom-end'>
                <Delete  sx={{ cursor: 'pointer', color: 'crimson' }} onClick={() => {
                  setMeeting(row)
                  setDelMeeting(true)
                }} />

              </Tooltip>

              {row.current_meeting === null && (
              <Tooltip title="Set as current meeting" arrow placement='bottom-end'>
                <Addchart  sx={{ cursor: 'pointer', color: 'blue' }} 
                onClick={() => {
                  setMeeting(row)
                  setCurrent(true)
                }}
                />

              </Tooltip>

              )}
              
            </Box>
            
            </>
          );
        },
      },
      
    ];
  } else if (title === "guest") {
    return [
      { field: "name", headerName: "Name", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "phone", headerName: "Phone", flex: 1 },
      { field: "topic", headerName: "Topic", flex: 1 },
      { field: "status", headerName: "Invitation Status", flex: 1 },
      { field: "meeting", headerName: "Meeting", flex: 1 },
      { field: "church_from", headerName: "Church From", flex: 1 },
      {
        field: "id",
        headerName: "Actions",
        renderCell: ({ row }) => {
          return (
            <>
             <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={editGuest} onClose={() => setEditGuest(false)}>
              <EditGuest guest={guest} setEditGuest={setEditGuest} />
            </Modal>
            <Modal sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }} open={delGuest} onClose={() => setDelGuest(false)}>
              <DeleteGuest guest={guest} setDelGuest={setDelGuest} />
            </Modal>
              <Box sx={{ padding: "0.4rem" }}>
              <Tooltip title='Edit' arrow placement='bottom-end'>
                <Edit  sx={{ cursor: 'pointer', color: 'green' }} onClick={() => {
                  setGuest(row)
                  setEditGuest(true)
                } 

                } />

              </Tooltip>
              <Tooltip title="Delete" arrow placement='bottom-end'>
                <Delete  sx={{ cursor: 'pointer', color: 'crimson' }} onClick={() => {
                  setGuest(row)
                  setDelGuest(true)
                } 

                }/>

              </Tooltip>

             
            </Box>
            
            </>
          );
        },
      },
    ];
  }
};

export default getColumns;
