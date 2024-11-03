import Barchart from "../ui/dashboard/barchart/barchart";
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transactions from "../ui/dashboard/transactions/transactions";
import Barchart_f from "../ui/dashboard/barchart_f/barchart_f";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <Barchart />
        <Barchart_f />
        <Chart />
        <Transactions />
      </div>
      <div className={styles.side}>
        {/* <Rightbar /> */}
      </div>
    </div>
  );
};

export default Dashboard;
