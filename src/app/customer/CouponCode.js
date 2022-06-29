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

const CouponCode = () => {
    const [Name, setName]= React.useState()
    const [Code,setCode]= React.useState()
    const [Offer,setOffer]= React.useState()
    const [Error,setError]= React.useState()
    const [Action,setAction]= React.useState(false)
    const [Data, setData]= React.useState(null)
    const auth = getAuth(app)
    const [Category,setCategory]= React.useState()
    const [ImageSize,setImageSize]= React.useState(false)
    const brands=useSelector(state => state.brands)
    const [CouponUser,setCouponUser]= React.useState()

    React.useEffect(() => {
        postData(url + '/getData',{
            tableName: 'cuppon_code', 
        }).then(data=>{
            if(Array.isArray(data)){
                setData(data)
            }
        })
    },[Action])
    React.useEffect(()=>{
      postData(url + '/getData',{
        tableName: 'cuppon_user',
      }).then(user=>{
        if(Array.isArray(user)&& user.length>0){
         return setCouponUser(user)
        }
        console.log(user);
      })
    },[])
    const deleteData = (id) => {
        postData(url + '/deleteData', {
            tableName: 'cuppon_code',
            condition:'id='+id,
        }).then(data => {
            console.log(data)
            setAction(!Action)
        })
    }

    const save=()=>{
      
        
        if(!Offer || !Code || !Name){
            setError("Field are can not be empty")
            return;
        }
        if(Offer<0 || Offer>99){
          setError('Offer percentage can be 0 to 99')
          return
        }
        postData(url + '/setData',{
            auth: auth.currentUser,
            tableName: 'cuppon_code',
            columns: ['name','code','offer'],
            values: [Name,Code,Offer]
          }).then(result => {
            console.log(result);
            if(result.insertId){
              setError('Code is added successfully')
              setAction(!Action)
            }else{
              setError(result.message)
            }
          })
      }
    return (
        <div>
        <div className="page-header">
          <h3 className="page-title"> Coupon Codes </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>All</a></li>
              <li className="breadcrumb-item active" aria-current="page">Coupons</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Information</h4>
                <form className="form-sample">
                  <p className="card-description"> Add coupon code for give extra bonus. </p>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Title of the code</label>
                        <div className="col-sm-9">
                        <Form.Control placeholder='eg. You receive 20% discount' onChange={(e)=>setName(e.target.value)}  type="text" />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                    <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Code</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>setCode(e.target.value)} placeholder='eg. XKLSCT' type="text" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                <div className="row">
                   
                    <div className="col-md-6">
                    <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Offer in %</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>{
                          setOffer(e.target.value)
                          console.log(e.target.value)
                          }}  placeholder='eg. 20' type="number" />
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
                        <th> Name </th>
                        <th> Offer in % </th>
                        <th> Code </th>
                        <th>Total User</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Data?(
                            Data.length>0 ?(
                                Data.map((doc, i) => (
                                <tr key={i}>
                                <td>{doc.name}</td>
                                <td>
                                {doc.offer}
                                </td>
                                <td>{doc.code}</td>
                                <td>
                                  {
                                    CouponUser?
                                    CouponUser.filter(d=>d.code==doc.code).length:'0'
                                  }
                                </td>
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

export default CouponCode;