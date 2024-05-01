import { useParams } from "react-router-dom";
import { useGetRepairRequestsQuery } from "./repairRequestsApiSlice";
import { useGetCustomersQuery } from "../customers/customerApiSlice";
import { useGetEmployeesQuery } from "../employees/employeesApiSlice";
import PulseLoader from 'react-spinners/PulseLoader';
import ReqNewRepairOrderForm from "./ReqNewRepairOrderForm";
import useTitle from "../../hooks/useTitle";

// Request New RepairOrder
const ReqNewRepairOrder = () => {

    useTitle('KGTech: New Order');

    const {id} = useParams();

    //select repairRequest
    const { repairRequest } = useGetRepairRequestsQuery("RepairRequestsList", {
        selectFromResult: ({ data }) => ({
          repairRequest: data?.entities[id]
        }),
    })

    //get employees
    const { employees } = useGetEmployeesQuery("EmployeesList", {
        selectFromResult: ({ data }) => ({
            employees: data?.ids.map(id => data?.entities[id])
        })
    })
    
    // get customers
    const { customers } = useGetCustomersQuery("CustomersList", {
        selectFromResult: ({ data }) => ({
            customers: data?.ids.map(id => data?.entities[id])
        })
    })

    //if not true keeping loading
    if (!repairRequest || !employees?.length || !customers?.length) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;


    const content =  <ReqNewRepairOrderForm repairRequest={repairRequest} employees={employees} customers={customers} 
    />
  return content;

}

export default ReqNewRepairOrder
