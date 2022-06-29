import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input'
import { useSelector } from 'react-redux';
import {postData, url} from '../../action'


const Add = () => {
    const [date,setDate] =React.useState(new Date())
    const membership=useSelector(state => state.membership)
    const [Hotels,setHotels]=React.useState()
    const [Nights,setNights]=React.useState()
    const [Accounts,setAccounts]=React.useState()
    const [Price,setPrice]=React.useState()
    const [Year,setYear]=React.useState()
    const [Membership,setMembership]=React.useState('silver')
    const [error,setError]=React.useState('')
    const [Plans,setPlans]= React.useState()

    React.useEffect(() => {
      if(membership){
        let arr=membership.filter(member => member.type ==Membership)
        if(arr){
          setHotels(arr[0].hotel)
          setNights(arr[0].night)
          setAccounts(arr[0].account)
          setPrice(arr[0].price)
          setYear(arr[0].time)
          setPlans(arr[0].plans)
        }
      }
    },[Membership])

    const submit = () => {
      if(!Hotels || !Nights || !Accounts || !Price || !Year || !Membership || !Plans){
        setError('Fields cannot be empty')
        return
      }
      if(isNaN(Hotels) && Hotels!='all'){
        setError('Hotels can be only number or all.')
        return
      }
      if(isNaN(Nights) && Nights!='unlimited'){
        setError('Nights can be only number or unlimited.')
        return
      }
      if(isNaN(Accounts) && Accounts!='no'){
        setError('Accounts can be only number or no.')
        return
      }
      setError('please wait...')
      postData(url + '/updateData',{
        tableName: 'membership',
        columns:['price','time','night','hotel','account','plans'],
        values: [Price,Year,Nights,Hotels,Accounts,Plans],
        condition:"type="+"'"+Membership+"'"
      }).then(data=>{
        
        setError('Successfully updated the plan. You can reload the page')
        setTimeout(() => {
          window.location.reload()
        },300)
      }).catch(err=>{
        console.log(err.message)
      })

    }
    return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Add Plans </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Plans</a></li>
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
                    <p className="card-description">Edit plans and offer </p>
                    <div className="row">
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Select Plan</label>
                          <div className="col-sm-9">
                            <select onChange={(e)=>{
                              setMembership(e.target.value)

                            }} className="form-control">
                            {
                              membership?(
                                membership.map((doc, i) =>(
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
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Price</label>
                          <div className="col-sm-9">
                          <Form.Control value={Price} onChange={(e)=>setPrice(e.target.value)} placeholder='Price of the plan' type="number" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Time/year</label>
                          <div className="col-sm-9">
                          <Form.Control value={Year} onChange={(e)=>setYear(e.target.value)} placeholder="time period in hour" type="number" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Nights ,can be unlimited or number</label>
                          <div className="col-sm-9">
                          <Form.Control value={Nights} onChange={(e)=>setNights(e.target.value)} placeholder="number of nights spend" type="text" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Hotels, can be all or number</label>
                          <div className="col-sm-9">
                          <Form.Control value={Hotels} onChange={(e)=>setHotels(e.target.value)} placeholder="number of hotel can stay" type="text" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Partner Account, can be no or number</label>
                          <div className="col-sm-9">
                          <Form.Control value={Accounts} onChange={(e)=>setAccounts(e.target.value)} 
                          placeholder='partner account count' type="text" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Add plans details, comas separated</label>
                          <div className="col-sm-9">
                          <textarea value={Plans} onChange={(e)=>setPlans(e.target.value)} class="form-control"
                            placeholder='eg. 70 Nights / 2 Year validity,2 Room ,8 Peoples '
                           id="exampleFormControlTextarea1" rows="3"></textarea>
                          </div>
                        </Form.Group>
                      </div>
                      
                    </div>
                    {error?(
                    <div class="alert alert-primary" role="alert">{error}</div>
                  ):(
                    <></>
                  )}
                  </form>
                  <button onClick={submit}   className='btn btn-gradient-secondary btn-rounded btn-fw'>SAVE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
};

export default Add;