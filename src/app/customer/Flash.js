import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input'
import { useSelector } from 'react-redux';
import Axios from 'axios'
import {postData, url,writeDate,postAttachment,convertDate} from '../../action'
import { getAuth } from 'firebase/auth';
import app from './../../firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

const Flash = () => {
    const [Files,setFiles]= React.useState()
    const [Type,setType]= React.useState()
    const [Error,setError]= React.useState()
    const [Action,setAction]= React.useState(false)
    const [Data, setData]= React.useState(null)
    const auth = getAuth(app)
    const [Category,setCategory]= React.useState()
    const [ImageSize,setImageSize]= React.useState(false)
    const brands=useSelector(state => state.brands)
    const [Date,setDate]= React.useState()

    React.useEffect(() => {
        postData(url + '/getData',{
            tableName: 'flash_banner',
        }).then(data=>{
            if(Array.isArray(data)){
                setData(data)
            }
        })
    },[Action])
    const deleteData = (id) => {
        postData(url + '/deleteData', {
            tableName: 'flash_banner',
            condition:'id='+id,
        }).then(data => {
            console.log(data)
            
            setAction(!Action)
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
    const save=()=>{
        if(!ImageSize){
            setError("You can only add 700*500 size image")
            return;
        }
        if(!Date){
          setError("Invalid date for validity")
          return;
        }
        const data=new FormData()
        data.append('file', Files[0])
        Axios.post(url+'/uploadWithData',data).then(res=>{
          if(res.data.url){
            postData(url + '/setData',{
              auth: auth.currentUser,
              tableName: 'flash_banner',
              columns: ['image','validity'],
              values: [res.data.url,Date]
            }).then(result => {
              console.log(result);
              if(result.insertId){
                setError('Image Saved.')
                setAction(!Action)
              }else{
                setError(result.message)
              }
            })
          }
        })
      }
    return (
        <div>
        <div className="page-header">
          <h3 className="page-title"> Flash Popup </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>All</a></li>
              <li className="breadcrumb-item active" aria-current="page">Images</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Information</h4>
                <form className="form-sample">
                  <p className="card-description"> Add image for a single offer </p>
                <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Add Banner Image-500*700</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>{
                            setFiles(e.target.files)
                            imageSize(700,500,e.target.files)
                            }}  type="file" />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Validity</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>{
                            setDate(e.target.value);
                            console.log(e.target.value)
                            }}  type="date" />
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
                <button onClick={save} className='btn btn-gradient-secondary btn-rounded btn-fw'>SAVE</button>
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
                        <th> Number </th>
                        <th> Image </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Data?(
                            Data.length>0 ?(
                                Data.map((doc, i) => (
                                <tr key={i}>
                                <td>
                                <p>{i+1}</p>
                                </td>
                                <img style={{
                                    width: '100px',
                                    height:'100px',
                                    margin: '5px'
                                }} src={doc.image} alt={doc.name} />
                                <td>
                                <button className='btn btn-gradient-danger btn-rounded btn-fw' onClick={()=>{
                                    deleteData(doc.id)
                                }}>
                                Delete
                                </button>
                                </td>
                                </tr>
                            ))
                            ):(
                                <tr><td>No data available</td></tr>
                            )
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

export default Flash;