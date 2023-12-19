import { Link } from 'react-router-dom';
import KG_logo from '../img/KG_logo.png';

const Public = () => {
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-SA', { dateStyle: 'full', timeStyle: 'short' }).format(date);
    
    const content = (
        <section className='public'>
            <header className='public__header'>
                <div className='header__logo'>
                    <div className='kg__logo'>
                        <img src={KG_logo} alt='logo'/>
                    </div>
                    <h1><span className='welcome-hide'>Welcome to</span> <span className='nowrap'>KGTech Repairs!</span></h1>
                </div>
                
                <button className='login__button'><Link to='/login'>Employee Login</Link> </button>
            </header>
            <main className='public__main'>
                <div className='public__p'>
                    <p>Located in Motherwell Port Elizabeth, KGTech Repairs provides a trained staff ready to meet your tech repair needs.</p>
                </div>
                
                <address className='public__addr'>
                    KGTech Repairs<br />
                    169 Feni Street<br />
                    NU 10 Motherwell<br />
                    PortElizabeth<br />
                    6211
                    <a href='tel:+27628493704'>+2762 849 3704</a>
                </address>
                <br />
                <p>Owner: KGTech</p>
            </main>
            <footer>
                <p className='center'>{today}</p>
            </footer>
        </section>
    )
  return content;
}

export default Public
