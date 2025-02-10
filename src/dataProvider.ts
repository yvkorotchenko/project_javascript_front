import { CreateParams, CreateResult, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetManyResult, GetOneParams, GetOneResult, Identifier, RaRecord, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult, fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl_SD = import.meta.env.VITE_API_URL_SD;
const httpClient = fetchUtils.fetchJson;
interface UserData extends RaRecord {
  id: number;
  username: string;
  email: string;
  birthday: string;
  home: string;
  isAccountEnabled: boolean;
  isPasswordDontExpire: boolean;
  groups: string[];
}

interface ResponseData {
  data: UserData[];
}

const dataProvider = {
    getList: async <RecordType extends UserData>(
        resource: string,
        params: any
      ): Promise<{ data: RecordType[]; total: number }> => {
        try {
          const { page, perPage } = params.pagination || {};
          const { field, order } = params.sort || {};
          const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
          };
          const url = `${apiUrl}/${resource}?${stringify(query)}`;
    
          const response = await httpClient(url);
          const responseData = response.json;
          
   
        // //   Extract the necessary data from the response
        const offset = (page - 1) * perPage;
        const dataWithId = responseData.paginatedData.map((item: UserData, index: number) => ({
          ...item,
        }));
          return {
            data: dataWithId  as any,
            total: responseData.total,
          };
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getGroups: async <RecordType extends UserData>(
    resource: string,
    params: any
  ): Promise<{ data: RecordType[]; total: number }> => {
    try {
      const { page = 1, perPage = 100 } = params.pagination || {};
      const { field = 'id', order = 'ASC'} = params.sort || {};
      const filterQuery = params.filter ? JSON.stringify(params.filter) : undefined;
      const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: filterQuery,
      };
      const url = `${apiUrl}/${resource}?${stringify(query)}`;

      const response = await httpClient(url);
      const responseData = response.json;
      

    // //   Extract the necessary data from the response
    const offset = (page - 1) * perPage;
    const dataWithId = responseData.paginatedData.map((item: UserData, index: number) => ({
      ...item,
    }));
      return {
        data: dataWithId  as any,
        total: responseData.total,
      };
} catch (error) {
  return Promise.reject(error);
}
},
getComputers: async <RecordType extends UserData>(
  resource: string,
  params: any
): Promise<{ data: RecordType[]; total: number }> => {
  try {
    const { page = 1, perPage = 200 } = params.pagination || {};
    const { field = 'id', order = 'ASC'} = params.sort || {};
    const filterQuery = params.filter ? JSON.stringify(params.filter) : undefined;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: filterQuery,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    const response = await httpClient(url);
    const responseData = response.json;
    

  // //   Extract the necessary data from the response
  const offset = (page - 1) * perPage;
  const dataWithId = responseData.paginatedData.map((item: UserData, index: number) => ({
    ...item,
  }));
    return {
      data: dataWithId  as any,
      total: responseData.total,
    };
} catch (error) {
return Promise.reject(error);
}
},
getInventory: async <RecordType extends UserData>(
  resource: string,
  params: any
): Promise<{ data: RecordType[]; total: number }> => {
  try {
    const { page = 1, perPage = 200 } = params.pagination || {};
    const { field = 'id', order = 'ASC'} = params.sort || {};
    const filterQuery = params.filter ? JSON.stringify(params.filter) : undefined;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: filterQuery,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    const response = await httpClient(url);
    const responseData = response.json;
    

  // //   Extract the necessary data from the response
  const offset = (page - 1) * perPage;
  const dataWithId = responseData.paginatedData.map((item: UserData, index: number) => ({
    ...item,
  }));
    return {
      data: dataWithId  as any,
      total: responseData.total,
      counts: responseData.counts,
    };
} catch (error) {
return Promise.reject(error);
}
},
     getOne: async <RecordType extends UserData>(
       resource: string,
       params: any
     ): Promise<{ data: RecordType }> => {
       try {
         const { id } = params;
         
         const url = `${apiUrl}/${resource}/${id}`;
     
         const response = await httpClient(url);
         const responseData  = response.json;
         const user = resource === 'users' ? responseData?.user[0] : responseData?.group[0] ;
     
         return {
           data: user as any,
         };
       } catch (error) {
         return Promise.reject(error);
       }
     },
    getMany: async (resource: string, params: any): Promise<{ data: any[] }> => {
      try {
        const { page = 1, perPage = 200 } = params.pagination || {};
        const { field = 'id', order = 'ASC'} = params.sort || {};
        const filterQuery = params.filter ? JSON.stringify(params.filter) : undefined;
        const query = {
          sort: JSON.stringify([field, order]),
          range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
          filter: filterQuery,
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
    
        const response = await httpClient(url);
        const responseData = response.json;
        const adaptedData = responseData.paginatedData.map((item: any) => ({
          ...item,
        }));
        return {
          data: adaptedData as any[],
        };
      } catch (error) {
        return Promise.reject(error);
      }
    },
    
    getManyReference: function <RecordType extends RaRecord<Identifier> = any>(resource: string, params: GetManyReferenceParams): Promise<GetManyReferenceResult<RecordType>> {
        throw new Error('Function not implemented.');
    },
    update: async (resource:string, params:any) => {
      if (params.data && params.data.id) {
        console.log(params,'params');
        
        const { id, ...updatedData } = params.data;
        const url = `${apiUrl}/${resource}/${id}`;
  
        try {
          const response = await fetch(url, {
            method: 'PUT', // Метод запиту (PUT для оновлення)
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData), // Дані оновлення
          });
  
          if (!response.ok) {
            throw new Error('Update failed');
          }
  
          const updatedRecord = await response.json();
  
          return {
            data: updatedRecord,
          };
        } catch (error) {
          throw new Error('Update failed');
        }
      }
  
      throw new Error('Invalid data');
    },
    updateMany: function <RecordType extends RaRecord<Identifier> = any>(resource: string, params: UpdateManyParams<any>): Promise<UpdateManyResult<RecordType>> {
        throw new Error('Function not implemented.');
    },
    
    uploadFile: async (resource: string, params: any) => {
      try {
        const formData = new FormData();
        const { excelFile } = params.data; // Отримуємо файл з параметрів
    
        formData.append('excelFile', excelFile); // Додаємо файл до FormData
      
        const response = await fetch(`${apiUrl}/${resource}/upload-excel`, {
          method: 'POST',
          body: formData,
        });
    
        if (!response.ok) {
          throw new Error('Upload failed');
        }
    
        const result = await response.json();
        return { data: result };
      } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Upload failed');
      }
    },
    

    create: async (resource: string, params: any) => {
      if (resource === 'users' && params.data) {
        const url = `${apiUrl}/${resource}/create`;
        
        try {
          const response = await fetch(url, {
            method: 'POST', // Метод запиту (POST для створення)
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data), // Дані нового користувача
          });
    
          if (!response.ok) {
            throw new Error('Create failed');
          }
    
          const createdRecord = await response.json();
    
          return {
            data: createdRecord,
          };
        } catch (error) {
          throw new Error('Create failed');
        }
      }
      if (resource === 'groups' && params.data) {
        const url = `${apiUrl}/${resource}/create`;
        try {
          const response = await fetch(url, {
            method: 'POST', // Метод запиту (POST для створення)
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params.data), // Дані нового користувача
          });
    
          if (!response.ok) {
            throw new Error('Create failed');
          }
    
          const createdRecord = await response.json();
    
          return {
            data: createdRecord,
          };
        } catch (error) {
          throw new Error('Create failed');
        }
      }
      // Якщо ресурс не підтримується або немає даних для створення, поверніть помилку
      throw new Error('Invalid data');
    },
    
    delete: function <RecordType extends RaRecord<Identifier> = any>(resource: string, params: DeleteParams<RecordType>): Promise<DeleteResult<RecordType>> {
        throw new Error('Function not implemented.');
    },
    deleteMany: function <RecordType extends RaRecord<Identifier> = any>(resource: string, params: DeleteManyParams<RecordType>): Promise<DeleteManyResult<RecordType>> {
        throw new Error('Function not implemented.');
    }
};

export default dataProvider;
