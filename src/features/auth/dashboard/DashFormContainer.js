import React from 'react';

//DashFormContainer
const DashFormContainer = ({ title, content }) => {
  return (
    <>
        <div className='main__dash--heading'>
          <h2>{title}</h2>
        </div>

        <div className='main__dash-form-container'>
          <div className='main__dash-form'>
            <div className="dash__content-form">
              {content}
            </div>
          </div>
        </div>
    </>
  )
}

export default DashFormContainer
