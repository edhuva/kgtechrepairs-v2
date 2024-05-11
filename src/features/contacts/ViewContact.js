import { useParams } from "react-router-dom";
import { useGetContactsQuery } from "./contactsApiSlice";
import { PulseLoader } from "react-spinners";
import ViewContactDetails from "./ViewContactDetails";
import useTitle from "../../hooks/useTitle";

//View contact
const ViewContact = () => {

    useTitle('KGTech: Contact');

    const { id } = useParams();

    //select contact
  const { contact } = useGetContactsQuery("RepairOrdersList", {
    selectFromResult: ({ data }) => ({
      contact: data?.entities[id]
    })
  })

  //if not true keep loading
  if (!contact ) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />;

    const content = <ViewContactDetails contact={contact} />
    
  return content;

}

export default ViewContact
