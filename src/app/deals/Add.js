import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input'
import { useSelector } from 'react-redux';
import Axios from 'axios'
import {postData, url,writeDate,postAttachment} from '../../action'
import { getAuth } from 'firebase/auth';
import app from './../../firebase';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const Add = () => {
    const [date,setDate] =React.useState(new Date())
    const [Name,setName] = React.useState()
    const [Conditions,setConditions]= React.useState()
    const [Code,setCode]= React.useState(null)
    const [Discount,setDiscount]= React.useState('')
    const [Price,setPrice]= React.useState('')
    const [OpeningTime,setOpeningTime]= React.useState('10:00 AM-12:00 AM,10:00 AM-12:00 AM,10:00 AM-12:00 AM')
    const [OpeningDays,setOpeningDays]= React.useState('SATURDAY,SUNDAY,MONDAY')
    const [For,setFor]= React.useState()
    const [image,setImage]= React.useState()
    const [Brands,setBrands]= React.useState()
    const [Error,setError]= React.useState()
    const [Type,setType]= React.useState()
    const [popularity,setpopularity]= React.useState(0)
    const brands=useSelector(state => state.brands)
    const auth = getAuth(app)
    const [Valid,setValid]= React.useState()
    const [PromoCode,setPromoCode]= React.useState(true)
    const [ImageSize,setImageSize]= React.useState(false)
    const [Description, setDescription]= React.useState()

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

    const saveDeals = () => {
      
      if(!Name || !Conditions || !OpeningTime || !OpeningDays || !For || !Brands || !Valid){
        setError('Fields can not be empty')
        return
      }
     // if(!ImageSize){
      //  setError('You can only add 1320*500 size image')
      //  return
    //  }
      //console.log(Brands)
      //console.log(Name+','+Brands[0].id+','+writeDate(new Date())+','+'0'+','+Brands[0].name+','+Discount+','+Code+','+Conditions+','+Price+','+OpeningTime+','+OpeningDays+','+For+','+Type)
      setError('Please wait...')
      postData(url + '/setData',{
        auth:auth.currentUser,
        tableName: 'deals',
        columns: [`name`, `brand_id`, `image`, `date`, `popularity`, `brand`, `discount`, `code`, `conditions`, `price`, `time`, `days`, `type`,`forr`,`till`,`description`],
        values: [Name,Brands[0].id,"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fphotos-images%2Fpizza.html&psig=AOvVaw3Gf0VulOmM9_pZijRT1dXT&ust=1653378505707000&source=images&cd=vfe&ved=0CAkQjRxqFwoTCKiIlYeR9fcCFQAAAAAdAAAAABAD",writeDate(new Date()),popularity,Brands[0].name,Discount?Discount:'',Code,Conditions,Price?Price:'',OpeningTime.replace(/&nbsp;/g, ','),OpeningDays.replace(/&nbsp;/g, ','),"Pizza",For,Valid,Description?Description:'']
      }).then(result=>{
        if(result.insertId){
          //alert('Successfully Update data')
     // window.location.reload()
      setError('Files are saved. You can reload the page now.')
      setTimeout(() => {
        window.location.reload()
      },200)
      return
        }
  console.log(result)
      })
    return
      const data= new FormData()
      data.append('file',image[0])
      Axios.post(url+'/uploadWithData',data).then(res=>{
        console.log(res.data)
        if(res.data.url){
          postData(url + '/setData',{
            auth:auth.currentUser,
            tableName: 'deals',
            columns: [`name`, `brand_id`, `image`, `date`, `popularity`, `brand`, `discount`, `code`, `conditions`, `price`, `time`, `days`, `type`,`forr`,`till`],
            values: [Name.replace(/[^\w\s]/gi, ''),Brands[0].id,res.data.url,writeDate(new Date()),popularity,Brands[0].name,Discount,Code,Conditions.replace(/[^\w\s]/gi, ''),Price,OpeningTime.replace(/&nbsp;/g, ','),OpeningDays.replace(/&nbsp;/g, ','),Type.replace(/[^\w\s]/gi, ' '),For,Valid]
          }).then(result=>{
            if(result.insertId){
              //alert('Successfully Update data')
         // window.location.reload()
          setError('Files are saved. You can reload the page now.')
          setTimeout(() => {
            window.location.reload()
          },200)
          return
            }
      console.log(result)
          })
        }
      })
     
    }
  
    return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Add Deals </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Deals</a></li>
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
                    <p className="card-description"> Deals info </p>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Title</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setName(e.target.value)}  type="text" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Valid for</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setFor(e.target.value)} placeholder='who can get it.' type="text" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                        <Form.Group className="row">
                          <div className="col-sm-9" onChange={(e)=>{
                            setPromoCode(!PromoCode)
                          }}>
                          <input value={true} className="form-check-input" type="radio" checked={PromoCode}/>
                          <label style={{
                            marginTop:'3px'
                          }} className="form-check-label">Promo Code</label>
                          <br/>
                          <input value={false} className="form-check-input" type="radio" checked={!PromoCode}/>
                          <label style={{
                            marginTop:'3px'
                          }} className="form-check-label">Request Button</label>
                          </div>
                        </Form.Group>
                      </div>
                      {
                        PromoCode?(
                          <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Code</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setCode(e.target.value)} placeholder='6 digit code'  type="text" />
                          </div>
                        </Form.Group>
                      </div>
                        ):(<></>)
                      }
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Conditions</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setConditions(e.target.value)} placeholder='type all your condition' type="text" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Price (optional)</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setPrice(e.target.value)} placeholder='your price with currency'  type="text" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">New Price(Optional)</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setDiscount(e.target.value)} placeholder='declare price with currency' type="text" />
                          </div>
                        </Form.Group>
                        
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Opening Days</label>
                          <div className="col-sm-9">
                          <CKEditor
                             editor={ ClassicEditor }
                             data="<p>SATURDAY,SUNDAY,MONDAY</p>"
                             onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();

                        setOpeningDays(data.replace(/<\/?[^>]+(>|$)/g, ""))
                        
                    } }
                    onBlur={ ( event, editor ) => {
                        //console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                       // console.log( 'Focus.', editor );
                    } }
                />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Opening Times</label>
                          <div className="col-sm-9">
                          <CKEditor
                             editor={ ClassicEditor }
                             data="<p>10:00 AM-12:00 AM,10:00 AM-12:00 AM,10:00 AM-12:00 AM"
                             onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();

                        setOpeningTime(data.replace(/<\/?[^>]+(>|$)/g, ""))
                        
                    } }
                    onBlur={ ( event, editor ) => {
                        //console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                       // console.log( 'Focus.', editor );
                    } }
                />
                          </div>
                        </Form.Group>
                        
                      </div>
                    </div>
                    <div className="row">
                      {
                        /*
                        <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Type</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setType(e.target.value)} placeholder='eg. pizza..... '  type="text" />
                          </div>
                        </Form.Group>
                      </div>
                        */
                      }
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Valid till</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setValid(e.target.value)} placeholder='type of your deal'  type="date" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Description</label>
                          <div className="col-sm-9">
                          <textarea className="form-control" rows="4" placeholder='Description' onChange={(e) => setDescription(e.target.value)} type="text">
                        </textarea>
                          </div>
                        </Form.Group>
                      </div>
                      </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Select Brand</label>
                          <div className="col-sm-9">
                            <select onChange={(e)=>{
                              let data=brands.filter(data => data.id ==e.target.value);
                              setBrands(data);
                            }} className="form-control">
                            <option value=''>Select</option>
                             {
                              brands?(
                                brands.map((doc, i)=>(
                                  <option value={doc.id} key={i}>{doc.name}</option>
                                ))
                              ):(
                                <option>No Brands</option>
                              )
                             }
                            </select>
                          </div>
                        </Form.Group>
                      </div>
                      {
                        /*
                        <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Banner Image</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>{
                            setImage(e.target.files)
                            imageSize(500,1320,e.target.files)
                          }} name='file' type="file" />
                          </div>
                        </Form.Group> 
                      </div>
                        */
                      }
                    </div>
                    {Error?(
                    <div className="alert alert-primary" role="alert">{Error}</div>
                  ):(
                    <></>
                  )}
                  </form>
                  <button onClick={saveDeals}  className='btn btn-gradient-secondary btn-rounded btn-fw'>SAVE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
};

export default Add;