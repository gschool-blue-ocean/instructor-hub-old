import style from '../../../styles/StudentStatsRight.module.css'

const StudentStatsRight = () => {
  return (
    <div className={style.rightMainDiv}>
      <div className={style.progress}>
        <div className={style.pot}>Progress over time</div>
        <img src="https://freepngimg.com/thumb/stock_market/25650-5-stock-market-graph-up-transparent-background.png" className={style.graph} />
      </div>
      <div className={style.learnAverage}>
        learn Average
      </div>
      <div className={style.projAverage}>
        project Average
      </div>
    </div>
  )
}

export default StudentStatsRight