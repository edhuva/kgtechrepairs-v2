import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const NewNoteForm = ({ users }) => {
    const { username, isManager, isAdmin} = useAuth();

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation();

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [userAssignedId, setUserAssignedId] = useState(users[0].id);

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserAssignedId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    
    const CreatedUser = users.filter(user => user.username === username);
    const userCreatedId = username && CreatedUser[0].id;


    const onTitleChanged = e => setTitle(e.target.value);
    const onTextChanged = e => setText(e.target.value);
    const onUserIdChanged = e => setUserAssignedId(e.target.value);

    const canSave = [title, text, userCreatedId, userAssignedId].every(Boolean) && !isLoading;

    

    const onSaveNoteClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewNote({ userCreated: userCreatedId, userAssigned: userAssignedId, title, text })
        }
    }

    const options = users.map(user => {
        return (
            <option key={user.id} value={user.id}>
                {user.username}
            </option>
        )
    })

    let userAssigned = null;
    if (isManager || isAdmin) {
        userAssigned = <select id='note-username' name="username" className="form__select" value={userAssignedId} onChange={onUserIdChanged}>
                        {options}
                    </select>
    } else {
        userAssigned = <label className="form__label" htmlFor="note-title" >
                        {users[0].username}
                        </label>
    }

    const errClass = isError ? 'errmsg' : 'offscreen';
    const validTitleClass = !title ? 'form__input--incomplete' : '';
    const validTextClass = !text ? 'form__input--incomplete' : '';

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className='form' onSubmit={onSaveNoteClicked}>
                <div className='form__title-row'>
                    <h2>New Note</h2>
                    <button className='icon-button' title='Save' disabled={!canSave}>
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                </div>
                
                <label className='form__label' htmlFor="title">
                    title
                </label>
                <input className={`form__input ${validTitleClass}`} id='title' name='title' type='text' autoComplete='off' value={title} onChange={onTitleChanged} />
                
                <label className="form__label" htmlFor="text">
                    text: 
                </label>
                <textarea className={`form__input form__input--text ${validTextClass}`} id="text" name="text" value={text} onChange={onTextChanged} />

                <div className="form__row form__footer">
                    <div className="form__divider" >
                        <div className="form__checkbox-padding">
                            <div className="form__row">
                                <label className="form__label form__checkbox-container" htmlFor="note-username">
                                    CREATED BY :
                                </label>
                                <label className="form__label form__checkbox-container" htmlFor="note-username">
                                    {CreatedUser[0].username}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form__divider" >
                        <div className="form__checkbox-padding">
                            <div className="form__row">
                                <label className="form__label form__checkbox-container" htmlFor="note-username">
                                    ASSIGNED TO  :
                                </label>
                                
                                {userAssigned}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className='app__backdash'>
                <button className='login__button'><Link to='/dash'>Back to DashBoard</Link> </button>
            </div>
        </>
    )

  return content
}

export default NewNoteForm
