import { faIdCard, faTruck, faScrewdriverWrench, faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import '../repairCard/RepairCard';
import './RepairProcess.css';
import RepairCard from '../repairCard/RepairCard';

// Repair Process
const RepairProcess = () => {
  return (
    <section className='repairProcess section__padding bg__img'>
        <div className='repairProcess-heading'>
            <h2 >Your Device Repair Process</h2>
        </div>
      
        <motion.div animate={{ scale: 1 }} initial={{ scale: 0.5}} 
                  transition={{ repeat: Infinity, duration: 4 }}  className='repairProcess__container'>
            <RepairCard icon={faIdCard} title='REGISTER ONLINE' text='Register and Book your device online or in-store.'/>
            <RepairCard icon={faTruck} title='DROP OFF' text='Bring or we collect your device to our workshop'/>
            <RepairCard icon={faScrewdriverWrench} title='REPAIR' text='Our technicians work their magic'/>
            <RepairCard icon={faRectangleList} title='COLLECT' text='Pick up or we deliver your fixed device'/>
        </motion.div>
    </section>
  )
}

export default RepairProcess
