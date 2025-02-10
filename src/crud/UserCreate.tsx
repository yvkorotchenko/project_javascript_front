import React, { useEffect, useState } from 'react';
import { Create, SimpleForm, TextInput, DateInput, BooleanInput, useDataProvider, AutocompleteArrayInput, useRedirect  } from 'react-admin';

const UserCreate: React.FC = (props) => {
  const [allGroups, setAllGroups] = useState([]); // Зберігаємо список всіх груп
  const dataProvider = useDataProvider();
  // Перенаправлення після успішного створення користувача
  const redirect = useRedirect();
  // Зробимо запит до бекенду під час завантаження компонента, щоб отримати всі групи
  useEffect(() => {
    // Викликаємо функцію getGroups з дата-провайдера для отримання списку груп
    dataProvider.getGroups('groups', {})
      .then((response: { data: any; }) => {
        const groupsData = response.data;
        // const groups = groupsData.map((group: any) => group.name);
        setAllGroups(groupsData);
      })
      .catch((error: any) => {
        console.error('Error fetching groups:', error);
      });
  }, []);
  
  const handleCreateUser = async (values: any) => {
    try {
      // Викликаємо функцію для створення користувача через дата-провайдера
      const response = await dataProvider.create('users', { data: values });

      // Якщо створення було успішним, перенаправляємо на сторінку зі списком всіх користувачів
      redirect('/users');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  // const renderGroupList = (record: any) => {
  //   const groups = record.groups || [];

  //   // Витягнути всі унікальні назви груп з allGroups та groups
  //   const allGroupNames = new Set([
  //     ...allGroups.map((group: any) => group.groupName),
  //   ]);

  //   // Створити масив allChoices на основі унікальних назв груп
  //   const allChoices = Array.from(allGroupNames).map((groupName: string) => ({
  //     id: groupName,
  //     name: groupName,
  //   }));

  //   return (
  //     <AutocompleteArrayInput
  //       source="groups"
  //       choices={allChoices}
  //     />
  //   );
  // };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={handleCreateUser}>
        <TextInput source="displayName" />
        <TextInput source="username" />
        <TextInput source="email" />
        <TextInput source="birthday" />
        <TextInput source="home" />
        <AutocompleteArrayInput
          source="groups"
          label="Groups"
          choices={allGroups.map((group: any) => ({
            id: group.groupName,
            name: group.groupName,
          }))}
        />
      </SimpleForm>
    </Create>
  );
};

export default UserCreate;
