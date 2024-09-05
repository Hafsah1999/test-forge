const mongoose = require('mongoose');

const url = "mongodb+srv://Hafsah_Naseer:merijaan786@cluster0.vhuuatt.mongodb.net/testforge?retryWrites=true&w=majority&appName=Cluster0"

// asynchronous functions - return Promise object
mongoose.connect(url)
.then((result) => {
    console.log('database connected successfully');
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;