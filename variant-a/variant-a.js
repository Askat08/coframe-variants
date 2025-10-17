console.log('Headline variant starting...');

// Target the main hero headline
const headline = document.querySelector('#hero-section .headline-xl.text-primaryReverse');

if (headline) {
  console.log('Found headline element:', headline);
  
  // Change the headline text
  headline.textContent = 'Time saved is profit made';
  
  // Emit variant rendered event after successful change
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
  
  console.log('Headline successfully updated');
} else {
  console.error('Headline element not found');
}