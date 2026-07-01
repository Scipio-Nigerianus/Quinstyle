<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  const currentYear = new Date().getFullYear();

  let footerContainer: HTMLElement;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (footerContainer) {
      const columns = footerContainer.querySelectorAll('.footer__column, .footer__brand');
      gsap.fromTo(columns, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerContainer,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  });

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/solutions', label: 'Find Your Solution' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' }
  ];

  const services = [
    { href: '/services#consultancy', label: 'Consultancy' },
    { href: '/services#project-management', label: 'Project Management' },
    { href: '/services#facility-management', label: 'Facility Management' },
    { href: '/services#hospitality', label: 'Hospitality Management' }
  ];

  const contact = {
    address: 'Lagos, Nigeria',
    email: 'hello@quinstyle.com',
    phone: '+234 XXX XXX XXXX'
  };

  const socialLinks = [
    { href: 'https://www.linkedin.com/company/quinstyle', label: 'LinkedIn', icon: 'linkedin' },
    { href: 'https://www.instagram.com/quinstyle', label: 'Instagram', icon: 'instagram' },
    { href: 'https://twitter.com/quinstyle', label: 'Twitter', icon: 'twitter' }
  ];
</script>

<footer class="footer" bind:this={footerContainer}>
  <div class="footer__pattern"></div>
  <div class="footer__container">
    <div class="footer__grid">
      <!-- Brand Column -->
      <div class="footer__brand">
        <a href="/" class="footer__logo">
          <img src="/logos/FOR USE ON DARK BACKGROUNDS/SVG/WORDMARK (FOR DARK BACKGROUND).svg" alt="Quinstyle" class="footer__logo-img" />
        </a>
        <p class="footer__description">
          A new standard in built environment management. Based in Lagos, we provide integrated expertise for properties that demand excellence.
        </p>
        <div class="footer__social">
          {#each socialLinks as social}
            <a href={social.href} class="footer__social-link" aria-label={social.label}>
              {#if social.icon === 'linkedin'}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              {:else if social.icon === 'instagram'}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              {:else}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              {/if}
            </a>
          {/each}
        </div>
      </div>

      <!-- Quick Links Column -->
      <div class="footer__column">
        <h4 class="footer__heading">Quick Links</h4>
        <ul class="footer__list">
          {#each quickLinks as link}
            <li>
              <a href={link.href} class="footer__link">{link.label}</a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Services Column -->
      <div class="footer__column">
        <h4 class="footer__heading">Our Services</h4>
        <ul class="footer__list">
          {#each services as service}
            <li>
              <a href={service.href} class="footer__link">{service.label}</a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Contact Column -->
      <div class="footer__column">
        <h4 class="footer__heading">Get in Touch</h4>
        <div class="footer__contact">
          <div class="footer__contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{contact.address}</span>
          </div>
          <div class="footer__contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <a href="mailto:{contact.email}">{contact.email}</a>
          </div>
          <div class="footer__contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>{contact.phone}</span>
          </div>
        </div>

        <!-- Social Links -->
        <div class="footer__social">
          {#each socialLinks as social}
            <a href={social.href} class="footer__social-link" aria-label={social.label}>
              {#if social.icon === 'linkedin'}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              {:else if social.icon === 'instagram'}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              {:else}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              {/if}
            </a>
          {/each}
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer__bottom">
      <p class="footer__copyright">
        &copy; {currentYear} Quinstyle Limited. All rights reserved.
      </p>
      <div class="footer__legal">
        <a href="/privacy" class="footer__legal-link">Privacy Policy</a>
        <a href="/terms" class="footer__legal-link">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    position: relative;
    background-color: var(--navy);
    color: var(--white);
    padding: var(--space-4xl) 0 var(--space-xl);
    overflow: hidden;
    border-top: 1px solid rgba(255, 92, 0, 0.2);
  }

  /* Decorative pattern as a subtle side accent instead of full background */
  .footer::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 30%;
    height: 100%;
    background-image: url('/pattern-dark.png');
    background-size: 400px;
    background-repeat: no-repeat;
    background-position: right top;
    opacity: 0.15;
    mask-image: linear-gradient(to left, black, transparent);
    pointer-events: none;
  }

  .footer__container {
    position: relative;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    z-index: 2;
  }

  .footer__grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: var(--space-2xl);
    padding-bottom: var(--space-3xl);
  }

  .footer__brand {
    max-width: 360px;
  }

  .footer__logo {
    display: block;
    margin-bottom: var(--space-xl);
  }

  .footer__logo-img {
    height: 32px; /* Wordmark size */
    width: auto;
  }

  .footer__description {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.8;
    margin-bottom: var(--space-xl);
  }

  .footer__heading {
    font-size: 13px;
    font-weight: 700;
    color: var(--white);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: var(--space-xl);
    position: relative;
    display: inline-block;
  }

  .footer__heading::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 24px;
    height: 2px;
    background-color: var(--orange);
  }

  .footer__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .footer__link {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    transition: all var(--duration-fast);
    display: inline-block;
  }

  .footer__link:hover {
    color: var(--orange);
    transform: translateX(4px);
  }

  .footer__contact {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .footer__contact-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
  }

  .footer__contact-item svg {
    color: var(--orange);
    flex-shrink: 0;
    margin-top: 2px;
  }

  .footer__contact-item a {
    color: inherit;
    transition: color var(--duration-fast);
  }

  .footer__contact-item a:hover {
    color: var(--orange);
  }

  .footer__social {
    display: flex;
    gap: var(--space-md);
  }

  .footer__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--white);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all var(--duration-normal);
  }

  .footer__social-link:hover {
    background-color: var(--orange);
    border-color: var(--orange);
    transform: translateY(-4px);
    box-shadow: 0 4px 20px rgba(255, 92, 0, 0.3);
  }

  .footer__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: var(--space-xl);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .footer__copyright {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
  }

  .footer__legal {
    display: flex;
    gap: var(--space-xl);
  }

  .footer__legal-link {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
    transition: color var(--duration-fast);
  }

  .footer__legal-link:hover {
    color: var(--white);
  }

  @media (max-width: 1024px) {
    .footer__grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .footer__brand {
      grid-column: span 2;
      max-width: none;
      margin-bottom: var(--space-xl);
    }
  }

  @media (max-width: 640px) {
    .footer__grid {
      grid-template-columns: 1fr;
    }

    .footer__brand {
      grid-column: span 1;
    }

    .footer__bottom {
      flex-direction: column;
      gap: var(--space-lg);
      text-align: center;
    }
  }
</style>