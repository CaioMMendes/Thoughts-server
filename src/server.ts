interface User {
  name: string;
}
function a(user: User) {
  console.log(user);
}
a({ name: "asd" });
