import { useParams } from "react-router-dom";
import { useGetInvoicesQuery } from "./invoicesApiSlice";
import { useGetRepairOrdersQuery } from "../repairOrders/repairOrdersApiSlice";
import PulseLoader from 'react-spinners/PulseLoader';
import EditInvoiceForm from "./EditInvoiceForm";
import useTitle from "../../hooks/useTitle";

// Edit Invoice
const EditInvoice = () => {

  useTitle('KGTech: Edit Invoice');

  const { id } = useParams();

    //select invoice
    const { invoice } = useGetInvoicesQuery("InvoicesList", {
        selectFromResult: ({ data }) => ({
          invoice: data?.entities[id]
        }),
      })

    //get orders
    const { repairOrders } = useGetRepairOrdersQuery("RepairOrdersList", {
        selectFromResult: ({ data }) => ({
            repairOrders: data?.ids.map(id => data?.entities[id])
        })
    })

    //if not true keep loading
    if (!invoice || !repairOrders?.length) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;


    const content =  <EditInvoiceForm invoice={invoice} repairOrders={repairOrders} />
  return content;
}

export default EditInvoice
