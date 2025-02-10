import React, { useState, useEffect } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  AutocompleteArrayInput,
  useDataProvider,
  useRedirect,
} from 'react-admin';

const GroupCreate: React.FC = (props) => {
  const [allUsers, setAllUsers] = useState<any[]>([]); // Replace 'any[]' with the appropriate user type interface
  const dataProvider = useDataProvider();
  const redirect = useRedirect();

  useEffect(() => {
    dataProvider
      .getMany('users', {})
      .then((response: { data: any[] }) => {
        const usersData = response.data;
        setAllUsers(usersData);
      })
      .catch((error: any) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleCreateGroup = async (values: any) => {
    try {
      const response = await dataProvider.create('groups', { data: values });
      redirect('/groups');
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={handleCreateGroup}>
        <TextInput source="groupName" />
        <TextInput source="description" />
        <AutocompleteArrayInput
          source="member" // Use the appropriate source field for member/users selection
          label="Users"
          choices={allUsers.map((user: any) => ({
            id: user.username, // Replace 'username' with the appropriate field for unique identification
            name: user.username, // Replace 'username' with the appropriate field for display name
          }))}
        />
      </SimpleForm>
    </Create>
  );
};

export default GroupCreate;
