import { faSquarePollVertical, faLaptop, faDesktop } from '@fortawesome/free-solid-svg-icons';
import RepairCard from '../repairCard/RepairCard';
import './HomeCard.css';

// Home Card
const HomeCard = () => {
  return (
    <section className='homeCard '>
      <div className='homeCard__container'>
        <RepairCard icon={faSquarePollVertical} title="Specialization" text="* We’re a small group of professionals and specialists in Port Elizabeth town who specialise in fast and customer focused repairs and computer support services at affordable price. a SA’s no.1 computer repair specialists trusted by +100,000 customers nationwide. request a service that’s there before you need it!" />
        
        <RepairCard icon ={faLaptop} title="Laptop Repair" text="* Laptop repairs – get a highest quality laptop repair services at your door. you can always depend on us to fix your laptop & our services come with 90 day warranty, no fix, no fee policy worry-free service to count on. your one-stop repair solution for all your computing needs in south africa."/>

        <RepairCard icon ={faDesktop} title="Desktop Repair" text="* Desktop repairs - in Port Elizabeth – if you are looking for a reliable and trusted Desktop repair centre? we are at your service, providing fast and advanced computer repair services in south africa with full integrity and honest. Our technicians have combined experience in repairing desktop devices.. "/>
      </div>
    </section>
  )
}

export default HomeCard
