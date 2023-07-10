export default [
  {
    title: 'Company',
    links: [
      { children: 'Home', to: '/' },
      { children: 'Log In', to: '/' },
      { children: 'Sign Up', to: '/' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { children: 'Help Center', to: '/' },
      { children: 'Premium', to: '/' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { children: 'Privacy Policy', to: '/' },
      { children: 'Terms of Service', to: '/' }
    ]
  },
  {
    title: 'Contact',
    links: [
      { children: '88 King Street' },
      { children: 'San Francisco, CA 94105' },
      { children: '+1 (650) 282-3388', href: 'tel:+16502823388' },
      { children: 'help@rembrance.com', href: 'mailto:help@rembrance.com' }
    ]
  }
];

export const SIMPLE_FOOTER = [
  {
    children: 'About',
    href:
      'https://help.rembrance.com/hc/en-us/articles/360034369051-What-is-Rembrance-'
  },
  {
    children: 'Privacy',
    href:
      'https://help.rembrance.com/hc/en-us/articles/360034370231-Privacy-Policy'
  },
  {
    children: 'Terms',
    href:
      'https://help.rembrance.com/hc/en-us/articles/360034370131-Terms-of-Service'
  },
  { children: 'Help', href: 'https://help.rembrance.com/hc/en-us' }
];
