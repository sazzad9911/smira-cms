import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import {useSelector} from 'react-redux'
import {postData, url} from '../../action'
import Axios from 'axios'
import { getAuth } from 'firebase/auth';
import app from './../../firebase';

const HotelImage = () => {
    const hotels= useSelector(state => state.hotels)
    const [Error,setError]= React.useState()
    const [Data, setData]= React.useState(null)
    const [Action, setAction]=React.useState(false)
    const [File, setFile]=React.useState(null)
    const [HotelId, setHotelId]=React.useState(null)
    const [Id,setId]=React.useState(null)
    const [Data2, setData2]= React.useState(null)
    const auth=getAuth(app)
    const [ImageSize,setImageSize]= React.useState(false)
    React.useEffect(() => {
        postData(url + '/getData', {
            tableName: 'hotel_photos',
        }).then(data => {
            if(Array.isArray(data)){
                setData(data)
            }
        })
    },[Action])
    const deleteData = (id) => {
        postData(url + '/deleteData', {
            tableName: 'hotel_photos',
            condition:'id='+id,
        }).then(data => {
            console.log(data)
            setAction(!Action)
        })
    }
    const uploadImages = () =>{
        if(!File || !HotelId){
            setError('Fill all the fields')
            return
        }
        if(!ImageSize){
          setError('You can only add 1240*800 size image')
          return
        }
        setError('Please wait...')
        const data=new FormData()
        data.append('file', File[0])
        Axios.post(url+'/uploadWithData',data).then(res=>{
          if(res.data.url){
            postData(url + '/setData',{
              auth: auth.currentUser,
              tableName: 'hotel_photos',
              columns: ['url','hotel_id'],
              values: [res.data.url,HotelId],
            }).then(result => {
              console.log(result);
              setError('Image Saved.')
              setAction(!Action)
            }).catch(e=>{
                setError('Problem in uploading!')
            })
          }
        })
    }
    React.useEffect(() => {
      if(Data && Id){
        let  arr=Data.filter(d=>d.hotel_id==Id)
        setData2(arr)
      }else{
        setData2(Data)
      }
    },[Data+Id])
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
            <h3 className="page-title"> Add Hotel Images </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#" onClick={event => event.preventDefault()}>Hotel</a></li>
                <li className="breadcrumb-item active" aria-current="page">Image</li>
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
                          <label className="col-sm-3 col-form-label">Select Hotel</label>
                          <div className="col-sm-9">
                            <select onChange={(e)=>{
                              //setDealId(e.target.value);
                              setHotelId(e.target.value);
                            }} className="form-control">
                            <option value=''>Select</option>
                             {
                                hotels?(
                                    hotels.map((doc, i)=>(
                                  <option value={doc.id} key={i}>{doc.name}</option>
                                ))
                              ):(
                                <option>No Deals</option>
                              )
                             }
                            </select>
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Select Image (1240*800)</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>{
                            setFile(e.target.files)
                            imageSize(800,1240,e.target.files)
                          }}  type="file" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    {Error?(
                    <div class="alert alert-primary" role="alert">{Error}</div>
                  ):(
                    <></>
                  )}
                  </form>
                  <button onClick={uploadImages} className='btn btn-gradient-secondary btn-rounded btn-fw'>SAVE</button>
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
                          <label className="col-sm-3 col-form-label">Sort By Hotel Name</label>
                          <div className="col-sm-9">
                            <select onChange={(e)=>{
                              //setDealId(e.target.value);
                              setId(e.target.value);
                            }} className="form-control">
                            <option value=''>Select</option>
                             {
                                hotels?(
                                    hotels.map((doc, i)=>(
                                  <option value={doc.id} key={i}>{doc.name}</option>
                                ))
                              ):(
                                <option>No Deals</option>
                              )
                             }
                            </select>
                          </div>
                        </Form.Group>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> Image </th>
                        <th> Hotel Name </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Data2 && hotels?(
                            Data2.map((doc, i) => (
                                <tr key={i}>
                                <td>
                                <img src={doc.url} alt={doc.name} />
                                </td>
                                <td>{hotels?hotels.filter(d=>d.id==doc.hotel_id)[0].name:'...'}</td>
                                <td>
                                <button className='btn btn-gradient-danger btn-rounded btn-fw' onClick={()=>{
                                    deleteData(doc.id)
                                }}>
                                Delete
                                </button>
                                </td>
                                </tr>
                            ))
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

export default HotelImage;