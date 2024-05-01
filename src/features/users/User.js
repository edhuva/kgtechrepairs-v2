import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";

// User
const User = ({ userId }) => {
  const navigate = useNavigate();

  // select user
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId]
    }),
  })

  if(user) {
    const handleEdit = () => navigate(`/private/dash/users/${userId}`);
    
    const userRolesString = user.roles.toString().replaceAll(',', '. ');

    const cellStatus = user.active ? '' : 'table__cell-inactive';

    return (
      <tr className="table__row">
        <td className="table__cell cell__hover table__cell--status">
          {user.active
            ? <span className="table__status--completed">active</span>
            : <span className="table__status--open">inactive</span>
          }
        </td>

        <td className={`table__cell capitalize cell__hover lg__device--cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell capitalize cell__hover sm__device--cell ${cellStatus}`}>{user.username.length < 11 
        ? user.username : (`${user.username.substring(0, 10)}...`)}</td>
        <td className={`table__cell cell__hover lg__device--cell ${cellStatus}`}>{userRolesString}</td>


        <td className={`table__cell ${cellStatus}`}>
          <button
            className="icon-button  table__button"
            onClick={handleEdit}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        </td>
      </tr>
    )
  } else return null;
}

const memoizedUser = memo(User);

export default memoizedUser
