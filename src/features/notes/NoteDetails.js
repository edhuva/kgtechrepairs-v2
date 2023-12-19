import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const NoteDetails = ({ note}) => {

   const navigate = useNavigate();
    
   const handleEdit = () => navigate(`/dash/notes/${note.id}`);

  const created = new Date(note.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
  const updated = new Date(note.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
        
  return (
    <>
        <div  className='view'>
            <div className='form__title-row'>
                <h2>Note #{note.ticket}</h2>
                <div className='form__action-buttons'>
                <button className="icon-button table__button view__edit-button" onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </div>
            </div>

            <div className='view__row'>
                <p className='form__label'>Title:</p>
                <p className='form__label'>{note.title}</p>
            </div>

            <div className='view__row'>
                <p className='form__label'>Description:</p>
                <p className='form__label'>
                    {note.text}
                </p>
            </div>
            
            <div className="view__row-section view__row-footer">
            <div className="view__divider" >
              <div className="view__checkbox-padding">
                <label className="view__label view__checkbox-container" htmlFor="note-completed" >
                  WORK COMPLETE:
                  <label className=" note__status margin">
                    { note.completed
                        ? <span className="note__status--completed"> completed</span>
                        : <span className="note__status--open"> Open</span>
                    }
                </label>
                </label>
              </div>
              <div className="view__checkbox-padding">
                <div className="view__row-section">
                  <label className="view__label view__checkbox-container" htmlFor="note-username">
                    ASSIGNED TO:
                  </label>
                  
                  {note.userAssigned}
                </div>
                
              </div>
              <div className="view__checkbox-padding">
                <div className="view__row-section">
                  <label className="view__label view__checkbox-container" htmlFor="note-username">
                    CREATED BY:
                  </label>
                  <label className="view__label view__checkbox-container" htmlFor="note-username">
                    {note.userCreated}
                  </label>
                </div>  
              </div>
            </div>

            <div className="form__divider">
              <p className="form__created form__checkbox-padding">Created: {`   ${ created}`}</p>
              <p className="form__updated form__checkbox-padding">Updated: {`   ${ updated}`}</p>
            </div>
          </div>

        </div>
        <div className='app__backdash'>
            <button className='login__button'><Link to='/dash/notes'>Back to Notes List</Link> </button>
        </div>
    </>
   
  )
}

export default NoteDetails
