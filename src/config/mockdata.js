import moment from 'moment'
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const mock = new AxiosMockAdapter(axios, { delayResponse: 0 });


mock.onGet('/api/tasks').reply(200, {
  tasks: [
    {
      title: 'Learn Webpack',
      archived: false,
      projectId: 'iROvR3JsE2NDboj1nAG3',
      userId: 'lb66IlpcRGySeYoW7cPz',
      date: moment()
    },
    {
      title: 'Study Discord Features',
      archived: false,
      projectId: 'iROvR3JsE2NDboj1nAG3',
      userId: 'lb66IlpcRGySeYoW7cPz',
      date: moment().subtract(20, 'minutes')
    },
    {
      title: 'Integrate Webpack with devias-kit-pro',
      archived: false,
      projectId: 'iROvR3JsE2NDboj1nAG3',
      userId: 'lb66IlpcRGySeYoW7cPz',
      date: moment().subtract(40, 'minutes')
    },
    {
      title: 'Setup HackerNews',
      archived: false,
      projectId: 'iROvR3JsE2NDboj1nAG3',
      userId: 'lb66IlpcRGySeYoW7cPz',
      date: moment().subtract(1, 'hour')
    },
    {
      title: 'Netlify Deploy socialape, ramentaurants',
      archived: false,
      projectId: 'iROvR3JsE2NDboj1nAG3',
      userId: 'lb66IlpcRGySeYoW7cPz',
      date: moment().subtract(5, 'hours')
    },
    {
      title: 'Webpack Basic Setup',
      archived: false,
      projectId: 'iROvR3JsE2NDboj1nAG3',
      userId: 'lb66IlpcRGySeYoW7cPz',
      date: moment().subtract(15, 'hours')
    },
    {
      title: "Todoist Clone Freecodecamp (Long Term)",
      archived: false,
      projectId: 'HuYKKcRPJqSaFDfZm4ik',
      userId: 'lb66IlpcRGySeYoW7cPz',
      date: moment().subtract(1, 'day').subtract(3, 'hours')
    },
    {
      title: 'Learn GraphQL',
      archived: false,
      projectId: 'HuYKKcRPJqSaFDfZm4ik',
      userId: 'lb66IlpcRGySeYoW7cPz',
      date: moment().subtract(1, 'day').subtract(12, 'hours') 
    }
  ]
});


export const users = [
  {
    name: 'Swetabja Hazra',
    email: 'stabja400@gmail.com',
    bio: 'Software Developer',
    location: 'Bangalore, India'
  },
  {
    name: 'Sagar Rajak',
    email: 'sagar.rajak@gmail.com',
    bio: 'Software Developer',
    location: 'Pune, India'
  }
];


export const projects = [
  {
    title: 'Learn Next.js',
    userId: 'lb66IlpcRGySeYoW7cPz'
  },
  {
    title: 'CONDUIT WebApp',
    userId: 'lb66IlpcRGySeYoW7cPz'
  },
  {
    title: 'Devias-Kit-Pro',
    userId: 'lb66IlpcRGySeYoW7cPz'
  }
];
