import useTitle from '../../hooks/useTitle';
import '../support/Support.css';

const TermsAndConds = () => {
  useTitle('KGTech Repairs');

  return (
    <div className='bg__img'>
      <div  className='device__section section__margin'>
        <div className='support__title'>
          <h2>Terms & Conditions</h2>
        </div>

        <div className='support__container'>
          <div className='support__top'>
            <h3> OverView </h3>
            <p>
              This Website is operated by KGTech Repairs®. Our offer on this website, include all information, tools and service available to you, the user, is Conditioned upon acceptance of all terms, conditions, policies and notices stated here.
            </p>
            <p>By visiting our site and/ or Receiving any service from us, you engage in our "Service" and agree to be bound by the following terms and conditions. </p>
            <p>These  Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, and our staff/employees.</p>
            <div className='support__top-p'>
              <p>Please read these Terms of Service carefully before accessing or using our website!</p>
            </div>
          </div>

          <div className='support__container'>
            <div className='support__top center-align'>
              <h3>Section 1 - Online Service Terms: </h3>
              <p>
                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your province of residence, and you have given us your consent to allow any of minor dependents to use this site. In the use of our service , you may not violate any laws in your jurisdiction. 
              </p>
              <div className='support__top-p'>
                <p>A breach or violation of any of the Terms will result in an immediate termination of your Services!</p>
              </div>
            </div>
          </div>

          <div className='support__container'>
            <div className='support__top center-align'>
              <h3>Section 2 - General Conditions: </h3>
              <p>
                We reserve the right to refuse service to anyone for any reason at anytime. The headings used in this agreement are included for convenience only and will not limit otherwise affect these Terms. 
              </p>
              <div className='support__top-p'>
                <p></p>
              </div>
            </div>
          </div>

          <div className='support__container'>
            <div className='support__top center-align'>
              <h3>Section 3 - Accuracy, completeness and Timeliness of information: </h3>
              <p>
                We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, timely sources of information.
              </p>
              <div className='support__top-p'>
                <p></p>
              </div>
            </div>
          </div>

          <div className='support__container'>
            <div className='support__top center-align'>
              <h3>Section 4 - Modifications to the Service and Prices: </h3>
              <p>
                Prices for our products or services are subject to change without notice. We reserve the right at any time to modify or discontinue the service without notice at anytime. We shall not be liable to you or to any third - party for any modification, price change, suspension or discontinuance of the service.
              </p>
              <div className='support__top-p'>
                <p></p>
              </div>
            </div>
          </div>

          <div className='support__container'>
            <div className='support__top center-align'>
              <h3>Section 5 - Personal Information: </h3>
              <p>
                Submission of your personal information through the site is governed by our Privacy Policy. Make sure to view our Privacy Policy. 
              </p>
              <div className='support__top-p'>
                <p></p>
              </div>
            </div>
          </div>

          <div className='support__container'>
            <div className='support__top center-align'>
              <h3>Section 6 - Errors, Inaccuracies and Omissions: </h3>
              <p>
                Occasionally there may be information on our site or in the service that contains typographical errors, inaccuracies or omissions that may relate to pricing, promotions, offers, shipping charges, transit times and availbility. We reserve the right to correct any errors, inaccuraciesor omissions, and to change or update information without prior notice.</p>
              <div className='support__top-p'>
                <p></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TermsAndConds
