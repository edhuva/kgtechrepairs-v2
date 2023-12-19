import { useGetNotesQuery } from './notesApiSlice';
import Note from './Note';
import useAuth from '../../hooks/useAuth';
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';
import { Link } from 'react-router-dom';

const NotesList = () => {
  useTitle('KGTech: Notes List');
  
  const { username, isManager, isAdmin } = useAuth();

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery('notesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  let content;
  
  if (isLoading) content = <PulseLoader color={"#FFF"} />

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids, entities } = notes;

    let filteredIds;
    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(noteId => entities[noteId].userAssigned === username);
    }

    const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)
    
    content = (
      <>
      {tableContent.length ? 
        <table className='table table--notes'>
          <thead className='table__thead'>
            <tr>
              <th scope='col' className='table__th note__status'>Status</th>
              <th scope='col' className='table__th note__created'>Created</th>
              <th scole='col' className='table__th note__updated'>Updated</th>
              <th scole='col' className='table__th note__title'>Title</th>
              <th scole='col' className='table__th note__username'>Created By</th>
              <th scole='col' className='table__th note__username'>Assigned To</th>
              <th scole='col' className='table__th note__edit'>Edit</th>
              <th scole='col' className='table__th note__view'> Details</th>
            </tr>
          </thead>
          
            <tbody>
            {tableContent}
          </tbody>
        </table>  : <p className='center'>Empty Notes...</p>}
        <div className='app__backdash'>
          <button className='login__button'><Link to='/dash'>Back to DashBoard</Link> </button>
        </div>
      </> 
        
    )
  }
  return content
}

export default NotesList
