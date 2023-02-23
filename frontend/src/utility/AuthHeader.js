export default function authHeader(){
 const token=localStorage.getItem('Token');
 
 if(token){
    return {'x-access-token':token}
 }else{
    console.log('token bulunmamaktadır !');
 }
    
}