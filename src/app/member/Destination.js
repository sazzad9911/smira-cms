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

const Destination = () => {
    const [Name, setName]= React.useState()
    const [Details,setDetails]= React.useState()
    const [Files,setFiles]= React.useState()
    const [Type,setType]= React.useState()
    const [Error,setError]= React.useState()
    const [Action,setAction]= React.useState(false)
    const [Data, setData]= React.useState(null)
    const auth = getAuth(app)
    const [Category,setCategory]= React.useState()
    const [ImageSize,setImageSize]= React.useState(false)
    const brands=useSelector(state => state.brands)

    React.useEffect(() => {
        postData(url + '/getData',{
            tableName: 'addresses', 
        }).then(data=>{
            if(Array.isArray(data)){
                setData(data)
            }
        })
    },[Action])
    const deleteData = (id) => {
        postData(url + '/deleteData', {
            tableName: 'addresses',
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
            setError("You can only add 800*800 size image")
            return;
        }
        if(!Files || !Details || !Name){
            setError("Field are can not be empty")
            return;
        }
        const data=new FormData()
        data.append('file', Files[0])
        Axios.post(url+'/uploadWithData',data).then(res=>{
          if(res.data.url){
            postData(url + '/setData',{
              auth: auth.currentUser,
              tableName: 'addresses',
              columns: ['city','image','location'],
              values: [Name,res.data.url,Details]
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
          <h3 className="page-title"> Destinations </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>All</a></li>
              <li className="breadcrumb-item active" aria-current="page">Destination</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Information</h4>
                <form className="form-sample">
                  <p className="card-description"> Add destination where we stay </p>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">City</label>
                        <div className="col-sm-9">
                        <Form.Control placeholder='name of the city' onChange={(e)=>setName(e.target.value)}  type="text" />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                    <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Map Link</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>setDetails(e.target.value)} placeholder='google map link' type="text" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                <div className="row">
                   
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Add Thumbnail-800*800</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>{
                            setFiles(e.target.files)
                            imageSize(800,800,e.target.files)
                            }}  type="file" />
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
                        <th> Image </th>
                        <th> City </th>
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
                                <img src={doc.image} alt={doc.city} />
                                </td>
                                <td>{doc.city}</td>
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

export default Destination;