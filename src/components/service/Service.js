import './Service.css';
import Feature from '../feature/Feature';

const comp6 = 'https://kgtechawsbucket.s3.eu-north-1.amazonaws.com/comp6.jpg';

// Service
const Service = () => {
  return (
    <section className='home__service section__margin'>
      <div className='home__service-top'>
        <div className='home__service-feature'>
          <Feature title="Garanteed Service." text="KGTech Repairs ® has an excellent reputation nationwide for being the SA’s most trusted computer repair specialists in Port Elizabeth, a one-stop technical solution for most brands: apple macbook, dell, hp, acer, ibm lenovo, compaq, toshiba, sony vaio, asus, samsung, msi, lg, gigabyte, iPad and tablets in south africa. Laptop repairs, macbook repairs and screen replacement specialists in Port Elizabeth! KGTech Repairs is the in-house trusted computer repair specialists with expertise in advanced chip level repair and well recognised as the technical leader in this field, providing fast, quality and economical computer repair, screen repair or replacement services."/>
        </div>
        <div className='home__service-img'>
          <img src={comp6} alt='service' />
        </div>
      </div>
    </section>
  )
}

export default Service
