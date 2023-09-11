import React, { useState, useEffect } from 'react';
import List from "../list/List";
import { uid } from "uid";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const  Tamu= () => {
  const navigate = useNavigate();

  const[Tamu, setTamu] = useState([]);

  const [isUpdate, setIsUpdate] = useState({
    id: null,
    status: false
  })

  const [formData, setFormData] = useState({
    tanggal: '',
    nama: '',
    alamat: '',
    isi: '',
 })

  useEffect(() => {
    axios.get('http://localhost:3000/tamu').then((res) =>{
        setTamu(res?.data ?? [])
    })
  },[])

  function handleChange(e){
    let data = {...formData};
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleSubmit(e) {
    e.preventDefault()
    let data = [...Tamu]
    if (formData.tanggal ==="") {
        alert('mohon isi tanggalnya!!')
        return false
    }
    if (formData.nama ==="") {
        alert('mohon isi namanya!!')
        return false
    }if(
      formData.alamat ==="") {
        alert('mohon isi alamatnya!!')
        return false
      }
      if(
        formData.isi ==="") {
          alert('mohon isi pesannya!!')
          return false
        }
        


    if (isUpdate.status) {
        data.forEach((Tamu) =>{
        if (Tamu.id === isUpdate.id) {
          Tamu.tanggal = formData.tanggal;
          Tamu.nama = formData.nama;
          Tamu.alamat = formData.alamat;
          Tamu.isi = formData.isi;
        }
    });

    axios.put(`http://localhost:3000/tamu/${isUpdate.id}`, {
        tanggal: formData.tanggal, nama:formData.nama, alamat: formData.alamat,  isi: formData.isi,
        }).then(res => {
        alert('berhasil mengedit data')
        })
    }else{
        let newData = {id: uid(), tanggal: formData.tanggal, nama: formData.nama,alamat: formData.alamat, isi: formData.isi}
        data.push(newData)
        axios.post('http://localhost:3000/tamu/', newData).then(res => {
        alert('berhasil menyimpan data')
        })
    }

    setTamu(data);
    setIsUpdate({id: null, status: false})
    setFormData({tanggal: '',nama: '',alamat: '', isi: ''})
    }

  function handleEdit(id) {
    let data = [...Tamu]
    let foundData = data.find((Tamu) => Tamu.id === id)
    setFormData({tanggal: foundData.tanggal, nama:foundData.nama, alamat:foundData.alamat, isi:foundData.isi })
    setIsUpdate({id: id, status: true})
  }

  function handleDelete(id) {
    console.log(id);
    let data = [...Tamu]
    let filteredData = data.filter(Tamu => Tamu.id !== id)
    axios.delete(`http://localhost:3000/tamu/${id}`).then(res => {
      alert('berhasil menghapus data')
    })
    setTamu(filteredData)
  }

  function navigatePage(){
    navigate('/tamuu')
  }

  return (
    <div className="App">
      <nav className='navbar sticky-top navbar-light bg-light'>
      <h1 className="px-3 py-3"><center>Selamat Datang</center></h1>
        
          <div className='btn-group' role="group" aria-label='Basic example'>
            <button className='btn btn-dark' onClick={navigatePage}>Tamu Undagan</button>
          </div>
      </nav>
      <h1 className="px-2 py-2"><center>Buku Tamu</center></h1>
      <form onSubmit={handleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">Tanggal</label>
          <input
          type="date"
          className="form-control"
          onChange={handleChange}
          value={formData.tanggal}
          name="tanggal"
          />
           </div>
        <div className="form-group mt-3">
          <label htmlFor="">Nama</label>
          <textarea
          className="form-control"
          onChange={handleChange}
          value={formData.nama}
          name="nama"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">Alamat</label>
          <textarea
          className="form-control"
          onChange={handleChange}
          value={formData.alamat}
          name="alamat"
          />
          </div>
        <div className="form-group mt-3">
          <label htmlFor="">Pesan</label>
          <textarea
          className="form-control"
          onChange={handleChange}
          value={formData.isi}
          name="isi"
          rows="3"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </div>
      </form>

      <List handleDelete={handleDelete} handleEdit={handleEdit} data={Tamu} />
    </div>
  );
}

export default Tamu;