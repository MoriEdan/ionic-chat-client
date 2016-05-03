# ionic-chat-client
Ionic 2 Socket IO  
To be used with ionic-chat-server

Discord is an anonymous chat app that incentivizes replying promptly to messages. Points are awarded for quicker responses,  which can be used to gain levels and receive rewards. The goal is to foster meaningful connections by having participants rewarded  for engaged conversations. 

If the conversation tapers, Discord can generate topics or the participants can refresh to randomly be matched to another user. However, be wary as message history is destroyed on leaving the room and previous rooms cannot be returned to.

# How to Use
1. git clone repository
2. npm install and add platforms
2. Working code is found in directory ./app
3. To use locally with ionic-chat-server, change the SERVER_URL in config.js
4. Run ionic serve --lab to run a live reload server for browser
5. Build the application with ionic build android or ionic build ios (mac only)
