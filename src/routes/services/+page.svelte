<script lang="ts">
  import { services } from '$lib/data/services';
</script>

<svelte:head>
  <title>Our Services | Quinstyle</title>
  <meta name="description" content="Comprehensive built environment management services including consultancy, project management, facility management, and hospitality management." />
</svelte:head>

<!-- Hero -->
<section class="hero section--dark">
  <div class="hero__bg"></div>
  <div class="container hero__container">
    <div class="hero__content">
      <span class="hero__tag">Our Services</span>
      <h1 class="hero__title">
        Complete Built<br/>
        <span class="hero__title-accent">Environment</span><br/>
        Solutions
      </h1>
      <p class="hero__desc">
        From initial feasibility through decades of operation, 
        we provide end-to-end management for properties that demand excellence.
      </p>
    </div>
  </div>
</section>

<!-- Services Grid -->
<section class="services section section--cream">
  <div class="container">
    {#each services as service, index}
      <div id={service.id} class="service-section" class:service-section--reverse={index % 2 === 1}>
        <div class="service-section__content">
          <span class="service-section__number">0{index + 1}</span>
          <h2 class="service-section__title">{service.name}</h2>
          <p class="service-section__desc">{service.fullDescription}</p>
          
          <div class="service-section__features">
            <h3>What's Included</h3>
            <ul>
              {#each service.features as feature}
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {feature}
                </li>
              {/each}
            </ul>
          </div>
          
          <a href="/solutions" class="btn btn--primary">
            Get Started
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
        
        <div class="service-section__visual">
          <div class="service-section__image">
            <img src="https://images.unsplash.com/photo-{index === 0 ? '1486406146926-c627a92ad1ab' : index === 1 ? '1504307651254-35680f356dfd' : index === 2 ? '1497366216548-37526070297c' : '1559628233-100f1f0f3fbb'}?w=600&h=500&fit=crop" alt={service.name} loading="lazy" />
          </div>
          <div class="service-section__accent"></div>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- CTA -->
<section class="cta section section--dark">
  <div class="container cta__container">
    <h2 class="cta__title">Not Sure Which Service You Need?</h2>
    <p class="cta__desc">Let our interactive solution finder help you identify the right approach.</p>
    <a href="/solutions" class="btn btn--primary btn--lg">
      Find Your Solution
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </a>
  </div>
</section>

<style>
  .hero {
    position: relative;
    padding: 140px 0 100px;
    overflow: hidden;
  }

  .hero__bg {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF5C00' fill-opacity='0.06'%3E%3Ccircle cx='20' cy='20' r='8' fill='none' stroke='%23FF5C00' stroke-opacity='0.12'/%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E");
    background-size: 40px 40px;
  }

  .hero__container {
    position: relative;
    z-index: 1;
  }

  .hero__tag {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: var(--space-lg);
  }

  .hero__title {
    font-size: clamp(40px, 7vw, 80px);
    color: var(--white);
    margin-bottom: var(--space-lg);
  }

  .hero__title-accent {
    color: var(--orange);
  }

  .hero__desc {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
    max-width: 500px;
    line-height: 1.7;
  }

  /* Services Section */
  .service-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3xl);
    align-items: center;
    padding: var(--space-4xl) 0;
    border-bottom: 1px solid var(--gray-200);
  }

  .service-section:last-child {
    border-bottom: none;
  }

  .service-section--reverse {
    direction: rtl;
  }

  .service-section--reverse > * {
    direction: ltr;
  }

  .service-section__number {
    display: block;
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    color: var(--orange);
    margin-bottom: var(--space-md);
  }

  .service-section__title {
    font-size: clamp(28px, 4vw, 40px);
    margin-bottom: var(--space-lg);
  }

  .service-section__desc {
    color: var(--gray-600);
    font-size: 16px;
    line-height: 1.7;
    margin-bottom: var(--space-xl);
  }

  .service-section__features h3 {
    font-size: 13px;
    font-weight: 600;
    color: var(--gray-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--space-md);
  }

  .service-section__features ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-sm) var(--space-xl);
    margin-bottom: var(--space-xl);
  }

  .service-section__features li {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: 14px;
    color: var(--gray-700);
  }

  .service-section__features li svg {
    color: var(--orange);
    flex-shrink: 0;
  }

  .service-section__visual {
    position: relative;
  }

  .service-section__image {
    position: relative;
    overflow: hidden;
  }

  .service-section__image img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  .service-section__accent {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 3px solid var(--orange);
    bottom: -20px;
    right: -20px;
    z-index: -1;
  }

  .service-section--reverse .service-section__accent {
    right: auto;
    left: -20px;
  }

  /* CTA */
  .cta__container {
    text-align: center;
  }

  .cta__title {
    font-size: clamp(28px, 4vw, 40px);
    color: var(--white);
    margin-bottom: var(--space-md);
  }

  .cta__desc {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: var(--space-xl);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .service-section {
      grid-template-columns: 1fr;
    }

    .service-section--reverse {
      direction: ltr;
    }

    .service-section__visual {
      order: -1;
    }

    .service-section__features ul {
      grid-template-columns: 1fr;
    }
  }
</style>