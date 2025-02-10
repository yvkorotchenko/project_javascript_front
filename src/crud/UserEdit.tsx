import React, { useState, useEffect } from 'react';
import { AutocompleteArrayInput, BooleanInput, Edit, EditProps, FunctionField, SimpleForm, TextInput, useDataProvider  } from 'react-admin';


interface UserEditProps extends EditProps<any, any> {
    record: any; // Тут вкажіть тип для record, якщо відомий
  }

const UserEdit: React.FC<UserEditProps> = (props)  => {
  const [allGroups, setAllGroups] = useState([]); // Зберігаємо список всіх груп
  const dataProvider = useDataProvider();



 // Зробимо запит до бекенду під час завантаження компонента, щоб отримати всі групи
  useEffect(() => {
    // Викликаємо функцію getGroups з дата-провайдера для отримання списку груп
    dataProvider.getGroups('groups',{})
    .then((response: { data: any; }) => {
        const groupsData = response.data;
        // const groups = groupsData.map((group: any) => group.name);
        setAllGroups(groupsData);
    })
    .catch((error: any) => {
        console.error('Error fetching groups:', error);
    });
}, []);


const renderGroupList = (record: any) => {
    const groups = record.groups || [];

// Витягнути всі унікальні назви груп з allGroups та groups
const allGroupNames = new Set([
    ...allGroups.map((group: any) => group.groupName),
    ...groups.map((group: any) => group),
  ]);

   // Створити масив allChoices на основі унікальних назв груп
   const allChoices = Array.from(allGroupNames).map((groupName: string) => ({
    id: groupName,
    name: groupName,
  }));
  
    return (
        <AutocompleteArrayInput
          source="groups"
          choices={allChoices}
        >
        </AutocompleteArrayInput>
    );
  };



 return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="displayName"/>
        <TextInput source="username" />
        <TextInput source="email" />
        <TextInput  source="birthday" />
        <TextInput source="home" />
        <BooleanInput source="isAccountEnabled" />
        <BooleanInput source="isPasswordDontExpire" />
        {/* <FunctionField
          source="groups"
          label="Groups"
          sortable={false} // Вимкнути сортування
          render={renderGroupList}
        /> */}
        <FunctionField
          source="groups"
          label="Groups"
          sortable={false} // Вимкнути сортування
          render={renderGroupList}
        />
      </SimpleForm>
    </Edit>
  );
};

export default UserEdit;
