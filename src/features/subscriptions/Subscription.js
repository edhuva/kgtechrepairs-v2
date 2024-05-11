import { memo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetSubscriptionsQuery } from './subscriptionsApiSlice';

//select subscriotion
const Subscription = ({ subscriptionId }) => {

    const navigate = useNavigate();

    //select subscription
  const { subscription } = useGetSubscriptionsQuery("subscriptionList", {
    selectFromResult: ({ data }) => ({
      subscription: data?.entities[subscriptionId]
    }),
  })

  //if true display
  if (subscription) {

    const created = new Date(subscription.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'numeric', year: 'numeric' });

    const updated = new Date(subscription.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'numeric', year: 'numeric' })


    const handleEdit = () => navigate(`/private/dash/subscriptions/${subscriptionId}`);

    return (
      <tr className='table__row'>
        <td className="table__cell cell__hover table__cell--status">
            {subscription.status
                ? <span className="table__status--completed">Processed</span>
                : <span className="table__status--open">Awaiting</span>
            }
        </td>

        <td className='table__cell cell__hover lg__device--cell'>{subscription.email}</td>

        <td className='table__cell cell__hover sm__device--cell'>{subscription.email.length < 13 ? subscription.email : (`${subscription.email.substring(0, 12)}...`)}</td>

        <td className="table__cell cell__hover subscription__created"> {created}</td>
        <td className="table__cell cell__hover subscription__updated">{updated}</td>
        
        <td className='table__cell'>
          <button
              className="icon-button  table__button"
              onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    )
}
}

const memoizedSubscription = memo(Subscription)

export default memoizedSubscription