import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { postData, url, setHotelBooking, convertDate, writeDate,setBookAppointment } from '../../action';
import { getAuth } from 'firebase/auth';
import app from './../../firebase';

const Order = () => {
    const [Checked, setChecked] = React.useState('Hotels')
    const hotelBooking = useSelector(state => state.hotelBooking)
    const userInfo = useSelector(state => state.userInfo)
    const hotels = useSelector(state => state.hotels)
    const deals = useSelector(state => state.deals)
    const bookAppointment= useSelector(state => state.bookAppointment)
    const [data, setData] = React.useState([])
    const [data2, setData2] = React.useState([])
    const dispatch = useDispatch()
    const auth = getAuth(app)
    const [action, setAction] = React.useState(false)
    const brands= useSelector(state => state.brands)
    const [Page,setPage]= React.useState(1)
    const [TotalPage,setTotalPage]= React.useState([])

    React.useEffect(() => {
        if (hotels && hotelBooking && userInfo && deals && bookAppointment&& Checked == 'Hotels') {
            let arr = []
            hotelBooking.forEach((doc,i) => {
                if(i<(Page*10) && i>=((Page*10)-10)){
                let user = userInfo.filter(user => user.uid == doc.user_id)
                let hotel = hotels.filter(hotel => hotel.id == doc.hotel_id)
                let data = { data: doc, user: user[0], hotel: hotel[0] }
                arr.push(data)
                }
            })
            setData(arr)
            let number=(hotelBooking.length/10)
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
        if (brands && hotels && hotelBooking && userInfo && bookAppointment&& deals && Checked == 'Deals') {
            let arr = []
            bookAppointment.forEach((doc,i) => {
                if(i<(Page*10) && i>=((Page*10)-10)){
                let user = userInfo.filter(user => user.uid == doc.uid)
                let deal = deals.filter(deal => deal.id == doc.deal_id)
                let brand = brands.filter(b=>b.id==deal[0].brand_id)
                let data = { data: doc, user: user[0], deal: deal[0],brand: brand[0]}
                arr.push(data)
                }
            })
            setData2(arr)
            let number=(bookAppointment.length/10)
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
    }, [Checked+Page+hotels+deals+userInfo+bookAppointment+hotelBooking+brands])
    React.useEffect(() => {
        postData(url + '/getData', {
            tableName: 'hotel_booking',
            orderColumn: 'date'
        }).then(data => {
            if (Array.isArray(data)) {
                return dispatch(setHotelBooking(data));
            }
            console.log(data);
        })
    }, [action])
    React.useEffect(() => {
        postData(url + '/getData', {
            tableName: 'book_appointment',
            orderColumn: 'date'
        }).then(data => {
            if (Array.isArray(data)) {
                return dispatch(setBookAppointment(data));
            }
            console.log(data);
        })
    }, [action])


    const acceptHotel = (data) => {
        postData(url + '/setData', {
            auth: auth.currentUser,
            tableName: 'redeem_history',
            columns: ['purches_type', 'purches_id', 'name', 'date', 'image', 'uid'],
            values: ['hotel', data.data.id, data.hotel.name, writeDate(new Date()), data.hotel.image, data.user.uid]
        }).then(d => {
            if (d.insertId) {
                postData(url + '/updateData', {
                    tableName: 'hotel_booking',
                    columns: ['visible'],
                    values: [1],
                    condition: 'id=' + data.data.id,
                }).then(dt => {
                    setAction(dt);
                    console.log(dt);
                })
            }
            console.log(d.message)
        })
        let user=userInfo.filter(d=>d.uid==data.user.uid)
        if(user && user.length > 0 && user[0].email){
            postData(url + '/sendMessage',{
                title: 'Booking Request Confirmed!',
                body:`Please check your email for your booking details at ${data.hotel.name}.`,
                uid: user[0].uid
            }).then(response => {
                console.log(response)
            })
            postData(url + '/setData',{
                auth: auth.currentUser,
                tableName:'notification',
                columns:['name','description','uid'],
                values: ['Booking Request Confirmed!',`Please check your email for your booking details at ${data.hotel.name}.`,user[0].uid]
            }).then(response =>{
                console.log(response)
            })
            postData(url + '/sendEmail',{
                to:user[0].email,
                subject:'Your Booking Request has been confirmed - Smira Club',
                text:`<p>Hello <b> ${user[0].name}</b></p>
                <p>This email is to confirm your booking at-</p> 

               <p>Hotel name: ${data.hotel.name}</p>
               <p> Hotel location: ${data.hotel.address}</p>
               <p> Total number of guests: ${data.data.adult+data.data.children}</p>
               <p>Number of kids below 5 years: ${data.data.children} </p>
               <p>Number of rooms: ${data.data.room}</p>
               <p> Food (Breakfast and Dinner unlimited): <b>${data.data.veg}</b> Veg, ${data.data.non_veg} Non-Veg</p>
               <p> Amenities: <b>${data.hotel.conditions}</b></p>
               <p>Check-in date: ${convertDate(data.data.check_in)}</p>
               <p> Check-out date: ${convertDate(data.data.check_out)}</p>
                
                <p>If you have any inquiries, please do not hesitate to contact us.</p>
                
               <p> We are looking forward to your visit and hope that you enjoy your stay.</p>
                
                
               <p> Best regards, </p>
               <p> Smira Club</p>
                 
               <b> Smira Services - ‘A sweet memory is really affordable’ </b>
                 
                 
                 
                 
                <b>Smira Sevices Pvt. Ltd. </b>
                <p>Ranjit Studio Compound, </p>
               <p> Ground & 1st Floor, </p>
               <p> M-Block, Plot No. 115, </p>
               <p> Dada Saheb Phalke Marg, </p>
               <p>  Opp. Bharatkshetra, Hindmata, </p>
               <p> Dadar East, Mumbai, </p>
               <p> Maharashtra 400014 </p>
                 
               <b> Contact No. </b>
               <p> 9833733477</p>
               <p>9833733977</p>
               <p> Email - support@smira.club</p>
                `
            }).then(result => {
                console.log(result);
            })
        }
        
    }
    const declineHotel = (data) => {
        postData(url + '/updateData', {
            tableName: 'hotel_booking',
            columns: ['visible'],
            values: [1],
            condition: 'id=' + data.data.id,
        }).then(dt => {
            setAction(dt);
            console.log(dt);
        })
        let user=userInfo.filter(d=>d.uid==data.user.uid)
        if(user && user.length > 0 && user[0].email){
            postData(url + '/sendMessage',{
                title: 'Booking Request Not Confirmed.',
                body:`Your booking at ${data.hotel.name} has not been confirmed.`,
                uid: user[0].uid
            }).then(response => {
                console.log(response)
            })
            postData(url + '/setData',{
                auth: auth.currentUser,
                tableName:'notification',
                columns:['name','description','uid'],
                values: ['Booking Request Not Confirmed.',`Your booking at ${data.hotel.name} has not been confirmed.`,user[0].uid]
            }).then(response =>{
                console.log(response)
            })
            postData(url + '/sendEmail',{
                to:user[0].email,
                subject:'Your Booking Request has not been confirmed - Smira Club',
                text:`<p>Hello <b>${user[0].name}</b>,</p>
                <p>We had received your request for a booking at- 
                <p>Hotel location: ${data.hotel.address}</p>
                <p>Total number of guests: ${data.data.adult+data.data.children} </p>
                <p>Number of kids below 5 years: ${data.data.children}</p>
                <p>Number of rooms: ${data.data.room}</p>
                <p>Check-in date: ${convertDate(data.data.check_in)}</p>
                <p>Check-out date: ${convertDate(data.data.check_out)}</p>
                <p>We are very pleased to know that you want a booking with us, however, we regret to inform you that your request has <b>NOT BEEN CONFIRMED</b> due to non-availability of rooms or some technical reasons.</p>
                <p>Sorry for the inconvenience! We assure you that we will be available in the future for you whenever you wish to make a booking.</p>
                <p>Best regards, 
                <p>Smira Club
                <b>Smira Services - ‘A sweet memory is really affordable’ </b>
                <p>Smira Services Pvt. Ltd. </p>
                <p>Ranjit Studio Compound, </p>
                <p>Ground & 1st Floor, </p>
                <p>M-Block, Plot No. 115, </p>
                <p>Dada Saheb Phalke Marg, </p>
                <p>Opp. Bharatkshetra, Hindmata,</p> 
                <p>Dadar East, Mumbai, </p>
                <p>Maharashtra 400014 </p>
 
                <b>Contact No.</b> 
                <p>9833733477</p>
                <p>9833733977</p>
                <p>Email - support@smira.club</p>
                `
            }).then(result => {
                console.log(result);
            })
        }
    }
    const acceptDeal=(data)=>{
        let brand=brands.filter(b => b.id==data.deal.brand_id)
        postData(url + '/setData', {
            auth: auth.currentUser,
            tableName: 'redeem_history',
            columns: ['purches_type', 'purches_id', 'name', 'date', 'image', 'uid'],
            values: ['deal', data.data.id, data.deal.name, writeDate(new Date()), brand[0].image, data.user.uid]
        }).then(d => {
            if (d.insertId) {
                postData(url + '/updateData', {
                    tableName: 'book_appointment',
                    columns: ['visible'],
                    values: [1],
                    condition: 'id=' + data.data.id,
                }).then(dt => {
                    setAction(dt);
                    console.log(dt);
                })
            }
            console.log(d.message)
        })
        let user=userInfo.filter(d=>d.uid==data.user.uid)
        if(user && user.length > 0 && user[0].email){
            postData(url + '/sendEmail',{
                to:user[0].email,
                subject:'Confirmation mail for your appointment request',
                text:`<p>Hello ${user[0].name}</p>
                <p>Your appointment request for <strong>${data.deal.name}</strong> is accepted by SMIRA CLUB</p>
                <p>To know details---Call us</p>
                <p>Best Regards</p>
                <p>Smira Club</p>
                 
               <p> Ranjit Studio Compound, </p>
               <p> Ground & 1st Floor, </p>
               <p> C-Block, Plot No. 115, </p>
               <p> Dada Saheb Phalke Marg, </p>
               <p> Opp. Bharatkshetra, Hindmata, </p>
               <p> Dadar East, Mumbai, </p>
                <p>Maharashtra 400014 </p>
                 
                <p>Contact No.</p> 
                <p>9819812456</p>
               <p> 9833733477</p>
               <p> 9820342389</p>
                `
            }).then(result => {
                console.log(result);
            })
        }
    }
    const declineDeal=(data)=>{
        postData(url + '/updateData', {
            tableName: 'book_appointment',
            columns: ['visible'],
            values: [1],
            condition: 'id=' + data.data.id,
        }).then(dt => {
            setAction(dt);
            console.log(dt);
        })
        let user=userInfo.filter(d=>d.uid==data.user.uid)
        if(user && user.length > 0 && user[0].email){
            postData(url + '/sendEmail',{
                to:user[0].email,
                subject:'Rejection mail for your appointment request',
                text:`<p>Hello ${user[0].name}</p>
                <p>Your appointment request for <strong>${data.deal.name}</strong> is rejected by SMIRA CLUB due some issues.</p>
                <p>To know details---Call us</p>
                <p>Best Regards</p>
                <p>Smira Club</p>
                 
               <p> Ranjit Studio Compound, </p>
               <p> Ground & 1st Floor, </p>
               <p> C-Block, Plot No. 115, </p>
               <p> Dada Saheb Phalke Marg, </p>
               <p> Opp. Bharatkshetra, Hindmata, </p>
               <p> Dadar East, Mumbai, </p>
                <p>Maharashtra 400014 </p>
                 
                <p>Contact No.</p> 
                <p>9819812456</p>
               <p> 9833733477</p>
               <p> 9820342389</p>
                `
            }).then(result => {
                console.log(result);
            })
        }
    }
    return (
        <div>
            <div className="page-header">
                <h3 className="page-title"> All Orders </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#" onClick={event => event.preventDefault()}>Orders</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Action</li>
                    </ol>
                </nav>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Select Type</h4>
                            <Dropdown>
                                <Dropdown.Toggle variant="btn btn-gradient-secondary" id="dropdownMenuOutlineButton2">
                                    {Checked}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Header>Order Type</Dropdown.Header>
                                    <Dropdown.Item onClick={() => {
                                        setChecked('Hotels')
                                    }}>Hotels</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        setChecked('Deals')
                                    }}>Deals</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th> Name </th>
                                            <th> Email </th>
                                            <th> Phone </th>
                                            <th> {Checked} Name </th>
                                            {Checked=='Hotels'?(<th> Check In </th>):(<></>)}
                                            {Checked=='Hotels'?(<th> Check Out </th>):(<></>)}
                                            {Checked=='Hotels'?(<th> Adults </th>):(<></>)}
                                            {Checked=='Hotels'?(<th> Children </th>):(<></>)}
                                            {Checked=='Hotels'?(<th> Room </th>):(<></>)}
                                            {Checked=='Hotels'?(<th> Veg </th>):(<></>)}
                                            {Checked=='Hotels'?(<th> Non Veg </th>):(<></>)}
                                            {Checked=='Hotels'?(<th> Additional Note </th>):(<></>)}
                                            {Checked!='Hotels'?(<th> Brand Name </th>):(<></>)}
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Checked == 'Hotels' ? (
                                                data.map((doc, i) => (
                                                    <List key={i} data={doc}
                                                        declineHotel={declineHotel}
                                                        acceptHotel={acceptHotel} />
                                                ))
                                            ) : (
                                                data2.map((doc, i) => (
                                                    <List2 key={i} data={doc}
                                                        declineHotel={declineDeal}
                                                        acceptHotel={acceptDeal} />
                                                ))
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
                    }} >
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

export default Order;
const List = (props) => {
    const doc = props.data
    const [Visible, setVisible] = React.useState(doc.data.visible)
    return (
        <tr>
            <td> {doc.user.name} </td>
            <td> {doc.user.email} </td>
            <td> {doc.user.phone} </td>
            <td>
                {doc.hotel?doc.hotel.name:''}
            </td>
            <td> {convertDate(doc.data.check_in)} </td>
            <td> {convertDate(doc.data.check_out)} </td>
            <td> {doc.data.adult} </td>
            <td> {doc.data.children} </td>
            <td> {doc.data.room} </td>
            <td> {doc.data.veg} </td>
            <td> {doc.data.non_veg} </td>
            <td> {doc.data.note} </td>
            {
                Visible == 1 ? (
                    <td style={{ width: '200px' }}></td>
                ) : (
                    <td>
                        <button onClick={() => {
                            props.acceptHotel(doc)
                            setVisible(1)
                        }} className="btn btn-gradient-success btn-rounded btn-fw">Accept</button>

                        <button onClick={() => {
                            props.declineHotel(doc)
                            setVisible(1);
                        }} style={{
                            marginLeft: '10px'
                        }} className="btn btn-gradient-danger btn-rounded btn-fw">Cancel</button>
                    </td>
                )
            }
        </tr>
    )
}
const List2 = (props) => {
    const doc = props.data
    const [Visible, setVisible] = React.useState(doc.data.visible)
    //console.log(doc.deal)
    return (
        <tr>
            <td> {doc.user?doc.user.name:'...'} </td>
            <td> {doc.user.email} </td>
            <td> {doc.user?doc.user.phone:'---'} </td>
            <td>
                {doc.deal && doc.deal.name?doc.deal.name:'...'}
            </td>
            <td>{doc.brand && doc.brand.name?doc.brand.name:'...'}</td>
            {
                Visible == 1 ? (
                    <td style={{ width: '200px' }}></td>
                ) : (
                    <td>
                        <button onClick={() => {
                            props.acceptHotel(doc)
                            setVisible(1)
                        }} className="btn btn-gradient-success btn-rounded btn-fw">Accept</button>

                        <button onClick={() => {
                            props.declineHotel(doc)
                            setVisible(1);
                        }} style={{
                            marginLeft: '10px'
                        }} className="btn btn-gradient-danger btn-rounded btn-fw">Cancel</button>
                    </td>
                )
            }
        </tr>
    )
}