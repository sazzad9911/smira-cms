import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input'
import { postData,url,writeDate } from '../../action';
import Axios from 'axios'
import { useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import app from './../../firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
const Update = () => {
  const [date, setDate] = React.useState(new Date())
  const [conditions, setConditions] = React.useState([])
  const [Name, setName] = React.useState('')
  const [Address, setAddress] = React.useState('')
  const [Description, setDescription] = React.useState('')
  const [CheckIn, setCheckIn] = React.useState('')
  const [CheckOut, setCheckOut] = React.useState('')
  const [Category, setCategory] = React.useState('villas')
  const [File,setFile]= React.useState(null)
  const [error,setError] = React.useState(null)
  const addresses=useSelector(state => state.addresses)
  const [NearBy1,setNearBy1]= React.useState('')
  const [Text,setText] = React.useState('')
  const container = React.useRef()
  const [NearBy2,setNearBy2]= React.useState('')
  const [Location,setLocation]= React.useState('')
  const [ImageSize,setImageSize]= React.useState(false)
  const {id}=useParams()
  const [Data, setData]= React.useState(null)
  const hotels = useSelector(state => state.hotels)
  const [Near,setNear]= React.useState()
  const [Phone, setPhone]= React.useState()
  const [Remember, setRemember]= React.useState()
  //console.log(addresses)
  const auth = getAuth(app)

  React.useEffect(() => {
    if(hotels && id){
      let arr=hotels.filter(d=>d.id ==id)
      if(arr){
        setData(arr[0])
      setName(arr[0].name)
      setAddress(arr[0].address)
      setConditions(arr[0].conditions.split(','))
      setNearBy1(arr[0].near_by.split(',')[0])
      setNearBy2(arr[0].near_by.split(',')[1])
      setLocation(arr[0].location)
      setCategory(arr[0].categories)
      setFile(arr[0].image)
      setCheckIn(arr[0].check_in)
      setCheckOut(arr[0].check_out)
      setDescription(arr[0].description)
      setPhone(arr[0].phone)
      }
    }
  },[hotels+id])
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
          tableName: 'hotels',
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
  const saveHotel = () => {
    if(!Name || !Address || !Description || !CheckIn || !CheckOut
       || !NearBy1 || !Location || !conditions || !Phone){
      
      setError('Please fill all the required fields')
      return
    }
    //return
    setError('Please wait...')
    postData(url + '/updateData',{
      auth: auth.currentUser,
      tableName: 'hotels',
      columns: ['name','address','location','check_in','check_out','conditions','description','categories','near_by','phone'],
      values: [Name.replace(/[^\w\s]/gi, ''),Address,Location,CheckIn,CheckOut,handleAmenities(conditions),Description,Category,NearBy1+(NearBy2?','+NearBy2:''),Phone],
      condition:'id='+ id
    }).then(result => {
      console.log(result);
      setError('Done. You can reload your page now');
        setTimeout(() => {
          window.location.reload()
        },300); 
    })
   
  }
  const convertTime =(time) => {
    let text=''
    for(var i=0; i < time.length; i++){
      if(time[i]==' '){
        break
      }else{
        text+=time[i]
      }
    }
    if(time[1]==':'){
      text='0'+text
    }
    console.log(text)
    return text
  }
 const handleAmenities=(arr) => {
  if(Array.isArray(arr)){
    let text=''
    arr.forEach((doc, i)=>{
      text=(text?text+','+doc:doc)
    })
    //console.log(text)
    return text
  }
  return null
 }
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Update Hotel </h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#" onClick={event => event.preventDefault()}>Hotel</a></li>
            <li className="breadcrumb-item active" aria-current="page">Update</li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Information</h4>
              <div className="form-sample">
                <p className="card-description"> Give information about it</p>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Name</label>
                      <div className="col-sm-9">
                        <Form.Control value={Name}  placeholder='Hotel Name' onChange={(e) => setName(e.target.value)} type="text" />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Address</label>
                      <div className="col-sm-9">
                        <Form.Control value={Address} placeholder='Hotel Address' onChange={(e) => setAddress(e.target.value)} type="text" />
                        
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p>Amenities</p>
                    <Form.Group className="row">
                      <div className="col-sm-9">
                      <div className="form-check">
                       <input onChange={(e)=>{
                        if(e.target.checked){
                          let arr=conditions
                          arr.push(e.target.value)
                          setConditions(arr)
                        }else{
                          let arr=conditions.filter(d=>d!=e.target.value)
                          setConditions(arr)
                        }
                       }} className="form-check-input" type="checkbox"
                       checked={conditions.find(d=>d=="parking")?true:false} value="parking" id="defaultCheck1"></input>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                        Parking
                       </label>
                      </div>
                      <div className="form-check">
                       <input onChange={(e)=>{
                        if(e.target.checked){
                          let arr=conditions
                          arr.push(e.target.value)
                          setConditions(arr)
                        }else{
                          let arr=conditions.filter(d=>d!=e.target.value)
                          setConditions(arr)
                        }
                       }} className="form-check-input" type="checkbox"
                       checked={conditions.find(d=>d=="tv")?true:false}
                        value="tv" id="defaultCheck1"></input>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                        Tv
                       </label>
                      </div>
                      <div className="form-check">
                       <input onChange={(e)=>{
                        if(e.target.checked){
                          let arr=conditions
                          arr.push(e.target.value)
                          setConditions(arr)
                        }else{
                          let arr=conditions.filter(d=>d!=e.target.value)
                          setConditions(arr)
                        }
                       }} className="form-check-input" type="checkbox"
                       checked={conditions.find(d=>d=="wifi")?true:false}
                        value="wifi" id="defaultCheck1"></input>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                        Wifi
                       </label>
                      </div>
                      <div className="form-check">
                       <input onChange={(e)=>{
                        if(e.target.checked){
                          let arr=conditions
                          arr.push(e.target.value)
                          setConditions(arr)
                        }else{
                          let arr=conditions.filter(d=>d!=e.target.value)
                          setConditions(arr)
                        }
                       }} className="form-check-input" type="checkbox" 
                       checked={conditions.find(d=>d=="cctv")?true:false}
                       value="cctv" id="defaultCheck1"></input>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                        CCTV
                       </label>
                      </div>
                      <div className="form-check">
                       <input onChange={(e)=>{
                        if(e.target.checked){
                          let arr=conditions
                          arr.push(e.target.value)
                          setConditions(arr)
                        }else{
                          let arr=conditions.filter(d=>d!=e.target.value)
                          setConditions(arr)
                        }
                       }} className="form-check-input" type="checkbox"
                        value="gym" id="defaultCheck1" checked={conditions.find(d=>d=="gym")?true:false}></input>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                        Gym
                       </label>
                      </div>
                      <div className="form-check">
                       <input onChange={(e)=>{
                        if(e.target.checked){
                          let arr=conditions
                          arr.push(e.target.value)
                          setConditions(arr)
                        }else{
                          let arr=conditions.filter(d=>d!=e.target.value)
                          setConditions(arr)
                        }
                       }} className="form-check-input" type="checkbox"
                        value="swmming" id="defaultCheck1" checked={conditions.find(d=>d=="swmming")?true:false}></input>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                        Swimming
                       </label>
                      </div>

                        {
                          /*
                          <select onChange={(e) => {
                          if (e.target.value) {
                            setConditions(conditions ? conditions + "," + e.target.value : e.target.value)
                          }
                        }} className="form-control">
                          <option value='parking'>Parking</option>
                          <option value='tv'>Tv</option>
                          <option value='wifi'>Wifi</option>
                          <option value='cctv'>CCTV</option>
                          <option value='swmming'>Swimming</option>
                          <option value='gym'>gym</option>
                        </select>
                          */
                        }
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Near by places 1</label>
                      <div className="col-sm-9">
                        <Form.Control value={NearBy1} placeholder='eg. 500m away from Sai Baba Mandir' onChange={(e) => {
                          setNearBy1(e.target.value)
                        }} type="text" />
                      </div>
                    </Form.Group>
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Near by places 2</label>
                      <div className="col-sm-9">
                        <Form.Control value={NearBy2} placeholder='eg. 500m away from Sai Baba Mandir' onChange={(e) => {
                          setNearBy2(e.target.value)
                        }} type="text" />
                      </div>
                    </Form.Group>
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Map Link</label>
                      <div className="col-sm-9">
                        <Form.Control value={Location} placeholder='google map link' 
                        onChange={(e) => setLocation(e.target.value)} type="text" />
                      </div>
                    </Form.Group>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Check In</label>
                      <div className="col-sm-9">
                        <Form.Control value={convertTime(CheckIn)}  placeholder='eg. 12:00 PM- 10AM' onChange={(e) => {
                          let arr=e.target.value.split(':')
                          let text=''
                          if(parseInt(arr[0])>12) {
                            text = parseInt(arr[0])-12+':'+arr[1]+' PM'
                          }else if(parseInt(arr[0])==12) {
                            text = 12+':'+arr[1]+' PM'
                          }else if(parseInt(arr[0])==0){
                            text = 12+':'+arr[1]+' AM'
                          }
                          else{
                            text = arr[0]+':'+arr[1]+' AM'
                          }
                          setCheckIn(text)
                        }} type="time" />
                      </div>
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Category</label>
                      <div className="col-sm-9">
                        <select value={Category} onChange={(e) => setCategory(e.target.value)} className="form-control">
                          <option value='villas'>Villas</option>
                          <option value='farm-house'>Farm House</option>
                          <option value='deluxe'>Deluxe</option>
                        </select>
                      </div>
                    </Form.Group>
                  </div>
                </div>

                <div className="row">

                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Check Out</label>
                      <div className="col-sm-9">
                        <Form.Control value={convertTime(CheckOut)} placeholder='eg. 12:00 PM- 10AM' onChange={(e) => {
                          let arr=e.target.value.split(':')
                          let text=''
                          if(parseInt(arr[0])>12) {
                            text = parseInt(arr[0])-12+':'+arr[1]+' PM'
                          }else if(parseInt(arr[0])==12) {
                            text = 12+':'+arr[1]+' PM'
                          }else if(parseInt(arr[0])==0){
                            text = 12+':'+arr[1]+' AM'
                          }
                          else{
                            text = arr[0]+':'+arr[1]+' AM'
                          }
                          setCheckOut(text)
                        }} type="time" />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Thumbnail Image</label>
                      <div className="col-sm-9">
                        <Form.Control name='file' onChange={(e) => {
                          changeImage(e.target.files)
                          }} type="file" />
                      </div>
                    </Form.Group>
                  </div>

                </div>
                <div className="row">
                <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Description</label>
                      <div className="col-sm-9">
                        <textarea value={Description}className="form-control" rows="4" placeholder='Description' onChange={(e) => setDescription(e.target.value)} type="text">
                        </textarea>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Things to remember</label>
                      <div className="col-sm-9">
                        <textarea value={Remember} className="form-control" rows="4" placeholder='Things to remember' onChange={(e) => setRemember(e.target.value)} type="text">
                        </textarea>
                      </div>
                    </Form.Group>
                  </div>
                </div> 
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">Contact Number</label>
                      <div className="col-sm-9">
                        <Form.Control value={Phone} placeholder='contact number' onChange={(e) => setPhone(e.target.value)} type="text" />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <button onClick={saveHotel} className='btn btn-gradient-secondary btn-rounded btn-fw'>SAVE</button>
                  </div>
                  <div className="col-md-6">
                  {error?(
                    <div className="alert alert-primary" role="alert">{error}</div>
                  ):(
                    <></>
                  )}
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

export default Update;