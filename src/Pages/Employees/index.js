import React, { useEffect, useState } from 'react'
const axios = require('axios').default;
const EmployeeCancelToken = axios.CancelToken;
const EmployeeCancel = EmployeeCancelToken.source();

const EmployeeEndpoint = axios.create({
    baseURL: 'https://62e2c909b54fc209b8807084.mockapi.io/api/v1/Employees',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
    cancelToken: EmployeeCancel.token,
});


function Employees() {
    const [EmployeeStatus, setEmployeeStatus] = useState("Intercept Disabled")
    const [rawFetched, setRawFetched] = useState([])

   useEffect(()=>{
    fetchEmployees()
   },[])

   useEffect(()=>{
    return () => {
        EmployeeCancel.cancel('Operation canceled by the user.');
    }
   },[])

    async function fetchEmployees() {
        const response = await EmployeeEndpoint.get("/").catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
                } else {

                }
            })
        setRawFetched(response)
        return response
    }

    function preview(event) {
        event.preventDefault()
        setEmployeeStatus("Intercept Enabled")
            EmployeeEndpoint.interceptors.request.use(function (config) {

                if (config) {
                    console.log("We have pinged intereceptor for the SalesEndPoint")
                    console.log("This is hte intercepted config", config)
                    return config;
                }
                
            }, function (error) {
                // Do something with request error
                return Promise.reject(error);
            });
        } 

        // function cancellation(event) {
        //     event.preventDefault()
        //     if (event.target.id === "Sales") {
        //         console.log(SalesCancel)
        //     SalesCancel.cancel('Operation canceled by the user.');
        // }}
    

    const Array = rawFetched?.data || [];

    return(
        <div className="tableComponent">
            <div className="output">

                
            <div className="container">
                        <p> Employees:{EmployeeStatus} </p>
                        <button type="button" className="btn btn-light" id="Employees" onClick={preview}>Add Intercept </button>
                        <button type="button" className="btn btn-light" id="Employees" onClick={fetchEmployees}> Refetch </button>
                    </div>
                
                

               
                <table className="table">
                    <thead>
                        
                    <tr>
                                <th scope="col">ObjectID</th>
                                <th scope="col">Onboard Date</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">Title</th>
                            </tr>
                        
                    </thead>


                    {Array.map((item, index) => {
                        return (
                            <tbody>
                               
                                 <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.createdAt}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.department}</td>
                                        <td> {item.title} </td>
                                    </tr>
                                
                                
                            </tbody>
                        )
                    })}


                </table>
            </div>
        </div>
    )
}

export default Employees