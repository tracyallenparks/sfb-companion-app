function mostFrequent(arr) {
    const hashmap = arr.reduce( (acc, val) => {
        acc[val] = (acc[val] || 0 ) + 1
        return acc
    },{})
    return Object.keys(hashmap).filter(x => {
        return hashmap[x] === Math.max.apply(null,Object.values(hashmap))
    })
}

function average(arr){
    let t = 0;
    for (let i = 0; i < arr.length; i++) {
        t += arr[i];
    }
    return Number((t/arr.length).toFixed(2));
}

function quantity(arr,locate){
    const found = arr.filter((item)=>item===locate);
    return found.length;
}

export {mostFrequent, average, quantity}