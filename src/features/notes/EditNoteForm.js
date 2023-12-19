import { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const EditNoteForm = ({ note, users}) => {

  const { isManager, isAdmin } = useAuth();

  const [updateNote, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateNoteMutation();

  const [deleteNote, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
  }] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const user = users.find(user => user.username === note.userAssigned);

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setConpleted] = useState(note.completed);
  const [userAssignedId, setUserAssignedId] = useState(user.id);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('');
      setText('')
      setUserAssignedId('');
      navigate('/dash/notes')
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value);
  const onTextChanged = e => setText(e.target.value);
  const onCompeletedChanged = e => setConpleted(prev => !prev);
  const onUserIdChanged = e => setUserAssignedId(e.target.value);

  const canSave = [title, text].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async () => {
    if (canSave) {
      await updateNote({ id: note.id, userAssigned: userAssignedId, title, text, completed});
    }
  }

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id});
  }

  const created = new Date(note.createdAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
  const updated = new Date(note.updatedAt).toLocaleString('en-SA', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'});
  const userCreated = note.userCreated;

  const options = users.map(user => {
    return (
      <option key={user.id} value={user.id}>{user.username}</option>
    )
  })

  const errClass = (isError || isDelError) ? 'errmsg' : 'offscreen';
  const validTitleClass = !title ? 'form__input--incomplete' : '';
  const validTextClass = !text ? 'form__input--incomplete' : '';

  const errContent = (error?.data?.message || delerror?.data?.message) ?? '';

  let deleteButton = null;
  let userAssignd = null;
  if (isManager || isAdmin) {
    deleteButton = (
      <button className="icon-button" title="Delete" onClick={onDeleteNoteClicked}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    )

    userAssignd = <select id='note-username' name="username" className="form__select" value={userAssignedId} onChange={onUserIdChanged}>
                      {options}
                  </select>
  } else {
    userAssignd = <label className="form__label" htmlFor="note-title" >
                    {note.userAssgnedId}
                  </label> 
  }

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={e => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Note #{note.ticket}</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" onClick={onSaveNoteClicked} disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
            {deleteButton}
          </div>
        </div>

          <label className="form__label" htmlFor="note-title" >
            Title:
          </label>
          <input className={`form__input ${validTitleClass}`} id="note-title" name="title" type="text" autoComplete="off" value={title} onChange={onTitleChanged} />

          <label className="form__label" htmlFor="note-text">
            Text:
          </label>
          <textarea className={`form__input form__input--text ${validTextClass}`} id="note-text" name="text" value={text} onChange={onTextChanged} />

          <div className="form__row form__footer">
            <div className="form__divider" >
              <div className="form__checkbox-padding">
                <label className="form__label form__checkbox-container" htmlFor="note-completed" >
                 WORK COMPLETE:
                  <input className="form__checkbox margin" id="note-cmpleted" name="completed" type="checkbox" checked={completed} onChange={onCompeletedChanged} />
                </label>
              </div>
              <div className="form__checkbox-padding">
                <div className="form__row">
                  <label className="form__label form__checkbox-container" htmlFor="note-username">
                    ASSIGNED TO:
                  </label>
                  
                  {userAssignd}
                </div>
                
              </div>
              <div className="form__checkbox-padding">
                <div className="form__row">
                  <label className="form__label form__checkbox-container" htmlFor="note-username">
                    CREATED BY:
                  </label>
                  <label className="form__label form__checkbox-container" htmlFor="note-username">
                    {userCreated}
                  </label>
                </div>  
              </div>
            </div>

            <div className="form__divider">
              <p className="form__created form__checkbox-padding">Created: {`   ${ created}`}</p>
              <p className="form__updated form__checkbox-padding">Updated: {`   ${ updated}`}</p>
            </div>
          </div>
      </form>
      <div className='app__backdash'>
        <button className='login__button'><Link to='/dash/notes'>Back to Notes List</Link> </button>
      </div>
    </>
  )

  return content;
}

export default EditNoteForm
