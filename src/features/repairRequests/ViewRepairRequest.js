import { useParams } from "react-router-dom";
import { useGetRepairRequestsQuery } from "./repairRequestsApiSlice";
import { useGetRepairOrdersQuery } from "../repairOrders/repairOrdersApiSlice";
import { PulseLoader } from "react-spinners";
import ViewRepairRequestDetails from "./ViewRepairRequestDetails";
import useTitle from "../../hooks/useTitle";

// View RepairRequest
const ViewRepairRequest = () => {

  useTitle('KGTech: View Request');

    const { id } = useParams();

    // select repairRequest
    const { repairRequest } = useGetRepairRequestsQuery("RepairRequestsList", {
      selectFromResult: ({ data }) => ({
          repairRequest: data?.entities[id]
      })
  })

  // get repairOrders
  const { repairOrders } = useGetRepairOrdersQuery("RepairOrdersList", {
    selectFromResult: ({ data }) => ({
      repairOrders: data?.ids.map( id =>data?.entities[id])
    })
  })

  // if not true keep loading
    if (!repairRequest || !repairOrders) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

    const content = <ViewRepairRequestDetails repairRequest={repairRequest} repairOrders={repairOrders} />
  return content;
}

export default ViewRepairRequest
