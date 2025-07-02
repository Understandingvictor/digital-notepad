let obj1 = [
    {key:"victor"},
    {key1:"ilo"},
    {key5:"yeah we are here"}
]
obj1.sort((a, b)=>{
    new Date(a.createdAt)-new Date(b.createdAt);
})
console.log(obj1);