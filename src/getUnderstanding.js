let user = {
    email: "my@email.com",
    updateEmail: (email) => {
      this.email = email;
    },
  };
   
  user.updateEmail("new@email.com");
  console.log(user.email);


var func = [];
for (var i = 0; i < 5; i++) {
  func[i] = function y() {
    return console.log(i);
  };
}
 
func[2]();



const promise = new Promise((res) => res(2));
 
promise
  .then((v) => {
    console.log(v);
    return v * 2;
  })
  .then((v) => {
    console.log(v);
    return v * 2;
  })
  .finally((v) => {
    console.log(v);
    return v * 2;
  })
  .then((v) => {
    console.log(v);
  });