import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useGetRepairRequestsQuery } from "./repairRequestsApiSlice";

//RepairRequest
const RepairRequest = ({ repairRequestId }) => {

  const navigate = useNavigate();

  //select repairReqquest
  const { repairRequest } = useGetRepairRequestsQuery("repairRequestsList", {
    selectFromResult: ({ data }) => ({
      repairRequest: data?.entities[repairRequestId]
    }),
  })

  if (repairRequest) {
    const created = new Date(repairRequest.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'numeric', year: 'numeric' });

    const updated = new Date(repairRequest.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'numeric', year: 'numeric' });

    const handleEdit = () => navigate(`/private/dash/repairrequests/${repairRequestId}`);

    return (
      <tr className="table__row">
        <td className="table__cell cell__hover table__cell--status">
          {repairRequest.status
            ? <span className="table__status--completed">Processed</span>
            : <span className="table__status--open">Awaiting</span>
          }
        </td>
        <td className="table__cell cell__hover repairRequest__username capitalize lg__device--cell">{repairRequest.customer}</td>
        <td className="table__cell cell__hover repairRequest__username capitalize sm__device--cell">{repairRequest.customer.length < 11 ? repairRequest.customer : (`${repairRequest.customer.substring(0, 10)}...`)}</td>
        <td className="table__cell cell__hover repairRequest__deviceType capitalize lg__device--cell">{repairRequest.deviceType}</td>
        <td className="table__cell cell__hover repairRequest__deviceType capitalize sm__device--cell">{repairRequest.deviceType.length < 12 ? repairRequest.deviceType : (`${repairRequest.deviceType.substring(0, 11)}...`)}</td>
        <td className="table__cell cell__hover repairRequest__SerialNo lg__device--cell">{repairRequest.serialNo}</td>
        <td className="table__cell cell__hover repairRequest__SerialNo sm__device--cell">{repairRequest.serialNo.length < 12 ? repairRequest.serialNo : (`${repairRequest.serialNo.substring(0, 11)}...`)}</td>
        <td className="table__cell cell__hover repairrequest__created"> {created}</td>
        <td className="table__cell cell__hover repairrequest__updated">{updated}</td>
        <td className="table__cell">
          <button
            className="icon-button  table__button" 
            onClick={handleEdit}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
        </td>
        <td className="table__cell">
          <button className="table__view-button table__cell-view">
            <Link to={`/private/dash/repairrequests/view/${repairRequest.id}`}>view</Link>
          </button>
        </td>
      </tr>
    )
  } else return null
}

const memoizedRepairReqeust = memo(RepairRequest)

export default memoizedRepairReqeust
