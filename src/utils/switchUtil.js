// This is used in the BUILDER & CART to format the string names. 
export const ingName = (ing) => {
    let strArr = Array.from(ing)
    strArr.forEach((cur, idx)=>{
        // If there's a CamelCased Letter, we Need to insert a space before it. 
        if (cur === cur.toUpperCase()){
            let spaceIdx = idx
            strArr.splice(spaceIdx, 0, ' ')
        }
    })
    // Capitalize the first letter of every ingredient, plus the rest of the string, then join the array back to a str. 
    let transString = strArr[0].toUpperCase() + strArr.slice(1).join('')
    // return the result. 
    return transString
}