console.log('Adding How It Works section to Ramp homepage');

// Find the hero section to insert our new section after it
const heroSection = document.querySelector('#hero-section');

if (heroSection && heroSection.parentElement) {
  // Create the How It Works section
  const howItWorksSection = (
    <section className="bg-white spacer-p-t-l spacer-p-b-l">
      <div className="mx-auto w-full max-w-screen-2xl px-4 cf:md:px-8 cf:lg:px-12 cf:xl:px-16">
        {/* Header */}
        <div className="cf:text-center cf:flex cf:flex-col cf:gap-6 cf:mb-16">
          <div className="leading-trim body-s text-hushed cf:uppercase">
            How it works
          </div>
          <h2 className="leading-trim headline-l text-primary cf:max-w-[640px] cf:mx-auto">
            Get started in minutes
          </h2>
          <p className="leading-trim body-m text-hushed cf:max-w-[540px] cf:mx-auto cf:text-balance">
            Join thousands of companies saving time and money with Ramp's all-in-one finance platform
          </p>
        </div>

        {/* Steps */}
        <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-8 cf:lg:gap-12 cf:mt-12 cf:md:mt-16">
          {/* Step 1 */}
          <div className="h-full rounded-xl border border-primary bg-white px-4 py-6 cf:md:px-6 cf:md:py-8">
            <div className="leading-trim body-s text-hushed cf:mb-4 cf:uppercase">
              Step 1
            </div>
            <h3 className="leading-trim body-l text-primary cf:mb-4">
              Sign up for free
            </h3>
            <p className="leading-trim body-m text-hushed cf:text-balance">
              Create your account in minutes. No credit check required. Start issuing cards instantly.
            </p>
          </div>

          {/* Step 2 */}
          <div className="h-full rounded-xl border border-primary bg-white px-4 py-6 cf:md:px-6 cf:md:py-8">
            <div className="leading-trim body-s text-hushed cf:mb-4 cf:uppercase">
              Step 2
            </div>
            <h3 className="leading-trim body-l text-primary cf:mb-4">
              Connect your systems
            </h3>
            <p className="leading-trim body-m text-hushed cf:text-balance">
              Sync with your accounting software, HRIS, and existing tools in just a few clicks.
            </p>
          </div>

          {/* Step 3 */}
          <div className="h-full rounded-xl border border-primary bg-white px-4 py-6 cf:md:px-6 cf:md:py-8">
            <div className="leading-trim body-s text-hushed cf:mb-4 cf:uppercase">
              Step 3
            </div>
            <h3 className="leading-trim body-l text-primary cf:mb-4">
              Start saving
            </h3>
            <p className="leading-trim body-m text-hushed cf:text-balance">
              Automate expense management, control spend, and close your books faster than ever.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="cf:text-center cf:mt-12 cf:md:mt-16">
          <a 
            href="/see-a-demo" 
            className="relative inline-flex justify-center items-center text-center rounded-md transition ease-in-out duration-300 cf:disabled:cursor-not-allowed text-nowrap bg-solar cf:hover:bg-solarLight text-primary px-5 py-5 body-m leading-[.675rem]"
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  );

  // Insert the section after the hero
  heroSection.parentElement.insertBefore(howItWorksSection as unknown as HTMLElement, heroSection.nextElementSibling);

  console.log('How It Works section added successfully');
  
  // Emit variantRendered event
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
} else {
  console.error('Hero section not found');
}