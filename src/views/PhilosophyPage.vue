<template>
  <div class="philosophy-page">
    <NavBar />
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="main-title">OUR PHILOSOPHY</h1>
        <p class="hero-subtitle">Quality • Legacy • Community</p>
      </div>
    </div>

    <div class="content-section">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="image-container">
            <img
              src="https://zubayrlatief.github.io/capestone-hosted-images/landingpic.png"
              class="philosophy-image"
              alt="Hermess Fitness Philosophy"
            />
            <div class="image-overlay"></div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="text-content">
            <h2 class="section-title">Our Mission</h2>
            <div class="mission-statement">
              <p>
                At Hermess Fitness, we believe in the power of community and the pursuit of excellence. 
                We are more than just a clothing brand – we are a movement that celebrates the journey 
                of self-improvement and personal growth.
              </p>
            </div>

            <div class="values-section">
              <div class="value-item">
                <h3>Quality</h3>
                <p>Premium apparel designed for those who demand excellence in every aspect of life.</p>
              </div>
              <div class="value-item">
                <h3>Legacy</h3>
                <p>Building a lasting impact through dedication, hard work, and unwavering commitment.</p>
              </div>
              <div class="value-item">
                <h3>Community</h3>
                <p>Creating an inclusive environment where champions support and inspire each other.</p>
              </div>
            </div>

            <div class="cta-section">
              <p class="cta-text">Join our Legacy community and unlock your true potential</p>
              <router-link to="/contact" class="cta-button">
                <span>APPLY NOW</span>
                <i class="bi bi-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterComp />
  </div>
</template>

<script>
import FooterComp from '@/components/FooterComp.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
    FooterComp
  }
};
</script>

<style scoped>
.philosophy-page {
  background-color: #000;
  color: #fff;
  min-height: 100vh;
}

.hero-section {
  height: 40vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url('https://zubayrlatief.github.io/capestone-hosted-images/landingpic.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 4rem;
}

.hero-content {
  animation: fadeInUp 1s ease-out;
}

.main-title {
  font-family: "Pirata One", system-ui;
  font-size: 4rem;
  margin-bottom: 1rem;
  letter-spacing: 4px;
}

.hero-subtitle {
  font-size: 1.5rem;
  letter-spacing: 8px;
  color: #f39c12;
}

.content-section {
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.philosophy-image {
  width: 100%;
  height: auto;
  transition: transform 0.5s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(243, 156, 18, 0.2), rgba(0, 0, 0, 0.4));
}

.image-container:hover .philosophy-image {
  transform: scale(1.05);
}

.text-content {
  padding: 2rem;
}

.section-title {
  font-family: "Pirata One", system-ui;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #f39c12;
}

.mission-statement {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 3rem;
}

.values-section {
  margin-bottom: 3rem;
}

.value-item {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.value-item:hover {
  transform: translateX(10px);
}

.value-item h3 {
  color: #f39c12;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.value-item p {
  margin: 0;
  line-height: 1.6;
}

.cta-section {
  text-align: center;
  margin-top: 3rem;
}

.cta-text {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f39c12;
  color: #000;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background-color: #e67e22;
  transform: translateY(-2px);
  color: #000;
}

.cta-button i {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.cta-button:hover i {
  transform: translateX(5px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    height: 30vh;
  }

  .main-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .content-section {
    padding: 2rem 0;
  }

  .text-content {
    padding: 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .value-item {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .value-item h3 {
    font-size: 1.3rem;
  }

  .cta-button {
    padding: 0.8rem 1.5rem;
  }
}
</style>
