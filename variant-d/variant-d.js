// Make this a module (required for global augmentations)
export {};

// Type declarations for custom window properties
declare global {
  interface Window {
    CF?: {
      qaTesting: boolean;
      testsRunning: Array<{ name: string }>;
    };
    CFQ?: Array<{ emit?: string; [key: string]: unknown }>;
  }
}

(function() {
  let testInfo = {
    name: `CF XX - [Hero]: Replace Background with Modern Gradient`,
  };

  let testInitiated = initTest(testInfo);
  if (!testInitiated) return false;

  addStyling();
  monitorChangesByConditionAndRun(checkForElements, onElementsFound);

  function onElementsFound() {
    console.log(`Running Code for: `, testInfo.name, testInfo);
    document
      .querySelector(`body`)
      ?.setAttribute(`cf-test-active`, testInfo.name);

    let appliedCount = 0;
    
    // Desktop/Tablet: Apply background-image to box elements
    const heroBoxes = [
      '#lp-pom-box-14',   // Tablet/intermediate layout
      '#lp-pom-box-417'   // Desktop layout
    ];
    
    heroBoxes.forEach(selector => {
      const heroBox = document.querySelector(selector);
      if (heroBox) {
        console.log(`Found hero box ${selector}`, heroBox);
        
        const bgImage = 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80)';
        (heroBox as HTMLElement).style.setProperty('background-image', bgImage, 'important');
        (heroBox as HTMLElement).style.setProperty('background-size', 'cover', 'important');
        (heroBox as HTMLElement).style.setProperty('background-position', 'center', 'important');
        (heroBox as HTMLElement).style.setProperty('background-repeat', 'no-repeat', 'important');
        appliedCount++;
      }
    });
    
    // Mobile: Replace the actual img element src
    const mobileImageContainer = document.querySelector('#lp-pom-image-120');
    if (mobileImageContainer) {
      const img = mobileImageContainer.querySelector('img');
      if (img) {
        console.log('Found mobile hero image #lp-pom-image-120 img', img);
        
        const newSrc1x = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80';
        const newSrc2x = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80';
        const newSrc3x = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=2400&q=80';
        
        // Update src and srcset
        img.src = newSrc1x;
        img.srcset = `${newSrc1x} 1x, ${newSrc2x} 2x, ${newSrc3x} 3x`;
        
        // Override the data attributes that the page uses for responsive images
        img.setAttribute('data-src-mobile-1x', newSrc1x);
        img.setAttribute('data-src-mobile-2x', newSrc2x);
        img.setAttribute('data-src-mobile-3x', newSrc3x);
        
        // Watch for changes and re-apply if the page tries to reset
        const imgObserver = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {
              if (mutation.attributeName === 'src' || mutation.attributeName === 'srcset') {
                const currentSrc = img.getAttribute('src');
                if (currentSrc && !currentSrc.includes('unsplash')) {
                  console.log('Mobile image src was changed, re-applying variant image');
                  img.src = newSrc1x;
                  img.srcset = `${newSrc1x} 1x, ${newSrc2x} 2x, ${newSrc3x} 3x`;
                }
              }
            }
          });
        });
        
        imgObserver.observe(img, {
          attributes: true,
          attributeFilter: ['src', 'srcset']
        });
        
        appliedCount++;
      }
    }
    
    console.log(`Successfully applied modern gradient background to ${appliedCount} hero elements`);
    
    if (appliedCount > 0) {
      window.CFQ = window.CFQ || [];
      window.CFQ.push({ emit: 'variantRendered' });
    } else {
      console.error('No hero elements found');
    }
  }

  function checkForElements() {
    try {
      const cfDefined = typeof window.CF !== "undefined";
      console.log("Check: typeof window.CF !== 'undefined' =>", cfDefined);

      const testActiveSelector = `body[cf-test-active="${testInfo.name}"]`;
      const testActiveElem = document.querySelector(testActiveSelector);
      const testActiveAbsent = !testActiveElem;
      console.log(`Check: !document.querySelector('${testActiveSelector}') =>`, testActiveAbsent);

      // Check if at least one hero element exists
      const heroElements = [
        document.querySelector('#lp-pom-box-14'),
        document.querySelector('#lp-pom-box-417'),
        document.querySelector('#lp-pom-image-120')
      ];
      const anyHeroExists = heroElements.some(elem => elem !== null);
      console.log('Check: at least one hero element exists =>', anyHeroExists);

      return cfDefined && testActiveAbsent && anyHeroExists;
    } catch (e) {
      console.error("Check error:", e);
      return false;
    }
  }

  function addStyling() {
    let cssArray = [
      {
        desc: `Hero background override styles`,
        css: `
          /* Desktop and Tablet hero boxes */
          #lp-pom-box-14,
          #lp-pom-box-417 {
            background-image: url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80) !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
          }
          
          /* Mobile hero image */
          #lp-pom-image-120 img {
            object-fit: cover !important;
            width: 100% !important;
            height: 100% !important;
          }
          
          @media (max-width: 600px) {
            #lp-pom-box-14,
            #lp-pom-box-417 {
              background-image: url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80) !important;
              background-size: cover !important;
              background-position: center !important;
              background-repeat: no-repeat !important;
            }
            
            #lp-pom-image-120 img {
              object-fit: cover !important;
              width: 100% !important;
              height: 100% !important;
            }
          }
          
          @media (max-width: 480px) {
            #lp-pom-box-14,
            #lp-pom-box-417 {
              background-image: url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80) !important;
              background-size: cover !important;
              background-position: center !important;
              background-repeat: no-repeat !important;
            }
            
            #lp-pom-image-120 img {
              object-fit: cover !important;
              width: 100% !important;
              height: 100% !important;
            }
          }
          
          @media (max-width: 420px) {
            #lp-pom-box-14,
            #lp-pom-box-417 {
              background-image: url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80) !important;
              background-size: cover !important;
              background-position: center !important;
              background-repeat: no-repeat !important;
            }
            
            #lp-pom-image-120 img {
              object-fit: cover !important;
              width: 100% !important;
              height: 100% !important;
            }
          }
          
          @media (max-width: 380px) {
            #lp-pom-box-14,
            #lp-pom-box-417 {
              background-image: url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80) !important;
              background-size: cover !important;
              background-position: center !important;
              background-repeat: no-repeat !important;
            }
            
            #lp-pom-image-120 img {
              object-fit: cover !important;
              width: 100% !important;
              height: 100% !important;
            }
          }
        `,
      },
    ];

    cssArray.forEach(({ desc, css }) => {
      let newStyleElem = document.createElement(`style`);
      newStyleElem.dataset.desc = desc;
      newStyleElem.innerHTML = css;
      document.head.insertAdjacentElement(`beforeend`, newStyleElem);
    });
  }

  function monitorChangesByConditionAndRun(check, code, keepChecking = false) {
    let checkAndRun = () =>
      check() && (!keepChecking && observer.disconnect(), code());
    var observer = new MutationObserver(checkAndRun);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
    checkAndRun();

    if (!keepChecking) setTimeout(() => observer.disconnect(), 10000);
  }

  function initTest(testInfo: { name: string }) {
    let cfObj = window.CF || { qaTesting: false, testsRunning: [] };

    if (cfObj.testsRunning.find((test) => test.name == testInfo.name)) {
      console.warn(`The following test is already running: `, testInfo);
      return false;
    }

    cfObj.testsRunning = [...cfObj.testsRunning, testInfo];

    window.CF = { ...window.CF, ...cfObj };

    return { ...window.CF };
  }
})();