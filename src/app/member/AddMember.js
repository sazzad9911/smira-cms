import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input'
import Axios from 'axios';
import {postData, url,dateDifference,writeDate} from '../../action'
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import app from './../../firebase'; 

const AddMember = () => {
    const [date,setDate] =React.useState(new Date())
    const [Name, setName]= React.useState()
    const [Type,setType]= React.useState()
    const [Address,setAddress]= React.useState()
    const [File,setFile]= React.useState()
    const [Phone,setPhone]= React.useState()
    const [error,setError]= React.useState('')
    const auth = getAuth(app)
    const [ImageSize,setImageSize]= React.useState(false)
    const [Location,setLocation]= React.useState()
    const [Password,setPassword]= React.useState()
    const [Plans,setPlans]=React.useState()
    const [Select,setSelect]=React.useState('non')
    const [Starting,setStarting]=React.useState()
    const [Ending,setEnding]=React.useState()
    const [membership,setMembership]= React.useState()

  React.useEffect(() => {
      postData(url + '/getData', {
          tableName: 'membership'
      }).then(data => {
          if(Array.isArray(data)&& data.length>0){
             return setPlans(data)
          }
          console.log(data.message)
      })
  })
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
 }

  const save=() => {
      if(!Name || !Address || !Password ){
        setError('Please fill all the required fields')
        return
      }
      if(Password.length<6){
        setError('Password must be at least 6 characters')
        return
    }
    if(!Select){
      setError('Invalid selection')
      return
    }
    if(Select=='non'){
      setError('Please wait...')
        createUserWithEmailAndPassword(auth, Address, Password)
            .then(userCredentials => {
                postData(url + '/setData', {
                    auth: userCredentials.user,
                    tableName: 'user',
                   columns: ['name', 'email', 'uid'],
                   values:[Name,Address,userCredentials.user.uid]
                }).then(data => {
                  setError('Successful! Member has added successfully.')
            }).catch(err => {
                setError('Network request failed. There some issue. Please contact with developer.')
                console.log(err.message)
            }) 
            
        }).catch(err => {
          setError('Invalid email/password or your email has already used')
          console.log(err.message)
        })
        return
    }
    if(!Starting || !Ending){
      setError('Date fields are invalid')
      return
    }
    if(!membership){
      setError('Membership is required')
      return
    }
      setError('Please wait...')
        createUserWithEmailAndPassword(auth, Address, Password)
            .then(userCredentials => {
                postData(url + '/setData', {
                    auth: userCredentials.user,
                    tableName: 'user',
                   columns: ['name', 'email', 'uid','membership_type','starting_date','ending_date'],
                   values:[Name,Address,userCredentials.user.uid,Select,writeDate(new Date(Starting)),writeDate(new Date(Ending))]
                }).then(data => {
                    setError('Successful! Member has added successfully.')
            }).catch(err => {
                setError('Network request failed. There some issue. Please contact with developer.')
                console.log(err.message)
            })   
            let codes=null;
        if(membership.account!='no'){
            let account=parseInt(membership.account)
            let index=0;
            while(index<account){
                let id=makeid(16)
                if(!codes){
                    codes =`'`+id+`'`
                }else{
                    codes=codes+", "+`'`+id+`'`
                }
                postData(url + '/setData',{
                    auth: userCredentials.user,
                    tableName: 'family_code',
                    columns: ['code','buyer_id'],
                    values: [id,userCredentials.user.uid]
                }).then(data => {
                    console.log(data)
                })
                index++;
            }
        }
        let msg=codes?`Your Family Access Code is ${codes} (If applicable)`:""
            postData(url +'/sendEmail',{ 
              from:'info@smira.club',
              to:Address,
              subject:`You’re now officially a member of our family - Smira Club`,
              text: `
              <p>Dear <strong>${Name}</strong>,</p>
              <p>Welcome to Smira Club. We’re thrilled to see you here!</p>
              <p>Congratulations! <br>
              Membership Type:<strong> ${membership.name} </strong><br>
              Total Days: <strong>${dateDifference(Starting, Ending)} </strong><br>
              <p>We’re confident that membership will help you save more money while enjoying the luxuries of our services. </p>
              <p>${msg}</p>
              <p>Best regards, <br>
                Smira Club</p>

              <b>Smira Services - ‘A sweet memory is really affordable’ </b>


              <p><b>Smira Sevices Pvt. Ltd. </b><br>
             Ranjit Studio Compound, <br>
              Ground & 1st Floor, <br>
              M-Block, Plot No. 115, <br>
              Dada Saheb Phalke Marg, <br>
              Opp. Bharatkshetra, Hindmata, <br>
              Dadar East, Mumbai, <br>
              Maharashtra 400014 </p>

              <p><b>Contact No. </b><br>
              9833733477<br>
              9833733977<br>
              Email - support@smira.club</p>
              `
          }).then(data=>{
              console.log(data)
          })  
        }).catch(err => {
          setError('Invalid email/password or your email has already used')
          console.log(err.message)
        })
  }
   
    return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Add Member </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Member</a></li>
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
                    <p className="card-description"> Add new member </p>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Name</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setName(e.target.value)} placeholder='Member name'  type="text" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Select Plan</label>
                          <div className="col-sm-9">
                            <select value={Select} onChange={(e)=>{
                              setMembership(Plans.filter(p=>p.type ==e.target.value)[0]) 
                              setSelect(e.target.value)
                            }} className="form-control">
                            <option value="non">Non Member</option>
                            {
                              Plans?(
                                Plans.map((doc, i) =>(
                                  <option key={i} value={doc.type}>{doc.name}</option>
                                ))
                              ):(
                                <option>Select one</option>
                              )
                            }
                              
                             
                            </select>
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Main Branch Phone Number</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setPhone(e.target.value)} placeholder='eg. +913020394930' type="number" />
                          </div>
                        </Form.Group>
                      </div> */}
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">{Type=='phone'?'Phone':'Email'}</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setAddress(e.target.value)} placeholder='eg. someone@gmail.com' type="email" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Password </label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>{
                            setPassword(e.target.value);
                           }} name='file' type="text" />
                          </div>
                        </Form.Group>
                        
                      </div>
                      {/* <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Main Branch Location</label>
                          <div className="col-sm-9">
                          <Form.Control onChange={(e)=>setLocation(e.target.value)} placeholder='give map link.'  type="text" />
                          </div>
                        </Form.Group>
                      </div> */}
                    </div>
                    {
                      Select!='non'?(
                        <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Starting Date</label>
                          <div className="col-sm-9">
                          <Form.Control  onChange={(e)=>setStarting(e.target.value)} placeholder='' type="date" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Ending Date</label>
                          <div className="col-sm-9">
                          <Form.Control  onChange={(e)=>setEnding(e.target.value)} placeholder='' type="date" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                      ):(<></>)
                    }
                  </form>
                  {error?(
                    <div className="alert alert-primary" role="alert">{error}</div>
                  ):(
                    <></>
                  )}
                  <button onClick={save}  className='btn btn-gradient-secondary btn-rounded btn-fw'>SAVE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
};

export default AddMember;