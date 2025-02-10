import React, { useState, useEffect } from 'react';
import { AutocompleteArrayInput, BooleanInput, Edit, EditProps, FunctionField, SimpleForm, TextInput, useDataProvider  } from 'react-admin';

interface UserEditProps extends EditProps<any, any> {
  record: any; // Тут вкажіть тип для record, якщо відомий
}

const UserEdit: React.FC<UserEditProps> = (props) => {
  const [allUsers, setAllUsers] = useState([]); // Зберігаємо список всіх користувачів
  const dataProvider = useDataProvider();

  // Зробимо запит до бекенду під час завантаження компонента, щоб отримати всі користувачі
  useEffect(() => {
    dataProvider.getMany('users', {})
      .then((response: { data: any; }) => {
        const usersData = response.data;
        console.log(usersData,'usersData');
        setAllUsers(usersData);
        
      })
      .catch((error: any) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const renderUsersList = (record: any) => {
    const usersInGroup = record.member || [];

    // Витягнути всі унікальні назви користувачів з allUsers та usersInGroup
    const allUsersNames = new Set([
      ...allUsers.map((user: any) => user.username),
      ...usersInGroup.map((user: any) => user),
    ]);

    // Створити масив allChoices на основі унікальних назв користувачів
    const allChoices = Array.from(allUsersNames).map((userName: string) => ({
      id: userName,
      name: userName,
    }));

    return (
      <AutocompleteArrayInput
        source="member" // Використовуємо source="member", щоб змінити список користувачів у групі
        choices={allChoices}
      >
      </AutocompleteArrayInput>
    );
  };

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="groupName" />
        <TextInput source="description" />
        <FunctionField
          source="member" // Використовуємо source="member", щоб отримати список користувачів у групі
          label="Users"
          sortable={false}
          render={renderUsersList}
        />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
