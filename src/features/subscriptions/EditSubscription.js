import { useParams } from "react-router-dom";
import { useGetSubscriptionsQuery } from "./subscriptionsApiSlice";
import PulseLoader from 'react-spinners/PulseLoader';
import EditSubscriptionForm from "./EditSubscriptionForm";
import useTitle from '../../hooks/useTitle';

//Edit Subsciption
const EditSubscription = () => {

    useTitle('KGTech: Edit Subscription');

  const { id } = useParams();

  //select Subscription
  const { subscription } = useGetSubscriptionsQuery("SubscriptionList", {
      selectFromResult: ({ data }) => ({
          subscription: data?.entities[id]
      })
  })

  
  //if not true keep loading
  if (!subscription) return <PulseLoader color="#81AFDD" style={{margin: '0em 0em 0em 5em'}} />

  const content = <EditSubscriptionForm subscription={subscription} />;

  return content;
}

export default EditSubscription
