import { memo } from 'react';

// Employees Analysis Content
const EmpAnalysisContent = ({ employeeAnalysed }) => {

    if (employeeAnalysed) {
        return (
            <tr className='table__row'>
                <td className='table__cell capitalize cell__hover lg__device--cell'>{employeeAnalysed.user}</td>
                <td className='table__cell capitalize cell__hover sm__device--cell'>{employeeAnalysed.user.length < 11 
                ? employeeAnalysed.user : (`${employeeAnalysed.user.substring(0, 10)}...`)}</td>
                <td className='table__cell cell__hover'>{employeeAnalysed.countServedCustomers}</td>
                <td className='table__cell cell__hover'>{employeeAnalysed.countAssignedOrders}</td>
                <td className={(employeeAnalysed.countAwaitingOrders !== 0) ?'table__cell cell__hover table__status--open' 
                : 'table__cell cell__hover table__status--completed'}>{employeeAnalysed.countAwaitingOrders}</td>
                <td className='table__cell cell__hover'>{employeeAnalysed.countProcessedOrders}</td>
                <td className='table__cell cell__hover'>{employeeAnalysed.countAssignedInvoices}</td>
                
            </tr>
        )
    }
  return (
    <div>
      Analysis Content
    </div>
  )
}

const memoizedEmpAnalysisContent = memo(EmpAnalysisContent)

export default memoizedEmpAnalysisContent
