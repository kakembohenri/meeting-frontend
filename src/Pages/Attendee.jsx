import Layout from "../Components/Layout"
import Table from "../Components/Table"
import { useGetAttendeeQuery } from "../services/attendeeApiSlice"

const Attendee = () => {
  const {data, isLoading} = useGetAttendeeQuery()

  let rows = []

  if(data !== undefined){
    rows = data
  }

  return (
    <Layout>
        <Table title="Attendee" data={rows} isLoading={isLoading} />
    </Layout>
  )
}
export default Attendee