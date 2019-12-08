function signUpModal() {
  $("#modal1").append(`
  <div class="modal-background"></div>
  <div class="modal-content box">
    <form id="signUpForm" action="">
      <div class="field">
        <label class="label" for="name">Name</label>
        <div class="control">
          <input class="input" name="name" type="text" placeholder="Name" required />
        </div>
      </div>
      <div class="field">
        <label class="label" for="pass">Password</label>
        <div class="control">
          <input class="input" name="pass" type="password" placeholder="Password" pattern=".{12,}" />
        </div>
      </div>
      <div class="field">
        <label class="label" for="passTest">Re-type Password</label>
        <div class="control">
          <input class="input" name="passTest" type="password" placeholder="Retype Password" required
            pattern=".{12,}" />
        </div>
      </div>
   

      <div class="field">
        <label class="label" for="photo">Photo</label>
        <div class="control">
          <span id="imageRemove">X</span>
          <input class="input" name="photo" type="file" />
        </div>
      </div>
      <div class="field">
        <label class="label" for="">&nbsp;</label>
        <div class="control">
          <button class="button is-primary" name="makeNewUser" type="submit">
            Signup
          </button>
        </div>
      </div>
    </form>
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
  </div>
  `);
}

export { signUpModal };
