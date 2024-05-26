import useTitle from '../../hooks/useTitle';
import DataCard from '../../components/dataCard/DataCard';
import './Support.css';

const Support = () => {

  useTitle('KGTech Repairs');

  return (
    <div className='bg__img'>
      <div  className='device__section section__margin'>
        <div className='support__title'>
          <h2>Our Support</h2>
        </div>

        <div className='support__container'>
          <div className='support__top'>
            <h3>Computer IT Support Service </h3>
            <p>
              
              KGTech Repairs® - Is your SA's number 1 choice for customers who don't have access to repair services. We've repaired thousands of devices for customers across South Africa. To our commitment towards excellence, we provide specialistt IT Support services throughout Port Elizabeth and remote support nationwide.
            </p>
            <div className='support__top-p'>
              <ul>
              <li>Mail - in Repair Service</li>
              <li>Collect & Return Service</li>
              <li>Callout & Support Service</li>
              </ul>
            </div>
          </div>

          <div className='support__container'>
            <div className='support__mail-in'>
              <div className='mail__aside center-align'>
              <h3>Mail-in Repair Service: </h3>
                <p>
                  Our specialistts in Port Elizabeth  provides a unique door-to-door professional computer repair service across South Africa by in-store, walk-in and mail-in repair service in eastern cape. We know it can be a hassle trying to get your device into a repair shops, and we aim to make it as easy and simple as possible when it's a time to fix your computer no more hassle travelling to and from repairshops anytime in South Africa.
                </p>

                <div className='support__top-p'>
                  <p>Make use of our mail-in service!</p>
                </div>
              </div>

              <div className='support__card-div'>
                <div className='support__top underline'>
                <h3>3 SIMPLE AND QUIK STEPS: </h3>
                </div>
                <div className='support__card'>
                  <DataCard title='STEP 1' text='Answer a few questions on our technical mail-in repair form by providing details about your device' />
                  <DataCard title='STEP 2' text='Find secure box for your device with same bubble wrap, packing peanuts, slap the mailing slip and send to us!' />
                  <DataCard title='STEP 3' text='Receive your repaired device within 2 - 5 business days, enjoy youe 90 - day service warranty on repair.' />
                </div>
              </div>
            </div>
          </div>

          <div className='support__container'>
            <div className='support__top center-align'>
              <h3>Collect and Return Service: </h3>
              <p>
                Our fast and trusted repair cemter offers free collection and delivery service to all orders  of R1450 or above eligible to our free collection and delivery service within 40km radius in Port Elizabeth. Outside 40km don't worry we've got you covered via our carrier and mail-in service!
              </p>
              <div className='support__top-p'>
                <p>Make use of our collection, repair and return service!</p>
              </div>
            </div>
          </div>

          <div className='support__container'>
            <div className='support__top center-align'>
              <h3>Callout Onsite Support Service: </h3>
              <p>
                Our call out onsite in Port Elizabeth is now available. Small businessess deserve reliable computers and quality support. Receive our same day, on site, computer hardware and software repair service within 40km of Port Elizabeth central.
              </p>
              <div className='support__top-p'>
                <p>Bring your PC or laptop into our service centre and we'll complete a consultation with you!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
