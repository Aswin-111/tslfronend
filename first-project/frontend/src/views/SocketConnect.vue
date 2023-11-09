<template>
<button v-on:click = "send">Send</button>
</template>

<script>



export default{
    name : "SocketConnect",
    data(){
        return{
            connection:null,
        }
    
    },

    methods:{
        
        send(chat){
            console.log(this.connection);
            
            this.connection.send(chat)
        }
    },
    created(){

    
      
        this.connection =  new WebSocket("ws://89.47.164.122:5000/");
        this.connection.onopen = (event) =>{
            console.log(event);
            console.log("Connected to the echo web socket server")
        }
        
        this.connection.onmessage = (event) =>{
            
        
            console.log(event)


        }
    }
   
}
</script>