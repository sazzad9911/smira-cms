import React from 'react';
import {useParams} from 'react-router-dom'
import {postData,url,writeDate,dateDifference,visualDate} from './../../action'
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
    const [Starting,setStarting]=React.useState()
    const [Ending,setEnding]=React.useState()
    const [membership,setMembership]= React.useState()
    const [newMembership,setNewMembership]=React.useState()

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
                    setStarting(visualDate(data[0].starting_date))
                    setEnding(visualDate(data[0].ending_date))
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
              setMembership(data.filter(p=>p.type ==Select)[0])
              setNewMembership(data.filter(p=>p.type ==Select)[0])
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
          if(!membership){
            setError("Invalid membership")
            return
          }
          if(!Starting ||!Ending){
            setError("Please select a starting or ending date.")
            return
          }
          if(dateDifference(Starting, Ending)<0){
            setError("Invalid! Starting date must be previous from ending date")
            return
          }
          setError('Please wait...')
            // let time=Plans.filter(p=>p.type==Select)[0].time;
            // let date=new Date()
            // let start=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
            // let ending=`${date.getFullYear()+time}-${date.getMonth()+1}-${date.getDate()}`;
            postData(url + '/updateData',{
                auth: auth.currentUser,
                tableName: 'user',
                columns: ['membership_type','starting_date','ending_date','paid'],
                values: [Select,writeDate(new Date(Starting)),writeDate(new Date(Ending)),''],
                condition: `uid='${uid}'`
            }).then(response => {
                if(response.affectedRows){
                  return  setError("Membership plan change successfully completed")
                }
                setError(response.message)
            })
            if(membership==newMembership){
              return
            }
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
                    auth: auth.currentUser,
                    tableName: 'family_code',
                    columns: ['code','buyer_id'],
                    values: [id,uid]
                }).then(data => {
                    console.log(data)
                })
                index++;
            }
        }
        let msg=codes?`Your Family Access Code is ${codes} (If applicable)`:""
            postData(url +'/sendEmail',{ 
              from:'info@smira.club',
              to:Data[0].email,
              subject:`You’re now officially a member of our family - Smira Club`,
              text: `
              <p>Dear <strong>${Data[0].name}</strong>,</p>
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
                    {
                      Select!='non'?(
                        <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Starting Date</label>
                          <div className="col-sm-9">
                          <Form.Control value={Starting} onChange={(e)=>setStarting(e.target.value)} placeholder='' type="date" />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Ending Date</label>
                          <div className="col-sm-9">
                          <Form.Control value={Ending} onChange={(e)=>setEnding(e.target.value)} placeholder='' type="date" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                      ):(<></>)
                    }
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