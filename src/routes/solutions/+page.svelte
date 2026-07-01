<script lang="ts">
  import {
    serviceTypeOptions,
    propertyTypeOptions,
    propertySizeOptions,
    currentStatusOptions,
    budgetRangeOptions,
    timelineOptions,
    generatePackageRecommendation,
    type SurveyAnswers
  } from '$lib/data/surveyLogic';
  import { gsap } from 'gsap';
  import { tick } from 'svelte';

  let currentStep = $state(1);
  let direction = $state<'forward' | 'backward'>('forward');
  let answers = $state<SurveyAnswers>({
    serviceType: [],
    propertyType: '',
    propertySize: '',
    currentStatus: '',
    location: '',
    budgetRange: '',
    timeline: ''
  });
  let recommendation = $state<ReturnType<typeof generatePackageRecommendation> | null>(null);

  const totalSteps = 4;

  let surveyContainer: HTMLElement;

  async function animateStepTransition(newStep: number, isForward: boolean) {
    if (surveyContainer) {
      // Fade out
      await gsap.to(surveyContainer, {
        opacity: 0,
        y: isForward ? -20 : 20,
        duration: 0.25,
        ease: 'power2.in'
      });
      
      currentStep = newStep;
      await tick();
      
      // Fade in
      gsap.fromTo(surveyContainer, 
        { opacity: 0, y: isForward ? 20 : -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    } else {
      currentStep = newStep;
    }
  }

  function toggleServiceType(id: string) {
    if (id === 'unsure') {
      answers.serviceType = ['unsure'];
    } else {
      answers.serviceType = answers.serviceType.filter(s => s !== 'unsure');
      if (answers.serviceType.includes(id)) {
        answers.serviceType = answers.serviceType.filter(s => s !== id);
      } else {
        answers.serviceType = [...answers.serviceType, id];
      }
      if (answers.serviceType.length === 0) {
        answers.serviceType = [id];
      }
    }
  }

  function selectOption(field: Exclude<keyof SurveyAnswers, 'serviceType'>, value: string) {
    answers[field] = value;
  }

  function nextStep() {
    direction = 'forward';
    if (currentStep < totalSteps) {
      animateStepTransition(currentStep + 1, true);
    }
  }

  function prevStep() {
    direction = 'backward';
    if (currentStep > 1) {
      animateStepTransition(currentStep - 1, false);
    }
  }

  function submitSurvey() {
    recommendation = generatePackageRecommendation(answers);
    animateStepTransition(5, true);
  }

  function resetSurvey() {
    answers = {
      serviceType: [],
      propertyType: '',
      propertySize: '',
      currentStatus: '',
      location: '',
      budgetRange: '',
      timeline: ''
    };
    recommendation = null;
    animateStepTransition(1, false);
  }

  function isStepComplete(step: number): boolean {
    switch (step) {
      case 1:
        return answers.serviceType.length > 0;
      case 2:
        return answers.propertyType !== '' && answers.propertySize !== '' && answers.currentStatus !== '';
      case 3:
        return answers.budgetRange !== '' && answers.timeline !== '';
      default:
        return false;
    }
  }
</script>

<svelte:head>
  <title>Find Your Solution | Quinstyle</title>
</svelte:head>

<div class="solutions">
  <div class="solutions__bg"></div>
  
  <div class="container solutions__container">
    <!-- Header -->
    <div class="solutions__header">
      <a href="/" class="solutions__back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </a>
      <h1 class="solutions__title">Find Your Solution</h1>
      <p class="solutions__subtitle">Answer a few questions to get a personalized recommendation.</p>
    </div>

    <!-- Progress -->
    {#if currentStep <= 4}
      <div class="progress">
        <div class="progress__bar">
          <div class="progress__bar-fill" style="width: {((currentStep - 1) / (totalSteps - 1)) * 100}%"></div>
        </div>
        <div class="progress__steps">
          {#each Array(totalSteps) as _, i}
            <div class="progress__step" class:progress__step--active={i + 1 === currentStep} class:progress__step--complete={i + 1 < currentStep}>
              <div class="progress__step-circle">
                {#if i + 1 < currentStep}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                {:else}
                  {i + 1}
                {/if}
              </div>
              <span class="progress__step-label">
                {#if i === 0}Service{:else if i === 1}Property{:else if i === 2}Investment{:else}Review{/if}
              </span>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Survey Content -->
    <div class="survey" bind:this={surveyContainer}>
      
      {#if currentStep === 1}
        <div class="survey__step">
          <h2 class="survey__step-title">What do you need help with?</h2>
          <p class="survey__step-desc">Select one or more service areas that match your needs.</p>
          
          <div class="options-grid">
            {#each serviceTypeOptions as option}
              <button 
                class="option-card" 
                class:option-card--selected={answers.serviceType.includes(option.id)}
                onclick={() => toggleServiceType(option.id)}
                type="button"
              >
                <div class="option-card__check">
                  {#if answers.serviceType.includes(option.id)}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  {/if}
                </div>
                <div class="option-card__content">
                  <span class="option-card__label">{option.label}</span>
                  {#if option.description}
                    <span class="option-card__desc">{option.description}</span>
                  {/if}
                </div>
              </button>
            {/each}
          </div>
        </div>

      {:else if currentStep === 2}
        <div class="survey__step">
          <h2 class="survey__step-title">Tell us about your property</h2>
          <p class="survey__step-desc">This helps us understand the scope of your project.</p>
          
          <div class="form-sections">
            <div class="form-section">
              <span class="form-section__label">Property Type</span>
              <div class="options-grid options-grid--3">
                {#each propertyTypeOptions as option}
                  <button 
                    class="option-card option-card--compact" 
                    class:option-card--selected={answers.propertyType === option.id}
                    onclick={() => selectOption('propertyType', option.id)}
                    type="button"
                  >
                    <div class="option-card__check">
                      {#if answers.propertyType === option.id}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      {/if}
                    </div>
                    <span class="option-card__label">{option.label}</span>
                  </button>
                {/each}
              </div>
            </div>

            <div class="form-section">
              <span class="form-section__label">Property Size</span>
              <div class="options-grid options-grid--4">
                {#each propertySizeOptions as option}
                  <button 
                    class="option-card option-card--compact" 
                    class:option-card--selected={answers.propertySize === option.id}
                    onclick={() => selectOption('propertySize', option.id)}
                    type="button"
                  >
                    <div class="option-card__check">
                      {#if answers.propertySize === option.id}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      {/if}
                    </div>
                    <span class="option-card__label">{option.label}</span>
                    <span class="option-card__desc">{option.description}</span>
                  </button>
                {/each}
              </div>
            </div>

            <div class="form-section">
              <span class="form-section__label">Current Status</span>
              <div class="options-grid options-grid--4">
                {#each currentStatusOptions as option}
                  <button 
                    class="option-card option-card--compact" 
                    class:option-card--selected={answers.currentStatus === option.id}
                    onclick={() => selectOption('currentStatus', option.id)}
                    type="button"
                  >
                    <div class="option-card__check">
                      {#if answers.currentStatus === option.id}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      {/if}
                    </div>
                    <span class="option-card__label">{option.label}</span>
                    <span class="option-card__desc">{option.description}</span>
                  </button>
                {/each}
              </div>
            </div>
          </div>
        </div>

      {:else if currentStep === 3}
        <div class="survey__step">
          <h2 class="survey__step-title">What's your investment and timeline?</h2>
          <p class="survey__step-desc">This helps us recommend the right service package for you.</p>
          
          <div class="form-sections">
            <div class="form-section">
              <span class="form-section__label">Budget Range</span>
              <div class="options-grid options-grid--4">
                {#each budgetRangeOptions as option}
                  <button 
                    class="option-card option-card--compact" 
                    class:option-card--selected={answers.budgetRange === option.id}
                    onclick={() => selectOption('budgetRange', option.id)}
                    type="button"
                  >
                    <div class="option-card__check">
                      {#if answers.budgetRange === option.id}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      {/if}
                    </div>
                    <span class="option-card__label">{option.label}</span>
                    <span class="option-card__desc">{option.description}</span>
                  </button>
                {/each}
              </div>
            </div>

            <div class="form-section">
              <span class="form-section__label">Timeline</span>
              <div class="options-grid options-grid--4">
                {#each timelineOptions as option}
                  <button 
                    class="option-card option-card--compact" 
                    class:option-card--selected={answers.timeline === option.id}
                    onclick={() => selectOption('timeline', option.id)}
                    type="button"
                  >
                    <div class="option-card__check">
                      {#if answers.timeline === option.id}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      {/if}
                    </div>
                    <span class="option-card__label">{option.label}</span>
                    <span class="option-card__desc">{option.description}</span>
                  </button>
                {/each}
              </div>
            </div>
          </div>
        </div>

      {:else if currentStep === 4}
        <div class="survey__step survey__step--review">
          <h2 class="survey__step-title">Review your selections</h2>
          <p class="survey__step-desc">Confirm your choices to get your personalized solution.</p>
          
          <div class="review-card">
            <div class="review-card__item">
              <span class="review-card__label">Service Type</span>
              <span class="review-card__value">{answers.serviceType.map(s => serviceTypeOptions.find(o => o.id === s)?.label).filter(Boolean).join(', ')}</span>
            </div>
            <div class="review-card__item">
              <span class="review-card__label">Property Type</span>
              <span class="review-card__value">{propertyTypeOptions.find(o => o.id === answers.propertyType)?.label}</span>
            </div>
            <div class="review-card__item">
              <span class="review-card__label">Property Size</span>
              <span class="review-card__value">{propertySizeOptions.find(o => o.id === answers.propertySize)?.label}</span>
            </div>
            <div class="review-card__item">
              <span class="review-card__label">Current Status</span>
              <span class="review-card__value">{currentStatusOptions.find(o => o.id === answers.currentStatus)?.label}</span>
            </div>
            <div class="review-card__item">
              <span class="review-card__label">Budget Range</span>
              <span class="review-card__value">{budgetRangeOptions.find(o => o.id === answers.budgetRange)?.label}</span>
            </div>
            <div class="review-card__item">
              <span class="review-card__label">Timeline</span>
              <span class="review-card__value">{timelineOptions.find(o => o.id === answers.timeline)?.label}</span>
            </div>
          </div>
        </div>

      {:else if currentStep === 5 && recommendation}
        <div class="results">
          <div class="results__icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          
          <h2 class="results__title">Your Tailored Solution</h2>
          <p class="results__subtitle">Based on your needs, here's what we recommend for your project.</p>

          <div class="results__packages">
            <div class="package-card package-card--primary">
              <span class="package-card__badge">Recommended</span>
              <h3 class="package-card__title">Recommended Services</h3>
              <ul class="package-card__list">
                {#each recommendation.recommended as item}
                  <li>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </li>
                {/each}
              </ul>
            </div>

            <div class="package-card">
              <h3 class="package-card__title">Estimated Investment</h3>
              <p class="package-card__investment">{recommendation.estimatedInvestment}</p>
              <p class="package-card__note">Final pricing depends on detailed requirements. Contact us for a custom quote.</p>
            </div>
          </div>

          <div class="results__cta">
            <a href="/contact" class="btn btn--primary btn--lg">
              Schedule a Consultation
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <button class="btn btn--outline" onclick={resetSurvey} type="button">
              Start Over
            </button>
          </div>
        </div>
      {/if}
    </div>

    <!-- Navigation -->
    {#if currentStep < 5}
      <div class="survey__nav">
        {#if currentStep > 1}
          <button class="btn btn--outline" onclick={prevStep} type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
        {:else}
          <div></div>
        {/if}
        {#if currentStep < totalSteps}
          <button 
            class="btn btn--primary" 
            onclick={nextStep} 
            disabled={!isStepComplete(currentStep)}
            type="button"
          >
            Continue
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        {:else}
          <button class="btn btn--primary btn--lg" onclick={submitSurvey} type="button">
            Get My Solution
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .solutions {
    position: relative;
    min-height: 100vh;
    padding: 120px 0 var(--space-3xl);
    background-color: var(--cream);
  }

  .solutions__bg {
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF5C00' fill-opacity='0.04'%3E%3Ccircle cx='20' cy='20' r='8' fill='none' stroke='%23FF5C00' stroke-opacity='0.1'/%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E");
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  .solutions__container {
    position: relative;
    z-index: 1;
    max-width: 800px;
  }

  .solutions__header {
    text-align: center;
    margin-bottom: var(--space-3xl);
  }

  .solutions__back {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    color: var(--gray-500);
    font-size: 14px;
    margin-bottom: var(--space-lg);
    transition: color var(--duration-fast) ease;
  }

  .solutions__back:hover {
    color: var(--orange);
  }

  .solutions__title {
    font-size: clamp(32px, 5vw, 48px);
    margin-bottom: var(--space-sm);
  }

  .solutions__subtitle {
    color: var(--gray-500);
    font-size: 16px;
  }

  /* Progress */
  .progress {
    margin-bottom: var(--space-2xl);
  }

  .progress__bar {
    height: 4px;
    background: var(--gray-200);
    margin-bottom: var(--space-lg);
    overflow: hidden;
  }

  .progress__bar-fill {
    height: 100%;
    background: var(--orange);
    transition: width var(--duration-normal) var(--ease-out-expo);
  }

  .progress__steps {
    display: flex;
    justify-content: space-between;
  }

  .progress__step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    opacity: 0.4;
    transition: opacity var(--duration-normal) ease;
  }

  .progress__step--active,
  .progress__step--complete {
    opacity: 1;
  }

  .progress__step-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: var(--gray-200);
    border-radius: 50%;
    font-size: 14px;
    font-weight: 600;
    color: var(--gray-500);
    transition: all var(--duration-normal) ease;
  }

  .progress__step--active .progress__step-circle {
    background: var(--orange);
    color: var(--white);
    transform: scale(1.1);
  }

  .progress__step--complete .progress__step-circle {
    background: var(--navy);
    color: var(--white);
  }

  .progress__step-label {
    font-size: 12px;
    color: var(--gray-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .progress__step--active .progress__step-label {
    color: var(--navy);
    font-weight: 600;
  }

  /* Survey Card */
  .survey {
    background: var(--white);
    padding: var(--space-2xl);
  }

  .survey__step-title {
    font-size: 28px;
    text-align: center;
    margin-bottom: var(--space-sm);
  }

  .survey__step-desc {
    text-align: center;
    color: var(--gray-500);
    margin-bottom: var(--space-2xl);
  }

  .survey__step--review .survey__step-title {
    margin-bottom: var(--space-xl);
  }

  /* Options Grid */
  .options-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
  }

  .options-grid--3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .options-grid--4 {
    grid-template-columns: repeat(4, 1fr);
  }

  /* Option Cards */
  .option-card {
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    padding: var(--space-lg);
    background: var(--white);
    border: 2px solid var(--gray-200);
    text-align: left;
    cursor: pointer;
    transition: all var(--duration-normal) var(--ease-out-expo);
  }

  .option-card:hover {
    border-color: var(--gray-400);
  }

  .option-card--selected {
    border-color: var(--orange);
    background: rgba(255, 92, 0, 0.03);
  }

  .option-card--compact {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: var(--space-lg) var(--space-md);
    gap: var(--space-sm);
  }

  .option-card__check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: var(--gray-100);
    border-radius: 50%;
    flex-shrink: 0;
    transition: all var(--duration-fast) ease;
  }

  .option-card--selected .option-card__check {
    background: var(--orange);
    color: var(--white);
  }

  .option-card__label {
    font-weight: 600;
    color: var(--navy);
    font-size: 15px;
  }

  .option-card__desc {
    display: block;
    font-size: 12px;
    color: var(--gray-500);
    margin-top: var(--space-xs);
  }

  /* Form Sections */
  .form-sections {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xl);
  }

  .form-section {
    padding-bottom: var(--space-2xl);
    border-bottom: 1px solid var(--gray-200);
  }

  .form-section:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .form-section__label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: var(--navy);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--space-lg);
  }

  /* Review Card */
  .review-card {
    background: var(--cream);
    padding: var(--space-xl);
    max-width: 500px;
    margin: 0 auto;
  }

  .review-card__item {
    display: flex;
    justify-content: space-between;
    padding: var(--space-md) 0;
    border-bottom: 1px solid var(--gray-200);
  }

  .review-card__item:last-child {
    border-bottom: none;
  }

  .review-card__label {
    color: var(--gray-500);
    font-size: 14px;
  }

  .review-card__value {
    font-weight: 600;
    color: var(--navy);
    font-size: 14px;
    text-align: right;
  }

  /* Results */
  .results {
    text-align: center;
    padding: var(--space-xl) 0;
  }

  .results__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: rgba(255, 92, 0, 0.1);
    border-radius: 50%;
    color: var(--orange);
    margin-bottom: var(--space-xl);
  }

  .results__title {
    font-size: 32px;
    margin-bottom: var(--space-sm);
  }

  .results__subtitle {
    color: var(--gray-500);
    margin-bottom: var(--space-2xl);
  }

  .results__packages {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--space-lg);
    margin-bottom: var(--space-2xl);
    text-align: left;
  }

  .package-card {
    background: var(--cream);
    padding: var(--space-xl);
    position: relative;
  }

  .package-card--primary {
    background: var(--white);
    border: 2px solid var(--orange);
  }

  .package-card__badge {
    position: absolute;
    top: -12px;
    left: var(--space-lg);
    padding: var(--space-xs) var(--space-md);
    background: var(--orange);
    color: var(--white);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .package-card__title {
    font-size: 18px;
    margin-bottom: var(--space-lg);
  }

  .package-card__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .package-card__list li {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: 15px;
    color: var(--gray-700);
  }

  .package-card__list li svg {
    color: var(--orange);
    flex-shrink: 0;
  }

  .package-card__investment {
    font-family: var(--font-display);
    font-size: 36px;
    font-weight: 700;
    color: var(--orange);
    margin-bottom: var(--space-sm);
  }

  .package-card__note {
    font-size: 13px;
    color: var(--gray-500);
  }

  .results__cta {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
  }

  /* Navigation */
  .survey__nav {
    display: flex;
    justify-content: space-between;
    margin-top: var(--space-xl);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .options-grid,
    .options-grid--3 {
      grid-template-columns: 1fr;
    }

    .options-grid--4 {
      grid-template-columns: repeat(2, 1fr);
    }

    .results__packages {
      grid-template-columns: 1fr;
    }

    .results__cta {
      flex-direction: column;
    }
  }

  @media (max-width: 480px) {
    .options-grid--4 {
      grid-template-columns: 1fr;
    }
  }
</style>