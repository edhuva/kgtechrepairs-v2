import useTitle from '../../hooks/useTitle';
import DataCard from '../../components/dataCard/DataCard';
import './DataRecovery.css';

const DataRecovery = () => {

  useTitle('KGTech Repairs');

  return (
    <div className='bg__img'>
      <section className='section__margin device__section' >
        <div className='recovery__title'>
          <h2>Data recovery</h2>
        </div>
        <div className='recovery__container'>
          <div className='recovery__top'>
            <h3>Our Data Recovery service: </h3>
            <p>
              Can help you recover lost files using our data recovery software. We also offer lab recovery service for heavily damaged files or hard drives.</p>
            <div className='recovery__top-p'>
              <p>Bring your PC or laptop into our service centre and we'll complete a consultation with you!</p>
            </div>
          </div>
          <div className='recovery__mid'>
            <div className='recovery__side'>
              <h3>Free Assessment and Quotation</h3>
              <p>Each case is unique and the quote is based on the complexity of recovery type, failure capacity and any parts required.</p>
              <p>Data storage services also available after recovery.</p>
            </div>
            <div className='recovery__image'> <div className='recovry-img'>
              </div>
            </div>
          </div>

          <div className='recovery__cards'>
            <DataCard title='No Recovery, No Charge' text='No recovery - no charge:  if the data you require is not to your satisfaction the recovery charge amounts do not apply.' />
            <DataCard title='Free assessment and Quote' text='Free assessment and quote: There is no quote rejection fee, drive assessment is a free service.' />
            <DataCard title='Monthly Success Rate' text='Success Rate is the percentage of successful data recovery cases completed in a single month.' />
            <DataCard title='Privacy Gauranteed' text='Guaranteed privacy: Full data confidentiality, all work is carried out by Data Recovery Department and its employees' />
          </div>
        </div>
      </section>
    </div>
  )
}

export default DataRecovery
