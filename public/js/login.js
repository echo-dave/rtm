function loginModal() {
  $("#modal2").append(`
 <div class="modal" id="modal2">
 <div class="modal-background"></div>
 <div class="modal-content box">
   <form id="loginForm" action="">
     <div class="container is-paddings-2">
       <div class="columns is-centered">
         <div class="column">
           <div class="field">
             <label class="label" for="name">Name</label>
             <div class="control">
               <input class="input" name="name" type="text" placeholder="Name" required />
             </div>
           </div>
           <div class="field">
             <label class="label" for="pass">Password</label>
             <div class="control">
               <input class="input" name="pass" type="password" placeholder="Password" required />
             </div>
           </div>
           <div class="field">
             <label class="label" for="">&nbsp;</label>
             <div class="control">
               <button class="button is-primary" name="login" type="submit">
                 Login
               </button>
             </div>
           </div>
         </div>
       </div>
     </div>
   </form>
 </div>
 <button class="modal-close is-large" aria-label="close"></button>
</div>
`);
}

export { loginModal };
