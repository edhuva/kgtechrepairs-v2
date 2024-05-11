import { useGetEmployeesQuery } from "./employeesApiSlice";
import { useGetCustomersQuery } from "../customers/customerApiSlice";
import { useGetRepairOrdersQuery } from "../repairOrders/repairOrdersApiSlice";
import { useGetInvoicesQuery } from "../invoices/invoicesApiSlice";
import PulseLoader from 'react-spinners/PulseLoader';
import EmpAnalysisContent from "./EmpAnalysisContent";
import useAuth from "../../hooks/useAuth";

// Employee Analysis Container
const EmpAnalysisContainer = () => {

    const { authRistrictLevel, defaultPlaceHolder } = useAuth();

    // get employees
    const { employees } = useGetEmployeesQuery("EmployeesList", {
        selectFromResult: ({ data }) => ({
            employees: data?.ids.map( id => data?.entities[id])
        }),
    })

    // get customers
    const { customers } = useGetCustomersQuery("CustomersList", {
        selectFromResult: ({ data }) => ({
            customers: data?.ids.map( id => data?.entities[id])
        }),
    })

    // get orders
    const { repairOrders } = useGetRepairOrdersQuery("RepairOrdersList", {
        selectFromResult: ({ data }) => ({
            repairOrders: data?.ids.map( id => data?.entities[id])
        }),
    })

    // get invoices
    const { invoices } = useGetInvoicesQuery("InvoicesList", {
        selectFromResult: ({ data }) => ({
            invoices: data?.ids.map( id => data?.entities[id])
        }),
    })

    // if not true keep loading
    if (!employees || !customers || !repairOrders || !invoices) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />
    
    //employees analysis
    const employeesAnalysed = employees.map( employee => {
        const assignedOrders = repairOrders.filter(repairOrder => repairOrder.employeeCreated === employee.user);

        const processedOrders = assignedOrders.filter( order => order.completed === true);

        const awaitingOrders = assignedOrders.filter( order => order.completed === false);

        const invoicesServed = invoices.filter( invoice => invoice.employee === employee.user);
        

        const servedCustomers = assignedOrders.map(assignedorder => assignedorder.customer);

        const uniqServedCustomers = new Set(servedCustomers);

        const countAssignedOrders = assignedOrders.length;
        const countProcessedOrders = processedOrders.length;
        const countServedCustomers = uniqServedCustomers.size;
        const countAwaitingOrders = awaitingOrders.length;
        const countAssignedInvoices = invoicesServed.length;

        return ({...employee, countAssignedOrders: countAssignedOrders, countServedCustomers: countServedCustomers, countProcessedOrders: countProcessedOrders, countAwaitingOrders: countAwaitingOrders, countAssignedInvoices: countAssignedInvoices })
    })

    let filteredEmployees = employeesAnalysed?.length ? employeesAnalysed.filter(employee => employee.user !== authRistrictLevel && employee.user !== defaultPlaceHolder) : null;

    // if true create table content
    const tableContent = filteredEmployees?.length ?  
    filteredEmployees.map(employeeAnalysed => <EmpAnalysisContent key={employeeAnalysed.id} employeeAnalysed={employeeAnalysed} />) 
        : null;

    let content;
        content = (
            tableContent
            ? 
                <table className="table table__employeesAnalysis table__margin">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th ">Username</th>
                            <th scope="col" className="table__th ">Served Customers</th>
                            <th scope="col" className="table__th ">Assigned Orders</th>
                            <th scope="col" className="table__th ">Awaiting Orders</th>
                            <th scope="col" className="table__th ">Procced Orders</th>
                            <th scope="col" className="table__th ">Invoices</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            : <p>Empty Employees Analysis</p>
        )

    return content;
}

export default EmpAnalysisContainer
