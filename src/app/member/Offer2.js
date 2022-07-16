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
import { MultiSelect } from "react-multi-select-component";

const Offer2 = () => {
    const [Name, setName]= React.useState()
    const [Details,setDetails]= React.useState()
    const [Files,setFiles]= React.useState()
    const [Type,setType]= React.useState('Restaurant')
    const [Error,setError]= React.useState()
    const [Action,setAction]= React.useState(false)
    const [Data, setData]= React.useState(null)
    const auth = getAuth(app)
    const [Category,setCategory]= React.useState('Restaurant')
    const [ImageSize,setImageSize]= React.useState(false)
    const brands=useSelector(state => state.brands)
    const [Options,setOptions]=React.useState()
    const [selected, setSelected] = React.useState([]);

    React.useEffect(() => {
      if(brands){
        let arr=[]
        brands.forEach((doc, i)=>{
          arr.push({ label: doc.name, value: doc.id })
        })
        setOptions(arr)
      }
    },[brands])
    React.useEffect(() => {
        postData(url + '/getData',{
            tableName: 'offer',
            condition:`id=2`
        }).then(data=>{
            if(Array.isArray(data) && data.length!=0){
                setData(data)
                setName(data[0].name)
                setDetails(data[0].details)
            }else{
                setData([])
            }
        })
    },[Action])
    const deleteData = (id) => {
        postData(url + '/deleteData', {
            tableName: 'poster',
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
            setError("Select 1300*800 image file")
            return;
        }
        if(!Files || !selected){
            setError("Image and brands field are can not be empty")
            return;
        }
        //add those line
        const array=JSON.parse(JSON.stringify(selected))
        let text=null;
        array.forEach(doc=>{
          if(text){
            text=text+','+doc.value
          }else{
            text=doc.value
          }
        })
        //
        const data=new FormData()
        data.append('file', Files[0])
        Axios.post(url+'/uploadWithData',data).then(res=>{
          if(res.data.url){
            postData(url + '/updateData',{
              auth: auth.currentUser,
              tableName: 'offer',
              columns: ['name','image','details','type','brands'],
              values: [Name,res.data.url,Details,Type?Type:'',text],
              condition:`id=2`
            }).then(result => {
              console.log(result);
              if(result.affectedRows){
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
          <h3 className="page-title"> Favorite Categories </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>All</a></li>
              <li className="breadcrumb-item active" aria-current="page">Poster</li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Information</h4>
                <form className="form-sample">
                  <p className="card-description"> Add Poster with brand list </p>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Title</label>
                        <div className="col-sm-9">
                        <Form.Control value={Name} placeholder='optional' onChange={(e)=>setName(e.target.value)}  type="text" />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                    <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Details</label>
                        <div className="col-sm-9">
                        <Form.Control value={Details} onChange={(e)=>setDetails(e.target.value)} placeholder='optional' type="text" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Select Brands</label>
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
                              ):(<></>)
                            }
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Add Poster Image-1300*800</label>
                        <div className="col-sm-9">
                        <Form.Control onChange={(e)=>{
                            setFiles(e.target.files)
                            imageSize(800,1300,e.target.files)
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
                <Form.Group className="row">
                        {/* <label className="col-sm-3 col-form-label">Select Category</label>
                        <div className="col-sm-9">
                          <select onChange={(e) =>{
                            setCategory(e.target.value);
                          }} className="form-control">
                         <option value='Restaurant'>Restaurant</option>
                          <option value='Games'>Games</option>
                          <option value='Camping'>Camping</option>
                          <option value='Travel'>Travel</option>
                          <option value='Shopping'>Shopping</option>
                          <option value='Health'>Health</option>
                          <option value='Services'>Services</option>
                          <option value='Spa & Salons'>Spa & Salons</option>
                          </select>
                        </div> */}
                      </Form.Group>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> Image </th>
                        <th> Title </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Data?(
                            Data.length>0 ?(
                                Data.map((doc, i) => (
                                <tr key={i}>
                                <td>
                                <img src={doc.image} alt={doc.name} />
                                </td>
                                <td>{doc.name}</td>
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

export default Offer2;