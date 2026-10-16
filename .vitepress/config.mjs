import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Palexplorer',
  description: 'Documentation for Palexplorer — encrypted P2P file sharing',
  lang: 'en-US',
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#0078D4' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Palexplorer Docs' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Palexplorer Docs',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'CLI', link: '/cli/' },
      { text: 'Extensions', link: '/extensions/' },
      { text: 'SDK', link: '/sdk/' },
      { text: 'Mobile', link: '/mobile/' },
      { text: 'Pricing', link: '/pricing' },
      { text: 'Security', link: '/security/' },
      {
        text: 'Links',
        items: [
          { text: 'Website', link: 'https://palexplorer.com' },
          { text: 'Download', link: 'https://palexplorer.com/download' },
          { text: 'Discord', link: 'https://discord.gg/VrCcGmNJ8Q' },
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Palexplorer?', link: '/guide/what-is-palexplorer' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Core Concepts', link: '/guide/core-concepts' },
          ]
        },
        {
          text: 'Basics',
          items: [
            { text: 'Identity & Recovery', link: '/guide/identity' },
            { text: 'Sharing Files', link: '/guide/sharing' },
            { text: 'Transfers', link: '/guide/transfers' },
            { text: 'Pals & Groups', link: '/guide/pals-and-groups' },
            { text: 'Chat', link: '/guide/chat' },
            { text: 'Sync', link: '/guide/sync' },
          ]
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Discovery & Networking', link: '/guide/discovery' },
            { text: 'Configuration', link: '/config/' },
            { text: 'Multi-User', link: '/guide/multi-user' },
          ]
        }
      ],
      '/cli/': [
        {
          text: 'CLI Reference',
          items: [
            { text: 'Overview', link: '/cli/' },
            { text: 'Identity', link: '/cli/identity' },
            { text: 'Sharing', link: '/cli/sharing' },
            { text: 'Transfers', link: '/cli/transfers' },
            { text: 'Sync', link: '/cli/sync' },
            { text: 'Files', link: '/cli/files' },
            { text: 'Pals & Groups', link: '/cli/pals-and-groups' },
            { text: 'Chat', link: '/cli/chat' },
            { text: 'Network & Discovery', link: '/cli/network' },
            { text: 'AI Assistant', link: '/cli/ai' },
            { text: 'Extensions', link: '/cli/extensions' },
            { text: 'Configuration', link: '/cli/config' },
            { text: 'Server & Services', link: '/cli/server' },
            { text: 'Advanced', link: '/cli/advanced' },
          ]
        }
      ],
      '/extensions/': [
        {
          text: 'Extensions',
          items: [
            { text: 'Overview', link: '/extensions/' },
            { text: 'Build Your Own', link: '/extensions/build-your-own' },
            { text: 'Manifest Reference', link: '/extensions/manifest' },
            { text: 'Context API', link: '/extensions/context-api' },
            { text: 'Hooks & Events', link: '/extensions/hooks' },
            { text: 'Permissions', link: '/extensions/permissions' },
            { text: 'Security Model', link: '/extensions/security' },
            { text: 'Testing', link: '/extensions/testing' },
            { text: 'Publishing', link: '/extensions/publishing' },
          ]
        }
      ],
      '/sdk/': [
        {
          text: 'SDK',
          items: [
            { text: 'Overview', link: '/sdk/' },
            { text: 'Authentication', link: '/sdk/authentication' },
            { text: 'Shares API', link: '/sdk/shares' },
            { text: 'Transfers API', link: '/sdk/transfers' },
            { text: 'Identity API', link: '/sdk/identity' },
            { text: 'Chat API', link: '/sdk/chat' },
            { text: 'Groups API', link: '/sdk/groups' },
            { text: 'Presence API', link: '/sdk/presence' },
            { text: 'Audit API', link: '/sdk/audit' },
          ]
        }
      ],
      '/security/': [
        {
          text: 'Security',
          items: [
            { text: 'Overview', link: '/security/' },
            { text: 'Encryption', link: '/security/encryption' },
            { text: 'Key Management', link: '/security/keys' },
            { text: 'Access Control', link: '/security/access-control' },
          ]
        }
      ],
      '/architecture/': [
        {
          text: 'Architecture',
          items: [
            { text: 'Overview', link: '/architecture/' },
            { text: 'P2P Stack', link: '/architecture/p2p' },
            { text: 'PAL/3.0 & PAL/2.0 Overview', link: '/architecture/protocol' },
            { text: 'PAL/3.0 Wire Specification', link: '/architecture/pal3-spec' },
            { text: 'Discovery', link: '/architecture/discovery' },
          ]
        }
      ],
      '/config/': [
        {
          text: 'Configuration',
          items: [
            { text: 'Overview', link: '/config/' },
          ]
        }
      ],
      '/mobile/': [
        {
          text: 'Mobile App',
          items: [
            { text: 'Overview', link: '/mobile/' },
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/VrCcGmNJ8Q' },
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Proprietary software. All rights reserved. <a href="https://palexplorer.com/license">License</a>',
      copyright: 'Copyright 2015-present Palexplorer'
    },
  }
})
