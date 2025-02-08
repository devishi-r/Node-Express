# Contact Management System

API Endpoints:
![Rest API Convention](image.png)

Commit 1: 'Initial Commit'
- Set 'start' and 'dev' scripts in package.json
- Created server.js
- Used Postman to verify working of api end points 

Commit 2: 'Router'
- Created new directory to configure routes: `router`
- Replaced app.get() with middleware app.use() 

Commit 3: 'Controllers'
- Controllers: contain logic for request respones + connect with database
- Creating API logic methods -> specify labesl : description, route, access specifier
(Access specified: public) - to be made private after implementing auth
- Compress multiple HTTP methods per route (`contactRoutes.js`)