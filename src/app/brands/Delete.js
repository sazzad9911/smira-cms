import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom';
import {postData, url,setDeals,setBrands} from '../../action'

const Delete = () => {
  const brands=useSelector(state => state.brands)
  const [TotalPage,setTotalPage]= React.useState([])
  const [Page,setPage]= React.useState(1)
  const [Data, setData]= React.useState(null)

  React.useEffect(() => {
    if(brands){
      let arr=[]
      brands.forEach((doc,i) => {
        if(i<(Page*10) && i>=((Page*10)-10)){
          arr.push(doc)
        }
      })
      setData(arr)
 
      let number=(brands.length/10)
      let floatNumber=parseInt(number)
      let numPage=[]
      for(let i=0;i<floatNumber;i++){
        numPage.push(floatNumber)
      }
      if(number>floatNumber){
          numPage.push(floatNumber)
          setTotalPage(numPage)
      }else{
          setTotalPage(floatNumber)
      }
    }
  },[Page+brands])
    return (
        <div>
          <div className="page-header">
            <h3 className="page-title"> Brand List </h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Brands</a></li>
                <li className="breadcrumb-item active" aria-current="page">All</li>
              </ol>
            </nav>
          </div>
          <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">All Data</h4>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> Logo </th>
                        <th> Name </th>
                        <th> Address </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      Data?(
                        Data.map((doc, i)=>(
                          <List key={i} data={doc}/>
                        ))
                      ):(<></>)
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          { TotalPage.length>0?(
                    <nav>
                <ul className="pagination">
                <li className="page-item"><button onClick={() =>{
                    if(Page>1){
                        setPage(Page-1)
                    }
                }} className="page-link">Previous</button></li>
                {
                 TotalPage.map((doc, i) =>(
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
  const data = props.data;
  const [Read,setRead]= React.useState(false)
  const dispatch = useDispatch()

  const deleteHotel=(id) => {
    postData(url + '/deleteData',{
      tableName:'brands',
      condition:'id='+ id
    }).then((doc) => {
      console.log(doc)
      postData(url + '/deleteData',{
        tableName: 'deals',
        condition:'brand_id='+ id
      }).then((doc) => {
        console.log(doc)
      })
      postData(url + '/deleteData',{
        tableName: 'banner',
        condition:'brand_id='+ id
      }).then((doc) => {
        console.log(doc)
      })
      postData(url + '/deleteData',{
        tableName: 'restaurant',
        condition:'brand_id='+ id
      }).then((doc) => {
        console.log(doc)
      })
      postData(url + '/deleteData',{
        tableName: 'slider',
        condition:'brand_id='+ id
      }).then((doc) => {
        console.log(doc)
      })
      postData(url + '/getData',{
        tableName: 'brands',
      }).then((doc) =>{
        if(Array.isArray(doc)){
          dispatch(setBrands(doc))
        }
      })
    })
    postData(url + '/deleteData',{
      tableName:'deals',
      condition:'brand_id='+ id
    }).then((doc) => {
      console.log(doc)
      postData(url + '/getData',{
        tableName: 'deals',
        orderColumn: 'date'
      }).then((doc) =>{
        if(Array.isArray(doc)){
          dispatch(setDeals(doc))
        }
      })
    })
    
  }
  return(
    <tr>
      <td className="py-1">
      <img src={data.image} alt="user icon" />
    </td>
    <td> {data.name}</td>
  <td> {data.address} </td>
  <td> 
  {
      !Read?(
        <td>
        <button onClick={() =>{
          deleteHotel(data.id)
          //setRead(true);
        }} 
          className='btn btn-gradient-danger btn-rounded btn-fw'>Delete</button>
          <Link style={{marginLeft:'5px'}} to={'/brands/update/'+data.id}
          className='btn btn-gradient-danger btn-rounded btn-fw'>Update</Link>
          </td>
      ):(
        <></>
      )
    }
   </td>
 </tr>
  )
}
