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
const ComputerList = (props: any) => {


  const renderComputerList = (record: any) => {
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
      <TextField source="hostName" label="ComputerName" />
      <TextField source="operatingSystem" label="operatingSystem"/>
      {/* <TextField source="member" label="Members" /> */}
      <DeleteButton/>
      <EditButton />
      </DatagridConfigurable>
    </List>
  );
};

export default ComputerList;
