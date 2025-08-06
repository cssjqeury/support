// List of domains where the redirect should occur
const allowedDomains = [
  '260.lat',
  'www.260.lat'
];

// Get the current hostname
const currentHost = window.location.hostname.toLowerCase(); // convert to lowercase

// Remove www. if present for comparison
const cleanHost = currentHost.replace(/^www\./i, '');

// Check if current host is in the allowed domains list
const shouldRedirect = allowedDomains.some(domain => 
  cleanHost === domain.toLowerCase() || 
  currentHost.endsWith('.' + domain.toLowerCase())
);

// If on an allowed domain, redirect to gud5.site
if (shouldRedirect) {
  window.location.href = 'https://230.lat'; // Added https://
}
