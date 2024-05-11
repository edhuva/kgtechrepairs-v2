import { useParams } from "react-router-dom";
import { useGetContactsQuery } from "./contactsApiSlice";
import PulseLoader from 'react-spinners/PulseLoader';
import EditContactForm from "./EditContactForm";
import useTitle from '../../hooks/useTitle';

//Edit Contact
const EditContact = () => {

  useTitle('KGTech: Edit Contact');

  const { id } = useParams();

  //select contact
  const { contact } = useGetContactsQuery("ContactsList", {
      selectFromResult: ({ data }) => ({
          contact: data?.entities[id]
      })
  })

  //if not true keep loading
  if (!contact) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />

  const content = <EditContactForm contact={contact} />;

  return content;
}

export default EditContact
