import { Admin, ListGuesser, Resource  } from 'react-admin';
import { BrowserRouter } from 'react-router-dom'; // Додайте імпорт
import {Login} from "./login"
import dataProvider from './dataProvider';
import { authProvider } from './authProvider';
import UserList from './crud/UserList';
import GroupList from './crud/GroupList';
import UserEdit from './crud/UserEdit';
import { Dashboard } from './dashboard/Dashboard';
import GroupEdit from './crud/GroupEdit';
import UserCreate from './crud/UserCreate';
import GroupCreate from './crud/GroupCreate';
import { Layouts }  from './Layout';
import ComputerList from './crud/ComputerList';
import InventoryList from './crud/InventoryList';
import IncidentsList from './crud/IncidentsList';


  

// const MyLoginPage = () => <Login  className='body'/>;
export const App = () => {
  return (
    <BrowserRouter> {/* Додайте обгортку BrowserRouter */}
      <Admin dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard} loginPage={Login} layout={Layouts}>
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate}/>
        <Resource name="groups" list={GroupList} edit={GroupEdit} create={GroupCreate}/>
        <Resource name="computers" list={ComputerList} />
        <Resource name="incidents" list={IncidentsList} />
        <Resource name="inventory" list={InventoryList} />
      </Admin>
    </BrowserRouter>
  );
};

export default App;
