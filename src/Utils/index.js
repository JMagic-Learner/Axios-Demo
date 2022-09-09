const axios = require('axios').default;
const APIEndpoint = `https://62e2c909b54fc209b8807084.mockapi.io/api/v1/Sales`



export async function FETCH() {
    let data;
     axios.get(APIEndpoint)
    .then(function (response) {
      // handle success
      console.log("This is the response", response);
      data = response
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    }).then(function () {
      console.log("Below is the data that will be returned to a component" );
      console.log(data)
    });
   
   
    return data;
}


