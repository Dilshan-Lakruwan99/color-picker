const hexInput =document.getElementById("hexInput")
const inputColor = document.getElementById("inputColor")
const sliderText = document.getElementById("sliderText")
const slider = document.getElementById("slider")
const alterdColor = document.getElementById("alterdColor")
const alterText = document.getElementById("alterText")
const lightenText = document.getElementById("lightenText")
const darkenText = document.getElementById("darkenText")
const toggleBtn = document.getElementById("toggleBtn")

toggleBtn.addEventListener("click",()=>{

    if(toggleBtn.classList.contains("toggled")){

        toggleBtn.classList.remove("toggled")
        lightenText.classList.remove("unselected")
        darkenText.classList.add("unselected")
    }
    else{

        toggleBtn.classList.add("toggled")
        lightenText.classList.add("unselected")
        darkenText.classList.remove("unselected")

    }

    reset()

})


slider.addEventListener("input",()=>{

   if(!isValidHex) return 
   sliderText.textContent = `${slider.value}%`
   const valueAddition = toggleBtn.classList.contains("toggled")?
                          -slider.value:slider.value

   const alterdHex= alterColor(hexInput.value,valueAddition)
   alterdColor.style.backgroundColor=alterdHex
   alterText.innerText= `Altered Color ${alterdHex}`
   
})

hexInput.addEventListener('keyup',()=>{

    const hexValue =hexInput.value;
    if(!isValidHex(hexValue))return;

    const hex=hexValue.replace("#",'')
    inputColor.style.backgroundColor="#"+hex;
    reset()
});



const  isValidHex=(hex)=> {
    if (!hex) return false;
  
    // Remove '#' symbol if present
    hex = hex.replace("#", "");
  
    // Check if the remaining string contains only valid hex characters
    return /^[0-9A-Fa-f]{3,6}$/.test(hex);
  }


  const convertHexToRgb=(hex)=>{
    if(!isValidHex(hex))return null;
    let strippedHex = hex.replace("#",'')
    if(strippedHex.length === 3)
    {
        strippedHex=strippedHex[0]+strippedHex[0]+strippedHex[1]
        +strippedHex[1]+strippedHex[2]+strippedHex[2]
        
    }

    const r= parseInt(strippedHex.substring(0,2),16)
    const g= parseInt(strippedHex.substring(2,4),16)
    const b= parseInt(strippedHex.substring(4,6),16)

    return {r,g,b}

}


const convertRgbToHex=(r,g,b) =>{

    const r_hex= r.toString(16)
    const g_hex= g.toString(16)
    const b_hex= b.toString(16)
    const arr=[r_hex,g_hex,b_hex]
    //*** HERE THE X IS REFERD TO THE INDEX OF THE ARRAY ***
    for(let x in arr){

        if(arr[x].length<2)
        {
            arr[x]="0"+arr[x]
        }
    }
    
    const hex="#"+arr[0]+arr[1]+arr[2]
    return hex
   

// ? Alternative way of doing above functionality here we use slicing and obain the last two characters after adding the zero to the front.
    // const firstPair=("0"+r.toString(16)).slice(-2)
    // const secondPair=("0"+g.toString(16)).slice(-2)
    // const thirdPair=("0"+b.toString(16)).slice(-2)

    // const hex="#"+firstPair+secondPair+thirdPair
}


const alterColor=(hex,percentage) => {
   
    const {r,g,b} = convertHexToRgb(hex)

    const amount = Math.floor((percentage/100)*255)

 
    const newR = increaseWithin0To255(r,amount)
    const newB = increaseWithin0To255(g,amount)
    const newG = increaseWithin0To255(b,amount)
    
     return convertRgbToHex(newR,newG,newB)
    

}


const increaseWithin0To255=(hex,amount)=>{

    // const newhex = hex + amount
    // if (newhex>255) return 255
    // if(newhex<0) return 0
    // return newhex

    // !Best way to do the above

    return Math.min(255,Math.max(0,hex+amount))

}

const reset =()=>{

    slider.value=0
    sliderText.innerText="0%"
    alterdColor.style.backgroundColor=hexInput.value
    alterText.innerText= `Altered Color ${hexInput.value}`
}





// convertRgbToHex(0,255,255)
// console.log(convertHexToRgb("000"))
  
