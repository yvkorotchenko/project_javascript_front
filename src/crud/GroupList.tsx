import {  List, Datagrid, TextField, NumberField, BooleanField, EmailField, UrlField, FunctionField,Pagination, ReferenceInput, TextInput, AutocompleteInput, ChipField, BulkDeleteButton, DatagridConfigurable, TopToolbar, CreateButton, ExportButton, FilterButton, SelectColumnsButton, EditButton, DeleteButton, BulkUpdateButton } from 'react-admin';
import ResetViewsButton from '../buttons/ResetViewsButton';


const postFilters = [
  <TextInput source="q" label="Search" alwaysOn/>,
  <ReferenceInput source="groupName" label="GroupName" reference="groups" perPage={150} >
  <AutocompleteInput 
    optionText="groupName" 
    optionValue="groupName"
  />
</ReferenceInput>,
];
const GroupList = (props: any) => {


  const renderGroupList = (record: any) => {
    const groups = record.member || [];
    
  
    return (
      <>
        {groups.map((member: string, index: number) => (
          <ChipField key={index} record={{ name: member }} source="name" />
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

  return (
    <List {...props} pagination={<Pagination rowsPerPageOptions={[20, 50, 100, 150]} />} perPage={50} filters={postFilters} actions={<PostListActions />}>
      <DatagridConfigurable bulkActionButtons={<PostBulkActionButtons />}>
      <TextField source="groupName" label="GroupName" />
      <TextField source="description" label="Description"/>
      {/* <TextField source="member" label="Members" /> */}
      <FunctionField
        source="member"
        label="Members"
        sortable={false} // Вимкнути сортування
        render={renderGroupList}
      /> 
      <DeleteButton/>
      <EditButton />
      </DatagridConfigurable>
    </List>
  );
};

export default GroupList;
