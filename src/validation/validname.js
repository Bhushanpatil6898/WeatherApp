

 const validname=(v)=>{

     var val=v.target.value;
    var re=/[a-zA-Z]+$/;
    var result=val.match(re);
    if(result==null)
    {
        var span=document.getElementById("M");
        span.innerHTML=" City Name Only Alphabet";
        span.style.color="red";
        document.getElementById("N");
        
    }
    else{
        var span=document.getElementById("M");
        span.innerHTML="";
        span.style.color="white";
    }
}
 
 export default validname;