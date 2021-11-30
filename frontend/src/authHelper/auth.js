export const isAuthenticated = () =>{
    if(typeof window=="undefined")
    {
        return false
    }   
    if(localStorage.getItem("userID")){
        return JSON.parse(localStorage.getItem("userID"))
    }
    else{
        return false;
    }
}