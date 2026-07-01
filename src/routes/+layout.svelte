<script lang="ts">
  import '../lib/styles/global.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Loader from '$lib/components/Loader.svelte';

  let { children } = $props();
</script>

<div class="app">
  <Loader />
  <Nav />
  <main class="main">
    {@render children()}
  </main>
  <Footer />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main {
    flex: 1;
  }
</style>