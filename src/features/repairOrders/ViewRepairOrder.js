import { useParams } from "react-router-dom";
import { useGetRepairOrdersQuery } from "./repairOrdersApiSlice";
import { useGetInvoicesQuery } from "../invoices/invoicesApiSlice"
import { PulseLoader } from "react-spinners";
import ViewRepairOrderDetails from "./ViewRepairOrderDetails";
import useTitle from "../../hooks/useTitle";

//View RepairOrder
const ViewRepairOrder = () => {

  useTitle('KGTech: View Order');

  const { id } = useParams();

  //select repairOrder
  const { repairOrder } = useGetRepairOrdersQuery("RepairOrdersList", {
    selectFromResult: ({ data }) => ({
      repairOrder: data?.entities[id]
    })
  })

  //get invoices
  const { invoices } = useGetInvoicesQuery("InvoicesList", {
    selectFromResult: ({ data }) => ({
      invoices: data?.ids.map( id =>data?.entities[id])
    })
  })

  //if not true keep loading
  if (!repairOrder ||  !invoices ) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

    const content = <ViewRepairOrderDetails repairOrder={repairOrder} invoices={invoices}/>
  return content;
}

export default ViewRepairOrder
