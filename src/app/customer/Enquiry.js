import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { postData, url, setHotelBooking, convertDate, writeDate,setBookAppointment } from '../../action';
import { getAuth } from 'firebase/auth';
import app from './../../firebase';

const Enquiry = () => {
    const [Checked, setChecked] = React.useState('Hotels')
    const hotelBooking = useSelector(state => state.hotelBooking)
    const userInfo = useSelector(state => state.userInfo)
    const hotels = useSelector(state => state.hotels)
    const deals = useSelector(state => state.deals)
    const bookAppointment= useSelector(state => state.bookAppointment)
    const [data, setData] = React.useState(null)
    const [data2, setData2] = React.useState()
    const dispatch = useDispatch()
    const auth = getAuth(app)
    const [action, setAction] = React.useState(false)
    const brands= useSelector(state => state.brands)
    const [Page,setPage]= React.useState(1)
    const [TotalPage,setTotalPage]= React.useState([])

    React.useEffect(() => {
        postData(url + '/getData', {
            tableName: 'booking_enquiry',
            orderColumn: 'date'
        }).then(data => {
            if (Array.isArray(data)) {
                setData2(data)
            }else{
                console.log(data.message)
            }

        })
    },[])

    React.useEffect(() => {
        if (data2) {
            let arr = []
            data2.forEach((doc,i) => {
                if(i<(Page*10) && i>=((Page*10)-10)){
                
                arr.push(doc)
                }
            })
            setData(arr)
            let number=(data2.length/10)
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
        
    }, [Page+data2])

    return (
        <div>
            <div className="page-header">
                <h3 className="page-title"> All Enquiry </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#" onClick={event => event.preventDefault()}>Customers</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Enquiry</li>
                    </ol>
                </nav>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th> Name </th>
                                            <th> Phone </th>
                                            <th> Hotel Name </th>
                                            <th>Room</th>
                                            <th>Children</th>
                                            <th>Adults</th>
                                            <th>Check In</th>
                                            <th>Check Out</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data?(
                                                data.map((doc, i) => (
                                                    <List key={i} data={doc}
                                                         />
                                                ))
                                            ):(
                                                <tr>
                                                    <td>Loading..</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
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
        </div>
    );
};

export default Enquiry;
const List = (props) => {
    const doc = props.data
    const user= useSelector(state => state.userInfo)
    const hotels = useSelector(state => state.hotels)
    return (
        <tr>
            <td> {user?user.filter(h => h.uid ==doc.uid)[0].name:''} </td>
            <td> {user?user.filter(h => h.uid ==doc.uid)[0].phone:''} </td>
            <td>
                {hotels?hotels.filter(d=>d.id==doc.hotel_id)[0].name:''}
            </td>
            <td>{doc.room}</td>
            <td>{doc.children}</td>
            <td>{doc.adults}</td>
            <td> {convertDate(doc.check_in)} </td>
            <td> {convertDate(doc.check_out)} </td>
           
        </tr>
    )
}
