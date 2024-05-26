import React from 'react'
import './ComputerRepairs.css';
import DeviceCard from '../../components/deviceCard/DeviceCard';
import DeviceImages from '../../assetArrays/DeviceArray';

const ComputerRepairs = () => {
    const [acerlap1, acerlap2, acerlap3, acerlap4, amdpc1, amdpc2, amdpc3, amdpc4, applelap1, applelap2, applelap3, applelap4, delllap1, delllap2, delllap3, delllap4, dellpc1, dellpc2, dellpc3, dellpc4, hplap1, hplap2, hplap3, hplap4, hppc1, hppc2, hppc3, hppc4, intelpc1, intelpc2, intelpc3, intelpc4, lenovopc1, lenovopc2, lenovopc3, lenovopc4, microsoftlap1, microsoftlap2, microsoftlap3, microsoftlap4] = DeviceImages;

    const content = (
    <div className='bg__img'>
        <section className='section__margin device__section'>
            <div className='public__title'>
                <h2>Computer Repairs</h2>
            </div>
            <div className='device'>
                <div className='device__container'>
                    <div className='device__title'>
                        <h3>DESKTOP COMPUTERS</h3>
                    </div>
                    <div className='device__content'>
                        <div className='deviceList'>
                            <div className='deviceList__brand'>
                                <h5>Dell</h5>
                            </div>
                            <div className='deviceList__container'>
                                <DeviceCard deviceImg={dellpc2} title='Dell OptiPlex 7050 Combo, intel i7, 8GB 256GB SSD,+19 Refurb' subtitle='Windows - intel CPU' />
                                <DeviceCard deviceImg={dellpc3} title='Dell OptiPlex GX9010 intel i5 Desktop PC 19 Monitor (Refurb)' subtitle='Windows - Quad-core' />
                                <DeviceCard deviceImg={dellpc1} title='Dell OptiPlex 3020 Combo with Microsoft Windows, intel i7,' subtitle='Windows - intel CPU' />
                                <DeviceCard deviceImg={dellpc4} title='Dell OptiPlex 3020 Intek i5, 4th Gen Tower PC with 19 Monitor (Refurb)' subtitle='Windows - intel CPU' />
                            </div>
                        </div>
                        <div className='deviceList'>
                            <div className='deviceList__brand'>
                                <h5>Lenovo</h5>
                            </div>
                            <div className='deviceList__container'>
                                <DeviceCard deviceImg={lenovopc1} title='Lenovo ThinkCentre M710Q 6th Gen intel i3 Micro Desktop +' subtitle='Windows - intel CPU' />
                                <DeviceCard deviceImg={lenovopc2} title='Lenovo ThinkCentre M73E - i5 - 8GB - 500GB Desktop' subtitle='Windows - intel CPU' />
                                <DeviceCard deviceImg={lenovopc3} title='Lenovo ThinkCentre M720s Core i5 8400 - 6 Cores - ' subtitle='Windows - intel CPU' />
                                <DeviceCard deviceImg={lenovopc4} title='Lenovo ThinkCentre M710q intel i3 Micro Desktop + 20 Monitor -1' subtitle='Windows - intel CPU' />
                            </div>
                        </div>
                        <div className='deviceList'>
                            <div className='deviceList__brand'>
                                <h5>AMD</h5>
                            </div>
                            <div className='deviceList__container'>
                                <DeviceCard deviceImg={amdpc1} title='PCBUILDER DEFENDER AMD Ryzen 5 5600G | 16GB DDR4' subtitle='AMD GPU - Hexa-core' />
                                <DeviceCard deviceImg={amdpc2} title='Gaming Pc Desktop Computer 16gb Ran 1tb + SSD Rx 580' subtitle='AMD GPU - Quad-core' />
                                <DeviceCard deviceImg={amdpc3} title='Amd Ryzen Large Gaming Pc' subtitle='AMD GPU - Quad-core' />
                                <DeviceCard deviceImg={amdpc4} title='AMD Ryzen 5 6-Core 3.7GHz 4600G AM4 Vega7 8GB 500GB SSD' subtitle='Windows - AMD GPU' />
                            </div>
                        </div>
                        <div className='deviceList'>
                            <div className='deviceList__brand'>
                                <h5>Hp</h5>
                            </div>
                            <div className='deviceList__container'>
                                <DeviceCard deviceImg={hppc1} title='Hp SO1 Slim Computer Desktop, Amd 3150u Processor, 8bg Ram' subtitle='Windows - AMD GPU' />
                                <DeviceCard deviceImg={hppc2} title='HP Z440 intel Xeon Workstation PC with 64GB Ram, 4GB GPU' subtitle='Windows - intel CPU' />
                                <DeviceCard deviceImg={hppc3} title='HP 27-cr0007ng All-in- One-PC 68, 6cm (27inch) (AMD Ryzen?)' subtitle='Windows - AMD GPU' />
                                <DeviceCard deviceImg={hppc4} title='Hp Elitedesk 600 G2 Sff Intel i3-4330 3.50ghz 16gb 2tb' subtitle='Windows - intel CPU' />
                            </div>
                        </div>
                        <div className='deviceList'>
                            <div className='deviceList__brand'>
                                <h5>Intel</h5>
                            </div>
                            <div className='deviceList__container'>
                                <DeviceCard deviceImg={intelpc1} title='Intel i5-12400 OFFICE MASTER Core X Windows 11 Pro' subtitle='Windows - intel CPU' />
                                <DeviceCard deviceImg={intelpc2} title='Intel 12th Geberation 12500 Office PC With Office Pro 2021 included' subtitle='Windows - intel CPU' />
                                <DeviceCard deviceImg={intelpc3} title='Intel Core i5 (13th Gen) DDR5 High Performance Desktop PC' subtitle='Windows - intel CPU' />
                                <DeviceCard deviceImg={intelpc4} title='Blackview MP200 Windows 11 Pro Intel Core i5 16B' subtitle='Windows - intel CPU' />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='device__container'>
                    <div className='device__title'>
                        <h3>LAPTOP COMPUTERS</h3>
                    </div>
                    <div className='device__content'>
                        <div className='deviceList'>
                            <div className='deviceList__brand'>
                                <h5>Acer</h5>
                            </div>
                            <div className='deviceList__container'>
                                <DeviceCard deviceImg={acerlap1} title='Acer Aspire 3 | Intel Celeron N4500 4GB 256GB Laptop' subtitle='Windows OS' />
                                <DeviceCard deviceImg={acerlap2} title='Acer Aspire 3 Intel Core i5-1135G7 8GB RAM and 512GB SSD Storage' subtitle='Windows OS' />
                                <DeviceCard deviceImg={acerlap3} title='Acer Aspire 3 | Intel Celeron N4500 4GB 256GB Laptop' subtitle='Windows OS - Dual Core' />
                                <DeviceCard deviceImg={acerlap4} title='Acer Nitro 16 - i7 13700H 16GB 512GB SSD 16 WUXGA 165Hz' subtitle='Windows OS' />
                            </div>
                        </div>
                        <div className='deviceList'>
                            <div className='deviceList__brand'>
                                <h5>Dell</h5>
                            </div>
                            <div className='deviceList__container'>
                                <DeviceCard deviceImg={delllap1} title='Dell inspiron 3520 15.8-inch Core i&-1255U 16GB RAM' subtitle='Windows OS' />
                                <DeviceCard deviceImg={delllap2} title='Dell Latitude E5440 Intel i7 Laptop Nvidia Dedicated' subtitle='Windows OS' />
                                <DeviceCard deviceImg={delllap3} title='Dell Precision 3530 Intel i5 Laptop, Nvidia GPU, Windows' subtitle='Windows OS Quad Core' />
                                <DeviceCard deviceImg={delllap4} title='Dell inspiron 3520 i7 1255U / 16GB / 512GB SSD / 15.6' subtitle='Windows OS' />
                            </div>
                        </div>
                        <div className='deviceList'>
                            <div className='deviceList__brand'>
                                <h5>Apple</h5>
                            </div>
                            <div className='deviceList__container'>
                                <DeviceCard deviceImg={applelap1} title='Apple MacBook Pro Laptop M3 Max Chip 40 Core CPU 16.2' subtitle='MAC OS' />
                                <DeviceCard deviceImg={applelap2} title='Apple MacBook Air 13-inch With M1 Processor 7 Core' subtitle='MAC OS' />
                                <DeviceCard deviceImg={applelap3} title='Apple MacBook Air 13 M3 With 8 Core CPU & 10 Core GPU, 16GB' subtitle='MAC OS Octa-Core' />
                                <DeviceCard deviceImg={applelap4} title='Apple MacBook Air 13-inch 256GB SSD (Apple M2 Chip) +' subtitle='MAC OS Quad-core' />
                            </div>
                        </div>
                        <div className='deviceList'>
                            <div className='deviceList__brand'>
                                <h5>Hp</h5>
                            </div>
                            <div className='deviceList__container'>
                                <DeviceCard deviceImg={hplap1} title='HP 250 G9 N4500  8GB 256GB SSD 15.6-inch FHD Notebook' subtitle='Windows OS Dual Core' />
                                <DeviceCard deviceImg={hplap2} title='HP 14S amd 3020E 4GB RAM 356GB SSD Storage' subtitle='Windows OS Dual Core' />
                                <DeviceCard deviceImg={hplap3} title='HP 255-r5-16gb-255GB SSD - Win11H' subtitle='Windows OS' />
                                <DeviceCard deviceImg={hplap4} title='HP 250 G9 - N4500 Laptop - Back pack Bundle' subtitle='Windows OS' />
                            </div>
                        </div>
                        <div className='deviceList'>
                            <div className='deviceList__brand'>
                                <h5>Microsoft</h5>
                            </div>
                            <div className='deviceList__container'>
                                <DeviceCard deviceImg={microsoftlap1} title='Microsoft 12.3 Surface Pro 6 - 256GB / Intel Core i7' subtitle='Windows OS' />
                                <DeviceCard deviceImg={microsoftlap2} title='MICROSOFT SURFACE BOOK 2 Intel Core i 7 8th Gen 16GB RAM' subtitle='Windows OS' />
                                <DeviceCard deviceImg={microsoftlap3} title='Microsoft Surface Pro 7 12.3 Touchscreen (Core i5/ 8GB)' subtitle='Windows OS' />
                                <DeviceCard deviceImg={microsoftlap4} title='MICROSOFT SURFACE LAPTOP STUDIO i7 512GB.16GB PLATINUM' subtitle='Windows OS' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    )

    return content
}
export default ComputerRepairs
