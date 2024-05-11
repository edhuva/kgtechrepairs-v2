import { memo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetContactsQuery } from './contactsApiSlice';

  //select contact
const Contact = ({ contactId }) => {

    const navigate = useNavigate();

  //select contact
  const { contact } = useGetContactsQuery("contactList", {
    selectFromResult: ({ data }) => ({
      contact: data?.entities[contactId]
    }),
  })

    //if true display
    if (contact) {
        const handleEdit = () => navigate(`/private/dash/contacts/${contactId}`);
    
        return (
          <tr className='table__row'>
            <td className="table__cell cell__hover table__cell--status">
                {contact.status
                    ? <span className="table__status--completed">Processed</span>
                    : <span className="table__status--open">Awaiting</span>
                }
            </td>

            <td className='table__cell cell__hover lg__device--cell'>{contact.email}</td>

            <td className='table__cell cell__hover sm__device--cell'>{contact.email.length < 13 ? contact.email : (`${contact.email.substring(0, 12)}...`)}</td>

            <td className='table__cell cell__hover capitalize lg__device--cell'>{contact.message.length < 11 ? contact.message : (`${contact.message.substring(0, 10)}...`)}</td>

            <td className='table__cell cell__hover capitalize sm__device--cell'>{contact.message.length < 15 ? contact.message : (`${contact.message.substring(0, 15)}...`)}</td> 
            
            <td className='table__cell'>
              <button
                  className="icon-button  table__button"
                  onClick={handleEdit}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </td>
            <td className="table__cell">
              <button className="table__view-button table__cell-view">
                <Link to={`/private/dash/contacts/view/${contactId}`}>view</Link>
              </button>
            </td>
          </tr>
        )
    }
}

const memoizedContact = memo(Contact)

export default memoizedContact
