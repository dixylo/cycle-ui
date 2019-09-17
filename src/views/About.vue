<template>
  <div class='container'>
    <div class='hero-section'>
      <div class='hero-image-box'>
        <img alt='About Cycly' src='@/assets/hero_about.webp' />
      </div>
      <p class='page-title'>About Cycly</p>
    </div>
    <div class='item-box'>
      <p class='box-title'>Let your pleasures cycle</p>
      <div class='card-container-background'>
        <p class='overview'>
          From mountains to beaches, from dirt roads to skateparks, 
          Cycly is commited to provide high-quality cycles that meet 
          various kinds of terrains to cyclists from all walks of life. 
          If you start your day with a cup of coffee, why not spend the same 
          to try our selected models and let your pleasures cycle.
        </p>
        <div class="timeline">
          <div class="balloon left">
            <div class="content">
              <h2>2014</h2>
              <p>
                Two young cycling aficionados crashed into each other while cycling on the campus of Unitec to avoid a cat that was crossing the cycle lane. 
                Without noticing their own injury, they soon recognized each other's world famous cycle brand, and decided to try it before saying goodbye. 
                Their friendship began.
              </p>
            </div>
          </div>
          <div class="balloon right">
            <div class="content">
              <h2>2015</h2>
              <p>
                Graduated from Unitec at the same time, Hugh and Frank decided to found a small cycle-renting company that provides renting service to those who are crazy about cycles 
                but are living on a tight budget like them. In the spring of this year, Cycly was born on the fringe of Unitec's Mt Albert campus in Auckland.
              </p>
            </div>
          </div>
          <div class="balloon left">
            <div class="content">
              <h2>2016</h2>
              <p>
                Having majored in marketing and accounting at Unitec, the two founders soon raised great awareness of their new-born cycle-renting company, 
                and their excellent service as well as high-quality cycles had accumulated a mass of loyal fans in less than a year, who visited their store regularly and advertised for Cycly.
              </p>
            </div>
          </div>
          <div class="balloon right">
            <div class="content">
              <h2>2017</h2>
              <p>
                With the number of customers increasing steadily, Cycly expanded its team for the first time from only two founders to a small group of five energetic people. 
                This small business born in a suburb of Auckland was witnessing its phenomenal growth to the leadership in this trade.
              </p>
            </div>
          </div>
          <div class="balloon left">
            <div class="content">
              <h2>2018</h2>
              <p>
                Being a frequent topic among cyclists in Auckland, Cycly had come to its third year. The store had virtually become a club bar on weekends. With the support of customers and fans, 
                Cycly was enabled to increase the quantity and diversity of its stock and add more world top brands.
              </p>
            </div>
          </div>
          <div class="balloon right">
            <div class="content">
              <h2>2019</h2>
              <p>
                More and more cycle lanes are now being built to mitigate deteriorating traffic congestion in Auckland. Cycly is making its own contribution not only to the mitigation, but also 
                to the fitness and recreation of Aucklanders. Cycly is becoming part of more and more people's life, more of our story is waiting to be revealed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.item-box {
  background-color: rgba(255, 255, 255, 0.90);
}

.item-box::before {
	border-top: 40px solid #0076b2;
  border-bottom: 60px solid transparent;
	border-left: 432px solid #0098e5;
	border-right: 1008px solid #0087cc;
  z-index: 1;
}

.item-box::after {
	width: 0;
	height: 0;
  bottom: 0;
  z-index: 1;
	border-top: 60px solid transparent;
  border-bottom: 40px solid #007f26;
	border-left: 1008px solid #00992d;
	border-right: 432px solid #00b235;
}

.card-container-background {
  background-color: transparent;
}

.overview {
  width: 90%;
  color: #003C71;
  font-size: 30px;
  text-align: justify;
}

/* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  color: #00284c;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: green;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

/* Container around content */
.balloon {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
}

/* The circles on the timeline */
.balloon::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  right: -17px;
  background-color: white;
  border: 4px solid #003c71;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

/* Place the balloon to the left */
.left {
  left: 0;
}

/* Place the balloon to the right */
.right {
  left: 50%;
}

/* Add arrows to the left balloon (pointing right) */
.left::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  right: 30px;
  border: medium solid #f2f2f2;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent #f2f2f2;
}

/* Add arrows to the right balloon (pointing left) */
.right::before {
  content: " ";
  height: 0;
  position: absolute;
  top: 22px;
  width: 0;
  z-index: 1;
  left: 30px;
  border: medium solid #f2f2f2;
  border-width: 10px 10px 10px 0;
  border-color: transparent #f2f2f2 transparent transparent;
}

/* Fix the circle for containers on the right side */
.right::after {
  left: -16px;
}

/* The actual content */
.content {
  padding: 20px 30px;
  background-color: #f2f2f2;
  position: relative;
  border-radius: 6px;
  opacity: .97;
  box-shadow: 10px 10px 10px #000; 
}

.content p {
  text-align: justify;
}

@media screen and (max-width: 1440px) {
  .item-box::before {
    border-left-width: 30vw;
    border-right-width: 70vw;
  }

  .item-box::after {
    border-left-width: 70vw;
    border-right-width: 30vw;
  }
}

@media screen and (max-width: 1024px) {
  .page-title {
    font-size: 50px;
  }
}

@media screen and (max-width: 850px) {
  .page-title {
    font-size: 40px;
  }

  .item-box::before {
    border-top-width: 30px;
    border-bottom-width: 50px;
  }

  .item-box::after {
    border-top-width: 50px;
    border-bottom-width: 30px;
  }

  .box-title {
    font-size: 40px;
  }

  .box-title::after {
    font-size: 80px;
  }

  .overview {
    font-size: 25px;
  }

  .content {
    font-size: 18px;
  }
}

@media screen and (max-width: 700px) {
  .content {
    font-size: 16px;
  }
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
  .page-title {
    font-size: 35px;
  }

  .item-box::before {
    border-top-width: 25px;
    border-bottom-width: 40px;
  }

  .item-box::after {
    border-top-width: 40px;
    border-bottom-width: 25px;
  }

  .box-title {
    font-size: 30px;
  }

  .box-title::after {
    font-size: 60px;
  }

  .overview {
    font-size: 20px;
  }

  /* Place the timelime to the left */
  .timeline::after {
    left: 31px;
  }
  
  /* Full-width containers */
  .balloon {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }
  
  /* Make sure that all arrows are pointing leftwards */
  .balloon::before {
    left: 60px;
    border: medium solid white;
    border-width: 10px 10px 10px 0;
    border-color: transparent white transparent transparent;
  }

  /* Make sure all circles are at the same spot */
  .left::after, .right::after {
    left: 15px;
  }
  
  /* Make all right containers behave like the left ones */
  .right {
    left: 0%;
  }
}

@media screen and (max-width: 450px) {
  .page-title {
    font-size: 30px;
  }

  .item-box::before {
    border-top-width: 20px;
    border-bottom-width: 30px;
  }

  .item-box::after {
    border-top-width: 30px;
    border-bottom-width: 20px;
  }

  .box-title {
    font-size: 25px;
  }

  .box-title::after {
    font-size: 50px;
  }

  .overview {
    font-size: 18px;
  }
}

@media screen and (max-width: 400px) {
  .content {
    font-size: 14px;
  }
}
</style>
