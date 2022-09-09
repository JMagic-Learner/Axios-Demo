import React, { useEffect, useState } from 'react'
const axios = require('axios').default;

// Define two unique tokens for individual API cancels
const SalesCancelToken = axios.CancelToken;
const EmployeeCancelToken = axios.CancelToken;
const SalesCancel = SalesCancelToken.source();
const EmployeeCancel = EmployeeCancelToken.source();

// Create Instances for Separate API Endpoints
const SalesEndpoint = axios.create({
    baseURL: 'https://62e2c909b54fc209b8807084.mockapi.io/api/v1/Sales',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});
const EmployeeEndpoint = axios.create({
    baseURL: 'https://62e2c909b54fc209b8807084.mockapi.io/api/v1/Employees',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});


function Table() {
    const [category, setCategory] = useState("Click on either Sales or Employee to load data")
    const [EmployeeStatus, setEmployeeStatus] = useState("Intercept Disabled")
    const [SalesStatus, setSalesStatus] = useState("Intercept Disabled")
    const [rawFetched, setRawFetched] = useState([])
    
    function requestEmployees(event) {
        event.preventDefault()
        fetchEmployees()
        setCategory("Employees")
    }

    function requestSales(event) {
        event.preventDefault()
        fetchSales()
        setCategory("Sales")
    }

    async function fetchSales() {
        const response = await SalesEndpoint.get("/",
            {
                cancelToken: SalesCancel.token,
                timeout: 1500
            }).catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
                } else {

                }
            })
        setRawFetched(response)
        return response
    }

    async function fetchEmployees() {
        const response = await EmployeeEndpoint.get("/",
        {
            cancelToken: EmployeeCancel.token,
            timeout: 1500
        }).catch(function (thrown) {
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

        if (event.target.id === "Sales") {
            setSalesStatus("Intercept Enabled")
        } else {
            setEmployeeStatus("Intercept Enabled")
        }

        if (category === "Sales") {
            SalesEndpoint.interceptors.request.use(function (config) {

                if (config) {
                    console.log("We have pinged intereceptor for the SalesEndPoint")
                    console.log("This is hte intercepted config", config)
                }
                return config;
            }, function (error) {
                // Do something with request error
                return Promise.reject(error);
            });
        } else {
            EmployeeEndpoint.interceptors.request.use(function (config) {
                if (config) {
                    console.log("We have pinged intereceptor for the EmployeeEndPoint")
                    console.log("This is hte intercepted config", config)
                }
                return config;
            }, function (error) {
                // Do something with request error
                return Promise.reject(error);
            });
        }
    }

    function removePreview(event) {
        event.preventDefault()
        if (event.target.id === "Sales") {
            setSalesStatus("Intercept Disabled")
            const SalesEject = SalesEndpoint.interceptors.request.use(function () {/*...*/ });
            SalesEndpoint.interceptors.request.eject(SalesEject);
          
        } else {
            setEmployeeStatus("Intercept Disabled")
            const EmployeeEject = EmployeeEndpoint.interceptors.request.use(function () {/*...*/ });
            EmployeeEndpoint.interceptors.request.eject(EmployeeEject);
           
        }
    }

    function cancellation(event) {
        event.preventDefault()
        if (event.target.id === "Sales") {
        SalesCancel.cancel('Operation canceled by the user.');
        fetchSales();
        }
        if (event.target.id === "Employees") {
        EmployeeCancel.cancel('Operation canceled by the user.');
        fetchEmployees();
        }
    }

    const Array = rawFetched?.data || [];


    return (
        <div className="tableComponent">
            <button type="button" className="btn btn-light" onClick={requestEmployees}> Employees </button>
            <button type="button" className="btn btn-light" onClick={requestSales}> Sales </button>

            <div className="output">
                <h1> {category} </h1>

                {category === "Sales" &&
                    <div className="container">
                        <p> Sales: {SalesStatus} </p>
                        <button type="button" className="btn btn-light" id="Sales" onClick={preview}>Add Intercept </button>
                        <button type="button" className="btn btn-light" id="Sales" onClick={removePreview}>Remove Intercept </button>
                        <button type="button" className="btn btn-light" id="Sales" onClick={cancellation}>Cancel (Sales) API Request </button>
                    </div>
                }
                {category === "Employees" &&
                    <div className="container">
                        <p> Employees:{EmployeeStatus} </p>
                        <button type="button" className="btn btn-light" id="Employees" onClick={preview}>Add Intercept </button>
                        <button type="button" className="btn btn-light" id="Employees" onClick={removePreview}>Remove Intercept </button>
                        <button type="button" className="btn btn-light" id="Employees"onClick={cancellation}>Cancel (Employee) API Request </button>
                    </div>
                }

               
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