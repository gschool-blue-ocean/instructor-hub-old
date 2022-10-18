import Image from "next/image";
import style from "../styles/technologies.module.css";
import NavBar from "../components/main_page/NavBar";

const technologies = () => {
  return (
    <>
      <NavBar />
      <div className={style.container}>
        <div className={style.header}>
          <h1>Technologies</h1>
        </div>
        <div className={style.subContainer}>
          <div className={style.technology_1}>
            <div className={style.imageDiv}>
              <div className={style.image}>
                <Image src="/Nextjs-logo-bigger.png" width={240} height={144} />
              </div>
              <div className={style.techTitle}>NextJS</div>
            </div>
            <div className={style.about}>
              <span className={style.text}>
                Next.js gives you the best developer experience with all the
                features you need for production: hybrid static & server
                rendering, TypeScript support, smart bundling, route
                pre-fetching, and more. No config needed.Next.js has all the
                tools you need to make the Web. Faster. Copyright © 2022 Vercel, Inc. All rights reserved.
              </span>
              <a className={style.link} href="https://nextjs.org/">
                <b>Go to website</b>
              </a>
            </div>
          </div>
          <div className={style.technology_2}>
            <div className={style.imageDiv}>
              <div className={style.image}>
                <Image src="/React-icon.svg.png" width={240} height={209} />
              </div>
              <div className={style.techTitle}>React</div>
            </div>
            <div className={style.about}>
              <span className={style.text}>
              React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Build encapsulated components that manage their own state, then compose them to make complex UIs.React components implement a render() method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Copyright © 2022 Meta Platforms, Inc.
              </span>
              <a className={style.link} href="https://reactjs.org/">
                <b>Go to website</b>
              </a>
            </div>
          </div>
          <div className={style.technology_1}>
            <div className={style.imageDiv}>
              <div className={style.image}>
                <Image src="/Axios-logo.png" width={300} height={44} />
              </div>
              <div className={style.techTitle}>Axios</div>
            </div>
            <div className={style.about}>
              <span className={style.text}>
              Axios is a simple promise based HTTP client for the browser and node.js. Axios provides a simple to use library in a small package with a very extensible interface. The Axios Project: Copyright © 2014-present Matt Zabriskie.
              </span>
              <a className={style.link} href="https://axios-http.com/">
                <b>Go to website</b>
              </a>
            </div>
          </div>
          <div className={style.technology_2}>
            <div className={style.imageDiv}>
              <div className={style.image}>
                <Image src="/Recoiljs-logo.png" width={300} height={106} />
              </div>
              <div className={style.techTitle}>Recoiljs</div>
            </div>
            <div className={style.about}>
              <span className={style.text}>
              Recoil works and thinks like React. Add some to your app and get fast and flexible shared state. Derived data and asynchronous queries are tamed with pure functions and efficient subscriptions. Implement persistence, routing, time-travel debugging, or undo by observing all state changes across your app, without impairing code-splitting. Copyright © 2022 Facebook, Inc. Built with Docusaurus.
              </span>
              <a className={style.link} href="https://recoiljs.org/">
                <b>Go to website</b>
              </a>
            </div>
          </div>
          <div className={style.technology_1}>
            <div className={style.imageDiv}>
              <div className={style.image}>
                <Image
                  src="/Postgresql_elephant.svg.png"
                  width={280}
                  height={289}
                />
              </div>
              <div className={style.techTitle}>PostgreSQL</div>
            </div>
            <div className={style.about}>
              <div className={style.text}>
              PostgreSQL is a powerful, open source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance. PostgreSQL 15 builds on the performance improvements of recent releases with noticeable gains for managing workloads in both local and distributed deployments, including improved sorting. Copyright © 1996-2022 The PostgreSQL Global Development Group
              </div>
              <a className={style.link} href="https://www.postgresql.org/">
                <b>Go to website</b>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default technologies;
