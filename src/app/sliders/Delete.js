import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { postData, url } from '../../action';

const Delete = () => {
  const [Data, setData] = React.useState(null)
  const [Action, setAction] = React.useState('')
  React.useEffect(() => {
    postData(url + '/getData', {
      tableName: 'slider',
      orderColumn: 'id'
    }).then(data => {
      if (Array.isArray(data)) {
        return setData(data)
      }
      console.log(data.message)
    })
  }, [Action])
  const deleteSlider = (id) => {
    postData(url + '/deleteData', {
      tableName: 'slider',
      condition: 'id=' + id,
    }).then((response) => {
      console.log(response);
      setAction(response)
    })
  }
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Delete Slider </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Sliders</a></li>
            <li className="breadcrumb-item active" aria-current="page">Delete</li>
          </ol>
        </nav> 
      </div>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">All Sliders</h4>
              
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th> Image </th>
                      <th> Name </th>
                      <th>Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !Data ? (
                        <></>
                      ) : (
                        Data.map((doc, i) => (
                          <tr key={i}>
                            <td className="py-2">
                              <img src={doc.image} alt="user icon" />
                            </td>
                            <td> {doc.name} </td>
                            <td><button onClick={() =>deleteSlider(doc.id)} className='btn btn-gradient-danger btn-rounded btn-fw'>Delete</button></td>
                          </tr>
                        ))
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;