import React, { useEffect, useState } from 'react'
const axios = require('axios').default;
const SalesCancelToken = axios.CancelToken;
const SalesCancel = SalesCancelToken.source();

const SalesEndpoint = axios.create({
    baseURL: 'https://62e2c909b54fc209b8807084.mockapi.io/api/v1/Sales',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
    cancelToken: SalesCancel.token,

});


function Sales() {
    const [SalesStatus, setSalesStatus] = useState("Intercept Disabled")
    const [rawFetched, setRawFetched] = useState([])


   useEffect(()=>{
    fetchSales()
   },[])

   useEffect(()=>{
    return () => {
        SalesCancel.cancel('Operation canceled by the user.');
    }
   },[])

    async function fetchSales() {
        const response = await SalesEndpoint.get("/").catch(function (thrown) {
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
        setSalesStatus("Intercept Enabled")
            SalesEndpoint.interceptors.request.use(function (config) {

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

        function cancellation(event) {
            event.preventDefault()
            if (event.target.id === "Sales") {
                console.log(SalesCancel)
            SalesCancel.cancel('Operation canceled by the user.');
        }}
    

    const Array = rawFetched?.data || [];

    return(
        <div className="tableComponent">
            <div className="output">

                
                    <div className="container">
                        <p> Sales: {SalesStatus} </p>
                        <button type="button" className="btn btn-light" id="Sales" onClick={preview}>Add Intercept </button>
                        <button type="button" className="btn btn-light" id="Sales" onClick={fetchSales}>Refetch </button>
                        {/* <button type="button" className="btn btn-light" id="Sales" onClick={cancellation}>Cancel (Sales) API Request </button> */}
                    </div>
                
                

               
                <table className="table">
                    <thead>
                        
                            <tr>
                                <th scope="col">ObjectID</th>
                                <th scope="col">Month</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Product</th>
                            </tr>
                        
                    </thead>


                    {Array.map((item, index) => {
                        return (
                            <tbody>
                               
                                    <tr>
                                        <th scope="row">{item.id}</th>
                                        <td>{item.month}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.product}</td>
                                    </tr>
                                
                                
                            </tbody>
                        )
                    })}


                </table>
            </div>
        </div>
    )
}

export default Sales