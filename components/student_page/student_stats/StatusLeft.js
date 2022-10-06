import style from '../../../styles/StudentStatsLeft.module.css'

const StatusLeft = () => {
  return (
    <div className={style.container}>
      <div>
        <div className={style.tableContainer}>
          <div className={style.title}>Projects</div>
          <table className={style.table}>
            <thead className={style.tableHead}>
              <tr className={style.headerRow}>
                <th className={`${(style.header, style.headName)}`}>Name</th>
                <th className={`${(style.header, style.headScore)}`}>Score</th>
              </tr>
            </thead>
            <tbody className={`${style.tableBody}, ${style.tbody}`}>
              <tr className={style.tBodyRow}>
                <td className={style.projNamCell}>Front End Proj</td>
                <td className={style.scoreCell}>Pass</td>
              </tr>
              <tr className={style.tBodyRow}>
                <td className={style.projNamCell}>Full Stack Proj</td>
                <td className={style.scoreCell}>Pass </td>
              </tr>
              <tr className={style.tBodyRow}>
                <td className={style.projNamCell}>Dance Proj</td>
                <td className={style.scoreCell}>Fail</td>
              </tr>
              <tr className={style.tBodyRow}>
                <td className={style.projNamCell}>Bloop Proj</td>
                <td className={style.scoreCell}>Fail</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={style.tableContainer}>
          <div className={style.title}>Assesments</div>
          <div>
            <table className={style.table}>
              <thead className={style.tableHead}>
                <tr className={style.headerRow}>
                  <th className={`${(style.header, style.headName)}`}>Name</th>
                  <th className={`${(style.header, style.headScore)}`}>Score</th>
                </tr>
              </thead>
              <tbody className={`${style.tableBody}, ${style.tbody}`} >
                <tr className={style.tBodyRow}>
                  <td className={style.projNamCell}>Assesment 1</td>
                  <td className={style.scoreCell}>50%</td>
                </tr>
                <tr className={style.tBodyRow}>
                  <td className={style.projNamCell}>Assesment 2</td>
                  <td className={style.scoreCell}>10% </td>
                </tr>
                <tr className={style.tBodyRow}>
                  <td className={style.projNamCell}>Assesment 3</td>
                  <td className={style.scoreCell}>50%</td>
                </tr>
                <tr className={style.tBodyRow}>
                  <td className={style.projNamCell}>Assesment 4</td>
                  <td className={style.scoreCell}>100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusLeft
