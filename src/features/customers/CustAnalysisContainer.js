import { useGetCustomersQuery } from "../customers/customerApiSlice";
import { useGetRepairOrdersQuery } from "../repairOrders/repairOrdersApiSlice";
import { useGetRepairRequestsQuery } from "../repairRequests/repairRequestsApiSlice";
import { useGetInvoicesQuery } from "../invoices/invoicesApiSlice";
import PulseLoader from 'react-spinners/PulseLoader';
import CustAnalysisContent from "./CustAnalysisContent";

// Customers Analysis Container
const CustAnalysisContainer = () => {

    //get customers
    const { customers } = useGetCustomersQuery("CustomersList", {
        selectFromResult: ({ data }) => ({
            customers: data?.ids.map( id => data?.entities[id])
        }),
    })

    //get orders
    const { repairOrders } = useGetRepairOrdersQuery("RepairOrdersList", {
        selectFromResult: ({ data }) => ({
            repairOrders: data?.ids.map( id => data?.entities[id])
        }),
    })

    //get requests
    const { repairRequests } = useGetRepairRequestsQuery("RepairRequestsList", {
        selectFromResult: ({ data }) => ({
            repairRequests: data?.ids.map( id => data?.entities[id])
        }),
    })

    //invoices
    const { invoices } = useGetInvoicesQuery("InvoicesList", {
        selectFromResult: ({ data }) => ({
            invoices: data?.ids.map( id => data?.entities[id])
        }),
    })

    //if not true keep loading
    if (!customers || !repairOrders || !repairRequests || !invoices) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />

    //customer analysis
    const customersAnalysed = customers.map( customer => {

        const customerOrders = repairOrders.filter(repairOrder => repairOrder.customer === customer.user);

        const processedOrders = customerOrders.filter( order => order.completed === true);

        const awaitingOrders = customerOrders.filter( order => order.completed === false);

        const requestsCreated = repairRequests.filter( request => request.customer === customer.user);

        const invoicesServed = invoices.filter( invoice => invoice.customer === customer.user);

        const paidInvoices = invoicesServed.filter( invoice => invoice.paid === true);

        const unpaidInvoices = invoicesServed.filter( invoice => invoice.paid === false);

        //counters
        const countCustomerOrders = customerOrders.length;
        const countProcessedOrders = processedOrders.length;
        const countAwaitingOrders = awaitingOrders.length;
        const countRequests = requestsCreated.length;
        const countInvoicesServed = invoicesServed.length;
        const countPaidInvoices = paidInvoices.length;
        const countUnpaidInvoices = unpaidInvoices.length;

        return ({...customer, countCustomerOrders: countCustomerOrders, countProcessedOrders: countProcessedOrders, countAwaitingOrders: countAwaitingOrders, countRequests: countRequests, countInvoicesServed: countInvoicesServed, countPaidInvoices: countPaidInvoices, countUnpaidInvoices: countUnpaidInvoices })
    })

    //if true create table content
    const tableContent = customersAnalysed?.length ?  
    customersAnalysed.map(customerAnalysed => <CustAnalysisContent key={customerAnalysed.id} customerAnalysed={customerAnalysed} />) 
        : null;

        let content;
        content = (
            tableContent
            ? 
                <table className="table table__customersAnalysis table__margin">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th ">Username</th>
                            <th scope="col" className="table__th ">Requests</th>
                            <th scope="col" className="table__th ">Repair Orders</th>
                            <th scope="col" className="table__th ">Awaiting Orders</th>
                            <th scope="col" className="table__th ">Procced Orders</th>
                           
                            <th scope="col" className="table__th ">Invoices</th>
                            <th scope="col" className="table__th ">Paid Invoices</th>
                            <th scope="col" className="table__th ">Incomplete Invoices</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            : <p>Empty Customers Analysis</p>
        )

    return content;
}

export default CustAnalysisContainer
