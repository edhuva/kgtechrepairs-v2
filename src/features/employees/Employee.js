import { memo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetEmployeesQuery } from './employeesApiSlice';

// Employee
const Employee = ({ employeeId }) => {
  const navigate = useNavigate();

  //select employee
  const { employee } = useGetEmployeesQuery("employeeList", {
    selectFromResult: ({ data }) => ({
      employee: data?.entities[employeeId]
    }),
  })

  if (employee) {
    const handleEdit = () => navigate(`/private/dash/employees/${employeeId}`);

    return (
      <tr className='table__row'>
        <td className='table__cell capitalize cell__hover lg__device--cell '>{employee.user}</td>
        <td className='table__cell capitalize cell__hover sm__device--cell'>{employee.user.length < 11 ? employee.user : (`${employee.user.substring(0, 10)}...`)}</td>
        <td className='table__cell capitalize cell__hover lg__device--cell'>{employee.fullname}</td>
        <td className='table__cell capitalize cell__hover sm__device--cell'>{employee.fullname.length < 15 ? employee.fullname : (`${employee.fullname.substring(0, 14)}...`)}</td>
        <td className='table__cell cell__hover lg__device--cell'>{employee.phoneNo}</td>
        <td className='table__cell cell__hover sm__device--cell'>{employee.phoneNo.length < 13 ? employee.phoneNo : (`${employee.phoneNo.substring(0, 12)}...`)}</td>
        <td className='table__cell cell__hover lg__device--cell'>{employee.email}</td>
        <td className='table__cell cell__hover sm__device--cell'>{employee.email.length < 13 ? employee.email : (`${employee.email.substring(0, 12)}...`)}</td>
        <td className='table__cell'>
          <button
              className="icon-button  table__button"
              onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
        <td className="table__cell">
          <button className="table__view-button table__cell-view">
            <Link to={`/private/dash/employees/view/${employeeId}`}>view</Link>
          </button>
        </td>
      </tr>
    )
  }
}

const memoizedEmployee = memo(Employee)

export default memoizedEmployee
