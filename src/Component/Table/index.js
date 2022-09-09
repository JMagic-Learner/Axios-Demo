import React, { useEffect, useState } from 'react'
const axios = require('axios').default;

const SalesEndpoint = axios.create({
    baseURL: 'https://62e2c909b54fc209b8807084.mockapi.io/api/v1/Sales',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});
const EmployeeEndpoint = axios.create({
    baseURL: 'https://62e2c909b54fc209b8807084.mockapi.io/api/v1/Employees',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});




function Table() {
    const [category, setCategory] = useState("Sales")
    const [rawFetched, setRawFetched] = useState([])
  
    // On component mount, we fetch the API endpoint
    useEffect(() => {
        fetchSales()
    }, [])

    useEffect(() => {
        console.log("This is the entire response (RAW)", rawFetched.data)
    }, [rawFetched])

    async function fetchSales() {
       const response = await SalesEndpoint.get("/", {timeout: 1500});
       console.log(response)
       setRawFetched(response)
       return response
    } 

    async function fetchEmployees() {
        const response = await EmployeeEndpoint.get("/", {timeout: 1500});
        console.log(response)
        setRawFetched(response)
        return response
     } 

    // This useEffect will check to see if data has been updated
  
    function requestEmployees(event){
        event.preventDefault()
        fetchEmployees()
        setCategory("Employees")
    }

    function requestSales(event){
        event.preventDefault()
        fetchSales()
        setCategory("Sales")
    }

    function preview(event) {
        event.preventDefault()
        SalesEndpoint.interceptors.request.use(function (config) {
            console.log("We have pinged intereceptor")
            console.log("This is hte intercepted config", config)
            return config;
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          });

         
    }

    const Array = rawFetched?.data || [];


    return (
        <div className="tableComponent">
            <button type="button" className="btn btn-light" onClick={requestEmployees}> Employees </button>
            <button type="button" className="btn btn-light"  onClick={requestSales}> Sales </button>
            <button type="button" className="btn btn-light" onClick={preview}>Add Intercept </button>
            <div className="output">
                <table className="table">
                    <thead>
                         {category === "Sales" && 
                        <tr>
                            <th scope="col">ObjectID</th>
                            <th scope="col">Month</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Product</th>
                        </tr>
                        }
                         {category === "Employees" && 
                        <tr>
                            <th scope="col">ObjectID</th>
                            <th scope="col">Onboard Date</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">Title</th>
                        </tr>
                        }
                    </thead>


                    {Array.map((item, index) => {
                        return (
                            <tbody>
                                {category === "Sales" && 
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.month}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.product}</td>
                                </tr>
                                }
                                 {category === "Employees" && 
                                <tr>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.createdAt}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.department}</td>
                                    <td> {item.title} </td>
                                </tr>
                                }
                            </tbody>
                        )
                    })}


                </table>
            </div>
        </div>
    )
}

export default Table