export function checkCC(details) {
  return new Promise((resolve, reject) => {
    this.cs.checkCreditCard(details).subscribe(data => {
      this.response = data;
      if (this.response.err) {
        this.error = this.response.err;
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
        this.showForm = this.userLogged.logged;
        this.showSpinner = false;
        reject();
      } else {
        resolve();
      }
    });
  });
}
