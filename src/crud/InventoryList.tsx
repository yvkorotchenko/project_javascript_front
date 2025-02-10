import { Fragment, useEffect, useState } from "react";
import {
  List,
  TextField,
  NumberField,
  TopToolbar,
  FilterButton,
  EditButton,
  CreateButton,
  ExportButton,
  BulkUpdateButton,
  DatagridConfigurable,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  Pagination,
  Button,
  useDataProvider,
  SelectColumnsButton,
} from 'react-admin';
import ResetViewsButton from "../buttons/ResetViewsButton";


const InventoryList = (props: any) => { 
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false); // Доданий стан для перезавантаження даних
  const apiUrl = import.meta.env.VITE_API_URL;
  const dataProvider = useDataProvider();
 
  // Функція для завантаження файлу на сервер
  const handleUpload = async (selectedFile) => {
    try {
      const formData = new FormData();
      formData.append("excelFile", selectedFile);
      const response = await fetch(`${apiUrl}/inventory/upload-excel`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      const result = await response.json();
      console.log("File uploaded successfully:", result);
      setData(result.data);
      window.location.reload(); // Оновити сторінку після завантаження файлу
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const loadData = async () => {
    try {
      const newData = await dataProvider.getInventory('inventory', {});
      setData(newData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    if (reload) {
      loadData();
      setReload(false); // Після завершення завантаження даних встановлюємо значення reload в false
    }
  }, [reload]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile,'selectedFile');
    
    if (!selectedFile) {
      console.error("Файл не вибраний");
      return;
    }
    // Перевірка розміру файлу (необов'язково)
    if (selectedFile.size > 1024 * 1024) { // 1 MB
      console.error("Розмір файлу занадто великий");
      return;
    }
    handleUpload(selectedFile);
  };

  const postFilters = [
    <TextInput source="q" label="Пошук" alwaysOn/>,
    <ReferenceInput source="username" label="Ім'я користувача" reference="users" perPage={150}>
      <AutocompleteInput 
        optionText="username" 
        optionValue="username"
      />
    </ReferenceInput>,
  ];

  const PostListActions = () => (
    <Fragment>
    <TopToolbar>
      <Button
        component="label"
        variant="contained"
        color="primary"
      >
        Завантажити .xlsx
        <input type="file" style={{ display: "none" }} onChange={handleFileChange} />
      </Button>
      <SelectColumnsButton />
      <FilterButton />
      <EditButton />
      <CreateButton />
      <ExportButton />
    </TopToolbar>
    </Fragment>
  );

  const PostBulkActionButtons = () => (
    <>
      <ResetViewsButton label="Скинути перегляди" />
      <BulkUpdateButton />
    </>
  );

  return (
    <div>
      <List {...props} pagination={<Pagination rowsPerPageOptions={[50, 100, 150, 300, 500]} />} perPage={50} filters={postFilters} actions={<PostListActions />}>
        <DatagridConfigurable bulkActionButtons={<PostBulkActionButtons />}>
          <TextField source="кімната" label="Кімната" />
          <TextField source="користувач" label="Користувач" />
          <TextField source="пк" label="ПК" />
          <TextField source="тип" label="Тип" />
          <TextField source="номер" label="Номер" />
          <TextField source="Пломба" label="Пломба" />
          <TextField source="Windows" label="Windows" />
          <NumberField source="розрядність" label="Розрядність" />
          <TextField source="просецор" label="Процесор" />
          <TextField source="ядра" label="Ядра" />
          <TextField source="частота,МГц" label="Частота, МГц" />
          <TextField source="пам'ять" label="Пам'ять" />
          <TextField source="жерсткий диск" label="Жорсткий диск" />
          <TextField source="Монітор виробник" label="Виробник монітора" />
          <TextField source="Монітор модель" label="Модель монітора" />
          <TextField source="Монітор серійний номер" label="Серійний номер монітора" />
          <TextField source="Монітор інвентарний номер" label="Інвентарний номер монітора" />
          <TextField source="Телефон виробник" label="Виробник телефона" />
          <TextField source="Телефон модель" label="Модель телефона" />
          <TextField source="Телефон серійний номер" label="Серійний номер телефона" />
          <TextField source="Телефон інвентарний номер" label="Інвентарний номер телефона" />
          <TextField source="Принтер виробник" label="Виробник принтера" />
          <TextField source="Принтер/МФУ" label="Принтер/МФУ" />
          <TextField source="Принтер модель" label="Модель принтера" />
          <TextField source="Принтер модель картриджа" label="Модель картриджа принтера" />
          <TextField source="кількість штук" label="Кількість штук" />
          <TextField source="IP" label="IP" />
          <TextField source="Host" label="Host" />
          <TextField source="Принтер серійний" label="Серійний номер принтера" />
          <TextField source="Принтер інвентарний" label="Інвентарний номер принтера" />
          <TextField source="додатково" label="Додатково" />
        </DatagridConfigurable>
      </List>
    </div>
  );
}

export default InventoryList;
