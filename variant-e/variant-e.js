console.log('Adding benefits section to hero (desktop & mobile) with responsive viewport detection...');

// Icon components for benefits list
function BrainIcon() {
  const svgData = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z" fill="%23000000"/></svg>`);
  return (
    <div style={{ 
      width: '20px', 
      height: '20px', 
      flexShrink: 0,
      backgroundImage: `url("data:image/svg+xml,${svgData}")`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}></div>
  );
}

function MoonIcon() {
  const svgData = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.75 4.09L15.22 6.03L16.13 9.09L13.5 7.28L10.87 9.09L11.78 6.03L9.25 4.09L12.44 4L13.5 1L14.56 4L17.75 4.09M21.25 11L19.61 12.25L20.2 14.23L18.5 13.06L16.8 14.23L17.39 12.25L15.75 11L17.81 10.95L18.5 9L19.19 10.95L21.25 11M18.97 15.95C19.8 15.87 20.69 17.05 20.16 17.8C19.84 18.25 19.5 18.67 19.08 19.07C15.17 23 8.84 23 4.94 19.07C1.03 15.17 1.03 8.83 4.94 4.93C5.34 4.53 5.76 4.17 6.21 3.85C6.96 3.32 8.14 4.21 8.06 5.04C7.79 7.9 8.75 10.87 10.95 13.06C13.14 15.26 16.1 16.22 18.97 15.95Z" fill="%23000000"/></svg>`);
  return (
    <div style={{ 
      width: '20px', 
      height: '20px', 
      flexShrink: 0,
      backgroundImage: `url("data:image/svg+xml,${svgData}")`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}></div>
  );
}

function ShieldIcon() {
  const svgData = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="%23000000"/></svg>`);
  return (
    <div style={{ 
      width: '20px', 
      height: '20px', 
      flexShrink: 0,
      backgroundImage: `url("data:image/svg+xml,${svgData}")`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}></div>
  );
}

function BenefitItem({ text, icon }: { text: string; icon: JSX.Element }) {
  return (
    <li className="cf:flex cf:items-start cf:gap-2 cf:mb-1" style={{ listStyleType: 'none', display: 'flex', alignItems: 'flex-start' }}>
      {icon}
      <span className="cf:text-black cf:leading-normal" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', fontWeight: 400, wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', maxWidth: '100%', flex: 1, lineHeight: '1.5' }}>{text}</span>
    </li>
  );
}

interface OriginalState {
  top?: string;
  height?: string;
  marginTop?: string;
}

const originalStates = new Map<Element, OriginalState>();
let isInitialized = false;

function storeOriginal(element: Element, property: 'top' | 'height') {
  if (!originalStates.has(element)) {
    originalStates.set(element, {});
  }
  const state = originalStates.get(element)!;
  if (!state[property]) {
    // Store the INLINE style value, not computed - this preserves whether it was set or not
    const el = element as HTMLElement;
    state[property] = el.style[property] || '';
  }
}

function resetElement(element: Element) {
  const state = originalStates.get(element);
  if (!state) return;
  
  const el = element as HTMLElement;
  // If original value was empty string, remove the inline style entirely
  // Otherwise, restore the original inline value
  if (state.top !== undefined) {
    if (state.top === '') {
      el.style.removeProperty('top');
    } else {
      el.style.top = state.top;
    }
  }
  if (state.height !== undefined) {
    if (state.height === '') {
      el.style.removeProperty('height');
    } else {
      el.style.height = state.height;
    }
  }
  if (state.marginTop !== undefined) {
    if (state.marginTop === '') {
      el.style.removeProperty('margin-top');
    } else {
      el.style.marginTop = state.marginTop;
    }
  }
}

function cleanup() {
  console.log('Cleaning up previous variant state...');
  document.querySelectorAll('[data-cf-benefits]').forEach(el => el.remove());
  
  originalStates.forEach((state, element) => {
    resetElement(element);
  });
  
  // Clear the map so we start fresh on next processing
  originalStates.clear();
}

const heroVariants = [
  {
    name: 'desktop',
    box: '#lp-pom-box-415',
    headline: '#lp-pom-text-421',
    subheadline: '#lp-pom-text-422',
    cta: '#lp-pom-button-423',
    benefitsLeft: 637,
    benefitsWidth: 408,
    benefitsHeight: 95
  },
  {
    name: 'mobile',
    box: '#lp-pom-box-116',
    headline: '#lp-pom-text-117',
    subheadline: '#lp-pom-text-118',
    cta: '#lp-pom-button-115',
    benefitsLeft: 50,
    benefitsWidth: 240,
    benefitsHeight: 95
  }
];

function addBenefitsToVariant(variant: any) {
  const heroBox = document.querySelector(variant.box);
  const headline = document.querySelector(variant.headline);
  const subheadline = document.querySelector(variant.subheadline);
  const ctaButton = document.querySelector(variant.cta);
  
  if (!heroBox || !headline || !subheadline || !ctaButton) {
    console.log(`${variant.name} hero elements not found, skipping`);
    return false;
  }
  
  // Check if already added (idempotency)
  // @coframe-ignore-query: [data-cf-benefits]
  if (heroBox.querySelector('[data-cf-benefits]')) {
    console.log(`${variant.name} benefits already added`);
    return true;
  }
  
  const headlineTop = parseInt(window.getComputedStyle(headline).top) || 0;
  const headlineHeight = headline.getBoundingClientRect().height || 180;
  
  // On desktop, move headline up by 30px
  if (variant.name === 'desktop') {
    storeOriginal(headline, 'top');
    (headline as HTMLElement).style.position = 'absolute';
    (headline as HTMLElement).style.top = (headlineTop - 30) + 'px';
    console.log(`  Moved headline from ${headlineTop}px to ${headlineTop - 30}px`);
  }
  
  // Calculate benefits position based on (potentially moved) headline
  const adjustedHeadlineTop = variant.name === 'desktop' ? headlineTop - 30 : headlineTop;
  const benefitsTop = adjustedHeadlineTop + headlineHeight + 20;
  
  console.log(`${variant.name} calculated positions - headline: ${adjustedHeadlineTop}px, height: ${headlineHeight}px, benefits will be at: ${benefitsTop}px`);
  
  // Create benefits list
  const benefitsDiv = (
    <div 
      data-cf-benefits="" 
      className="lp-element lp-pom-text nlh cf-benefits-list"
      style={{ position: 'absolute', top: `${benefitsTop}px`, left: `${variant.benefitsLeft}px`, width: `${variant.benefitsWidth}px`, zIndex: 3 }}>
      <ul className="cf:m-0 cf:p-0 cf:text-[16px] cf:leading-[26px]" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        <BenefitItem text="Clinically proven 226-300% memory improvement" icon={<BrainIcon />} />
        <BenefitItem text="Works automatically while you sleep" icon={<MoonIcon />} />
        <BenefitItem text="No drugs or side effects" icon={<ShieldIcon />} />
      </ul>
    </div>
  );
  
  heroBox.insertBefore(benefitsDiv, subheadline);
  
  const offset = variant.benefitsHeight + 15;
  
  console.log(`${variant.name} benefits height: ${variant.benefitsHeight}px, offset: ${offset}px`);
  
  const subheadlineNewTop = benefitsTop + offset + 10 - (variant.name === 'desktop' ? 30 : 0) + (variant.name === 'mobile' ? 5 : 0);
  storeOriginal(subheadline, 'top');
  (subheadline as HTMLElement).style.position = 'absolute';
  (subheadline as HTMLElement).style.top = subheadlineNewTop + 'px';
  console.log(`  Repositioned subheadline to ${subheadlineNewTop}px`);
  
  const subheadlineHeight = subheadline.getBoundingClientRect().height || 65;
  const ctaNewTop = subheadlineNewTop + subheadlineHeight + 10 + (variant.name === 'mobile' ? 2 : 0);
  storeOriginal(ctaButton, 'top');
  (ctaButton as HTMLElement).style.position = 'absolute';
  (ctaButton as HTMLElement).style.top = ctaNewTop + 'px';
  console.log(`  Repositioned CTA button to ${ctaNewTop}px`);

  const isMobileHero = variant.name === 'mobile';
  
  if (isMobileHero) {
    console.log(`  Mobile hero detected - shifting page content`);

    const currentHeight = parseInt(window.getComputedStyle(heroBox).height);
    if (!isNaN(currentHeight) && currentHeight > 0) {
      storeOriginal(heroBox, 'height');
      (heroBox as HTMLElement).style.height = (currentHeight + offset + 20) + 'px';
      console.log(`  Expanded hero box height to ${currentHeight + offset + 20}px`);
    }
    
    const positionedContent = heroBox.parentElement;
    if (positionedContent) {
      // CRITICAL: Use #lp-pom-image-120 position as threshold for shifting content on mobile
      const mobileImage = document.querySelector('#lp-pom-image-120');
      let shiftThreshold = parseInt(window.getComputedStyle(heroBox).top || '0') + currentHeight;
      
      if (mobileImage) {
        const imageTop = parseInt(window.getComputedStyle(mobileImage).top);
        if (!isNaN(imageTop)) {
          shiftThreshold = imageTop;
          console.log(`  Using mobile image position as threshold: ${shiftThreshold}px`);
        }
      } else {
        console.log(`  Mobile image not found, using hero bottom as threshold: ${shiftThreshold}px`);
      }
      
      Array.from(positionedContent.children).forEach((sibling: Element) => {
        if (sibling === heroBox || (sibling as HTMLElement).id?.includes('overlay')) {
          return;
        }
        
        let siblingTop = parseInt((sibling as HTMLElement).style.top);
        if (isNaN(siblingTop)) {
          const computed = window.getComputedStyle(sibling).top;
          siblingTop = parseInt(computed);
        }
        
        if (!isNaN(siblingTop) && siblingTop >= shiftThreshold) {
          storeOriginal(sibling, 'top');
          const newTop = siblingTop + offset;
          (sibling as HTMLElement).style.position = 'absolute';
          (sibling as HTMLElement).style.top = newTop + 'px';
          console.log(`  Shifted sibling ${(sibling as HTMLElement).id || (sibling as HTMLElement).className.substring(0,30)} from ${siblingTop}px to ${newTop}px`);
        }
      });
      
      const allBlocks = document.querySelectorAll('.lp-pom-block');
      allBlocks.forEach((block: Element) => {
        let blockTop = parseInt((block as HTMLElement).style.top);
        if (isNaN(blockTop)) {
          const computed = window.getComputedStyle(block).top;
          blockTop = parseInt(computed);
        }
        
        if (!isNaN(blockTop) && blockTop >= shiftThreshold) {
          storeOriginal(block, 'top');
          const newTop = blockTop + offset;
          (block as HTMLElement).style.position = 'absolute';
          (block as HTMLElement).style.top = newTop + 'px';
          console.log(`  Shifted block ${(block as HTMLElement).id} from ${blockTop}px to ${newTop}px`);
        }
      });
      
      const posContentHeight = parseInt(window.getComputedStyle(positionedContent).height || '0');
      if (posContentHeight > 0) {
        storeOriginal(positionedContent, 'height');
        (positionedContent as HTMLElement).style.height = (posContentHeight + offset) + 'px';
        console.log(`  Expanded positioned-content height to ${posContentHeight + offset}px`);
      }
      
      // CRITICAL: Add extra 20px to mobile image top position
      if (mobileImage) {
        const currentImageTop = parseInt((mobileImage as HTMLElement).style.top);
        if (!isNaN(currentImageTop)) {
          const newImageTop = currentImageTop + 20;
          (mobileImage as HTMLElement).style.top = newImageTop + 'px';
          console.log(`  Added extra 20px to mobile image, final position: ${newImageTop}px`);
        }
      }
    }
  } else {
    console.log(`  Desktop layout detected - no page content shifting needed`);
  }
  
  console.log(`${variant.name} benefits added successfully`);
  return true;
}

function processHeroes() {
  if (isInitialized) {
    cleanup();
  }
  
  const isMobileViewport = window.matchMedia('(max-width: 600px)').matches;
  console.log(`Processing for ${isMobileViewport ? 'mobile' : 'desktop'} viewport`);
  
  let successCount = 0;

  heroVariants.forEach(variant => {
    if (variant.name === 'desktop' && isMobileViewport) {
      console.log('Skipping desktop hero - mobile viewport detected');
      return;
    }
    
    if (variant.name === 'mobile' && !isMobileViewport) {
      console.log('Skipping mobile hero - desktop viewport detected');
      return;
    }
    
    if (addBenefitsToVariant(variant)) {
      successCount++;
    }
  });

  if (successCount > 0) {
    console.log(`Benefits added to ${successCount} hero variant(s)`);
    
    if (isMobileViewport) {
      const root = document.querySelector('#lp-pom-root');
      if (root) {
        const currentRootHeight = parseInt(window.getComputedStyle(root).height);
        if (!isNaN(currentRootHeight) && currentRootHeight > 0) {
          storeOriginal(root, 'height');
          const totalOffset = 110;
          const newRootHeight = currentRootHeight + totalOffset;
          (root as HTMLElement).style.height = newRootHeight + 'px';
          console.log(`  Expanded root container height from ${currentRootHeight}px to ${newRootHeight}px`);
        }
        
        // CRITICAL: Increase height of first visible .lp-pom-block to push all sections down
        const allBlocks = document.querySelectorAll('.lp-pom-block');
        let firstVisibleBlock: Element | null = null;
        
        for (let i = 0; i < allBlocks.length; i++) {
          const block = allBlocks[i];
          const styles = window.getComputedStyle(block);
          if (styles.display !== 'none' && styles.visibility !== 'hidden') {
            firstVisibleBlock = block;
            break;
          }
        }
        
        if (firstVisibleBlock) {
          if (!originalStates.has(firstVisibleBlock)) {
            originalStates.set(firstVisibleBlock, {});
          }
          const state = originalStates.get(firstVisibleBlock)!;
          if (!state['height' as keyof OriginalState]) {
            const el = firstVisibleBlock as HTMLElement;
            (state as any)['height'] = el.style.height || '';
          }
          
          (firstVisibleBlock as HTMLElement).style.height = '720px';
          console.log(`  Set height to 700px on first visible block ${(firstVisibleBlock as HTMLElement).id} to push all sections down`);
        }
      }
    } else {
      console.log('  Desktop layout - no root container expansion needed');
    }
    
    if (!isInitialized) {
      window.CFQ = window.CFQ || [];
      window.CFQ.push({ emit: 'variantRendered' });
      isInitialized = true;
    }
  } else {
    console.error('No hero elements found');
  }
}

function debounce(fn: Function, delay: number) {
  let timeoutId: any;
  return function(...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Use matchMedia change listener for instant response when crossing threshold
const mobileMediaQuery = window.matchMedia('(max-width: 600px)');

const handleViewportChange = (e: MediaQueryListEvent | MediaQueryList) => {
  const currentIsMobile = e.matches;
  const wasProcessedFor = (window as any).__cfLastViewport;
  
  if (wasProcessedFor !== currentIsMobile) {
    console.log(`Viewport threshold crossed: switching to ${currentIsMobile ? 'mobile' : 'desktop'} layout`);
    (window as any).__cfLastViewport = currentIsMobile;
    processHeroes();
  }
};

// Set initial state
(window as any).__cfLastViewport = mobileMediaQuery.matches;

// Add listener for instant response when crossing 600px threshold
if (mobileMediaQuery.addEventListener) {
  mobileMediaQuery.addEventListener('change', handleViewportChange);
} else {
  // Fallback for older browsers
  mobileMediaQuery.addListener(handleViewportChange);
}

processHeroes();