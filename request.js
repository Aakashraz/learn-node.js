const axios = require('axios');

axios.get('https://www.wikipedia.org').then( res => {
    console.log(res.data);
}).catch(err => {
    console.error(err);
}).then( ()=> "All Done !!!")