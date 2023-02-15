import { Box, Button, Paper, Typography } from "@mui/material"
import { useFormik } from "formik"
import * as yup from "yup"
import Spinner from "./Spinner"
import FileBase64 from "react-file-base64";
import { useUploadMinutesMutation } from "../services/meetingApiSlice"
import { useState } from "react";

const Upload = ({meeting, setUpload}) => {

    const {id} = JSON.parse(localStorage.getItem("user"))


    const [formData, setFormData] = useState({
            id: meeting.id,
            doc: null,
            name: meeting.name,
            updated_by: id
    })
    const [uploadMinutes, {isLoading}] = useUploadMinutesMutation();

    const handleSubmit = async (e) => {
       
        e.preventDefault()

        if(formData.id !== null && formData.doc !== null){
            console.log(formData)
            const {data} = await uploadMinutes(formData)
            console.log(data)

            alert(JSON.stringify(data.msg, null, 2))
        }else{
            alert("All fields must be filled!")
        }

        setUpload(false)
    }

    return( 
    <Paper elevation={5} sx={{ padding: '1rem' }}>
    <Typography variant="h5" sx={{ color: '#3c4858' }}>
        My Profile
    </Typography>
    <form onSubmit={handleSubmit} >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant='body1'>
            Set minutes for '{meeting.name}'
        </Typography>
        <Box>
        <FileBase64
            type='file'
            name='doc'
            multiple={false}
            onDone={({ base64 }) =>
                setFormData({ ...formData, doc: base64})
            }
           
            />
            {/* <input type="file" name='doc' onChange={(e) => setFormData({ ...formData, doc:  e.target.files[0]})} /> */}

        </Box>
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

            Upload
        </Button>
      </Box>
    </form>
    <Box>

    </Box>
    </Paper>
    )
}
export default Upload