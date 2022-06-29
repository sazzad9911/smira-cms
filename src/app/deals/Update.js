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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const Update = () => {
    const {id}=useParams()
    const [date,setDate] =React.useState(new Date())
    const [Name,setName] = React.useState()
    const [Conditions,setConditions]= React.useState()
    const [Code,setCode]= React.useState(null)
    const [Discount,setDiscount]= React.useState()
    const [Price,setPrice]= React.useState()
    const [OpeningTime,setOpeningTime]= React.useState()
    const [OpeningDays,setOpeningDays]= React.useState()
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
    const deals = useSelector(state => state.deals)
    const [text,setText]= React.useState()
    const [times,setTimes] =React.useState()
    const [Description, setDescription]= React.useState()

    React.useEffect(() => {
      if(deals&&brands){
        let arr=deals.filter(d=>d.id ==id)
        setName(arr[0].name)
        setConditions(arr[0].conditions)
        setCode(arr[0].code)
        setDiscount(arr[0].discount)
        setPrice(arr[0].price)
        setOpeningTime(arr[0].time)
        setOpeningDays(arr[0].days)
        setFor(arr[0].forr)
        setBrands(brands.filter(data => data.id ==arr[0].brand_id))
        setType(arr[0].type)
        setValid(writeDate(new Date(arr[0].till)))
        setText("<p>"+arr[0].days+"</p>")
        setTimes("<p>"+arr[0].time+"</p>")
        setDescription(arr[0].description)
      }
    },[deals+brands])

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
    const changeImage=(file)=>{
      const data=new FormData()
      data.append('file', file[0])
      Axios.post(url+'/uploadWithData',data).then(res=>{
        if(res.data.url){
          postData(url + '/updateData',{
            auth: auth.currentUser,
            tableName: 'deals',
            columns: ['image'],
            values: [res.data.url],
            condition:'id='+id
          }).then(result => {
            console.log(result);
            setError('Image Saved.')
          })
        }
      })
    }
    const saveDeals = () => {
      
      if(!Name || !Conditions || !OpeningTime || !OpeningDays || !For || !Brands || !Type || !Valid){
        setError('Fields can not be empty')
        return
      }
      
      //console.log(Brands)
      //console.log(Name+','+Brands[0].id+','+writeDate(new Date())+','+'0'+','+Brands[0].name+','+Discount+','+Code+','+Conditions+','+Price+','+OpeningTime+','+OpeningDays+','+For+','+Type)
      setError('Please wait...')
      postData(url + '/updateData',{
        auth:auth.currentUser,
        tableName: 'deals',
        columns: [`name`, `brand_id`, `brand`, `code`, `conditions`, `price`, `time`, `days`, `type`,`forr`,`till`,`discount`,`description`],
        values: [Name,Brands[0].id,Brands[0].name,Code,Conditions,Price?Price:'',OpeningTime,OpeningDays,Type,For,Valid,Discount?Discount:'',Description?Description:''],
        condition:'id='+ id
      }).then(result=>{
          //alert('Successfully Update data')
     // window.location.reload()
      setError('Files are saved. You can reload the page now.')
      setTimeout(() => {
        window.location.reload()
      },500)
        console.log(result)
      })
     
    }
  
    return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Update Deals </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Deals</a></li>
                <li className="breadcrumb-item active" aria-current="page">Update</li>
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
                          <Form.Control value={Name} onChange={(e)=>setName(e.target.value)}  type="text" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Valid for</label>
                          <div className="col-sm-9">
                          <Form.Control value={For} onChange={(e)=>setFor(e.target.value)} placeholder='who can get it.' type="text" />
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
                          <Form.Control value={Code?Code:''} onChange={(e)=>setCode(e.target.value)} placeholder='6 digit code'  type="text" />
                          </div>
                        </Form.Group>
                      </div>
                        ):(<></>)
                      }
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Conditions</label>
                          <div className="col-sm-9">
                          <Form.Control value={Conditions} onChange={(e)=>setConditions(e.target.value)} placeholder='type all your condition' type="text" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Price</label>
                          <div className="col-sm-9">
                          <Form.Control value={Price} onChange={(e)=>setPrice(e.target.value)} placeholder='your price'  type="number" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">New Price</label>
                          <div className="col-sm-9">
                          <Form.Control value={Discount} onChange={(e)=>setDiscount(e.target.value)} placeholder='eg. New price here' type="text" />
                          </div>
                        </Form.Group>
                        
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Opening Days</label>
                          <div className="col-sm-9">
                          {
                            text?(
                              <CKEditor
                             editor={ ClassicEditor }
                             data={text}
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
                            ):(<></>)
                          }
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Opening Times</label>
                          <div className="col-sm-9">
                         {
                          times?(
                            <CKEditor
                             editor={ ClassicEditor }
                             data={times}
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
                          ):(<></>)
                         }
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
                          <Form.Control value={Type?Type:''} onChange={(e)=>setType(e.target.value)} placeholder='eg. pizza,burger,hair cut.. '  type="text" />
                          </div>
                        </Form.Group>
                      </div>
                        */
                      }
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Valid till</label>
                          <div className="col-sm-9">
                          <Form.Control value={Valid} onChange={(e)=>setValid(e.target.value)} placeholder='type of your deal'  type="date" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Description</label>
                          <div className="col-sm-9">
                          <textarea value={Description} className="form-control" rows="4" placeholder='Description' onChange={(e) => setDescription(e.target.value)} type="text">
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
                            <select value={Brands?Brands[0].id:''} onChange={(e)=>{
                              let data=brands.filter(data => data.id ==e.target.value);
                              setBrands(data);
                              console.log(data)
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
                      <div className="col-md-6">
                        {
                          /*
                          <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Image</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>{
                            setImage(e.target.files)
                            imageSize(500,1320,e.target.files)
                          }} name='file' type="file" />
                          </div>
                        </Form.Group>
                          */
                        }
                      </div>
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

export default Update;