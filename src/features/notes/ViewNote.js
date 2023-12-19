import { useParams } from 'react-router-dom';
import NoteDetails from './NoteDetails';
import { useGetNotesQuery } from './notesApiSlice';
import useAuth from '../../hooks/useAuth';
import { PulseLoader } from 'react-spinners';
import useTitle from '../../hooks/useTitle';

const ViewNote = () => {
    useTitle('KGTech: View Note');

    const { id } = useParams();

    const { username, isManager, isAdmin } = useAuth();

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        }),
    })

    if (!note) return <PulseLoader color={"FFF"} />;

    if (!isManager && !isAdmin && note.userAssigned !== username) {
        return <p className='errmsg'>No access</p>
    }

    const content = <NoteDetails  note={note} />
    
    return content;
}

export default ViewNote