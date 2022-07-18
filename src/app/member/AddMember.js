import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input'
import Axios from 'axios';
import {postData, url} from '../../action'
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import app from './../../firebase'; 

const AddMember = () => {
    const [date,setDate] =React.useState(new Date())
    const [Name, setName]= React.useState()
    const [Type,setType]= React.useState()
    const [Address,setAddress]= React.useState()
    const [File,setFile]= React.useState()
    const [Phone,setPhone]= React.useState()
    const [error,setError]= React.useState('')
    const auth = getAuth(app)
    const [ImageSize,setImageSize]= React.useState(false)
    const [Location,setLocation]= React.useState()
    const [Password,setPassword]= React.useState()

    const save=() => {
      if(!Name || !Address || !Password ){
        setError('Please fill all the required fields')
        return
      }
      if(Password.length<6){
        setError('Password must be at least 6 characters')
        return
    }
      setError('Please wait...')
        createUserWithEmailAndPassword(auth, Address, Password)
            .then(userCredentials => {
                postData(url + '/setData', {
                    auth: userCredentials.user,
                    tableName: 'user',
                   columns: ['name', 'email', 'uid'],
                   values:[Name,Address,userCredentials.user.uid]
                }).then(data => {
                    setError('Successful! Member has added successfully.')
            }).catch(err => {
                setError('Email address is invalid.')
                console.log(err.message)
            })     
        })
    }
   
    return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Add Member </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Member</a></li>
                <li className="breadcrumb-item active" aria-current="page">Add</li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Information</h4>
                  <form className="form-sample">
                    <p className="card-description"> Add new member </p>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Name</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setName(e.target.value)} placeholder='Member name'  type="text" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      {/* <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Authentication Type</label>
                      <div className="col-sm-9">
                        <select onChange={(e) => setType(e.target.value)} className="form-control">
                        <option value='email'>Email</option>
                          <option value='phone'>Phone</option>
                          
                        </select>
                      </div>
                    </Form.Group> */}
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Main Branch Phone Number</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setPhone(e.target.value)} placeholder='eg. +913020394930' type="number" />
                          </div>
                        </Form.Group>
                      </div> */}
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">{Type=='phone'?'Phone':'Email'}</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setAddress(e.target.value)} placeholder='eg. someone@gmail.com' type="email" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Password </label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>{
                            setPassword(e.target.value);
                           }} name='file' type="text" />
                          </div>
                        </Form.Group>
                        
                      </div>
                      {/* <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Main Branch Location</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setLocation(e.target.value)} placeholder='give map link.'  type="text" />
                          </div>
                        </Form.Group>
                      </div> */}
                    </div>
                  </form>
                  {error?(
                    <div className="alert alert-primary" role="alert">{error}</div>
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

export default AddMember;