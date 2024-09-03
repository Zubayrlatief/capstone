<template>
    <div class="col-md-4 mb-3">
       <div class="card m-auto">
       <div class="card-header">
         <slot name="cardHeader"></slot>
       </div>
       <div class="card-body">
         <slot name="cardBody"></slot>
       </div>
     </div>
   </div>
   </template>
   
   <script>
   export default {
     name: "CardComp",
   }
   </script>
   
   <style scoped>
   
   @media screen and (min-width: 991px) and (max-width: 1200px){
   .card{
     height: 405px;
   } 
   }
   </style>