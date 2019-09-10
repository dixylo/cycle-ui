<template>
  <div class='container'>
    <div class='hero'>
      <div class='image-box'>
        <img alt='About Cycly' src='@/assets/hero_about.webp' />
      </div>
      <p class='page-title'>About Cycly</p>
    </div>
    <div class='timeline-box'>
      <div class="timeline">
        <div class="balloon left">
          <div class="content">
            <h2>2014</h2>
            <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
          </div>
        </div>
        <div class="balloon right">
          <div class="content">
            <h2>2015</h2>
            <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
          </div>
        </div>
        <div class="balloon left">
          <div class="content">
            <h2>2016</h2>
            <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
          </div>
        </div>
        <div class="balloon right">
          <div class="content">
            <h2>2017</h2>
            <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
          </div>
        </div>
        <div class="balloon left">
          <div class="content">
            <h2>2018</h2>
            <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
          </div>
        </div>
        <div class="balloon right">
          <div class="content">
            <h2>2019</h2>
            <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  width: 100%;
  padding-top: 45%;
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

/* *********************** */
/* Timeline Section Starts */
/* *********************** */
* {
  box-sizing: border-box;
}

.timeline-box {
  /* background-color: #474e5d; */
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  color: #00284c;
}

/* The actual timeline (the vertical ruler) */
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
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
  border: medium solid white;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent white;
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
  border: medium solid white;
  border-width: 10px 10px 10px 0;
  border-color: transparent white transparent transparent;
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

@media screen and (max-width: 1024px) {
  .page-title {
    font-size: 50px;
  }
}

@media screen and (max-width: 850px) {
  .page-title {
    font-size: 40px;
  }

  .timeline-box {
    font-size: 18px;
  }
}

@media screen and (max-width: 700px) {
  .timeline-box {
    font-size: 16px;
  }
}

/* Media queries - Responsive timeline on screens less than 600px wide */
@media screen and (max-width: 600px) {
  .page-title {
    font-size: 35px;
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
}

@media screen and (max-width: 400px) {
  .timeline-box {
    font-size: 14px;
  }
}
</style>
