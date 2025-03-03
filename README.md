# RS School. React. 2025 Q1

#### Description

Simple demo-application that use a RESTfull api for Star Wars fans https://swapi.dev/api.
Created as a homework at course [React 2025 Q1](https://rs.school/courses/reactjs).

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

Clone the [repository](https://github.com/z-e-a/RS-React-2025Q1.git)

```bash
git clone  https://github.com/z-e-a/RS-React-2025Q1.git
cd RS-React-2025Q1
```

You are in the main branch now. Switch into the branch you need to check.

1. For task 'Next.js Pages Api Integration' switch to branch `nextjs-ssr-pages-api`:

```bash
git switch nextjs-ssr-pages-api
```

2. For task 'Next.js App Router Api Integration' - `nextjs-ssr-app-router-api`:

```bash
git switch nextjs-ssr-app-router-api
```

3. For task 'React Router 7 Integration' - `react-router-ssr`:

```bash
git switch react-router-ssr
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` from `.env.example` in the root of project and add the following content:

```env
NEXT_PUBLIC_API_URL=https://swapi.dev/api
NEXT_PUBLIC_APP_PREFIX=rss-react_
NEXT_PUBLIC_PAGINATOR_PORTION_SIZE=3
NEXT_PUBLIC_PAGINATOR_PAGE_SIZE=10
```

**Building the Project**

```bash
npm run build
```

The `dist` directory will contain files ready for deployment

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result and test functionality.

**Running tests**

To run tests:

```bash
npm run test
```

To check code coverage:

```bash
npm run coverage
```
