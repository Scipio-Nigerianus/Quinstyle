<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { services } from '$lib/data/services';
  import { getFeaturedProjects } from '$lib/data/projects';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  let statsVisible = $state(false);
  let statsRef: HTMLElement;
  let dynamicTextRef: HTMLElement;
  let textInterval: ReturnType<typeof setInterval>;

  const featuredProjects = getFeaturedProjects();
  const words = ["Thrive.", "Scale.", "Innovate.", "Endure."];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Loop
    if (dynamicTextRef) {
      let currentIndex = 0;
      textInterval = setInterval(() => {
        gsap.to(dynamicTextRef, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            currentIndex = (currentIndex + 1) % words.length;
            dynamicTextRef.innerText = words[currentIndex];
            gsap.fromTo(dynamicTextRef, 
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
            );
          }
        });
      }, 2500);
    }

    // Stats bar reveal
    if (statsRef) {
      ScrollTrigger.create({
        trigger: statsRef,
        start: 'top 80%',
        onEnter: () => {
          statsVisible = true;
        },
        once: true
      });
    }

    // Scroll reveal animation for all .reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
      // Check if it has a delay class to maintain staggered effects
      let delay = 0;
      if (el.classList.contains('reveal-delay-1')) delay = 0.1;
      if (el.classList.contains('reveal-delay-2')) delay = 0.2;
      if (el.classList.contains('reveal-delay-3')) delay = 0.3;
      if (el.classList.contains('reveal-delay-4')) delay = 0.4;

      gsap.fromTo(el, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Hero Parallax effect
    const heroBg = document.querySelector('.hero__bg') as HTMLElement;
    if (heroBg) {
      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        heroBg.style.setProperty('--mouse-x', `${x}%`);
        heroBg.style.setProperty('--mouse-y', `${y}%`);
      });
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (textInterval) clearInterval(textInterval);
    }
  });
</script>

<svelte:head>
  <title>Quinstyle | Built to Last. Managed to Thrive.</title>
  <meta name="description" content="End-to-end built environment management for properties that demand excellence." />
</svelte:head>

<svelte:window />

<!-- Hero Section -->
<section class="hero qs-pattern--dense">
  <div class="hero__bg"></div>
  
  <div class="container hero__container">
    <div class="hero__content">
      <div class="hero__label reveal">
        <span class="hero__label-dot"></span>
        End-to-End Built Environment Management
      </div>
      
      <h1 class="hero__title reveal reveal-delay-1">
        Built to<br/>
        <span class="hero__title-accent">Last.</span><br/>
        Managed to<br/>
        <span class="hero__title-accent dynamic-text-container"><span bind:this={dynamicTextRef} style="display: inline-block;">Thrive.</span></span>
      </h1>
      
      <p class="hero__subtitle reveal reveal-delay-2">
        From initial planning through to ongoing operations:
        comprehensive lifecycle management for properties that demand excellence.
      </p>
      
      <div class="hero__actions reveal reveal-delay-3">
        <a href="/solutions" class="btn btn--primary btn--lg">
          Find Your Solution
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
        <a href="/portfolio" class="btn btn--secondary">
          View Our Work
        </a>
      </div>
    </div>
    
    <div class="hero__visual reveal reveal-delay-2">
      <div class="hero__graphic">
        <div class="hero__circle hero__circle--1"></div>
        <div class="hero__circle hero__circle--2"></div>
        <div class="hero__circle hero__circle--3"></div>
        <div class="hero__qs-mark">
          <svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="#FF5C00" stroke-width="2"/>
            <path d="M50 15C30 15 20 35 20 50s10 35 30 35" stroke="#FF5C00" stroke-width="4"/>
            <rect x="40" y="30" width="30" height="8" fill="#FF5C00"/>
            <rect x="40" y="60" width="30" height="8" fill="#FF5C00"/>
          </svg>
        </div>
        <div class="hero__stats-card">
          <span class="hero__stats-number">100%</span>
          <span class="hero__stats-label">Client Focus</span>
        </div>
        <div class="hero__stats-card hero__stats-card--2">
          <span class="hero__stats-number">Lagos</span>
          <span class="hero__stats-label">Based Startup</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="hero__scroll">
    <div class="hero__scroll-line"></div>
    <span>Scroll</span>
  </div>
</section>

<!-- Stats Bar -->
<section class="stats-bar">
  <div class="container">
    <div class="stats-bar__grid" bind:this={statsRef} class:stats-bar__grid--visible={statsVisible}>
      <div class="stat reveal">
        <span class="stat__value">100%</span>
        <span class="stat__label">Dedicated Approach</span>
      </div>
      <div class="stat reveal reveal-delay-1">
        <span class="stat__value">Modern</span>
        <span class="stat__label">Integrated Solutions</span>
      </div>
      <div class="stat reveal reveal-delay-2">
        <span class="stat__value">End-to-End</span>
        <span class="stat__label">Project Lifecycle</span>
      </div>
      <div class="stat reveal reveal-delay-3">
        <span class="stat__value">Lagos</span>
        <span class="stat__label">Headquarters</span>
      </div>
    </div>
  </div>
</section>

<!-- Services Section -->
<section class="services section section--cream">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-header__tag">What We Do</span>
      <h2 class="section-header__title">
        Complete Built<br/>
        <span class="s-bar">Environment</span><br/>
        Solutions
      </h2>
    </div>
    
    <div class="services__grid">
      {#each services as service, i}
        <a href="/services#{service.id}" class="service-card reveal" style="--delay: {i * 0.1}s">
          <div class="service-card__number">0{i + 1}</div>
          <div class="service-card__content">
            <h3 class="service-card__title">{service.name}</h3>
            <p class="service-card__desc">{service.shortDescription}</p>
          </div>
          <div class="service-card__arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- Process Section -->
<section class="process section section--dark qs-pattern">
  <div class="container">
    <div class="process__header reveal">
      <span class="process__tag">How It Works</span>
      <h2 class="process__title">
        Your Path to the<br/>
        <span class="s-bar">Right Solution</span>
      </h2>
    </div>
    
    <div class="process__steps">
      <div class="process__step reveal">
        <div class="process__step-number">01</div>
        <h3 class="process__step-title">Tell Us About Your Project</h3>
        <p class="process__step-desc">
          Answer a few questions about your property, your needs, and your goals through our interactive solution finder.
        </p>
      </div>
      
      <div class="process__step reveal reveal-delay-1">
        <div class="process__step-number">02</div>
        <h3 class="process__step-title">Get Your Tailored Solution</h3>
        <p class="process__step-desc">
          Receive a personalized service package designed specifically for your built environment challenges.
        </p>
      </div>
      
      <div class="process__step reveal reveal-delay-2">
        <div class="process__step-number">03</div>
        <h3 class="process__step-title">Let's Build Together</h3>
        <p class="process__step-desc">
          Connect with our team to discuss next steps and begin delivering results for your property.
        </p>
      </div>
    </div>
    
    <div class="process__cta reveal">
      <a href="/solutions" class="btn btn--primary btn--lg">
        Start with the Solution Finder
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  </div>
</section>

<!-- Portfolio Section -->
<section class="portfolio section section--white">
  <div class="container">
    <div class="portfolio__header reveal">
      <div>
        <span class="portfolio__tag">Selected Work</span>
        <h2 class="portfolio__title">
          Projects That<br/>
          <span class="s-bar">Speak for</span><br/>
          Themselves
        </h2>
      </div>
      <a href="/portfolio" class="btn btn--outline">
        View All Projects
      </a>
    </div>
    
    <div class="portfolio__grid">
      {#each featuredProjects as project, i}
        <a href="/portfolio" class="project-card reveal" style="--delay: {i * 0.15}s">
          <div class="project-card__image">
            <img src={project.image} alt={project.name} loading="lazy" />
            <div class="project-card__overlay"></div>
          </div>
          <div class="project-card__content">
            <span class="project-card__location">{project.location}</span>
            <h3 class="project-card__title">{project.name}</h3>
            <p class="project-card__desc">{project.description}</p>
            <div class="project-card__tags">
              {#each project.services.slice(0, 2) as tag}
                <span class="project-card__tag">{tag}</span>
              {/each}
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="cta-section">
  <div class="cta-section__bg"></div>
  <div class="container cta-section__container">
    <div class="cta-section__content reveal">
      <h2 class="cta-section__title">
        Ready to Transform<br/>
        Your Property?
      </h2>
      <p class="cta-section__subtitle">
        Let our interactive solution finder guide you to the perfect service package.
      </p>
      <a href="/solutions" class="btn btn--primary btn--lg">
        Find Your Solution
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  </div>
</section>

<style>
  /* ============================================
     HERO SECTION
     ============================================ */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    background-color: var(--navy);
    overflow: hidden;
  }

  .hero__bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 92, 0, 0.15) 0%,
      transparent 50%
    );
    transition: background 0.3s ease;
  }

  .hero__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3xl);
    align-items: center;
    padding-top: 120px;
    padding-bottom: var(--space-3xl);
    position: relative;
    z-index: 1;
  }

  .hero__label {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    background: rgba(255, 92, 0, 0.15);
    border: 1px solid rgba(255, 92, 0, 0.3);
    color: var(--orange);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-xl);
    animation: fadeIn 0.8s var(--ease-out-expo) forwards;
  }

  .hero__label-dot {
    width: 8px;
    height: 8px;
    background: var(--orange);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  .hero__title {
    font-size: clamp(48px, 8vw, 96px);
    font-weight: 700;
    line-height: 0.95;
    color: var(--white);
    letter-spacing: -0.03em;
    margin-bottom: var(--space-xl);
    animation: fadeInUp 0.8s var(--ease-out-expo) 0.2s backwards;
  }

  .hero__title-accent {
    color: var(--orange);
    position: relative;
  }

  .hero__title-accent::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 100%;
    height: 6px;
    background: var(--orange);
    z-index: -1;
  }

  .hero__subtitle {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.7;
    max-width: 480px;
    margin-bottom: var(--space-xl);
    animation: fadeInUp 0.8s var(--ease-out-expo) 0.4s backwards;
  }

  .hero__actions {
    display: flex;
    gap: var(--space-md);
    animation: fadeInUp 0.8s var(--ease-out-expo) 0.6s backwards;
  }

  /* Hero Visual */
  .hero__visual {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hero__graphic {
    position: relative;
    width: 400px;
    height: 400px;
  }

  .hero__circle {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255, 92, 0, 0.3);
  }

  .hero__circle--1 {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    animation: rotate 30s linear infinite;
  }

  .hero__circle--2 {
    width: 75%;
    height: 75%;
    top: 12.5%;
    left: 12.5%;
    animation: rotate 25s linear infinite reverse;
  }

  .hero__circle--3 {
    width: 50%;
    height: 50%;
    top: 25%;
    left: 25%;
    animation: rotate 20s linear infinite;
  }

  .hero__qs-mark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 180px;
    height: 180px;
    animation: float 6s ease-in-out infinite;
  }

  .hero__stats-card {
    position: absolute;
    background: rgba(255, 92, 0, 0.9);
    padding: var(--space-md) var(--space-lg);
    color: var(--white);
    animation: fadeInUp 0.8s var(--ease-out-expo) 1s backwards;
  }

  .hero__stats-card--2 {
    bottom: 40px;
    right: 0;
    animation-delay: 1.2s;
  }

  .hero__stats-number {
    display: block;
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 700;
    line-height: 1;
  }

  .hero__stats-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.9;
  }

  /* Hero Scroll Indicator */
  .hero__scroll {
    position: absolute;
    bottom: var(--space-xl);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }

  .hero__scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, var(--orange), transparent);
    animation: slideUp 1.5s var(--ease-out-expo) infinite;
  }

  /* ============================================
     STATS BAR
     ============================================ */
  .stats-bar {
    background: var(--orange);
    padding: var(--space-2xl) 0;
  }

  .stats-bar__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-xl);
    text-align: center;
  }

  .stats-bar__grid .stat {
    opacity: 0;
    transform: translateY(20px);
  }

  .stats-bar__grid--visible .stat {
    animation: fadeInUp 0.5s var(--ease-out-expo) forwards;
  }

  .stats-bar__grid--visible .stat:nth-child(1) { animation-delay: 0s; }
  .stats-bar__grid--visible .stat:nth-child(2) { animation-delay: 0.1s; }
  .stats-bar__grid--visible .stat:nth-child(3) { animation-delay: 0.2s; }
  .stats-bar__grid--visible .stat:nth-child(4) { animation-delay: 0.3s; }

  .stat__value {
    display: block;
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 700;
    color: var(--white);
    line-height: 1;
    margin-bottom: var(--space-xs);
  }

  .stat__label {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* ============================================
     SECTION HEADER
     ============================================ */
  .section-header {
    margin-bottom: var(--space-3xl);
  }

  .section-header__tag {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: var(--space-md);
  }

  .section-header__title {
    font-size: clamp(36px, 5vw, 64px);
    line-height: 1.1;
  }

  /* ============================================
     SERVICES
     ============================================ */
  .services__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
  }

  .service-card {
    display: block;
    background: var(--white);
    padding: var(--space-2xl);
    position: relative;
    overflow: hidden;
    transition: all var(--duration-normal) var(--ease-out-expo);
    border: 1px solid transparent;
  }

  .service-card::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 4px;
    background: var(--orange);
    transition: width var(--duration-normal) var(--ease-out-expo);
  }

  .service-card:hover {
    border-color: var(--orange);
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  .service-card:hover::before {
    width: 100%;
  }

  .service-card:hover .service-card__arrow {
    transform: translateX(8px);
    color: var(--orange);
  }

  .service-card__number {
    font-family: var(--font-display);
    font-size: 14px;
    font-weight: 700;
    color: var(--orange);
    margin-bottom: var(--space-lg);
  }

  .service-card__title {
    font-size: 24px;
    margin-bottom: var(--space-md);
  }

  .service-card__desc {
    color: var(--gray-600);
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: var(--space-lg);
  }

  .service-card__arrow {
    color: var(--gray-400);
    transition: all var(--duration-normal) var(--ease-out-expo);
  }

  /* ============================================
     PROCESS
     ============================================ */
  .process__header {
    margin-bottom: var(--space-3xl);
  }

  .process__tag {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: var(--space-md);
  }

  .process__title {
    font-size: clamp(36px, 5vw, 56px);
    color: var(--white);
  }

  .process__steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xl);
    margin-bottom: var(--space-3xl);
  }

  .process__step {
    padding: var(--space-xl);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all var(--duration-normal) var(--ease-out-expo);
  }

  .process__step:hover {
    border-color: var(--orange);
    background: rgba(255, 92, 0, 0.1);
  }

  .process__step-number {
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 700;
    color: var(--orange);
    line-height: 1;
    margin-bottom: var(--space-lg);
  }

  .process__step-title {
    font-size: 20px;
    color: var(--white);
    margin-bottom: var(--space-md);
  }

  .process__step-desc {
    color: rgba(255, 255, 255, 0.6);
    font-size: 15px;
    line-height: 1.6;
  }

  .process__cta {
    text-align: center;
  }

  /* ============================================
     PORTFOLIO
     ============================================ */
  .portfolio__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: var(--space-3xl);
  }

  .portfolio__tag {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: var(--space-md);
  }

  .portfolio__title {
    font-size: clamp(36px, 5vw, 56px);
    line-height: 1.1;
  }

  .portfolio__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-xl);
  }

  .project-card {
    display: block;
    position: relative;
    overflow: hidden;
    aspect-ratio: 16/10;
  }

  .project-card__image {
    position: absolute;
    inset: 0;
  }

  .project-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--duration-slow) var(--ease-out-expo);
  }

  .project-card:hover .project-card__image img {
    transform: scale(1.05);
  }

  .project-card__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10, 22, 40, 0.95) 0%, rgba(10, 22, 40, 0.3) 50%, transparent 100%);
  }

  .project-card__content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--space-xl);
    color: var(--white);
  }

  .project-card__location {
    display: block;
    font-size: 12px;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-sm);
  }

  .project-card__title {
    font-size: 24px;
    color: var(--white);
    margin-bottom: var(--space-sm);
  }

  .project-card__desc {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: var(--space-md);
    line-height: 1.5;
  }

  .project-card__tags {
    display: flex;
    gap: var(--space-sm);
  }

  .project-card__tag {
    padding: var(--space-xs) var(--space-sm);
    background: rgba(255, 92, 0, 0.2);
    border: 1px solid var(--orange);
    font-size: 11px;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* ============================================
     CTA SECTION
     ============================================ */
  .cta-section {
    position: relative;
    padding: var(--space-4xl) 0;
    overflow: hidden;
    background-color: var(--orange);
    color: var(--white);
  }

  .cta-section__bg {
    position: absolute;
    inset: 0;
    opacity: 0.1;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='8' fill='none' stroke='%23FFFFFF' stroke-opacity='0.4'/%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E");
    background-size: 40px 40px;
  }

  .cta-section__container {
    position: relative;
    text-align: center;
  }

  .cta-section__content {
    max-width: 600px;
    margin: 0 auto;
  }

  .cta-section__title {
    font-size: clamp(32px, 5vw, 56px);
    color: var(--white);
    margin-bottom: var(--space-lg);
  }

  .cta-section__subtitle {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: var(--space-xl);
  }

  .cta-section .btn--primary {
    background-color: var(--navy);
    color: var(--white);
  }

  .cta-section .btn--primary:hover {
    background-color: var(--navy-mid);
    box-shadow: 0 0 40px rgba(10, 22, 40, 0.3);
  }

/* ============================================
     RESPONSIVE
     ============================================ */
  @media (max-width: 1024px) {
    .hero__container {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .hero__subtitle {
      margin: 0 auto var(--space-xl);
    }

    .hero__actions {
      justify-content: center;
    }

    .hero__visual {
      display: none;
    }

    .stats-bar__grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .services__grid {
      grid-template-columns: 1fr;
    }

    .process__steps {
      grid-template-columns: 1fr;
    }

    .portfolio__header {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-lg);
    }

    .portfolio__grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .hero__actions {
      flex-direction: column;
    }

    .hero__actions .btn {
      width: 100%;
    }

    .stats-bar__grid {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-lg);
    }

    .stat__value {
      font-size: 36px;
    }
  }
</style>