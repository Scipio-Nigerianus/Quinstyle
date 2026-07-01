<script lang="ts">
  import { team } from '$lib/data/team';
</script>

<svelte:head>
  <title>About Us | Quinstyle</title>
  <meta name="description" content="Learn about Quinstyle's mission to deliver comprehensive built environment management." />
</svelte:head>

<!-- Hero -->
<section class="hero section--dark">
  <div class="hero__bg"></div>
  <div class="container hero__container">
    <span class="hero__tag">About Quinstyle</span>
    <h1 class="hero__title">
      Built to Last.<br/>
      <span class="hero__title-accent">Managed to Thrive.</span>
    </h1>
    <p class="hero__desc">
      We're not just property managers. We're built environment partners who ensure every asset reaches its full potential.
    </p>
  </div>
</section>

<!-- Story -->
<section class="story section section--cream">
  <div class="container story__container">
    <div class="story__content">
      <span class="story__tag">Our Story</span>
      <h2 class="story__title">A New Approach to Built Environment Management</h2>
      <p class="story__text">
        Quinstyle was founded in Lagos on a simple but powerful idea: properties deserve better than fragmented services. Too often, developers work with one firm for construction, another for management, and yet another for ongoing maintenance. Each transition creates friction, loses institutional knowledge, and compromises quality.
      </p>
      <p class="story__text">
        We envisioned something different: a single partner capable of managing the entire lifecycle of a built asset. From initial feasibility studies and architectural design through construction completion and ongoing operations, Quinstyle provides continuous, integrated expertise.
      </p>
      <p class="story__text">
        Today, as a rapidly growing startup, that vision drives everything we do. Our team brings together architectural expertise, construction management, facility operations, and hospitality management all under one roof. This integrated approach delivers better results for our clients and more fulfilling work for our team.
      </p>
    </div>
    <div class="story__visual">
      <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=800&fit=crop" alt="Quinstyle team" loading="lazy" />
    </div>
  </div>
</section>

<!-- Values -->
<section class="values section section--white">
  <div class="container">
    <div class="values__header">
      <span class="values__tag">Our Values</span>
      <h2 class="values__title">What Drives Us</h2>
    </div>
    
    <div class="values__grid">
      <div class="value-card">
        <span class="value-card__number">01</span>
        <h3 class="value-card__title">Sustainability First</h3>
        <p class="value-card__desc">Every decision we make considers long-term environmental and economic impact. We build for decades, not just today.</p>
      </div>
      <div class="value-card">
        <span class="value-card__number">02</span>
        <h3 class="value-card__title">Lifecycle Thinking</h3>
        <p class="value-card__desc">We manage every phase of the built environment: from planning through construction to ongoing operations.</p>
      </div>
      <div class="value-card">
        <span class="value-card__number">03</span>
        <h3 class="value-card__title">Operational Excellence</h3>
        <p class="value-card__desc">We don't just deliver projects; we ensure they continue to perform at the highest level day after day.</p>
      </div>
      <div class="value-card">
        <span class="value-card__number">04</span>
        <h3 class="value-card__title">Client Partnership</h3>
        <p class="value-card__desc">Your success is our success. We work as an extension of your team, invested in your long-term outcomes.</p>
      </div>
    </div>
  </div>
</section>

<!-- Team -->
<section class="team section section--cream">
  <div class="container">
    <div class="team__header">
      <span class="team__tag">Our Team</span>
      <h2 class="team__title">The People Behind Quinstyle</h2>
    </div>
    
    <div class="team__grid">
      {#each team as member}
        <div class="team-card">
          <div class="team-card__image">
            <img src={member.image} alt={member.name} loading="lazy" />
          </div>
          <h3 class="team-card__name">{member.name}</h3>
          <span class="team-card__role">{member.role}</span>
          <p class="team-card__bio">{member.bio}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta section section--orange">
  <div class="container cta__container">
    <h2 class="cta__title">Ready to Work Together?</h2>
    <p class="cta__desc">Let's discuss how Quinstyle can help you achieve operational excellence.</p>
    <a href="/contact" class="btn btn--secondary btn--lg">
      Get in Touch
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
    font-size: clamp(36px, 6vw, 72px);
    color: var(--white);
    margin-bottom: var(--space-lg);
  }

  .hero__title-accent {
    color: var(--orange);
  }

  .hero__desc {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
    max-width: 550px;
    line-height: 1.7;
  }

  /* Story */
  .story__container {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: var(--space-3xl);
    align-items: center;
  }

  .story__tag {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: var(--space-md);
  }

  .story__title {
    font-size: clamp(28px, 4vw, 40px);
    margin-bottom: var(--space-xl);
  }

  .story__text {
    font-size: 16px;
    color: var(--gray-600);
    line-height: 1.7;
    margin-bottom: var(--space-md);
  }

  .story__visual {
    position: relative;
  }

  .story__visual img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }

  .story__visual::after {
    content: '';
    position: absolute;
    width: 80px;
    height: 80px;
    border: 3px solid var(--orange);
    bottom: -20px;
    left: -20px;
    z-index: -1;
  }

  /* Values */
  .values__header {
    text-align: center;
    margin-bottom: var(--space-3xl);
  }

  .values__tag {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: var(--space-md);
  }

  .values__title {
    font-size: clamp(28px, 4vw, 48px);
  }

  .values__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-lg);
  }

  .value-card {
    padding: var(--space-xl);
    background: var(--cream);
    border: 1px solid transparent;
    transition: all var(--duration-normal) var(--ease-out-expo);
  }

  .value-card:hover {
    border-color: var(--orange);
  }

  .value-card__number {
    display: block;
    font-family: var(--font-display);
    font-size: 36px;
    font-weight: 700;
    color: var(--orange);
    line-height: 1;
    margin-bottom: var(--space-lg);
  }

  .value-card__title {
    font-size: 18px;
    margin-bottom: var(--space-md);
  }

  .value-card__desc {
    font-size: 14px;
    color: var(--gray-600);
    line-height: 1.6;
  }

  /* Team */
  .team__header {
    text-align: center;
    margin-bottom: var(--space-3xl);
  }

  .team__tag {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: var(--space-md);
  }

  .team__title {
    font-size: clamp(28px, 4vw, 48px);
  }

  .team__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xl);
  }

  .team-card {
    text-align: center;
  }

  .team-card__image {
    width: 160px;
    height: 160px;
    margin: 0 auto var(--space-lg);
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid var(--orange);
  }

  .team-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .team-card__name {
    font-size: 20px;
    margin-bottom: var(--space-xs);
  }

  .team-card__role {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--space-md);
  }

  .team-card__bio {
    font-size: 14px;
    color: var(--gray-600);
    line-height: 1.6;
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
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: var(--space-xl);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .story__container {
      grid-template-columns: 1fr;
    }

    .values__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .values__grid {
      grid-template-columns: 1fr;
    }

    .team__grid {
      grid-template-columns: 1fr;
    }
  }
</style>