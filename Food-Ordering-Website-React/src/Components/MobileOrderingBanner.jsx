import React from 'react'

function OnlineOrderingBanner() {
  return (
    <div className="mobile-ordering">
      <img className="service-phone" src="images/service-phone.png" alt="" />
      <div className="mobile-details">
        <div>EATSY App : Online & Mobile Ordering</div>
        <div>
          Get the app for free and place takeout orders online whenever you
          want.
        </div>
        <div>
          <img src="images/app-store.svg" alt="" />
          <img src="images/google-play.svg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default OnlineOrderingBanner
