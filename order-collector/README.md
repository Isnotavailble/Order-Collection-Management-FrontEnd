# Project Setup 
Firstly, you need to install **node.js 22 or higher** on your PC. This installs npm automatically with node.js so you don't need to install **npm** separately.

we use (you can check  `package.json`) :

 - npm-version : `11.6.2`
 - node-version : `v24.11.1`
 - react-version : `19.1.1`
 - vite-version : `7.1.0`
> you can use any higher than those version.
---

## To clone our repository:
- create a folder for project
- in that folder,run the following command
```shell 
git clone https://github.com/Isnotavailble/Order-Collection-Management-FrontEnd.git
```

## Downloading Dependencies
go to the folder `order-collector` which is our repo folder and run the following command in cmd : 

```shell
npm install
```
This will install every dependencies we need.
## Running the project:
in `order-collector` folder run the following command in cmd : 
```shell
npm run dev
```

----

## Project Structure
This is the overall structure.

![alt text](image.png)

####  Folder
- **AdminDashBoard**
This Page was not done in time.There is nothing
- **assests**
This is the assests folder like png,fonts and customButton componments.
- **assests/CustomButton**
All the custom button componment and its css file.any other files can be ignored.
- **CreateOrdersPage**
create orders page and its componments
- **EditOrdersPage**
edit orders page and its componments.
- **ErrorOverlays**
the componment that display error status in overlay ( z-index)
- **HomePage**
home page  componemnt and its css file.
- **Login**
login page 
- **Nav**
side navigation bar componment
- **Orders**
collection of pagecomponment and its style models 
- **Orders/OrderDashBoard.jsx** 
 a page componment
- **Orders/OrderCardModel.jsx**
a card style componment for order dash board page.
- **Orders/SearchBar.jsx**
a search bar componment for order dash board page. 
- **PublicPage**
public page or landing page before login/registor process
- **Register**
register form page
- **UpperRow/ProfileRow.jsx**
for profile icon and user name on the head div ( including the logout right side bar)
- **App.jsx**
main of React
- **Auth.jsx**
a user data provider for auth process just to avoid props drilling
- **CustomDivHandler.jsx**
just a handler componet that will any child componment when user at `"/" , "/login" , "/register"`
- **main.jsx**
main componment of React that wrap App.jsx(can be ignored)
- **RouteGuard.jsx**
protect the child componment when unauthorized user enter feature Pages (creatorderpage,...etc)

> ### Note:
> just run with the cmd not with liver server extension or anyother IDE interactions




