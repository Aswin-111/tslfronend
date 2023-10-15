let data = [{
    name : "mario",
    age : 10
},
{
    name : "contra",
    age : 17
},
{
    name : "superman",
    age : 17
}
]



let text = ""





for(let i = 0; i < data.length; i++){
    if(data[i].key === "age"){
        text+=','
    }
    text+=`${data[i].name},${data[i].age}`
}
let query = `INSERT INTO agents(name,age) VALUES(${text})`;

console.log(query)