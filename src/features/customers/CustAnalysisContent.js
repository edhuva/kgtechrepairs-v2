import { memo } from 'react';

//Customer Analysis Content
const CustAnalysisContent = ({customerAnalysed}) => {
    
    if (customerAnalysed) {
        return (
            <tr className='table__row'>
                <td className='table__cell cell__hover capitalize lg__device--cell'>{customerAnalysed.user}</td>
                <td className='table__cell cell__hover capitalize sm__device--cell'>{customerAnalysed.user.length < 11 ? customerAnalysed.user : (`${customerAnalysed.user.substring(0, 10)}...`)}</td>
                <td className='table__cell cell__hover '>{customerAnalysed.countRequests}</td>
                <td className='table__cell cell__hover '>{customerAnalysed.countCustomerOrders}</td>
                <td className={(customerAnalysed.countAwaitingOrders !== 0) ?'table__cell cell__hover table__status--open' 
                : 'table__cell cell__hover table__status--completed'}>{customerAnalysed.countAwaitingOrders}</td>
                <td className='table__cell cell__hover'>{customerAnalysed.countProcessedOrders}</td>
                <td className='table__cell cell__hover'>{customerAnalysed.countInvoicesServed}</td>
                <td className='table__cell cell__hover'>{customerAnalysed.countPaidInvoices}</td>
                <td className={(customerAnalysed.countUnpaidInvoices !== 0) ?'table__cell cell__hover table__status--open' 
                : 'table__cell cell__hover table__status--completed'}>{customerAnalysed.countUnpaidInvoices}</td>
            </tr>
        )
    }
  return (
    <div>
      Analysis Content
    </div>
  )
}

const memoizedCustAnalysisContent = memo(CustAnalysisContent)

export default memoizedCustAnalysisContent
