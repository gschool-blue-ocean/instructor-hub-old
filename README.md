This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# On the Database

# Data Philosophy

The application uses a postgres sql relational database. Within the database are 13 interconnected tables with primary and foreign keys, functions, and triggers for the functions.  The functions perform updates, calculations, and data propagation purposes, and are triggered by inserting or updating data in selected columns within certain tables. While these operations could also have been performed on the client side, the developers made the decision to perform these activities within the database to improve the client user experience and performance.

# Database Organization

The migration.sql file is organized, and comes with a table of contents that aids finding tables or functions of interest. This aids future developers in adding or modifying database tables, relationships, or features.  The "gid" column that is present in several of the tables is derived from ASANA, and should aid in maintaining compatibility between ASANA and the local database.  

# Data Security

One column (password) in one table (users) is protected by pgcrypto.  The app utilizes the use the gen_salt function, to let PostgreSQL generate a random salt, and utilizes the blowfish (bf) algorithm. The syntax for entering a password is as follows:  

crypt('somepassword', gen_salt('bf');

To autheticate a user, we use something similiar to the following:

SELECT id FROM users WHERE username = 'someuser'
   AND password = crypt('somepassword', password);

# Future possible enhancements

1. Simple Bivariate Regression Analysis r^2 showing the predictive power of learn assessment scores on the student's assessed tech skills.  This could easily be done by using the following postgres sql command:

SELECT regr_r2(learn_avg, tech_skills) as r2_learn_tech FROM students

It should only be done with groups of ten or more, to ensure reliability.  The result is the statistical r^2, which here shows how well learn scores predict tech skills.  The closer the number is to one, the more closely the former predicts the latter. It could also be turned into a percentage by multiplying the result by 100. A sample data explanation with hypothetical numbers follows:

"Cohort X average learn scores account for approximately 89% of the variance in average tech skills for students in the cohort."

This could indicate that the curriculum and assessments are relevant to the tech skills (high number), or are meaningless when it comes to student abilities (low score).