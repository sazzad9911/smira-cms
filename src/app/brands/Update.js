import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input'
import Axios from 'axios';
import {postData, url} from '../../action'
import { getAuth } from 'firebase/auth';
import app from './../../firebase';
import {useSelector} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

const Update = () => {
    const [date,setDate] =React.useState(new Date())
    const [Name, setName]= React.useState()
    const [Type,setType]= React.useState()
    const [Address,setAddress]= React.useState()
    const [File,setFile]= React.useState()
    const [Phone,setPhone]= React.useState()
    const [error,setError]= React.useState('')
    const auth = getAuth(app)
    const [BrandId,setBrandId]=React.useState(null)
    const brands=useSelector(state => state.brands)
    const {id}=useParams()

    React.useEffect(() => {
      if(brands){
        let arr=brands.filter(d=>d.id==id)
        setName(arr[0].name)
        setType(arr[0].type)
        setAddress(arr[0].outlets)
        setPhone(arr[0].phone)
      }
    },[brands])

    const save=() => {
      if(!Name || !Address || !Type){
        setError('Please fill all the required fields')
        return
      }
      setError('Please wait...')
      postData(url + '/updateData',{
        auth: auth.currentUser,
        tableName: 'brands',
        columns: ['name','type','outlets','phone'],
        values: [Name.replace(/[^\w\s]/gi, ''),Type,Address,Phone],
        condition:'id='+id
      }).then(result => {
        console.log(result);
        setError('Successfully updated the brand. You can reload the page')
          setTimeout(() => {
            window.location.reload()
          },300)
      })
    }
    const changeImage=(file)=>{
      const data=new FormData()
      data.append('file', file[0])
      Axios.post(url+'/uploadWithData',data).then(res=>{
        if(res.data.url){
          postData(url + '/updateData',{
            auth: auth.currentUser,
            tableName: 'brands',
            columns: ['image'],
            values: [res.data.url],
            condition:'id='+id
          }).then(result => {
            console.log(result);
            setError('Image Saved.')
            
          })
        }
      })
    }
    return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Update Brand </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#" onClick={event => event.preventDefault()}>Brand</a></li>
                <li className="breadcrumb-item active" aria-current="page">Update</li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Information</h4>
                  <form className="form-sample">
                    <p className="card-description"> update brand </p>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Brand Name</label>
                          <div className="col-sm-9">
                          <Form.Control value={Name} onChange={(e)=>setName(e.target.value)} placeholder='Brand name'  type="text" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Brand Type</label>
                      <div className="col-sm-9">
                        <select value={Type} onChange={(e) => setType(e.target.value)} className="form-control">
                        <option value=''>Select</option>
                          <option value='Restaurant'>Restaurant</option>
                          <option value='Games'>Games</option>
                          <option value='Camping'>Camping</option>
                          <option value='Travel'>Travel</option>
                          <option value='Shopping'>Shopping</option>
                          <option value='Health'>Health</option>
                          <option value='Services'>Services</option>
                          <option value='Spa & Salons'>Spa & Salons</option>
                        </select>
                      </div>
                    </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Phone Number</label>
                          <div className="col-sm-9">
                          <Form.Control value={Phone} onChange={(e)=>setPhone(e.target.value)} placeholder='your phone number' type="number" />
                          </div>
                        </Form.Group>
                      </div> */}
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Number of Outlets</label>
                          <div className="col-sm-9">
                          <Form.Control value={Address} onChange={(e)=>setAddress(e.target.value)} placeholder='eg. 2' type="number" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Upload Logo</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>{
                            changeImage(e.target.files)
                            setFile(e.target.files)}} name='file' type="file" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                  </form>
                  {error?(
                    <div class="alert alert-primary" role="alert">{error}</div>
                  ):(
                    <></>
                  )}
                  <button onClick={save}  className='btn btn-gradient-secondary btn-rounded btn-fw'>SAVE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
};

export default Update;