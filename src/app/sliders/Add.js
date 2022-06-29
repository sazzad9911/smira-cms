import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input'
import { postData, url } from '../../action';
import app from '../../firebase';
import { getAuth } from 'firebase/auth';
import {useSelector} from 'react-redux'
import Axios from 'axios'


const Add = () => {
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
  

  React.useEffect(() => {
    if(banner){
    postData(url + '/getData', {
      tableName: 'slider',
      orderColumn: 'id'
    }).then(data => {
      if (Array.isArray(data)) {
        let arr=banner;
        //console.log(data)
        data.forEach(dataItem => {
          arr=arr.filter(d=>d.id!=dataItem.banner_id);
        })
        return setData(arr)
      }
      console.log(data.message)
    })
  }
  }, [])
 
  const save = () => {
    setError('')
    
    if(!ImageSize){
      setError('Image size must be 1320*500 size')
      return
    }
    const data=new FormData()
        data.append('file', Files[0])
        Axios.post(url+'/uploadWithData',data).then(res=>{
          if(res.data.url){
            postData(url + '/setData',{
              auth: auth.currentUser,
              tableName: 'slider',
              columns: ['name','image','brand_id'],
              values: [Name?Name:'',res.data.url,Type?Type:'']
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
  const addFlush=() => {
    if(!Banner || !Index){
      setError('Select banner image and index')
      return 
    }
    postData(url + '/updateData',{
      tableName: 'banner',
      columns: ['number'],
      values:[0],
      condition: 'number=' +Index
    }).then(data => {
      console.log(data)
      postData(url + '/updateData',{
        tableName:'banner',
        columns:['number'],
        values: [Index],
        condition:'id='+Banner
      }).then(data=>{
        console.log(data)
        if(data.affectedRows){
          setError('Changes are saved')
        }
      })
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
        <h3 className="page-title"> Add Slider </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Sliders</a></li>
            <li className="breadcrumb-item active" aria-current="page">Add</li>
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
                        <h4 className="card-title">Activities List</h4>
                        <p className="card-description"> Add slider images to show your offers!!
                        </p>
                        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Information</h4>
                <form className="form-sample">
                  <p className="card-description"> Add slider for a single brand </p>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Title(Optional)</label>
                        <div className="col-sm-9">
                        <Form.Control placeholder='title of the banner' onChange={(e)=>setName(e.target.value)}  type="text" />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                    <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Details</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>setDetails(e.target.value)} placeholder='optional' type="text" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Select Brand(Optional)</label>
                        <div className="col-sm-9">
                          <select onChange={(e) =>{
                            setType(e.target.value);
                          }} className="form-control">
                         <option value=''>Select Brand</option>
                          {
                            brands?(
                                brands.map((doc, i)=>(
                                    <option key={i} value={doc.id}>{doc.name}</option>
                                ))
                            ):(
                                <option value=''>No Brands</option>
                            )
                          }
                          </select>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Add Banner Image-1320*500</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>{
                            setFiles(e.target.files)
                            imageSize(500,1320,e.target.files)
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
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
            <div className="row">
                  <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="card-title">Flash Banner</h4>
                        <p className="card-description"> Add flash banner only two options
                        </p>
                        <div className="row">
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Select a banner</label>
                          <div className="col-sm-9">
                            <select onChange={(e)=>{
                              //setMembership(e.target.value)
                              setBanner(e.target.value);

                            }} className="form-control">
                            <option>Select one</option>
                            {
                              banner?(
                                banner.map((doc, i) =>(
                                  <option key={i} value={doc.id}>
                                    {doc.name}
                                  </option>
                                ))
                              ):(
                                <option>Select one</option>
                              )
                            }
                              
                             
                            </select>
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Select Index</label>
                          <div className="col-sm-9">
                            <select onChange={(e)=>{
                              //setMembership(e.target.value)
                              setIndex(e.target.value)

                            }} className="form-control">
                            <option>Select one</option>
                            <option value={1}>first flush banner</option>
                            <option value={2}>second flush banner</option>
                             
                            </select>
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <p style={{ color: 'red' }}>{Error}</p>
                    <button onClick={() =>{
                      addFlush()
                    }} className='btn btn-gradient-danger btn-rounded btn-fw'>ADD</button>
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

export default Add;