import { useParams } from "react-router-dom"
import { useGetRepairOrdersQuery } from "./repairOrdersApiSlice";
import { useGetCustomersQuery } from "../customers/customerApiSlice";
import { useGetEmployeesQuery } from "../employees/employeesApiSlice";
import PulseLoader from 'react-spinners/PulseLoader';
import EditRepairOrderForm from "./EditRepairOrderForm";
import useTitle from "../../hooks/useTitle";

//Edit Repair Order
const EditRepairOrder = () => {

  useTitle('KGTech: Edit Order');

  const { id } = useParams();
    
  //select order
  const { repairOrder } = useGetRepairOrdersQuery("RepairOrdersList", {
    selectFromResult: ({ data }) => ({
      repairOrder: data?.entities[id]
    }),
  })

  //get employees
  const { employees } = useGetEmployeesQuery("EmployeesList", {
    selectFromResult: ({ data }) => ({
        employees: data?.ids.map(id => data?.entities[id])
    })
  })

  //get customers
  const { customers } = useGetCustomersQuery("CustomersList", {
    selectFromResult: ({ data }) => ({
        customers: data?.ids.map(id => data?.entities[id])
      })
    })
    
    // if not true keep loading
    if (!repairOrder || !employees?.length || !customers?.length) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

  const content =  <EditRepairOrderForm repairOrder={repairOrder} employees={employees} customers={customers} 
    />
  return content;
}

export default EditRepairOrder

