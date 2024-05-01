import { useParams } from "react-router-dom";
import { useGetUsersQuery } from './usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader';
import UpdateUserAccountDetails from "./UpdateUserAccountDetails";
import useTitle from "../../hooks/useTitle";

// UpdateUser Account
const UpdateUserAccount = () => {

    useTitle('KGTech: Update Account');

    const { id } = useParams();

    // select user
    const { user } = useGetUsersQuery("UsersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })

    // if not true keep loading
    if (!user) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

    const content = <UpdateUserAccountDetails user={user} />;

  return content;
}

export default UpdateUserAccount
