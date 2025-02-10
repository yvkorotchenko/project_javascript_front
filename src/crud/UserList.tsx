import {  List, Datagrid, TextField, NumberField, BooleanField, EmailField, UrlField, FunctionField,Pagination, ReferenceInput, TextInput, AutocompleteInput, ChipField, BulkDeleteButton, DatagridConfigurable, TopToolbar, CreateButton, ExportButton, FilterButton, SelectColumnsButton, EditButton, DeleteButton, BulkUpdateButton, ImageField, ImageInput } from 'react-admin';
import ResetViewsButton from '../buttons/ResetViewsButton';


const postFilters = [
  <TextInput source="q" label="Search" alwaysOn/>,
  <ReferenceInput source="username" label="Username" reference="users" perPage={150} >
  <AutocompleteInput 
    optionText="username" 
    optionValue="username"
  />
</ReferenceInput>,
];
const UserList = (props: any) => {

  const renderBooleanField = (record:any) => {
    const color = record.isAccountEnabled ? 'green' : 'red';
    return <BooleanField source="isAccountEnabled"  style={{ color }} />;
  };
  const renderBooleanFieldExpire = (record:any) => {
    const color = record.isPasswordDontExpire ? 'green' : 'red';
    return <BooleanField source="isPasswordDontExpire"  style={{ color }} />;
  };

  const renderGroupList = (record: any) => {
    const groups = record.groups || [];
  
    return (
      <>
        {groups.map((group: string, index: number) => (
          <ChipField key={index} record={{ name: group }} source="name" />
        ))}
      </>
    );
  };
  


const PostBulkActionButtons = () => (
    <>
        <ResetViewsButton label="Reset Views" />
        {/* default bulk delete action */}
        <BulkUpdateButton />
    </>
);
 
const PostListActions = () => (
  <TopToolbar>
      <SelectColumnsButton />
      <FilterButton />
      <EditButton />
      <CreateButton />
      <ExportButton />
  </TopToolbar>
);
const defaultPhoto = "photos/undefined.jpg"
function fileExists(url: string) {
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  return http.status !== 404;
}

  return (
    <List {...props} pagination={<Pagination rowsPerPageOptions={[20, 50, 100, 150]} />} perPage={50} filters={postFilters} actions={<PostListActions />}>
      <DatagridConfigurable bulkActionButtons={<PostBulkActionButtons />}>
      <FunctionField
         label="User Photo"
         alt="User Photo"
         render={(record: any) => {
           const photoSrc = fileExists(record.photo) ? record.photo : defaultPhoto;
           return <img src={photoSrc} alt="User Photo" width={50} height={50} />;
         }}
      />
      <TextField source="displayName" label="DisplayName" />
        <TextField source="username" label="Username" />
        <EmailField source="email" label="Email" />
        <TextField source="birthday" label="Birthday" />
        <UrlField source="home" label="Home" />
        <FunctionField
          source="isAccountEnabled"
          label="isAccountEnabled"
          render={renderBooleanField}
          // Використання змінної з класом
        />
        <FunctionField
          source="isPasswordDontExpire"
          label="isPasswordDontExpire"
          render={renderBooleanFieldExpire}
          // Використання змінної з класом
        />
        <FunctionField
          source="groups"
          label="Groups"
          sortable={false} // Вимкнути сортування
          render={renderGroupList}
        />
         <DeleteButton label="Delete"/>
         <EditButton label="Edit"/>
      </DatagridConfigurable>
    </List>
  );
};

export default UserList;
