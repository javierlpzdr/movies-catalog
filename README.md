Movie Collection is a webapp that shows you the most popular movies and rate them. You also can search thourgh the TMDB repository using the search bar on the movies list.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm i
# or
yarn install
# or
pnpm install
# or
bun install
```

Set your TMDB token API in a new file called ".env.local":

```bash
echo NEXT_PUBLIC_TMDB_API_KEY=[YOUR API KEY GOES HERE] >> .env.local
```

for example:

```bash
echo NEXT_PUBLIC_TMDB_API_KEY=23asd43sdf23221 >> .env.local
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The application has 3 routes:

- [/](http://localhost:3000) shows a landing page.
- [/search/[page]](http://localhost:3000/search) is the core of the application. There is the list of movies. By default, it shows you most popular movies. You can rate them, if you have a Guest session [More info](#guest-session). It has an optional page path parameter `page` to navigate though the catalog pages. It is possible to pass a query search param `?query={string}` to search in the catalog.
- [/my-list](http://localhost:3000/my-list)

## Guest session

The guest session is temporal session aimed to allow the user to rate the movies. It's stored in the local state and in local storage until it expires.

To create it, click on the button "Create session" on the top right. This creates a new guest session into "TMDB". Now you are able to rate each movie clicking on its "rate" button (bottom right of the tile). Once you've clicked there, it shows you a modal to select the number of start to use to rate it.

The rated movies take a bit to appear in the list of movies that are rated. Due to this, the action is optimistic. Even the movies has not been updated yet on the server, the frontend shows it as it was.

## Rendering

The application is created with next.js mainly because of its flexibility handling different ways to render the data. In this case the catalog is render from the server. So it improves the SEO as it's easier for the robots to be found. But there are components that are handled by client side (as the rated list or the search bar).

## Global state

The state is managed by Redux Toolkit, a library to handle redux. There is only one slice in the store to keep the session data and the list of rated movies.

[Redux toolkit documentation](https://redux-toolkit.js.org/introduction/getting-started)

## UI component

The project uses DaisyUI and Tailwind to show manage the components and styles.

[Tailwind](https://tailwindcss.com/docs/installation)
[DaisyUI](https://daisyui.com/docs/install/)

## Testing

To run the test run:

```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```

## Next steps

- Add internalization, currently the text is static. It wil be handled using a library as https://github.com/i18next/react-i18next
- Improve the integration of the tests with Next.js, including testing for the SSR pages.
- To handle better the session (checking the session status).
- Improve the error handling.
- Create a file to handle the routes

## Next.js documentation

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
