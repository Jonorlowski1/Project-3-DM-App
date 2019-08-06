export default {
   user: {
      routes: [
        {
          component: 'InitPage', 
          url: '/init'
        },
        {
          component: 'GamePage', 
          url: '/game'
        },
        {
          component: 'CreateCharacterPage', 
          url: '/createcharacter'
        }
      ],
    },
    admin: {
      routes: [
        {
          component: 'InitAdminPage',
          url: '/initadmin'
        },
        {
          component: 'HuePage',
          url: '/hue'
        },
        {
          component: 'CreateGamePage',
          url: '/creategame'
        }
      ],
    },
  }