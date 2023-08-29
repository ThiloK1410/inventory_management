import { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { API_URL } from "./constants";

type Test = {
  name: string;
  created: string;
}

export const App: React.FunctionComponent = () => {
  const [items, setItems] = useState<Test[]>([])
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(API_URL + "/test/")
      .then(response => setItems(response.data));
  }, [])

  return (
    <>
      <DataTable value={items}>
        <Column field="name" header="Name"></Column>
        <Column field="created" header="Created"></Column>
      </DataTable>
      <form
        className="p-inputgroup"
        onSubmit={e => {
          e.preventDefault();
          setLoading(true);
          axios.post(API_URL + "/test/create/", { name })
            .then(response => setItems([...items, response.data]))
            .finally(() => setLoading(false))
        }}
      >
        <InputText placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
        <Button loading={loading} label="Create" className="p-button-success" type="submit" />
      </form>
    </>
  )
};
