import React from "react";

export default function List({data, handleEdit, handleDelete}) {
  return (
    <div className="list-group">
      {
        data.map((jurnal)=> {
          return(
            <div className="list-group-item list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Tanggal : {jurnal.tanggal}</h5> 
              <div>
                <button onClick={()=> handleEdit(jurnal.id)} className="btn btn-sm btn-outline-primary">Edit</button>
                <button onClick={()=> handleDelete(jurnal.id)} className="btn btn-sm btn-outline-danger">Del</button>
              </div>
            </div>
           <h5> <p className="mb-1">{jurnal.nama}</p></h5>
           <h5><p className="mb-1">{jurnal.alamat}</p></h5>
            <h6><p className="mb-1">{jurnal.isi}</p></h6>
          </div>
          )
        })
      }
    </div>
  );
}
