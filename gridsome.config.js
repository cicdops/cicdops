// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'cicdops',
  icon: {
    favicon: './src/assets/favicon.png',
    touchicon: './src/assets/favicon.png'
  },
  siteUrl: (process.env.SITE_URL ? process.env.SITE_URL : 'http://cdcdops.com'),
  settings: {
    web: process.env.URL_WEB || 'http://cicdops.com/',
    twitter: process.env.URL_TWITTER || false,
    github: process.env.URL_GITHUB || 'https://github.com/cicdops/cicdops',
    nav: {
      links: [
        { path: '/devops/', title: 'DevOps' },
        { path: '/about', title: 'About' },
      ]
    },
    sidebar: [
      {
        name: 'devops',
        sections: [
          {
            title: '概念',
            items: [
              '/devops/DevOps_summary/',
              '/devops/DevOps_jobs/',
              '/devops/DevOps_skill/',
            ]
          },
          {
            title: '工具',
            items: [
              '/devops/DevOps_tools/',
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './content',
        path: '**/*.md',
        typeName: 'MarkdownPage',
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['noopener', 'noreferrer'],
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    },

    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {
          // Prevent purging of prism classes.
          whitelistPatternsChildren: [
            /token$/
          ]
        }
      }
    },


    {
      use: '@gridsome/plugin-sitemap',
      options: {  
      }
    }

  ]
}
