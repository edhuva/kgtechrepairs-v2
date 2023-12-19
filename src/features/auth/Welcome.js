import { Link } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import useTitle from "../../hooks/useTitle";

const Welcome = () => {
    const { username, isManager, isAdmin } = useAuth();

    useTitle(`KGTech: ${username}`);


    const date = new Date();
    const today = new Intl.DateTimeFormat('en-SA', { dateStyle: 'full', timeStyle: 'long' }).format(date);

    const content = (
        <section className="welcome">
            <p>{today}</p>

            <h1>Welcome {username}!</h1>

            <button className="app__button"><Link to='notes'>View techNotes</Link></button>
            <button className="app__button"><Link to='notes/new'>Add New Note</Link></button>
            {(isManager || isAdmin) && <button className="app__button"><Link to='users'>View User Settigs</Link></button>}
            {(isManager || isAdmin) && <button className="app__button"><Link to='users/new'>Add New User</Link></button>}
        </section>
    )

  return content;
}

export default Welcome
