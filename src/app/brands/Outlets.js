import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import {useSelector} from 'react-redux'
import {postData, url} from '../../action'
import Axios from 'axios'
import { getAuth } from 'firebase/auth';
import app from './../../firebase';

const Outlets = () => {
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
    const [Address, setAddress]= React.useState()
    const [Phone, setPhone]= React.useState()
    const [Location, setLocation]= React.useState()

    React.useEffect(() => {
        postData(url + '/getData', {
            tableName: 'outlets',
        }).then(data => {
            if(Array.isArray(data)){
                setData(data)
            }
        })
    },[Action])
    const deleteData = (id) => {
        postData(url + '/deleteData', {
            tableName: 'outlets',
            condition:'id='+id,
        }).then(data => {
            console.log(data)
            setAction(!Action)
        })
    }
    const uploadImages = () =>{
        if(!HotelId || !Phone || !Address || !Location){
            setError('Fill all the fields')
            return
        }
       
        setError('Please wait...')
        postData(url + '/setData',{
            auth: auth.currentUser,
            tableName: 'outlets',
            columns: ['phone','brand_id','location','address'],
            values: [Phone,HotelId,Location,Address],
          }).then(result => {
            console.log(result);
            setError('Congrats! New outlets is added')
            setAction(!Action)
          }).catch(e=>{
              setError('Problem in adding file!')
          })
    }
    React.useEffect(() => {
      if(Data && Id){
        let  arr=Data.filter(d=>d.brand_id==Id)
        setData2(arr)
      }else{
        setData2(Data)
      }
    },[Data+Id])
    
    return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Add Outlets </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#" onClick={event => event.preventDefault()}>Brands</a></li>
                <li className="breadcrumb-item active" aria-current="page">Outlets</li>
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
                              setHotelId(e.target.value);
                            }} className="form-control">
                            <option value=''>Select</option>
                             {
                                brands?(
                                    brands.map((doc, i)=>(
                                  <option value={doc.id} key={i}>{doc.name}</option>
                                ))
                              ):(
                                <option>No Brands</option>
                              )
                             }
                            </select>
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                    <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Address</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>{
                          setAddress(e.target.value)
                          console.log(e.target.value)
                          }}  placeholder='eg. 3/5 Akran, New road' type="text" />
                        </div>
                      </Form.Group>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                    <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Phone</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>{
                          setPhone(e.target.value)
                          console.log(e.target.value)
                          }}  placeholder='eg. 9929203483' type="text" />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                    <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Map Link</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>{
                          setLocation(e.target.value)
                          console.log(e.target.value)
                          }}  placeholder='eg. https://google.com/maps/nei/...' type="text" />
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
                <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Sort By Brand Name</label>
                          <div className="col-sm-9">
                            <select onChange={(e)=>{
                              //setDealId(e.target.value);
                              setId(e.target.value);
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
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> Brand Name </th>
                        <th> Address </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Data2 && brands?(
                            Data2.map((doc, i) => (
                                <tr key={i}>
                                <td>
                                <td>{brands?brands.filter(d=>d.id==doc.brand_id)[0].name:'...'}</td>
                                </td>
                                <td>{doc.address}</td>
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

export default Outlets;