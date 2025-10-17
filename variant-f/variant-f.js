console.log('Ramp Conversion Variant: Sticky CTA with Social Proof');

// Create floating CTA bar for Ramp
function createFloatingCTA() {
  const floatingBar = (
    <div 
      id="cf-floating-cta" 
      className="cf:bg-black cf:text-white cf:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] cf:transition-all cf:duration-300"
      style={{position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999, opacity: 0, transform: 'translateY(100%)'}}
    >
      <div className="cf:max-w-[1200px] cf:mx-auto cf:px-4 cf:py-4 cf:flex cf:flex-col cf:gap-3 cf:md:flex-row cf:md:items-center cf:md:justify-between cf:relative">
        {/* Close button - Elegant and natural */}
        <button
          id="cf-close-floating-cta"
          className="cf:absolute cf:top-1 cf:right-1 cf:md:top-2 cf:md:left-2 cf:md:right-auto cf:w-8 cf:h-8 cf:flex cf:items-center cf:justify-center cf:transition-all cf:duration-200 cf:cursor-pointer cf:text-gray-400 cf:hover:text-white cf:bg-white/10 cf:hover:bg-white/20 cf:rounded-full cf:z-10"
          aria-label="Close banner"
          title="Dismiss"
          onClick={() => {
            const bar = document.getElementById('cf-floating-cta');
            if (bar) {
              bar.style.transform = 'translateY(100%)';
              bar.style.opacity = '0';
              sessionStorage.setItem('cf-floating-cta-dismissed', 'true');
            }
          }}
        >
          <span className="cf:text-[24px] cf:leading-none cf:font-light">×</span>
        </button>

        <div className="cf:flex cf:flex-col cf:gap-1 cf:md:pl-10">
          <div className="cf:text-[18px] cf:font-bold">
            Join 45,000+ companies saving time and money with Ramp
          </div>
          <div className="cf:text-[14px] cf:text-white/80 cf:flex cf:items-center cf:gap-2">
            <span className="cf:inline-block cf:w-2 cf:h-2 cf:bg-[#f6fab2] cf:rounded-full cf:animate-pulse"></span>
            <span id="cf-social-proof">127 finance teams viewing this page</span>
          </div>
        </div>
        <div className="cf:flex cf:items-center cf:gap-3">
          <div className="cf:text-right cf:hidden cf:md:block">
            <div className="cf:text-[12px] cf:text-white/70">Free to get started • No credit card required</div>
          </div>
          <a 
            href="#hero-section"
            className="cf:bg-[#f6fab2] cf:text-black cf:px-6 cf:py-3 cf:rounded-md cf:font-bold cf:text-[16px] cf:whitespace-nowrap cf:transition-all cf:duration-200 cf:hover:bg-[#f4f89a] cf:hover:scale-105 cf:shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
              emailInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setTimeout(() => emailInput?.focus(), 500);
            }}
          >
            Get Started Free
          </a>
        </div>
      </div>
    </div>
  );
  
  document.body.appendChild(floatingBar as any as HTMLElement);
  return floatingBar;
}

// Create social proof notifications
function createSocialProofNotification() {
  const notification = (
    <div 
      id="cf-social-notification"
      className="cf:fixed cf:bottom-[120px] cf:left-4 cf:bg-white cf:rounded-lg cf:shadow-[0_4px_20px_rgba(0,0,0,0.15)] cf:p-4 cf:max-w-[340px] cf:z-[9998] cf:translate-x-[-400px] cf:transition-all cf:duration-500"
    >
      <div className="cf:flex cf:items-start cf:gap-3">
        <div className="cf:w-10 cf:h-10 cf:bg-[#f6fab2] cf:rounded-full cf:flex cf:items-center cf:justify-center cf:flex-shrink-0">
          <span className="cf:text-[20px]">🚀</span>
        </div>
        <div className="cf:flex-1">
          <div className="cf:font-bold cf:text-[14px] cf:text-black cf:mb-1">
            <span id="cf-notification-company">TechFlow Inc.</span>
          </div>
          <div className="cf:text-[13px] cf:text-gray-600">
            Just started their free trial
          </div>
          <div className="cf:text-[12px] cf:text-gray-500 cf:mt-1">
            <span id="cf-notification-time">2 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  document.body.appendChild(notification as any as HTMLElement);
  return notification;
}

// Social proof data
const companies = ['TechFlow Inc.', 'Innovate Labs', 'Summit Ventures', 'Nexus Media', 'Catalyst Group', 'Velocity Partners', 'Frontier Digital', 'Apex Solutions'];
const viewingCounts = [98, 112, 127, 143, 156, 134, 121, 108];

function updateSocialProof() {
  const count = viewingCounts[Math.floor(Math.random() * viewingCounts.length)];
  const socialProofEl = document.getElementById('cf-social-proof');
  if (socialProofEl) {
    socialProofEl.textContent = `${count} finance teams viewing this page`;
  }
}

function showSocialNotification() {
  const notification = document.getElementById('cf-social-notification');
  const companyEl = document.getElementById('cf-notification-company');
  const timeEl = document.getElementById('cf-notification-time');
  
  if (!notification || !companyEl || !timeEl) return;
  
  // Update notification content
  companyEl.textContent = companies[Math.floor(Math.random() * companies.length)];
  const minutes = Math.floor(Math.random() * 10) + 1;
  timeEl.textContent = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  
  // Show notification
  notification.style.transform = 'translateX(0)';
  
  // Hide after 6 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(-400px)';
  }, 6000);
}

// Initialize
function init() {
  // Check if user dismissed the banner in this session
  const isDismissed = sessionStorage.getItem('cf-floating-cta-dismissed');
  if (isDismissed) {
    console.log('Floating CTA previously dismissed in this session');
    // Still create notification but skip the floating bar
    createSocialProofNotification();
    
    // Update social proof count
    setInterval(updateSocialProof, 10000);
    
    // Show social proof notification
    setTimeout(() => {
      showSocialNotification();
      setInterval(showSocialNotification, 20000);
    }, 5000);
    
    window.CFQ = window.CFQ || [];
    window.CFQ.push({ emit: 'variantRendered' });
    return;
  }

  createFloatingCTA();
  createSocialProofNotification();
  
  // Get the actual DOM elements
  const floatingBar = document.getElementById('cf-floating-cta') as HTMLElement;
  
  // Show/hide floating bar on scroll
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const isDismissed = sessionStorage.getItem('cf-floating-cta-dismissed');
    
    if (isDismissed || !floatingBar) return;
    
    if (currentScroll > 400) {
      floatingBar.style.transform = 'translateY(0)';
      floatingBar.style.opacity = '1';
    } else {
      floatingBar.style.transform = 'translateY(100%)';
      floatingBar.style.opacity = '0';
    }
  });
  
  // Force show if already scrolled
  if (floatingBar && window.pageYOffset > 400) {
    floatingBar.style.transform = 'translateY(0)';
    floatingBar.style.opacity = '1';
  }
  
  // Update social proof count every 10 seconds
  updateSocialProof();
  setInterval(updateSocialProof, 10000);
  
  // Show social proof notification every 20 seconds
  setTimeout(() => {
    showSocialNotification();
    setInterval(showSocialNotification, 20000);
  }, 5000);
  
  console.log('Ramp floating CTA and social proof initialized');
  
  // Emit variant rendered
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
}

// Wait for page to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}