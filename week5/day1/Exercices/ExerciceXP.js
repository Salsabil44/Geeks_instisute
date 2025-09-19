//  Exercise 1 :
function compareToTen(num){
    let mypromise = new Promise((resolve, reject) => {
        if(num <= 10){
            resolve(num + " is less than or equal to 10, success!");
        } else {
            reject(num + " is greater than 10, error!");
        }
    });
    return mypromise; 
}
compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error))
compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error))

//   Exercise 2 :
let promises=new Promise((resolve,reject)=>{
   setTimeout(()=>{
    resolve("success")
   },4000)
});
promises.then((result)=>console.log(result))
//Exercise 3 :
Promise.resolve(3).then((result)=>console.log(result))
Promise.reject("Error").catch((error)=>console.log(error))

// Exercise 4 : 