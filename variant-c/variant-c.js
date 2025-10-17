// Type declarations must be at the top level
declare global {
  interface Window {
    CF?: any;
    CFQ?: any[];
  }
}

// Wrap everything else in an IIFE
(() => {
  let testInfo = {
    name: `CF Stopwatch - Homepage: Stopwatch Comparison Old Way vs Ramp`,
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

    const heroSection = document.getElementById('hero-section');
    if (!heroSection) {
      console.error('Hero section not found');
      return;
    }

    const section = <StopwatchSection /> as unknown as Element;
    heroSection.insertAdjacentElement('afterend', section);

    console.log('Stopwatch section inserted successfully');

    window.CFQ = window.CFQ || [];
    window.CFQ.push({ emit: 'variantRendered' });
  }

  function checkForElements() {
    try {
      const cfDefined = typeof window.CF !== "undefined";
      console.log("Check: typeof window.CF !== 'undefined' =>", cfDefined);

      const testActiveSelector = `body[cf-test-active="${testInfo.name}"]`;
      const testActiveElem = document.querySelector(testActiveSelector);
      const testActiveAbsent = !testActiveElem;
      console.log(`Check: !document.querySelector('${testActiveSelector}') =>`, testActiveAbsent);

      const heroExists = !!document.getElementById('hero-section');
      console.log("Check: #hero-section exists =>", heroExists);

      return cfDefined && testActiveAbsent && heroExists;
    } catch (e) {
      console.error("Check error:", e);
      return false;
    }
  }

  function StopwatchSection() {
    const leftTimerRef = { current: null as any };
    const rightTimerRef = { current: null as any };
    const startButtonRef = { current: null as any };
    const resultLineRef = { current: null as any };
    const stepsContainerRef = { current: null as any };

    let animationRunning = false;
    let intervalId: any = null;

    function formatTime(seconds: number): string {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function startAnimation() {
      if (animationRunning) return;
      
      console.log('Starting stopwatch animation');
      animationRunning = true;
      
      if (startButtonRef.current) {
        startButtonRef.current.disabled = true;
        startButtonRef.current.textContent = 'Running…';
      }

      if (resultLineRef.current) {
        resultLineRef.current.style.opacity = '0';
      }

      // Re-hide Ramp "Done." label on re-run
      const rampDone = document.getElementById('cf-ramp-done-label');
      if (rampDone) rampDone.classList.add('cf:hidden');

      leftTimerRef.current.setText('0:00');
      rightTimerRef.current.setText('0:00');

      if (stepsContainerRef.current) {
        const steps = stepsContainerRef.current.querySelectorAll('[data-step]');
        steps.forEach((step: HTMLElement) => {
          step.classList.remove('cf:opacity-100', 'cf:opacity-40');
          step.classList.add('cf:opacity-40');
          const check = step.querySelector('[data-check]');
          if (check) check.classList.add('cf:hidden');
        });
        if (steps[0]) {
          steps[0].classList.remove('cf:opacity-40');
          steps[0].classList.add('cf:opacity-100');
        }
      }

      setTimeout(() => {
        rightTimerRef.current.setText('0:01');
        const doneLabel = document.getElementById('cf-ramp-done-label');
        if (doneLabel) doneLabel.classList.remove('cf:hidden');
      }, 400);

      const startTime = Date.now();
      const duration = 6000;
      const targetSeconds = 11 * 60 + 43;

      intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentSeconds = Math.floor(progress * targetSeconds);
        
        leftTimerRef.current.setText(formatTime(currentSeconds));

        if (stepsContainerRef.current) {
          const steps = stepsContainerRef.current.querySelectorAll('[data-step]');
          if (elapsed >= 2000 && steps[0]) {
            const check = steps[0].querySelector('[data-check]');
            if (check) check.classList.remove('cf:hidden');
            steps[0].classList.remove('cf:opacity-100');
            steps[0].classList.add('cf:opacity-40');
            if (steps[1]) {
              steps[1].classList.remove('cf:opacity-40');
              steps[1].classList.add('cf:opacity-100');
            }
          }
          if (elapsed >= 4000 && steps[1]) {
            const check = steps[1].querySelector('[data-check]');
            if (check) check.classList.remove('cf:hidden');
            steps[1].classList.remove('cf:opacity-100');
            steps[1].classList.add('cf:opacity-40');
            if (steps[2]) {
              steps[2].classList.remove('cf:opacity-40');
              steps[2].classList.add('cf:opacity-100');
            }
          }
          if (elapsed >= 6000 && steps[2]) {
            const check = steps[2].querySelector('[data-check]');
            if (check) check.classList.remove('cf:hidden');
          }
        }

        if (progress >= 1) {
          clearInterval(intervalId);
          leftTimerRef.current.setText('11:43');
          animationRunning = false;
          
          if (startButtonRef.current) {
            startButtonRef.current.disabled = false;
            startButtonRef.current.textContent = 'Start';
          }

          if (resultLineRef.current) {
            resultLineRef.current.style.opacity = '1';
          }

          console.log('Animation completed');
        }
      }, 66);
    }

    setTimeout(() => {
      if (startButtonRef.current) {
        startButtonRef.current.addEventListener('click', startAnimation);
      }
    });

    return (
      <section 
        id="cf-stopwatch-section" 
        className="cf:relative cf:z-10 cf:bg-white cf:px-4 cf:py-10 cf:md:py-16 cf:lg:py-20 cf:mb-12 cf:md:mb-16 cf:lg:mb-24"
      >
        <div className="cf:mx-auto cf:max-w-screen-2xl">
          <div className="cf:mb-8 cf:text-center cf:md:mb-12">
            <div className="cf:mb-3 cf:text-sm cf:uppercase cf:tracking-wide cf:text-[oklch(0.1465_0.0057_69.2)] cf:opacity-60">
              Time comparison
            </div>
            <h2 className="cf:text-3xl cf:font-medium cf:text-[oklch(0.1465_0.0057_69.2)] cf:md:text-4xl cf:lg:text-5xl">
              Stopwatch: Old Way vs Ramp
            </h2>
          </div>

          <div className="cf:grid cf:grid-cols-1 cf:gap-6 cf:md:grid-cols-2 cf:md:gap-8">
            <div className="cf:rounded-xl cf:border cf:border-[rgba(33,33,33,0.1)] cf:bg-white cf:p-6 cf:md:p-8">
              <div className="cf:mb-6">
                <h3 className="cf:mb-2 cf:text-xl cf:font-medium cf:text-[oklch(0.1465_0.0057_69.2)]">
                  Old way
                </h3>
                <p className="cf:text-sm cf:text-[oklch(0.1465_0.0057_69.2)] cf:opacity-60">
                  Manual expense report submission
                </p>
              </div>

              <div 
                className="cf:mb-6 cf:text-4xl cf:font-medium cf:tracking-wider cf:text-[oklch(0.1465_0.0057_69.2)] cf:md:text-5xl cf:lg:text-6xl"
                aria-live="polite"
                aria-atomic="true"
              >
                <TimerDisplay ref={leftTimerRef} initialValue="0:00" />
              </div>

              <div ref={stepsContainerRef} className="cf:flex cf:items-center cf:gap-3 cf:text-sm cf:text-[oklch(0.1465_0.0057_69.2)]">
                <div data-step="1" className="cf:flex cf:items-center cf:gap-1.5 cf:opacity-100 cf:transition-opacity cf:duration-300">
                  <span>Chase receipt</span>
                  <span data-check className="cf:hidden cf:text-[oklch(0.9199_0.2009_113.99)]">✓</span>
                </div>
                <span className="cf:opacity-40">→</span>
                <div data-step="2" className="cf:flex cf:items-center cf:gap-1.5 cf:opacity-40 cf:transition-opacity cf:duration-300">
                  <span>Code</span>
                  <span data-check className="cf:hidden cf:text-[oklch(0.9199_0.2009_113.99)]">✓</span>
                </div>
                <span className="cf:opacity-40">→</span>
                <div data-step="3" className="cf:flex cf:items-center cf:gap-1.5 cf:opacity-40 cf:transition-opacity cf:duration-300">
                  <span>Approve</span>
                  <span data-check className="cf:hidden cf:text-[oklch(0.9199_0.2009_113.99)]">✓</span>
                </div>
              </div>
            </div>

            <div className="cf:rounded-xl cf:border cf:border-[rgba(33,33,33,0.1)] cf:bg-white cf:p-6 cf:md:p-8">
              <div className="cf:mb-6">
                <h3 className="cf:mb-2 cf:text-xl cf:font-medium cf:text-[oklch(0.1465_0.0057_69.2)]">
                  Ramp
                </h3>
                <p className="cf:text-sm cf:text-[oklch(0.1465_0.0057_69.2)] cf:opacity-60">
                  Automated expense management
                </p>
              </div>

              <div 
                className="cf:mb-6 cf:text-4xl cf:font-medium cf:tracking-wider cf:text-[oklch(0.1465_0.0057_69.2)] cf:md:text-5xl cf:lg:text-6xl"
                aria-live="polite"
                aria-atomic="true"
              >
                <TimerDisplay ref={rightTimerRef} initialValue="0:00" />
              </div>

              <div className="cf:text-sm cf:text-[oklch(0.1465_0.0057_69.2)]">
                <span id="cf-ramp-done-label" className="cf:hidden cf:font-medium">
                  Done.
                </span>
              </div>
            </div>
          </div>

          <div className="cf:mt-8 cf:text-center">
            <button
              ref={startButtonRef}
              type="button"
              className="cf:rounded-md cf:bg-[oklch(0.9199_0.2009_113.99)] cf:px-6 cf:py-3 cf:font-medium cf:text-[oklch(0.1465_0.0057_69.2)] cf:transition-colors cf:duration-200 cf:hover:bg-[oklch(0.9621_0.0034_67.78)] cf:disabled:cursor-not-allowed cf:disabled:opacity-60"
              aria-controls="cf-stopwatch-section"
            >
              Start
            </button>
          </div>

          <div 
            ref={resultLineRef}
            className="cf:mt-6 cf:text-center cf:text-lg cf:text-[oklch(0.1465_0.0057_69.2)] cf:opacity-0 cf:transition-opacity cf:duration-500 cf:md:text-xl"
          >
            You saved <strong className="cf:font-medium">11:42</strong> per report. Multiply that.
          </div>
        </div>
      </section>
    );
  }

  function TimerDisplay(props: any) {
    const { ref: fwd, initialValue = '0:00' } = props;
    const spanRef = { current: null as HTMLSpanElement | null };

    function setText(value: string) {
      if (spanRef.current) {
        spanRef.current.textContent = value;
      }
    }

    function getText() {
      return spanRef.current?.textContent || '';
    }

    function attach(el: HTMLSpanElement) {
      spanRef.current = el;
      (el as any).setText = setText;
      (el as any).getText = getText;
      if (typeof fwd === 'function') fwd(el);
      else if (fwd) fwd.current = el;
    }

    return <span ref={attach}>{initialValue}</span>;
  }

  function addStyling() {
    // No custom CSS needed; using Tailwind cf: utilities only
  }

  function monitorChangesByConditionAndRun(check: () => boolean, code: () => void, keepChecking = false) {
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

  function initTest(testInfo: any) {
    let cfObj = (window as any).CF || { qaTesting: false, testsRunning: [] };

    if (cfObj.testsRunning.find((test: any) => test.name == testInfo.name)) {
      console.warn(`The following test is already running: `, testInfo);
      return false;
    }

    cfObj.testsRunning = [...cfObj.testsRunning, testInfo];

    (window as any).CF = { ...(window as any).CF, ...cfObj };

    return { ...(window as any).CF };
  }
})();