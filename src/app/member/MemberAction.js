import React from 'react';
import {useParams} from 'react-router-dom'
import {postData,url} from './../../action'
import { Form } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import app from './../../firebase';

const MemberAction = () => {
    const auth= getAuth(app)
    const {uid} =useParams()
    const [Data,setData]=React.useState(null)
    const [error,setError]= React.useState()
    const [Plans,setPlans]=React.useState()
    const [Select,setSelect]=React.useState()

    React.useEffect(() => {
        postData(url + '/getData', {
            tableName: 'user',
            condition:`uid='${uid}'`
        }).then(data =>{
            if(Array.isArray(data)&& data.length>0){
                if(!data[0].membership_type){
                    setSelect('non')
                }else{
                    setSelect(data[0].membership_type)
                }
                return setData(data)
            }
            console.log(data.message)
        })
    },[uid])
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
    const submit=()=>{
        if(!Plans){
            setError("Error loading membership plans")
            return
        }
        if(!Select){
            setError("Invalid selection.")
            return
        }
        if(Select=='non'){
            postData(url + '/query',{
                query:`UPDATE user SET membership_type=NULL,starting_date=NULL,ending_date=NULL WHERE uid='${uid}'`
            }).then(response => {
                if(response.affectedRows){
                  return  setError("Membership plan change successfully completed")
                }
                setError(response.message)
                console.log(response)
            })
        }else{
            let time=Plans.filter(p=>p.type==Select)[0].time;
            let date=new Date()
            let start=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
            let ending=`${date.getFullYear()+time}-${date.getMonth()+1}-${date.getDate()}`;
            postData(url + '/updateData',{
                auth: auth.currentUser,
                tableName: 'user',
                columns: ['membership_type','starting_date','ending_date'],
                values: [Select,start,ending],
                condition: `uid='${uid}'`
            }).then(response => {
                if(response.affectedRows){
                  return  setError("Membership plan change successfully completed")
                }
                setError(response.message)
            })
        }
        

    }
    return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Change Membership Plan </h3>
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
                            <select value={Select} onChange={(e)=>{
                              //setMembership(e.target.value)
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
                    
                    {error?(
                    <div className="alert alert-primary" role="alert">{error}</div>
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
    );
};

export default MemberAction;