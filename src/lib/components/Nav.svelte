<script lang="ts">
  import { page } from '$app/stores';

  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);

  // Only the solutions page has a light background at the top.
  let isSolutionsPage = $derived($page.url.pathname.startsWith('/solutions'));
  // If we are on solutions, and not scrolled, the nav needs to be "light mode" (dark text)
  let isLightMode = $derived(isSolutionsPage && !scrolled);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/solutions', label: 'Find Your Solution' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];

  function handleScroll() {
    scrolled = window.scrollY > 50;
  }

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

<svelte:window onscroll={handleScroll} />

<nav class="nav" class:nav--scrolled={scrolled} class:nav--light={isLightMode}>
  <div class="nav__container">
    <!-- Logo -->
    <a href="/" class="nav__logo">
      {#if isLightMode}
        <img src="/logos/FOR USE ON LIGHT BACKGROUNDS/SVG/PRIMARY LOGO (FOR LIGHT BACKGROUND).svg" alt="Quinstyle" class="nav__logo-img" />
      {:else}
        <img src="/logos/FOR USE ON DARK BACKGROUNDS/SVG/PRIMARY LOGO (FOR DARK BACKGROUND).svg" alt="Quinstyle" class="nav__logo-img" />
      {/if}
    </a>

    <!-- Desktop Navigation -->
    <div class="nav__links">
      {#each navLinks as link}
        <a 
          href={link.href} 
          class="nav__link" 
          class:nav__link--active={$page.url.pathname === link.href}
        >
          {link.label}
        </a>
      {/each}
    </div>

    <!-- CTA Button -->
    <a href="/solutions" class="btn btn--primary nav__cta">
      Get Started
    </a>

    <!-- Mobile Menu Toggle -->
    <button class="nav__mobile-toggle" onclick={toggleMobileMenu} aria-label="Toggle menu">
      <span class="nav__hamburger" class:nav__hamburger--open={mobileMenuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <div class="nav__mobile-menu">
      {#each navLinks as link}
        <a 
          href={link.href} 
          class="nav__mobile-link" 
          class:nav__mobile-link--active={$page.url.pathname === link.href}
          onclick={closeMobileMenu}
        >
          {link.label}
        </a>
      {/each}
      <a href="/solutions" class="btn btn--primary nav__mobile-cta" onclick={closeMobileMenu}>
        Get Started
      </a>
    </div>
  {/if}
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--z-fixed);
    padding: var(--space-lg) 0;
    transition: all var(--duration-normal) ease;
    background-color: transparent;
  }

  .nav--scrolled {
    background-color: rgba(10, 22, 40, 0.95);
    backdrop-filter: blur(20px);
    padding: var(--space-md) 0;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  }

  .nav__container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav__logo {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .nav__logo-img {
    height: 48px;
    width: auto;
    transition: all var(--duration-normal) ease;
  }

  .nav--scrolled .nav__logo-img {
    height: 40px;
  }

  .nav__links {
    display: flex;
    gap: var(--space-xl);
  }

  .nav__link {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    padding: var(--space-sm) 0;
    position: relative;
    transition: color var(--duration-fast) ease;
  }

  /* Light mode (non-homepage, not scrolled) styles */
  .nav--light .nav__link {
    color: var(--navy);
  }

  .nav__link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--orange);
    transition: width var(--duration-normal) var(--ease-out-expo);
  }

  .nav__link:hover::after,
  .nav__link--active::after {
    width: 100%;
  }

  .nav__link:hover,
  .nav__link--active {
    color: var(--white);
  }

  .nav--light .nav__link:hover,
  .nav--light .nav__link--active {
    color: var(--orange);
  }

  .nav__cta {
    background-color: var(--orange);
    color: var(--white);
    padding: var(--space-sm) var(--space-lg);
    font-weight: 600;
    transition: all var(--duration-normal) var(--ease-out-expo);
  }

  .nav__cta:hover {
    background-color: var(--orange-bright);
    transform: translateY(-2px);
    box-shadow: 0 0 40px rgba(255, 92, 0, 0.3);
  }

  .nav__mobile-toggle {
    display: none;
    padding: var(--space-sm);
    background: none;
    border: none;
    cursor: pointer;
  }

  .nav__hamburger {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 24px;
  }

  .nav__hamburger span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--white);
    transition: all var(--duration-normal) var(--ease-out-expo);
  }

  .nav--light .nav__hamburger span {
    background-color: var(--navy);
  }

  .nav__hamburger--open span:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }

  .nav__hamburger--open span:nth-child(2) {
    opacity: 0;
  }

  .nav__hamburger--open span:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }

  .nav__mobile-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--white);
    padding: var(--space-lg);
    box-shadow: var(--shadow-lg);
  }

  .nav__mobile-link {
    display: block;
    padding: var(--space-md) 0;
    font-size: 16px;
    font-weight: 500;
    color: var(--gray-700);
    text-decoration: none;
    border-bottom: 1px solid var(--gray-200);
  }

  .nav__mobile-link--active {
    color: var(--orange);
  }

  .nav__mobile-cta {
    margin-top: var(--space-lg);
    width: 100%;
  }

  @media (max-width: 1024px) {
    .nav__links {
      display: none;
    }

    .nav__cta {
      display: none;
    }

    .nav__mobile-toggle {
      display: block;
    }

    .nav__mobile-menu {
      display: block;
    }
  }
</style>