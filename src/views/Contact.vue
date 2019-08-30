<template>
  <div class='container'>
    <div class='hero'>
      <div class='image-box'>
        <img alt='Contact Us' src='@/assets/hero_contact.jpg' />
      </div>
      <p class='page-title'>Contact Us</p>
    </div>
    <div class='contact-box'>
      <p class='box-title'>Contact Information</p>
      <div class='info-box'>
        <div class='text-box'>
          <p><span>Hours:</span> 8:00am—6:00pm, every day except Christmas</p>
          <p><span>Tel:</span> 09 666 5186</p>
          <p><span>Email:</span> info@cycly.com</p>
          <p><span>Address:</span> 29 Carrington Rd, Mt Albert, Auckland</p>
          <p><span>Plus Code:</span> 36d58x+hg Mt Albert, Auckland</p>
        </div>
        <div class='map-box'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4888.105241056583!2d174.7069956109817!3d-36.87622329203628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d4721d1032593%3A0xa7e9e7f4b48cbea4!2s29%20Carrington%20Rd%2C%20Mount%20Albert%2C%20Auckland%201025!5e0!3m2!1sen!2snz!4v1567134581500!5m2!1sen!2snz"
            width="100%"
            height="100%"
            frameborder="0"
            style="border:0;"
            allowfullscreen=""
          >
            <p>Your browser does not support iframes.</p>
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  width: 100%;
  padding-top: 44%;
  position: relative;
}

.image-box {
  position: fixed;
  top: 3.65rem;
  left: 0;
  right: 0;
}

.image-box img {
  width: 100%;
}

.page-title {
  color: #FFF;
  font-size: 60px;
  font-weight: bold;
  text-align: left;
  text-shadow: 2px 2px 4px #000000;
  position: absolute;
  left: 1em;
  right: 1em;
  bottom: .5em;
  border-bottom: 3px solid #FFF;
}

.contact-box {
  position: relative;
  background-color: #FFF;
}

.contact-box::before {
  content: '';
	width: 0;
	height: 0;
  display: block;
  position: absolute;
  top: -5px;
  left: 0;
  right: 0;
	border-top: 30px solid #0076b2;
  border-bottom: 50px solid transparent;
	border-left: 70vw solid #0087cc;
	border-right: 30vw solid #0098e5;
  z-index: 1;
}

.contact-box::after {
  content: '';
	width: 0;
	height: 0;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
	border-top: 50px solid transparent;
  border-bottom: 30px solid #007f26;
	border-left: 30vw solid #00b235;
	border-right: 70vw solid #00992d;
}

.box-title {


  color: #003C71;
  font-size: 50px;
  font-style: italic;
  font-weight: bold;
  margin: 0;
  padding: 80px 0 0;
  position: relative;
}

.box-title::after {
  content: '__';
  color: #00A9E0;
  display: block;
  font-size: 100px;
  font-style: normal;
  position: absolute;
  bottom: -35%;
  left: 50%;
  transform: translateX(-50%);
}

.info-box {
  margin: 0 auto;
  padding: 70px 100px 100px;
  max-width: 1024px;
  display: flex;
  justify-content: space-between;
  background-color: azure;
}

.text-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
  color: #003c71;
  width: 50%;
}

.text-box span {
  font-size: 15px;
  margin-right: 1em;
}

.text-box p {
  font-size: 20px;
  margin: .5em;
}

.map-box {
  width: 50%;
  height: 250px;
}
</style>
