import { useGetCustomersQuery } from "../customers/customerApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import NewRepairRequestForm from "./NewRepairRequestForm";
import useTitle from "../../hooks/useTitle";

// New RepairRequest
const NewRepairRequest = () => {

  useTitle('KGTech: New Request');

  // customers
  const { customers } = useGetCustomersQuery("customersList", {
    selectFromResult: ({ data }) => ({
      customers: data?.ids.map(id => data?.entities[id])
    }),
  })

  // if not true keep loading
  if ( !customers?.length ) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

  const content = <NewRepairRequestForm  customers={customers} />

  return content;
}
export default NewRepairRequest
