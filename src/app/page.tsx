import containers from "./page.module.scss";


export default function Home() {
  return (
    <div className={containers.home}>

      <main className={containers.main}>
        <h1 className={containers.title}>   
          Welcome to lendsqr  
        </h1>
        </main>
    </div>
  );
}
