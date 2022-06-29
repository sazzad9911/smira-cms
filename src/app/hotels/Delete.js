import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux'
import {postData,url,setHotels} from '../../action'
import Update from './Update';
import { Link } from 'react-router-dom';


const Delete = () => {
  const hotels= useSelector(state => state.hotels)
  const [TotalPage,setTotalPage]= React.useState([])
  const [Page,setPage]= React.useState(1)
  const [Data,setData]= React.useState(null)
  const [Hotel,setHotel]= React.useState(null)
  const [Visible, setVisible]= React.useState(false)

  React.useEffect(() => {
    if(hotels){
      let arr=[]
      hotels.forEach((doc,i) => {
        if(i<(Page*10) && i>=((Page*10)-10)){
          arr.push(doc)
        }
      })
      setData(arr)
      let number=(hotels.length/10)
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
  },[Page+hotels])
const Click=(doc)=>{
  console.log(doc)
  setVisible(!Visible)
}
  
    return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Delete Hotels </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Hotels</a></li>
                <li className="breadcrumb-item active" aria-current="page">Delete</li>
              </ol>
            </nav>
          </div>
          <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">All Hotels</h4>
                
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> Hotel name </th>
                        <th> Address </th>
                        <th>Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Data?(
                          Data.map((doc, i) =>(
                            <List Click={Click} key={i} doc={doc}/>
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
                    }}>
                <ul className="pagination">
                <li className="page-item"><button onClick={() =>{
                    if(Page>1){
                        setPage(Page-1)
                    }
                }} className="page-link">Previous</button></li>
                {
                 Array.isArray(TotalPage)?(
                  TotalPage.map((doc, i) =>(
                  <li key={i} className={Page==(i+1)?"page-item active":"page-item"}><button onClick={()=>{
                     setPage(i+1)
                  }} className="page-link">{i+1}</button></li>
                  ))
                 ):(<></>)
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
  const [Edit,setEdit]=React.useState(false);
  const dispatch= useDispatch()

  const deleteHotel=(id) => {
    postData(url + '/deleteData',{
      tableName:'hotels',
      condition:'id='+ id
    }).then((doc) => {
      console.log(doc)
      postData(url + '/getData',{
        tableName:'hotels',
        orderColumn: 'date'
      }).then((doc) => {
        if(Array.isArray(doc)){
          dispatch(setHotels(doc));
        }
      })
    })
    postData(url + '/deleteData',{
      tableName:'hotel_photos',
      condition:'hotel_id='+ id
    }).then(data => {
      console.log(data)
    })
  
  }
  return (
    <tr>
    <td>{doc.name}</td>
    <td>{doc.address}</td>
    {
      !Read?(
        <td>
        <button onClick={() =>{
          deleteHotel(doc.id)
          setRead(true);
        }} 
          className='btn btn-gradient-danger btn-rounded btn-fw'>Delete</button>
          <Link style={{marginLeft:'5px'}} to={'/hotels/update/'+doc.id}
          className='btn btn-gradient-danger btn-rounded btn-fw'>Update</Link>
          </td>
      ):(
        <div></div>
      )
    }
    
    </tr>
  )
}
const PageButton=(props)=>{
 
}