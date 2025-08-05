// List of domains where the redirect should occur
const allowedDomains = [
  'www.260.lat'
];

// Get the current hostname
const currentHost = window.location.hostname;

// Check if current host is in the allowed domains list
const shouldRedirect = allowedDomains.some(domain => 
  currentHost === domain || 
  currentHost.endsWith('.' + domain)
);

// If on an allowed domain, redirect to gud5.site
if (shouldRedirect) {
  window.location.href = 'https://gud5.site';
}
