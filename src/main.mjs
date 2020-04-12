let impact;
let severeImpact;

// function selectElements(){

// };

window.addEventListener('load', () => {
  impact = document.getElementById('impact');
  severeImpact = document.getElementById('severeImpact');

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceWorker.js').then(() => {
      console.log('Registered');
    }).catch((err) => console.log(err));
  }
});

/* estimator functionality */


/* Toggle impact and severe impact */

// eslint-disable-next-line no-unused-vars
function showImpact() {
  impact.classList.remove('hidden');
  severeImpact.classList.add('hidden');
}
// eslint-disable-next-line no-unused-vars
function showSevereImpact() {
  impact.classList.add('hidden');
  severeImpact.classList.remove('hidden');
}
