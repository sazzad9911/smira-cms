import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input'
import Axios from 'axios';
import {postData, url} from '../../action'
import { getAuth } from 'firebase/auth';
import app from './../../firebase'; 

const Add = () => {
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

    const save=() => {
      if(!Name || !Address || !Phone || !File || !Type || !Location){
        setError('Please fill all the required fields')
        return
      }
      if(!ImageSize){
        setError('You can only upload 400*400 images')
        return
      }
      setError('Please wait...')
      const data= new FormData()
      data.append('file',File[0])
      Axios.post(url+'/uploadWithData',data).then(res=>{
        console.log(res.data)
        if(res.data.url){
          postData(url + '/setData',{
            auth: auth.currentUser,
            tableName: 'brands',
            columns: ['name','image','type','popularity','address','phone','location'],
            values: [Name.replace(/[^\w\s]/gi, ''),res.data.url,Type,0,Address,Phone,Location]
          }).then(result => {
            console.log(result);
            if (result.insertId){
              setError('Successfully added new brand. You can reload this page.')
              setTimeout(() => {
                window.location.reload()
              },300)
              return
            }
          })
        }
      })
    }
    const imageSize=async(height,width,file)=>{
      var url = URL.createObjectURL(file[0]);
      var img = new Image;
      
      img.onload = function() {
        if(img.width==width && img.height==height){
          console.log("correct")
          setImageSize(true);
          return true;
        }else{
          setImageSize(false);
          URL.revokeObjectURL(img.src);
          return false;
        }
      }
      img.src = url;
    }
    return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Add Brand </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Brand</a></li>
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
                    <p className="card-description"> Add new brand </p>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Brand Name</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setName(e.target.value)} placeholder='Brand name'  type="text" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Brand Type</label>
                      <div className="col-sm-9">
                        <select onChange={(e) => setType(e.target.value)} className="form-control">
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
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Phone Number</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setPhone(e.target.value)} placeholder='eg. +913020394930' type="number" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Address</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setAddress(e.target.value)} placeholder='address' type="text" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Upload Logo (400*400)</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>{
                            imageSize(400,400,e.target.files)
                            setFile(e.target.files)}} name='file' type="file" />
                          </div>
                        </Form.Group>
                        
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Location</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setLocation(e.target.value)} placeholder='give map link.'  type="text" />
                          </div>
                        </Form.Group>
                      </div>
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

export default Add;