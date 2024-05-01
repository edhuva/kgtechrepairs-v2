import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetRepairOrdersQuery } from "./repairOrdersApiSlice";
import { useGetEmployeesQuery } from "../employees/employeesApiSlice";
import useAuth from "../../hooks/useAuth";

const RepairOrder = ({ repairOrderId }) => {

  const { isCustomer } = useAuth();

  const navigate = useNavigate();

  // select  order
  const { repairOrder } = useGetRepairOrdersQuery("repairOrdersList", {
    selectFromResult: ({ data }) => ({
      repairOrder: data?.entities[repairOrderId]
    }),
  })

  //get employees
  const { employees } = useGetEmployeesQuery("employeesList", {
    selectFromResult: ({ data }) => ({
      employees: data?.ids.map(id => data?.entities[id])
    }),
  })

  if (repairOrder) {

    const created = new Date(repairOrder.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'numeric', year: 'numeric' });

    const updated = new Date(repairOrder.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'numeric', year: 'numeric' })

    const handleEdit = () => navigate(`/private/dash/repairorders/${repairOrderId}`);

    const assignedEmployee = repairOrder.employeeAssigned;
    const assignedEmpClass = (assignedEmployee === employees[employees.length - 1].user) ? 'notYetAssigned' : '';

    return (
      <tr className="table__row">
        <td className="table__cell cell__hover table__cell--status">
          {repairOrder.completed
            ? <span className="table__status--completed">Processed</span>
            : <span className="table__status--open">Awaiting</span>
          }
        </td>

        <td className="table__cell cell__hover repairOrder__username capitalize lg__device--cell">{repairOrder.customer}</td>
        <td className="table__cell cell__hover repairOrder__username capitalize sm__device--cell">{repairOrder.customer.length < 11 ? repairOrder.customer : (`${repairOrder.customer.substring(0, 10)}...`)}</td>

        <td className="table__cell cell__hover repairOrder__username capitalize userCreated lg__device--cell">{repairOrder.employeeCreated}</td>

        <td className={`table__cell cell__hover repairOrder__username capitalize lg__device--cell ${assignedEmpClass}`}>{assignedEmployee}</td>
        <td className={`table__cell cell__hover repairOrder__username capitalize  sm__device--cell ${assignedEmpClass}`}>{assignedEmployee.length < 11 ? repairOrder.employeeAssigned : (`${repairOrder.employeeAssigned.substring(0, 10)}...`)}</td>

        <td className="table__cell cell__hover repairOrder__serialNo lg__device--cell">{repairOrder.serialNo}</td>
        <td className="table__cell cell__hover repairOrder__serialNo sm__device--cell">{repairOrder.serialNo.length < 12 ? repairOrder.serialNo : (`${repairOrder.serialNo.substring(0, 11)}...`)}</td>

        <td className="table__cell cell__hover repairOrder__deviceType capitalize lg__device--cell">{repairOrder.deviceType}</td>

        <td className="table__cell cell__hover repairOrder__created"> {created}</td>
        <td className="table__cell cell__hover repairOrder__updated">{updated}</td>

        <td className={isCustomer ? 'hide' : "table__cell"}>
          <button
            className="icon-button  table__button"
            onClick={handleEdit}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        </td>
        <td className="table__cell">
          <button className="table__view-button table__cell-view">
            <Link to={`/private/dash/repairorders/view/${repairOrderId}`}>view</Link>
          </button>
        </td>
      </tr>
    )
  } else return null
}

const memoizedRepairOrder = memo(RepairOrder)

export default memoizedRepairOrder
