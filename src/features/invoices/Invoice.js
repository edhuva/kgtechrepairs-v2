import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetInvoicesQuery } from "./invoicesApiSlice";
import useAuth from "../../hooks/useAuth";

// Invoice
const Invoice = ({ invoiceId }) => {

  const { isCustomer } = useAuth();

  const navigate = useNavigate();

  //select invoice
  const { invoice } = useGetInvoicesQuery("invoicesList", {
    selectFromResult: ({ data }) => ({
      invoice: data?.entities[invoiceId]
    }),
  })

  if (invoice) {

    const created = new Date(invoice.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'numeric', year: 'numeric'});
    const updated = new Date(invoice.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'numeric', year: 'numeric'});

    const handleEdit = () => navigate(`/private/dash/invoices/${invoiceId}`);

    return (
      <tr className="table__row">
        <td className="table__cell cell__hover table__cell--status">
          {invoice.paid
            ? <span className="table__status--completed">paid</span>
            : <span className="table__status--open">unpaid</span>
          }
        </td>
        <td className="table__cell cell__hover invoice__username capitalize lg__device--cell">{invoice.customer}</td>
        <td className="table__cell cell__hover invoice__username capitalize sm__device--cell">{invoice.customer.length < 11 ? invoice.customer : (`${invoice.customer.substring(0, 10)}...`)}</td>
        <td className="table__cell cell__hover invoice__username capitalize lg__device--cell">{invoice.employee}</td>
        <td className="table__cell cell__hover invoice__username capitalize sm__device--cell">{invoice.employee.length < 11 ? invoice.employee : (`${invoice.employee.substring(0, 10)}...`)}</td>
        <td className="table__cell cell__hover invoice__deviceType lg__device--cell">{invoice.serialNo}</td>
        <td className="table__cell cell__hover invoice__deviceType sm__device--cell">{invoice.serialNo}</td>
        <td className="table__cell cell__hover invoice__totalAmount">R {invoice.totalAmount}</td>
        <td className="table__cell cell__hover invoice__created"> {created}</td>
        <td className="table__cell cell__hover invoice__updated">{updated}</td>
        <td className={isCustomer ? "hide" : "table__cell"}>
          <button
            className="icon-button  table__button"
            onClick={handleEdit}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        </td>
        <td className="table__cell">
          <button className="table__view-button table__cell-view">
            <Link to={`/private/dash/invoices/view/${invoiceId}`}>view</Link>
          </button>
        </td>
      </tr>
    )
  } else return null

}

const memoizedInvoice = memo(Invoice)

export default memoizedInvoice
