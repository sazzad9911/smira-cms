import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input'
import { postData, url } from '../../action';
import app from '../../firebase';
import { getAuth } from 'firebase/auth';
import {useSelector} from 'react-redux'
import Axios from 'axios'
import { MultiSelect } from "react-multi-select-component";


const Notificaltion = () => {
  const [Data, setData] = React.useState(null)
  const [Action, setAction] = React.useState(false)
  const banner=useSelector(state => state.banner)
  const auth=getAuth(app)
  const [Error, setError]= React.useState()
  const [Banner,setBanner]=React.useState()
  const [Index, setIndex]= React.useState()
  const [Files, setFiles]= React.useState()
  const [Type, setType]= React.useState()
  const [Details, setDetails]= React.useState()
  const [Name, setName]= React.useState()
  const brands=useSelector(state => state.brands)
  const [ImageSize,setImageSize]= React.useState(false)
  const [User, setUser]= React.useState()
  const [Options,setOptions]=React.useState()
  const [selected, setSelected] = React.useState([]);
  
  React.useEffect(() => {
    postData(url + '/getData', {
      tableName: 'user',
    }).then(data => {
      if (Array.isArray(data)) {
        let arr=[]
        let count=0;
        data.forEach((doc, i)=>{
          if(doc.token && count<500){
            arr.push({ label: doc.name, value: doc.uid })
            count++;
          }
        })
        setOptions(arr)
        return setData(data)
      }
      console.log(data.message)
    })
  }, [])
 
  const save = () => {
    setError('')
    const array=JSON.parse(JSON.stringify(selected))
    if(!Name || !Details || array.length==0){
        setError('Please fill all the required fields')
        return
    }
    let newArr=[]
    array.forEach((doc,i) => {
      newArr.push(doc.value)
    })
    
    postData(url+'/sendMessages',{
        title:Name,
        body:Details,
        uid:newArr
      }).then(result => {
        console.log(result);
        if(result.success) {
          setError('Message has send')
          setAction(!Action)
        }else{
          setError(result.message)
        }
      }).catch(error => {
        console.log(error.message);
      })
  }
  
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Send Message </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Message</a></li>
            <li className="breadcrumb-item active" aria-current="page">Send</li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
            <div className="row">
                  <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Information</h4>
                <form className="form-sample">
                  <p className="card-description"> Send notification to single user </p>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Title*</label>
                        <div className="col-sm-9">
                        <Form.Control placeholder='title of the banner' onChange={(e)=>setName(e.target.value)}  type="text" />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                    <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Body*</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>setDetails(e.target.value)} placeholder='optional' type="text" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                <div className="row">
                <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Select Users</label>
                        <div className="col-sm-9">
                        <div style={{display:'flex',flexWrap:'wrap'}}>{JSON.parse(JSON.stringify(selected)).map((doc,i)=>(
                          <p style={{margin:'5px'}} key={i}>{doc.label}</p>
                        ))}</div>
                            {
                              Options&&Options.length>0?(
                                <MultiSelect
                              options={Options}
                             value={selected}
                              onChange={(val)=>{
                                setSelected(val);
                                
                              }}
                             labelledBy="Select"
                            />
                              ):(<>Loading..</>)
                            }
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
                <button onClick={save} className='btn btn-gradient-secondary btn-rounded btn-fw'>SEND</button>
              </div>
            </div>
          </div>
        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Notificaltion;