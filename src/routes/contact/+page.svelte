<script lang="ts">
  let formData = $state({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  let formStatus = $state<'idle' | 'submitting' | 'success'>('idle');

  const services = [
    'Consultancy',
    'Project Management & Construction',
    'Property & Facility Management',
    'Hospitality Management',
    'Not Sure'
  ];

  async function handleSubmit(e: Event) {
    e.preventDefault();
    formStatus = 'submitting';
    await new Promise(resolve => setTimeout(resolve, 1500));
    formStatus = 'success';
    setTimeout(() => {
      formData = { name: '', email: '', phone: '', company: '', service: '', message: '' };
      formStatus = 'idle';
    }, 3000);
  }
</script>

<svelte:head>
  <title>Contact Us | Quinstyle</title>
  <meta name="description" content="Get in touch with Quinstyle to discuss your built environment management needs." />
</svelte:head>

<!-- Hero -->
<section class="hero section--dark">
  <div class="hero__bg"></div>
  <div class="container hero__container">
    <span class="hero__tag">Contact</span>
    <h1 class="hero__title">
      Let's Start a<br/>
      <span class="hero__title-accent">Conversation</span>
    </h1>
    <p class="hero__desc">
      Ready to transform your property? We'd love to hear from you.
    </p>
  </div>
</section>

<!-- Contact Section -->
<section class="contact section section--cream">
  <div class="container contact__container">
    <div class="contact__info">
      <h2>Get in Touch</h2>
      <p>
        Whether you're planning a new project or looking to improve operations on an existing property, we're here to help.
      </p>

      <div class="contact__details">
        <div class="contact__item">
          <div class="contact__item-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div>
            <h3>Email</h3>
            <a href="mailto:hello@quinstyle.com">hello@quinstyle.com</a>
          </div>
        </div>

        <div class="contact__item">
          <div class="contact__item-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div>
            <h3>Phone</h3>
            <a href="tel:+234XXXXXXXXXX">+234 XXX XXX XXXX</a>
          </div>
        </div>

        <div class="contact__item">
          <div class="contact__item-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div>
            <h3>Location</h3>
            <p>Lagos, Nigeria</p>
          </div>
        </div>
      </div>
    </div>

    <div class="contact__form">
      {#if formStatus === 'success'}
        <div class="form-success">
          <div class="form-success__icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h2>Message Sent!</h2>
          <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
        </div>
      {:else}
        <form onsubmit={handleSubmit}>
          <div class="form-row">
            <div class="form-group">
              <label for="name" class="form-label">Full Name *</label>
              <input type="text" id="name" class="form-input" bind:value={formData.name} required placeholder="Your name" />
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Email *</label>
              <input type="email" id="email" class="form-input" bind:value={formData.email} required placeholder="you@company.com" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="phone" class="form-label">Phone</label>
              <input type="tel" id="phone" class="form-input" bind:value={formData.phone} placeholder="+234 XXX XXX XXXX" />
            </div>
            <div class="form-group">
              <label for="company" class="form-label">Company</label>
              <input type="text" id="company" class="form-input" bind:value={formData.company} placeholder="Your company" />
            </div>
          </div>

          <div class="form-group">
            <label for="service" class="form-label">Service Interest</label>
            <select id="service" class="form-input" bind:value={formData.service}>
              <option value="">Select a service...</option>
              {#each services as service}
                <option value={service}>{service}</option>
              {/each}
            </select>
          </div>

          <div class="form-group">
            <label for="message" class="form-label">Message *</label>
            <textarea id="message" class="form-input form-textarea" bind:value={formData.message} required placeholder="Tell us about your project..." rows="5"></textarea>
          </div>

          <button type="submit" class="btn btn--primary btn--lg" disabled={formStatus === 'submitting'}>
            {#if formStatus === 'submitting'}
              Sending...
            {:else}
              Send Message
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            {/if}
          </button>
        </form>
      {/if}
    </div>
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
    max-width: 450px;
    line-height: 1.7;
  }

  /* Contact */
  .contact__container {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: var(--space-3xl);
  }

  .contact__info {
    padding-right: var(--space-xl);
  }

  .contact__info h2 {
    font-size: 28px;
    margin-bottom: var(--space-md);
  }

  .contact__info > p {
    color: var(--gray-600);
    margin-bottom: var(--space-2xl);
  }

  .contact__details {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .contact__item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
  }

  .contact__item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: rgba(255, 92, 0, 0.1);
    color: var(--orange);
    flex-shrink: 0;
  }

  .contact__item h3 {
    font-size: 12px;
    font-weight: 600;
    color: var(--gray-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--space-xs);
  }

  .contact__item p,
  .contact__item a {
    color: var(--gray-700);
  }

  .contact__item a:hover {
    color: var(--orange);
  }

  /* Form */
  .contact__form {
    background: var(--white);
    padding: var(--space-2xl);
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
  }

  .form-group {
    margin-bottom: var(--space-lg);
  }

  .form-input {
    width: 100%;
    padding: var(--space-md) var(--space-lg);
    font-size: 16px;
    background: var(--white);
    border: 2px solid var(--gray-200);
    transition: all var(--duration-fast) ease;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--orange);
    box-shadow: 0 0 0 4px rgba(255, 92, 0, 0.15);
  }

  select.form-input {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    padding-right: 48px;
    cursor: pointer;
  }

  .form-textarea {
    resize: vertical;
    min-height: 120px;
  }

  .form-success {
    text-align: center;
    padding: var(--space-2xl);
  }

  .form-success__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: rgba(34, 197, 94, 0.1);
    border-radius: 50%;
    color: #22C55E;
    margin-bottom: var(--space-lg);
  }

  .form-success h2 {
    font-size: 24px;
    margin-bottom: var(--space-sm);
  }

  .form-success p {
    color: var(--gray-500);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .contact__container {
      grid-template-columns: 1fr;
    }

    .contact__info {
      padding-right: 0;
    }
  }

  @media (max-width: 640px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }
</style>