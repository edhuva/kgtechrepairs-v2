import { useParams } from "react-router-dom";
import { useGetRepairRequestsQuery } from "./repairRequestsApiSlice";
import { useGetCustomersQuery } from "../customers/customerApiSlice";
import PulseLoader from 'react-spinners/PulseLoader';
import EditRepairRequestForm from "./EditRepairRequestForm";
import useTitle from "../../hooks/useTitle";

//Edit RepairRequest
const EditRepairRequest = () => {

  useTitle('KGTech: Edit Request');

    const { id } = useParams();

    //get repairRequest
    const { repairRequest } = useGetRepairRequestsQuery("RepairRequestsList", {
        selectFromResult: ({ data }) => ({
          repairRequest: data?.entities[id]
        }),
    })

    //customers
    const { customers } = useGetCustomersQuery("CustomersList", {
        selectFromResult: ({ data }) => ({
            customers: data?.ids.map(id => data?.entities[id])
        })
    })

    //if not true keep loading
    if (!repairRequest || !customers?.length) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

  
    const content =  <EditRepairRequestForm repairRequest={repairRequest} customers={customers} />
  return content;
}

export default EditRepairRequest
