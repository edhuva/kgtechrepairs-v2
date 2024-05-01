import { useParams } from "react-router-dom";
import { useGetUsersQuery } from './usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader';
import EditUserForm from "./EditUserForm";
import useTitle from "../../hooks/useTitle";

// Edit User
const EditUser = () => {

    useTitle('KGTech: Edit User');

    const { id } = useParams();

    // select user
    const { user } = useGetUsersQuery("UsersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })

    // if not true keep loading
    if (!user) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

    const content = <EditUserForm user={user} />;


  return content;
}

export default EditUser
