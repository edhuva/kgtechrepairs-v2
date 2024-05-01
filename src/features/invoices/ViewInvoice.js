import { useParams } from "react-router-dom";
import { useGetInvoicesQuery } from "./invoicesApiSlice";
import { PulseLoader } from "react-spinners";
import ViewInvoiceDetails from './ViewInvoiceDetails';
import useTitle from "../../hooks/useTitle";

// View Invoice
const ViewInvoice = () => {

    useTitle('KGTech: View Invoice');

    const { id } = useParams();

    // select invoice
    const { invoice } = useGetInvoicesQuery("InvoicesList", {
      selectFromResult: ({ data }) => ({
        invoice: data?.entities[id]
      })
    })

    if (!invoice) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

    const content = <ViewInvoiceDetails invoice={invoice}/>
  return content;
}

export default ViewInvoice
