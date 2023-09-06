import { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import { API_URL } from "./constants";

type Delivery = {
  id: number;
  cost: number;
  brand: number[]
}

type Brand = {
  id: number;
  name: string;
  bottle_size: number;
  bottles_in_crate: number
}

export const App: React.FunctionComponent = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(API_URL + "/test/delivery/")
      .then(response => setDeliveries(response.data));
    axios.get(API_URL + "/test/brand/")
      .then(response => setBrands(response.data));
  }, [])

  const brandTemplate = (data: any) => {
    const delivery = data as Delivery;
    return delivery.brand.map(brandId => {
      let brand = brands.find(brand => brand.id === brandId)
      if (brand?.name === undefined)
        return "Unbekannte Marke"
      return brand.name
    }).join(", ")
  }

  return (
    <>
      <DataTable value={deliveries}>
        <Column field="id" header="ID"></Column>
        <Column field="cost" header="Kosten"></Column>
        <Column body={brandTemplate} header="Marke"></Column>
      </DataTable>
      <form
        className="p-inputgroup"
        onSubmit={e => {
          e.preventDefault();
          setLoading(true);
          axios.post(API_URL + "/test/delivery/create/", { name })
            .then(response => setDeliveries([...deliveries, response.data]))
            .finally(() => setLoading(false))
        }}
      >
        <InputText placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
        <Button loading={loading} label="Create" className="p-button-success" type="submit" />
      </form>
    </>
  )
};
