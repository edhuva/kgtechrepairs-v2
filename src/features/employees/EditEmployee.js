import { useParams } from "react-router-dom";
import { useGetEmployeesQuery } from './employeesApiSlice';
import { useGetUsersQuery } from "../users/usersApiSlice";
import PulseLoader from 'react-spinners/PulseLoader';
import EditEmployeeForm from "./EditEmployeeForm";
import useTitle from "../../hooks/useTitle";

// Edit Employee
const EditEmployee = () => {

    useTitle('KGTech: Edit Employee');

    const { id } = useParams();

    // select employee
    const { employee } = useGetEmployeesQuery("EmployeesList", {
        selectFromResult: ({ data }) => ({
            employee: data?.entities[id]
        })
    })
    // get users
    const { users } = useGetUsersQuery("UsersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map( id => data?.entities[id])
        }),
    })

    // if true keep loadings
    if (!employee || !users?.length) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />

    const user = users.find(user => user.id === employee.userid);

    const  content =user ? <EditEmployeeForm employee={employee} user={user} />
    : <p> Successfully updated please login again!</p>

    return content;
}

export default EditEmployee
