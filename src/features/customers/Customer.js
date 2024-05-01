import { memo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetCustomersQuery } from './customerApiSlice';

//customer
const Customer = ({ customerId }) => {

  const navigate = useNavigate();

  //select customer
  const { customer } = useGetCustomersQuery("customerList", {
    selectFromResult: ({ data }) => ({
      customer: data?.entities[customerId]
    }),
  })

  //if true display
  if (customer) {
    const handleEdit = () => navigate(`/private/dash/customers/${customerId}`);

    return (
      <tr className='table__row'>
        <td className='table__cell cell__hover capitalize lg__device--cell'>{customer.user}</td>
        <td className='table__cell cell__hover capitalize sm__device--cell'>{customer.user.length < 11 ? customer.user : (`${customer.user.substring(0, 10)}...`)}</td>
        <td className='table__cell cell__hover capitalize lg__device--cell'>{customer.fullname}</td>
        <td className='table__cell cell__hover capitalize sm__device--cell'>{customer.fullname.length < 15 ? customer.fullname : (`${customer.fullname.substring(0, 14)}...`)}</td>
        <td className='table__cell cell__hover lg__device--cell'>{customer.phoneNo}</td>
        <td className='table__cell cell__hover sm__device--cell'>{customer.phoneNo.length < 13 ? customer.phoneNo : (`${customer.phoneNo.substring(0, 12)}...`)}</td>
        <td className='table__cell cell__hover lg__device--cell'>{customer.email}</td>
        <td className='table__cell cell__hover sm__device--cell'>{customer.email.length < 13 ? customer.email : (`${customer.email.substring(0, 12)}...`)}</td>
        <td className='table__cell'>
          <button
              className="icon-button  table__button"
              onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
        <td className="table__cell">
          <button className="table__view-button table__cell-view">
            <Link to={`/private/dash/customers/view/${customerId}`}>view</Link>
          </button>
        </td>
      </tr>
    )
  }
}

const memoizedCustomer = memo(Customer)

export default memoizedCustomer
