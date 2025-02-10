import React, { useEffect, useState } from 'react';
import { List, Datagrid, TextField, DateField, NumberField } from 'react-admin';
import { useDataProvider, useNotify, useRefresh } from 'react-admin';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

declare const responsiveVoice: any;

const IncidentsList = (props) => {
  const [lastCheckedTime, setLastCheckedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdBy, setCreatedBy] = useState('');
  const [subject, setSubject] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleReadTestPhrase = (createdBy, subject) => {
    const message = `Користувач ${createdBy} створив заявку щодо ${subject}`;
    setIsSpeaking(true);
    responsiveVoice.speak(message, 'Ukrainian Female', {
      onend: () => setIsSpeaking(false) // Встановлюємо isSpeaking на false, коли озвучення закінчено
    });
    setCreatedBy(createdBy);
    setSubject(subject);
    setIsModalOpen(true); // Відкриваємо модальне вікно одразу
  };

  useEffect(() => {
    let isMounted = true;

    const fetchLatestIncidents = async () => {
      try {
        const response = await dataProvider.getList('incidents', {
          filter: { CREATEDTIME_gte: lastCheckedTime },
          sort: { field: 'CREATEDTIME', order: 'DESC' },
          pagination: { page: 1, perPage: 5 },
        });
        const latestIncidents = response.data;

        if (isMounted && latestIncidents.length > 0) {
          const latestCreatedTime = latestIncidents[0].CREATEDTIME;

          if (latestCreatedTime !== lastCheckedTime) {
            const newIncidents = latestIncidents.filter(
              (incident) => !lastCheckedTime || incident.CREATEDTIME > lastCheckedTime
            );

            newIncidents.forEach((newIncident) => {
              handleReadTestPhrase(
                newIncident.CREATEDBY,
                newIncident.SUBJECT
              );
            });

            setLastCheckedTime(latestCreatedTime);
            refresh();
          } else {
            refresh();
          }
        } else {
          refresh();
        }
      } catch (error) {
        console.error('Error fetching latest incidents:', error);
        notify('Error fetching latest incidents', 'warning');
      }
    };

    fetchLatestIncidents();

    const intervalId = setInterval(fetchLatestIncidents, 30000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [lastCheckedTime, dataProvider, notify, refresh]);

  return (
    <React.Fragment>
      <List {...props} resource="incidents">
        <Datagrid>
          <NumberField source="WORKORDERID" />
          <TextField source="SUBJECT" />
          <TextField source="CREATEDBY" />
          <DateField source="CREATEDTIME" />
          <TextField source="STATUS" />
        </Datagrid>
      </List>
      <Dialog open={isModalOpen && !isSpeaking} onClose={() => setIsModalOpen(false)}>
        <DialogTitle style={{ color: 'red' }}>Нова заявка</DialogTitle>
        <DialogContent>
          <p>Користувач {createdBy} створив заявку щодо {subject}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default IncidentsList;
