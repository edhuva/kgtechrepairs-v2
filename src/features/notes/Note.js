import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { memo } from 'react';

import { useGetNotesQuery } from "./notesApiSlice";

const Note = ({ noteId }) => {

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        }),
    })

    const navigate = useNavigate();

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long' });

        const updated = new Date(note.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long' });

        const handleEdit = () => navigate(`/dash/notes/${noteId}`);
        
        return (
            <tr className="table__row">
                <td className="table__cell note__status">
                    {note.completed
                        ? <span className="note__status--completed">completed</span>
                        : <span className="note__status--open">Open</span>
                    }
                </td>
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__title">{note.title.length <= 18 ? note.title : (`${note.title.substring(0, 18)}...`)}</td>
                <td className="table__cell note__username">{note.userCreated}</td>
                <td className="table__cell note__username">{note.userAssigned}</td>

                <td className="table__cell">
                    <button className="icon-button table__button" onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
                <td className="table__cell">
                    <button className=" table__view-button table__cell-view" >
                        <Link to={`/dash/notes/view/${noteId}`}>view</Link>
                        
                    </button>
                </td>
            </tr>
        )
    } else return null
}

const memoizedNote = memo(Note);

export default memoizedNote
