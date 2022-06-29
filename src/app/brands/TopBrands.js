import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import {useSelector} from 'react-redux'
import {postData, url} from '../../action'
import Axios from 'axios'
import { getAuth } from 'firebase/auth';
import app from './../../firebase';

const TopBrands = () => {
    const hotels= useSelector(state => state.hotels)
    const [Error,setError]= React.useState()
    const [Data, setData]= React.useState(null)
    const [Action, setAction]=React.useState(false)
    const [File, setFile]=React.useState(null)
    const [HotelId, setHotelId]=React.useState(null)
    const [Id,setId]=React.useState(null)
    const [Data2, setData2]= React.useState(null)
    const auth=getAuth(app)
    const [ImageSize,setImageSize]= React.useState(false)
    const brands=useSelector(state => state.brands)
    React.useEffect(() => {
        postData(url + '/getData', {
            tableName: 'top_brands',
        }).then(data => {
            if(Array.isArray(data)){
                setData(data)
            }
        })
    },[Action])
    const deleteData = (id) => {
        postData(url + '/deleteData', {
            tableName: 'top_brands',
            condition:'id='+id,
        }).then(data => {
            console.log(data)
            setAction(!Action)
        })
    }
    const uploadImages = () =>{
        if(!HotelId){
            setError('Please select a brand.')
            return
        }
        
        postData(url + '/setData',{
          auth: auth.currentUser,
          tableName: 'top_brands',
          columns: ['brand_id','image'],
          values: [HotelId.id,HotelId.image],
        }).then(result => {
          console.log(result);
          setError('Brand is saved into top brands')
          setAction(!Action)
        }).catch(e=>{
            setError('Problem in saving!')
        })
    }
    
   
    return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Top Brands List </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#" onClick={event => event.preventDefault()}>Brands</a></li>
                <li className="breadcrumb-item active" aria-current="page">All</li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Information</h4>
                  <form className="form-sample">
                    <p className="card-description"> Brands info </p>
                    <div className="row">
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Select Brand</label>
                          <div className="col-sm-9">
                            <select onChange={(e)=>{
                              //setDealId(e.target.value);
                             let data= brands.filter(d=>d.id==e.target.value)[0]
                              setHotelId(data);
                            }} className="form-control">
                            <option value=''>Select</option>
                             {
                              brands?(
                                brands.map((doc, i)=>(
                                  <option value={doc.id} key={i}>{doc.name}</option>
                                ))
                              ):(
                                <option>No Deals</option>
                              )
                             }
                            </select>
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    {Error?(
                    <div className="alert alert-primary" role="alert">{Error}</div>
                  ):(
                    <></>
                  )}
                  </form>
                  <button onClick={uploadImages} className='btn btn-gradient-secondary btn-rounded btn-fw'>SAVE</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Information</h4>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> Image </th>
                        <th> Hotel Name </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Data && brands ?(
                            Data.map((doc, i) => (
                                <tr key={i}>
                                <td>
                                <img src={doc.image} alt={doc.id} />
                                </td>
                                <td>{brands?brands.filter(d=>d.id==doc.brand_id)[0].name:'...'}</td>
                                <td>
                                <button className='btn btn-gradient-danger btn-rounded btn-fw' onClick={()=>{
                                    deleteData(doc.id)
                                }}>
                                Delete
                                </button>
                                </td>
                                </tr>
                            ))
                        ):(<tr><td>Loading...</td></tr>)
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

export default TopBrands;