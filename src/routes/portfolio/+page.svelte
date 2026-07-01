<script lang="ts">
  import { projects } from '$lib/data/projects';
  import { services } from '$lib/data/services';

  let activeFilter = $state('all');

  const filters = ['all', 'consultancy', 'project-management', 'facility-management', 'hospitality'];

  function getFilteredProjects() {
    if (activeFilter === 'all') return projects;
    return projects.filter(p => p.services.some(s => s.toLowerCase().includes(activeFilter)));
  }

  function getServiceLabel(id: string): string {
    const service = services.find(s => s.id === id);
    return service ? service.name : id;
  }
</script>

<svelte:head>
  <title>Portfolio | Quinstyle</title>
  <meta name="description" content="See how Quinstyle has helped clients achieve operational excellence." />
</svelte:head>

<!-- Hero -->
<section class="hero section--dark">
  <div class="hero__bg"></div>
  <div class="container hero__container">
    <span class="hero__tag">Selected Work</span>
    <h1 class="hero__title">
      Projects That<br/>
      <span class="hero__title-accent">Speak for</span><br/>
      Themselves
    </h1>
  </div>
</section>

<!-- Portfolio -->
<section class="portfolio section section--cream">
  <div class="container">
    <div class="filters">
      {#each filters as filter}
        <button 
          class="filter-btn" 
          class:filter-btn--active={activeFilter === filter}
          onclick={() => activeFilter = filter}
        >
          {filter === 'all' ? 'All Projects' : getServiceLabel(filter)}
        </button>
      {/each}
    </div>

    <div class="projects-grid">
      {#each getFilteredProjects() as project}
        <article class="project-card">
          <div class="project-card__image">
            <img src={project.image} alt={project.name} loading="lazy" />
            <div class="project-card__overlay"></div>
          </div>
          <div class="project-card__content">
            <span class="project-card__location">{project.location}</span>
            <h2 class="project-card__title">{project.name}</h2>
            <p class="project-card__desc">{project.description}</p>
            
            <div class="project-card__sections">
              <div class="project-card__section">
                <h3>The Challenge</h3>
                <p>{project.challenge}</p>
              </div>
              <div class="project-card__section">
                <h3>Our Solution</h3>
                <p>{project.solution}</p>
              </div>
              <div class="project-card__section">
                <h3>The Results</h3>
                <p>{project.results}</p>
              </div>
            </div>

            <div class="project-card__tags">
              {#each project.services as tag}
                <span class="project-card__tag">{tag}</span>
              {/each}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta section section--dark">
  <div class="container cta__container">
    <h2 class="cta__title">Ready to Add Your Project to Our Portfolio?</h2>
    <p class="cta__desc">Let's discuss how we can help you achieve similar results.</p>
    <a href="/contact" class="btn btn--primary btn--lg">
      Start a Conversation
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
    line-height: 1.1;
  }

  .hero__title-accent {
    color: var(--orange);
  }

  /* Filters */
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-bottom: var(--space-2xl);
  }

  .filter-btn {
    padding: var(--space-sm) var(--space-lg);
    background: transparent;
    border: 2px solid var(--gray-300);
    font-size: 13px;
    font-weight: 500;
    color: var(--gray-600);
    transition: all var(--duration-normal) ease;
  }

  .filter-btn:hover {
    border-color: var(--navy);
    color: var(--navy);
  }

  .filter-btn--active {
    background: var(--orange);
    border-color: var(--orange);
    color: var(--white);
  }

  /* Projects Grid */
  .projects-grid {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }

  .project-card {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    background: var(--white);
    overflow: hidden;
  }

  .project-card__image {
    position: relative;
    min-height: 350px;
  }

  .project-card__image img {
    position: absolute;
    inset: 0;
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
    background: linear-gradient(to right, rgba(10, 22, 40, 0.4), transparent);
  }

  .project-card__content {
    padding: var(--space-2xl);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .project-card__location {
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-sm);
  }

  .project-card__title {
    font-size: 28px;
    margin-bottom: var(--space-md);
  }

  .project-card__desc {
    font-size: 15px;
    color: var(--gray-600);
    margin-bottom: var(--space-xl);
    line-height: 1.6;
  }

  .project-card__sections {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    margin-bottom: var(--space-lg);
  }

  .project-card__section h3 {
    font-size: 11px;
    font-weight: 600;
    color: var(--gray-500);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-xs);
  }

  .project-card__section p {
    font-size: 14px;
    color: var(--gray-700);
    line-height: 1.6;
  }

  .project-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  .project-card__tag {
    padding: var(--space-xs) var(--space-sm);
    background: rgba(255, 92, 0, 0.1);
    border: 1px solid var(--orange);
    font-size: 11px;
    color: var(--orange);
    text-transform: uppercase;
    letter-spacing: 0.05em;
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
    .project-card {
      grid-template-columns: 1fr;
    }

    .project-card__image {
      min-height: 250px;
    }
  }
</style>