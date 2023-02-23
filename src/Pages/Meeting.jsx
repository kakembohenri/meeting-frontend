import Layout from "../Components/Layout"
import Table from "../Components/Table"
import { useGetMeetingsQuery } from "../services/meetingApiSlice"

const Meeting = () => {

  const {data, isLoading} = useGetMeetingsQuery()

  let rows = []

  if(data !== undefined){
    rows = data
  }


  return (
    <Layout>
        <Table title="Meeting" isLoading={isLoading} data={rows} />
    </Layout>
  )
}
export default Meeting