import Layout from "../Components/Layout"
import Table from "../Components/Table"
import { useGetGuestsQuery } from "../services/guestApiSlice"

const Guest = () => {

  const {data, isLoading} = useGetGuestsQuery()

  let rows = []

  if(data !== undefined){
    rows = data
  }
  return (
    <Layout>
        <Table title="guest" data={rows} isLoading={isLoading} />
    </Layout>
  )
}
export default Guest