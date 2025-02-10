import { Link } from "react-router-dom";
import "./chartBox.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
    color: string;
    icon: string;
    title: string;
    title_box2: string;
    dataKey: string;
    count: number | string;
    percentage: number;
    chartData: object[];
    currentMonth: string;
    allUsers: any;
  };
  const ChartBox = (props: Props) => {
    return (
      <div className="chartBox">
        <div className="boxInfo">
          <div className="title">
            <img src={props.icon} alt="" />
            <span>{props.title || props.title_box2}</span>
          </div>
          <h1>{props.count}</h1>
          <Link to={props.dataKey} style={{ color: props.color }}>
            View all
          </Link>
        </div>
        <div className="chartInfo">
          <div className="chart">
            <ResponsiveContainer width="99%" height="100%">
              <LineChart data={props.chartData} >
                <Tooltip
                  contentStyle={{ background: "transparent", border: "none" }}
                  labelStyle={{ display: "none" }}
                  position={{ x: 10, y: 70 }}
                  formatter={(value, name, props) => {
                    const userNameOrComputerName = props.payload.userName
                      ? props.payload.userName
                      : props.payload.computerName || props.payload.groupName;
                    return `${props.payload.name} - ${value}(${userNameOrComputerName})`;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={props.dataKey}
                  stroke={props.color}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="texts">
            <span
              className="percentage"
              style={{ color: props.percentage < 15 ? "tomato" : "limegreen" }}
              title="Count of active users in this month"
            >
              {props.percentage}%
            </span>
            <span 
              className="duration"
              title='Current month'
            >
              {props.currentMonth}
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  export default ChartBox;