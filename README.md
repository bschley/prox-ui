# prox-ui

## Why prox-ui?

The project was born from the purpose that gamer buddies can manage the gaming servers in my homelab without that they need access to my proxmox.

![PROX-UI](https://i.ibb.co/bJ5ffKs/main.png)

## TODO:
- [ ] use controllers
- [ ] clean up server.js
- [ ] refresh jwt token
- [ ] improve ui

Minimal proxmox ui client to handle simple tasks...

## How to run the project

1. Clone the Repo and rename the .env.dist file to .env and adjust the variables.

2. Run 'npm install' and start the server with 'npm run start' or 'node server.js'

3. Stop the server and set in the .env file the INSTALL variable to false.

4. Start the server again.

5. Login: Username: admin and password: password.

6. Change the admin password

7. Add an user

8. Add to an user an proxmox api key and secret

NOTE: User permissions are handled by the api token! That's it!