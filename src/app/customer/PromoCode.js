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

const PromoCode = () => {
    const [Code, setCode]= React.useState()
    const [DatePicker,setDatePicker]= React.useState()
    const [Error,setError]= React.useState()
    const [Action,setAction]= React.useState(false)
    const [Data, setData]= React.useState(null)
    const auth = getAuth(app)
    const [Category,setCategory]= React.useState()
    const [ImageSize,setImageSize]= React.useState(false)
    const brands=useSelector(state => state.brands)
    const [Offer,setOffer]= React.useState()

    React.useEffect(() => {
        postData(url + '/getData',{
            tableName: 'promo_code', 
        }).then(data=>{
            if(Array.isArray(data)){
                setData(data)
            }
        })
    },[Action])
    const deleteData = (id) => {
        postData(url + '/deleteData', {
            tableName: 'promo_code',
            condition:'id='+id,
        }).then(data => {
            console.log(data)
            setAction(!Action)
        })
    }
   
    const save=()=>{
        if(!Code || !DatePicker){
            setError("Field are can not be empty")
            return;
        }
        const type =Code.substr(0,4);
        if((type=='SLVP' || type=='GLDP' || type=='PLNP' || type=='DMNP')&& !Offer){
          setError("Error! For give discount you have to specify offer in %")
          return
        }
        postData(url + '/setData',{
            auth: auth.currentUser,
            tableName: 'promo_code',
            columns: ['code','validity','offer'],
            values: [Code,writeDate(new Date(DatePicker)),Offer?Offer:'']
          }).then(result => {
            console.log(result);
            if(result.insertId){
              setError('Promo code is saved')
              setAction(!Action)
            }else{
              setError(result.message)
            }
          })
      }
    return (
        <div>
        <div className="page-header">
          <h3 className="page-title"> Promo Code</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>All</a></li>
              <li className="breadcrumb-item active" aria-current="page">Promo Code</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Information</h4>
                <form className="form-sample">
                  <p className="card-description"> Add promo code for give 1 month free trail or discount on membership using first key 
                  Silver - SLVP...,Gold - GLDP....,Platinum - PLNP...,Diamond - DMNP </p>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Code</label>
                        <div className="col-sm-9">
                        <Form.Control placeholder='eg. DKI79GF' onChange={(e)=>setCode(e.target.value)}  type="text" />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                    <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Validity</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>setDatePicker(e.target.value)} placeholder='validity date' type="date" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                <div className="row">
                <div className="col-md-6">
                    <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Offer in %</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>setOffer(e.target.value)} placeholder='eg. 20' type="number" />
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
                        <th> Code </th>
                        <th> Validity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Data?(
                            Data.length>0 ?(
                                Data.map((doc, i) => (
                                <tr key={i}>
                                <td>{doc.code}</td>
                                <td>{convertDate(doc.validity)}</td>
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

export default PromoCode;