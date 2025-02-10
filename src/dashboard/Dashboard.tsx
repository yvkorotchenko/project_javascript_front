import { Card, CardContent, CardHeader } from "@mui/material";
import "./dashboard.scss"
import TopBox from "../topBox/TopBox";
import ChartBox from "../chartBox/ChartBox";
import PieChartBox from "../pieChartBox/PieChartBox";
import BarChartBox from "../barChartBox/BarChartBox";
import { useEffect, useState } from "react";
import { useDataProvider } from "react-admin";
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale'; 

// Отримати поточний місяць
const currentMonth = format(new Date(), 'MMMM', { locale: enUS });
// Отримати поточну дату
const currentDate = new Date();
export const Dashboard = () => { 
  const [BarChartInventory, setBarChartInventory] = useState({
    title_box1: "Counts of ",
    title_box2: "Inventorization",
    color: "#2196f3",
    dataKey: "count",
    chartData: [
      {
        name: "Monitors",
        count: 4000,
        color: "#0088FE",
      },
      {
        name: "Desktops",
        count: 3000,
        color: "#00C49F",
      },
      {
        name: "Laptops",
        count: 2000,
        color: "#FFBB28",
      },
      {
        name: "Tablets",
        count: 2780,
        color: "#FF8042",
      },
      {
        name: "Printers",
        count: 1890,
        color: "#926bff",
      },

    ],
  });
  const [topBoxUsers, setTopBoxUsers] = useState({
    title_box1: "Last 8 Users",
    title_box2: "Total Users",
    dataKey: "users",
    number: 8,
    allUsers: [], // Додайте початкове значення
    color: "#2196f3",
    icon: "/users.svg",
    percentage: '0',
    chartData: [
      { name: "Jan", users: 0, userName:[]},
      { name: "Feb", users: 0, userName:[]},
      { name: "Mar", users: 0, userName:[]},
      { name: "Apr", users: 0, userName:[]},
      { name: "May", users: 0, userName:[]},
      { name: "Jun", users: 0, userName:[]},
      { name: "Jul", users: 0, userName:[]},
      { name: "Aug", users: 0, userName:[]},
      { name: "Sep", users: 0, userName:[]},
      { name: "Oct", users: 0, userName:[]},
      { name: "Nov", users: 0, userName:[]},
      { name: "Dec", users: 0, userName:[]},
    ],
    currentMonth: currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)
  });
  const [chartBoxGroups, setСhartBoxGroups] = useState({
    title_box1: "Last 2 Groups",
    title_box2: "Total Groups",
    dataKey: "groups",
    count: 2,
    color: "teal",
    icon: "/groups.svg",
    number: "2",
    percentage: 0,
    allGroups: [], // Додайте початкове значення
    chartData: [
      { name: "Jan", groups: 0, groupName:[]},
      { name: "Feb", groups: 0, groupName:[]},
      { name: "Mar", groups: 0, groupName:[]},
      { name: "Apr", groups: 0, groupName:[]},
      { name: "May", groups: 0, groupName:[]},
      { name: "Jun", groups: 0, groupName:[]},
      { name: "Jul", groups: 0, groupName:[]},
      { name: "Aug", groups: 0, groupName:[]},
      { name: "Sep", groups: 0, groupName:[]},
      { name: "Oct", groups: 0, groupName:[]},
      { name: "Nov", groups: 0, groupName:[]},
      { name: "Dec", groups: 0, groupName:[]},
    ],
    currentMonth: currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)
  })
  const [chartBoxComputers, setChartBoxComputers] = useState({
    title: "Total Computers",
    dataKey: "computers",
    color: "gold",
    icon: "/computer.svg",
    number: "150",
    percentage: '0',
    chartData: [
      { name: "Jan", computers: 0, computerName:[]},
      { name: "Feb", computers: 0, computerName:[]},
      { name: "Mar", computers: 0, computerName:[]},
      { name: "Apr", computers: 0, computerName:[]},
      { name: "May", computers: 0, computerName:[]},
      { name: "Jun", computers: 0, computerName:[]},
      { name: "Jul", computers: 0, computerName:[]},
      { name: "Aug", computers: 0, computerName:[]},
      { name: "Sep", computers: 0, computerName:[]},
      { name: "Oct", computers: 0, computerName:[]},
      { name: "Nov", computers: 0, computerName:[]},
      { name: "Dec", computers: 0, computerName:[]},
    ],
    currentMonth: currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)
  })
  const dataProvider = useDataProvider();
  const parseDate = (adDate: string | any[]) => {
    if (!adDate || adDate === "undefined") {
      return null;
    }
  
    const year = adDate.slice(0, 4);
    const month = adDate.slice(4, 6);
    const day = adDate.slice(6, 8);
    const hours = adDate.slice(8, 10);
    const minutes = adDate.slice(10, 12);
    const seconds = adDate.slice(12, 14);
  
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`);
  };

  // Зробимо запит до бекенду під час завантаження компонента, щоб отримати всі користувачі
  useEffect(() => {
    dataProvider.getMany('users', {})
      .then((response: { data: any; }) => {
        const usersData = response.data;
        // Фільтруйте користувачів за датою останнього входу в поточному місяці
        const activeUsersThisMonth = usersData.filter((user: { lastLogon: string | number | Date; }) => {
          const lastLogonDate = new Date(user.lastLogon);
          return lastLogonDate.getMonth() === currentDate.getMonth() &&
                 lastLogonDate.getFullYear() === currentDate.getFullYear();
        });
        const usersWithParsedDates = usersData.map((user: { createdDate: string | any[]; }) => ({
          ...user,
          createdDate: parseDate(user.createdDate)
        }));
        usersWithParsedDates.sort((a: { createdDate: { getTime: () => number; }; }, b: { createdDate: { getTime: () => number; }; }) => b.createdDate.getTime() - a.createdDate.getTime());
        // Обмежуємо результат першими 10 записами
        const latestUsers = usersWithParsedDates.slice(0, topBoxUsers.number);
        // Оновлюємо об'єкт topBoxUsers
        setTopBoxUsers((prevTopBoxUsers) => ({
          ...prevTopBoxUsers,
          allUsers: latestUsers,
          count: usersWithParsedDates.length,
          percentage: ((activeUsersThisMonth.length / usersWithParsedDates.length) * 100).toFixed(0),
          chartData: prevTopBoxUsers.chartData.map((dayData, index) => ({
            ...dayData,
            users: latestUsers.filter((user: { createdDate: { getMonth: () => number; }; }) => user.createdDate.getMonth() === index).length,
            userName: latestUsers.filter((user: { createdDate: { getMonth: () => number; }; }) => user.createdDate.getMonth() === index).map((user: { id: string }) => user.id)
          }))
        }));
    })
      .catch((error: any) => {
        console.error('Error fetching users:', error);
      });
  }, []);
  useEffect(() => {
    dataProvider.getComputers('computers', {})
      .then((response: { data: any; }) => {
        const computersData = response.data;
         // Фільтруйте компютери за датою останнього входу в поточному місяці
         const activeComputersThisMonth = computersData.filter((user: { lastLogon: string | number | Date; }) => {
          const lastLogonDate = new Date(user.lastLogon);
          return lastLogonDate.getMonth() === currentDate.getMonth() &&
                 lastLogonDate.getFullYear() === currentDate.getFullYear();
        });
        const computersWithParsedDates = computersData.map((computer: { createdDate: string | any[]; }) => ({
          ...computer,
          createdDate: parseDate(computer.createdDate)
        }));
        computersWithParsedDates.sort((a: { createdDate: { getTime: () => number; }; }, b: { createdDate: { getTime: () => number; }; }) => b.createdDate.getTime() - a.createdDate.getTime());
        // Обмежуємо результат першими 10 записами
        const latestComputers = computersWithParsedDates.slice(0, topBoxUsers.number);
        // Оновлюємо об'єкт topBoxUsers
        setChartBoxComputers((prevChartBoxComputers) => ({
          ...prevChartBoxComputers,
          allGroups: latestComputers,
          count: computersWithParsedDates.length,
          percentage: ((activeComputersThisMonth.length / computersWithParsedDates.length) * 100).toFixed(0),
          chartData: prevChartBoxComputers.chartData.map((dayData, index) => ({
            ...dayData,
            computers: latestComputers.filter((user: { createdDate: { getMonth: () => number; }; }) => user.createdDate.getMonth() === index).length,
            computerName: latestComputers.filter((user: { createdDate: { getMonth: () => number; }; }) => user.createdDate.getMonth() === index).map((user: { id: string }) => user.id)
          }))
        }));
    })
      .catch((error: any) => {
        console.error('Error fetching users:', error);
      });
  }, []);
  useEffect(() => {
    dataProvider.getGroups('groups', {})
      .then((response: { data: any; }) => {
        const groupsData = response.data;
        // Фільтруйте користувачів за датою останнього входу в поточному місяці
        const activeUsersThisMonth = groupsData.filter((user: { lastLogon: string | number | Date; }) => {
          const lastLogonDate = new Date(user.lastLogon);
          return lastLogonDate.getMonth() === currentDate.getMonth() &&
                 lastLogonDate.getFullYear() === currentDate.getFullYear();
        });
        const groupsWithParsedDates = groupsData.map((user: { createdDate: string | any[]; }) => ({
          ...user,
          createdDate: parseDate(user.createdDate)
        }));
        groupsWithParsedDates.sort((a: { createdDate: { getTime: () => number; }; }, b: { createdDate: { getTime: () => number; }; }) => b.createdDate.getTime() - a.createdDate.getTime());
        // Обмежуємо результат першими 10 записами
        const latestGroups = groupsWithParsedDates.slice(0, chartBoxGroups.number);
        // Оновлюємо об'єкт topBoxUsers
        setСhartBoxGroups((prevСhartBoxGroups) => ({
          ...prevСhartBoxGroups,
          allGroups: latestGroups,
          count: groupsWithParsedDates.length,
          percentage: ((activeUsersThisMonth.length / groupsWithParsedDates.length) * 100).toFixed(0),
          chartData: prevСhartBoxGroups.chartData.map((dayData, index) => ({
            ...dayData,
            groups: latestGroups.filter((user: { createdDate: { getMonth: () => number; }; }) => user.createdDate.getMonth() === index).length,
            groupName: latestGroups.filter((user: { createdDate: { getMonth: () => number; }; }) => user.createdDate.getMonth() === index).map((user: { id: string }) => user.id)
          }))
        }));
    })
      .catch((error: any) => {
        console.error('Error fetching users:', error);
      });
  }, []);
  // ----------
  useEffect(() => {
    dataProvider.getInventory('inventory', {})
      .then((response: { data: any; total: number; counts: any  }) => {
        const monitorsCount = response.counts.monitors;
        const printersCount = response.counts.printers;
        const desktopsCount = response.counts.desktops;
        const tabletsCount = response.counts.tablets;
        const laptopsCount = response.counts.laptops;

          // Оновлюємо значення count для кожного типу в стані BarChartInventory
          setBarChartInventory((prevBarChartInventory) => {
            const updatedChartData = prevBarChartInventory.chartData.map((item) => {
              if (item.name === 'Monitors') {
                return { ...item, count: monitorsCount };
              }
              if (item.name === 'Desktops') {
                return { ...item, count: desktopsCount };
              }
              if (item.name === 'Laptops') {
                return { ...item, count: laptopsCount };
              }
              if (item.name === 'Tablets') {
                return { ...item, count: tabletsCount };
              }
              if (item.name === 'Printers') {
                return { ...item, count: printersCount };
              }
              return item;
            });
    
            // Оновлюємо стан BarChartInventory з оновленими даними
            return {
              ...prevBarChartInventory,
              chartData: updatedChartData
            };
          });
        })
      .catch((error: any) => {
        console.error('Error fetching inventory:', error);
      });
  }, []);
  // ----------
  return (
  <Card>
    {/* <CardHeader title="Welcome to the administration" /> */}
    <CardContent>
      <div className="dashboard">
        <div className="box box1"><TopBox {...topBoxUsers}/></div>
        <div className="box box2"> <ChartBox {...topBoxUsers}/></div> 
        <div className="box box3"> <ChartBox {...chartBoxComputers}/></div>
        <div className="box box4"><PieChartBox {...BarChartInventory}/></div>
        <div className="box box5"><ChartBox {...chartBoxGroups}/></div>
        <div className="box box6">Active Users VPN</div>
        <div className="box box7"> 
            <h2>Monitoring</h2>
            <div className="box7_1 image-box">
            <div className="box7_1 image-box">
              <a href="http://monitoring/grafana" target="_blank">
                <img src="src/images/grafana.jpg" alt="Your Image" />
              </a>
            </div>
            </div>
            <div className="box7_1">
            <div className="box7_1 image-box">
              <a href="http://monitoring/" target="_blank">
                <img src="src/images/kibana.jpg" alt="Your Image" />
              </a>
            </div>
              </div>
        </div> 
        <div className="box box7">
          <h2>Virtualization</h2>
          <div className="box7_1 image-box">
            <div className="box7_1 image-box">
              <a href="http://10.0.0.10/phpvirtualbox/index.html" target="_blank">
                <img src="src/images/vbox.jpg" alt="Your Image" />
              </a>
            </div>
            </div>
            <div className="box7_1">
            <div className="box7_1 image-box">
              <a href="https://192.168.10.220/ui/" target="_blank">
                <img src="src/images/vmware.jpg" alt="Your Image" />
              </a>
            </div>
              </div>
        </div>
        <div className="box box9"><TopBox {...chartBoxGroups}/></div>
        <div className="box box10"><BarChartBox {...BarChartInventory}/></div> 
      </div>
    </CardContent>
  </Card>
)
  }