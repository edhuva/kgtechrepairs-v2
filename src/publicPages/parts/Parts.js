import useTitle from '../../hooks/useTitle';
import DeviceCard from '../../components/deviceCard/DeviceCard';
import PartImages from '../../assetArrays/partsArray';
import '../computerRepairs/ComputerRepairs.css'

const Parts = () => {

  const [partpc1, partpc2, partpc3, partpc4, partpc5, partpc6, partpc7, partpc8, partlap1, partlap2, partlap3, partlap4, partlap5, partlap6, partlap7, partlap8] = PartImages;

  useTitle('KGTech Repairs');
  
  return (
    <div className='bg__img'>
      <div  className='section__margin device__section'>
        <div className='public__title'>
          <h2>Computer Parts</h2>
        </div>
        <div className='device'>
          <div className='device__container'>
            <div className='device__title'>
              <h3>DESKTOP PARTS</h3>
            </div>
            <div className='device__content'>
              <div className='deviceList'>
                <div className='deviceList__brand'>
                  <h5> </h5>
                </div>
                <div className='deviceList__container'>
                  <DeviceCard deviceImg={partpc1} title='Genuine Dell Optiplex 390 990 790 SFF Computer Power Supply 250W' subtitle='SFX' />
                  <DeviceCard deviceImg={partpc2} title='Thermaltake Versa T25 Tempered Glass Mid-tower Chassis - Desktop' subtitle=' ' />
                  <DeviceCard deviceImg={partpc3} title='Core i3 14100 PRO B760M-E DDR4 16GB RGB 3600MHz Upgrade Kit' subtitle='Intel Chipset - DDR4' />
                  <DeviceCard deviceImg={partpc4} title='DDR2 RAM - Desktop PC' subtitle='DDR2' />
                </div>
              </div>
              <div className='deviceList'>
                <div className='deviceList__brand'>
                  <h5> </h5>
                </div>
                <div className='deviceList__container'>
                  <DeviceCard deviceImg={partpc5} title='Dell OptiPlez 5050 SFF Desktop Motherboard FDY5C' subtitle='Socket LGA1155 - DDR3' />
                  <DeviceCard deviceImg={partpc6} title='WD 2TB 7200 RPM Blue Sata Internal Desktop Hard Drive' />
                  <DeviceCard deviceImg={partpc7} title='Genuine Oem Lenovo Ibm Thinkstation Desktop' subtitle='Intel chipset' />
                  <DeviceCard deviceImg={partpc8} title='Asus ROG Strix XF120 Whisper-Qulet, 4-Pin PWM Fan for PC Cases' subtitle=' ' />
                </div>
              </div>
            </div>
          </div>

          <div className='device__container'>
            <div className='device__title'>
              <h3>LAPTOP PARTS</h3>
            </div>
            <div className='device__content'>
              <div className='deviceList'>
                <div className='deviceList__brand'>
                  <h5> </h5>
                </div>
                <div className='deviceList__container'>
                  <DeviceCard deviceImg={partlap1} title='Brand new Laptop screen for various laptop models' subtitle=' ' />
                  <DeviceCard deviceImg={partlap2} title='Rinbers For Lenovo Chromebook N22 laptop Black Upper Case' subtitle=' ' />
                  <DeviceCard deviceImg={partlap3} title='USB Board For Lenovo ThinkPad L480 20LS 20Lt L490' subtitle=' ' />
                  <DeviceCard deviceImg={partlap4} title='Dell Latitude 7480 Intel Core i5-7300u 2.6ghz Laptop Motherboard' subtitle=' ' />
                </div>
              </div>
              <div className='deviceList'>
                <div className='deviceList__brand'>
                  <h5> </h5>
                </div>
                <div className='deviceList__container'>
                  <DeviceCard deviceImg={partlap5} title='Dell Precision 7510 }7-6020hq 3.80ghz Laptop Motherboard' subtitle=' ' />
                  <DeviceCard deviceImg={partlap6} title='Dell Latitude E7270 I5-6300u Laptop' subtitle=' ' />
                  <DeviceCard deviceImg={partlap7} title='Replacement LCD Back Cover Top Lid w/Hinges for HP 15-BS 15-BW 15T' subtitle=' ' />
                  <DeviceCard deviceImg={partlap8} title='Memor 16GB (2X 8GB) DDR3L 1600MHz PC3L' subtitle=' ' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Parts
