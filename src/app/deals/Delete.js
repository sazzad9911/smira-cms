import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { useSelector ,useDispatch} from 'react-redux';
import {postData, url, setDeals} from '../../action'
import { Link } from 'react-router-dom';

const Delete = () => {
  const deals= useSelector(state => state.deals)
  const [TotalPage,setTotalPage]= React.useState([])
  const [Page,setPage]= React.useState(1)
  const [Data,setData]= React.useState(null)
  const [SearchValue,setSearchValue]= React.useState(null)

  React.useEffect(() => {
    postData(url + '/getData', {
      tableName: 'deals',
      condition:SearchValue?`brand LIKE '%${SearchValue}%'`:''
    }).then(result => {
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
    if(deals){
      
    }
  },[Page+SearchValue])
    return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Delete deals </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#" onClick={event => event.preventDefault()}>Deals</a></li>
                <li className="breadcrumb-item active" aria-current="page">Delete</li>
              </ol>
            </nav>
          </div>
          <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
          <form className="d-flex align-items-center h-100" action="#">
                  <div className="input-group">
                     <div className="input-group-prepend bg-transparent">
                       <i className="input-group-text border-0 mdi mdi-magnify"></i>
                    </div>
                                <input onChange={e=>{
                         setSearchValue(e.target.value)
                     }} type="text" className="form-control bg-transparent border-0" placeholder="Search by brands" />
                   </div>
                </form>
                </div>
                </div>
                </div>
          </div>
          <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Information</h4>
                
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> Name </th>
                        <th>Brand Name</th>
                        <th> Price </th>
                        <th> Discount </th> 
                        <th>Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Data?(
                          Data.map((doc, i)=>(
                            <List doc={doc} key={i}/>
                          ))
                        ):(
                          <tr></tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          { TotalPage.length>0?(
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
                  TotalPage.map((doc, i)=>(
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
        </div>
    );
};

export default Delete;
const List = (props)=>{
  const [Read,setRead]=React.useState(false);
  const doc=props.doc
  const dispatch = useDispatch()

  const deleteDeals=(id) => {
    postData(url + '/deleteData', {
      tableName: 'deals',
      condition: 'id='+ id
    }).then(doc=> {
      console.log(doc);
      postData(url + '/getData',{
        tableName: 'deals',
        orderColumn: 'date'
      }).then(doc=> {
        if(Array.isArray(doc)){
          dispatch(setDeals(doc))
        }
      })
    })
  
  }
  return (
    <tr>
    <td>{doc.name}</td>
    <td>{doc.brand}</td>
    <td>{doc.price}</td>
    <td>{doc.discount}</td>
    
    {
      !Read?(
        <td><button onClick={() =>{
          deleteDeals(doc.id)
          //setRead(true);
        }} 
          className='btn btn-gradient-danger btn-rounded btn-fw'>Delete</button>
          <Link to={'/deals/update/' + doc.id} style={{marginLeft:'5px'}} onClick={() =>{
        }} 
          className='btn btn-gradient-danger btn-rounded btn-fw'>Update</Link>
          </td>
      ):(
        <td></td>
      )
    }
    </tr>
  )
}
