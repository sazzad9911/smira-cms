import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import {postData,url,convertDate} from '../../action';

const AllMember = () => { 
    const userInfo = useSelector(state => state.userInfo)
    const history = useHistory()
    const [TotalPage,setTotalPage]= React.useState([])
    const [Page,setPage]= React.useState(1)
    const [Data, setData]= React.useState(null)
    const [SearchValue,setSearchValue]= React.useState(null)

    React.useEffect(() => {
        postData(url+'/getData',{
            tableName: 'user',
            condition:SearchValue?`email like '${SearchValue}%' OR phone like '${SearchValue}%'`:'',
            orderColumn:'id'
        }).then(result=>{
            if(Array.isArray(result)){
                let arr=[]
                result.forEach((doc,i) => {
                if(i<(Page*10) && i>=((Page*10)-10)){
                
                arr.push(doc)
                }
            })
            setData(arr)
            let number=(result.length/10)
            let floatNumber=parseInt(number)
            let numPage=[]
           for(let i=0; i<floatNumber; i++) {
              numPage.push(floatNumber)
            }
      
          if(number>floatNumber){
          numPage.push(floatNumber)
          setTotalPage(numPage)
           }else{
          setTotalPage(numPage)
           }
            }
        })
       
    },[Page+SearchValue])
    return (
        <div>
            <div className="page-header">
                <h3 className="page-title"> All Members </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#" onClick={event => history.push('/dashboard')}>Members</a></li>
                        <li className="breadcrumb-item active" aria-current="page">All Members</li>
                    </ol>
                </nav>
            </div>
            
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">All Members Information</h4>
                            <p className="card-description"> Use This <code>.information</code>
                            </p>
                            <div className="search-field d-none d-md-block">
                            <form className="d-flex align-items-center h-100" action="#">
                              <div className="input-group">
                                <div className="input-group-prepend bg-transparent">
                                  <i className="input-group-text border-0 mdi mdi-magnify"></i>
                                </div>
                                <input onChange={e=>{
                                    setSearchValue(e.target.value)
                                }} type="text" className="form-control bg-transparent border-0" placeholder="Search by email" />
                              </div>
                            </form>
                          </div>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th> User </th>
                                            <th> Full Name </th>
                                            <th> Membership </th>
                                            <th> Email </th>
                                            <th> Phone </th>
                                            <th>Creation Date </th>
                                            <th> Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Data ? (
                                                Data.map((doc, i) => (
                                                    <tr key={i}>
                                                        <td className="py-1">
                                                        <img src={doc&&doc.image?doc.image:'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg'} alt="profile" />
                                                        </td>
                                                        <td> {doc.name ? doc.name : '--'} </td>
                                                        <td> {doc.membership_type!=null ? 
                                                            doc.membership_type.match(/gold/)?'SCG':doc.membership_type.match(/silver/)?'SCS':
                                                        doc.membership_type.match(/platinum/)?'SCP':doc.membership_type.match(/diamond/)?'SCD':'NON':''} </td>
                                                        <td> {doc.email ? doc.email : '--'} </td>
                                                        <td> {doc.phone ? doc.phone : '--'} </td>
                                                        <td>{doc.creationTime?convertDate(doc.creationTime):''}</td>
                                                        <td>
                                                            <Link to={'/member_action/'+doc.uid}>
                                                                Change Plan
                                                            </Link>
                                                        </td>
                                                        
                                                    </tr>
                                                ))
                                            ) : (
                                                <td><td>Loading..</td></td>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            { TotalPage.length>1?(
                    <nav style={{
                        width: '100%',
                        overflow: 'scroll'
                    }} areaLabel="Page navigation example">
                <ul className="pagination">
                <li className="page-item"><button onClick={() =>{
                    if(Page>1){
                        setPage(Page-1)
                    }
                }} className="page-link">Previous</button></li>
                {
                    TotalPage.map((doc, i) => (
                      <li key={i} className={Page==(i+1)?"page-item active":"page-item"}><button onClick={()=>{
                          setPage(i+1)
                      }} className="page-link">{i+1}</button></li>
                     ))
                }
                <li className="page-item"><button onClick={() =>{
                    if(Page<TotalPage.length){
                        setPage(Page+1);
                    }
                }} className="page-link">Next</button></li>
                </ul>
               </nav>
                ):(
                    <></>
                )}
        </div>
    );
};

export default AllMember;