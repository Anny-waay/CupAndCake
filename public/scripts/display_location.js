function displayLocation(id){
    try{
        const item=document.getElementById(id).getElementsByTagName('a');
        const href=document.location.href;
        for(let i=0; i<item.length; i++){
            if (href === item[i].href){
                item[i].classList.add("current-location");
            }
        }
    } catch(e){}
}