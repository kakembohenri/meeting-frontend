import Layout from "../Components/Layout"
import Table from "../Components/Table"
import {useGetUsersQuery} from '../services/userApiSlice'

const Users = () => {
 
  const {data, isLoading} = useGetUsersQuery()

  let rows = []

  if(data !== undefined){
    rows = data
  }

  return (
    <Layout>
        <Table title="Users" data={rows} isLoading={isLoading} />
    </Layout>
  )
}
export default Users