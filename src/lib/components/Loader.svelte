<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let loading = $state(true);
  let overlay = $state<HTMLElement>();
  let logo = $state<HTMLElement>();

  onMount(() => {
    // Wow factor entry animation
    const tl = gsap.timeline({
      onComplete: () => {
        loading = false;
      }
    });

    tl.to(logo, {
      scale: 1.1,
      duration: 1,
      ease: "power2.inOut",
      repeat: 1,
      yoyo: true
    })
    .to(overlay, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut"
    });
  });
</script>

{#if loading}
  <div class="loader" bind:this={overlay}>
    <div class="loader__content" bind:this={logo}>
      <img src="/logos/FOR USE ON DARK BACKGROUNDS/SVG/LOGOMARK (FOR DARK BACKGROUND).svg" alt="Quinstyle" class="loader__logo" />
      <div class="loader__bar">
        <div class="loader__bar-inner"></div>
      </div>
    </div>
  </div>
{/if}

<style>
  .loader {
    position: fixed;
    inset: 0;
    background: var(--navy);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    overflow: hidden;
  }

  .loader__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xl);
  }

  .loader__logo {
    width: 120px;
    height: auto;
  }

  .loader__bar {
    width: 200px;
    height: 2px;
    background: rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }

  .loader__bar-inner {
    position: absolute;
    inset: 0;
    background: var(--orange);
    width: 100%;
    transform: translateX(-100%);
    animation: loading 2s infinite ease-in-out;
  }

  @keyframes loading {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0); }
    100% { transform: translateX(100%); }
  }
</style>