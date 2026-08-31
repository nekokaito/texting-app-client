const app = {
  name: "Texting App",
  status: "ready",
  sendMessage(message) {
    return `Sending message: ${message}`;
  },
};

console.log(`${app.name} is ${app.status}.`);
console.log(app.sendMessage("Hello from the app!"));
console.log(app.sendMessage("This is a test message."));

module.exports = app;
