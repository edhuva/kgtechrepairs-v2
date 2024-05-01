import { useParams } from "react-router-dom";
import { useGetRepairOrdersQuery } from "../repairOrders/repairOrdersApiSlice";
import PulseLoader from 'react-spinners/PulseLoader';
import NewInvoiceForm from "./NewInvoiceForm";
import useTitle from "../../hooks/useTitle";

//New Invoice
const NewInvoice = () => {

  useTitle('KGTech: New Invoice');

  const { orderid } = useParams();

  //select order
  const { repairOrder } = useGetRepairOrdersQuery("InvoicesList", {
    selectFromResult: ({ data }) => ({
      repairOrder: data?.entities[orderid]
    }),
  })

  // if not true keep loading
  if (!repairOrder) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

  const content =  <NewInvoiceForm repairOrder={repairOrder} />
  return content;
}

export default NewInvoice
