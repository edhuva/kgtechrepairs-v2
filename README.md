### KGTech Repair Version 2 (FullStack Application)
KGTech repair app version 2 - is a web application which provides business management repair orders system for KGTech company, mainly improving kgtech repair version 1, adding more functionality and features.

### The project currently hosted on Render
Link: https://kgtechrepairs-v2.onrender.com/

### APP INFO

### Target audience
customers, general employees, managers and admins

### Author:
Edwin Matema

### Features
1. login functionality
2. registration functionality
3. repair orders management
4. invoices management
5. repair requests management
6. employees management
7. customers management
8. users management
8. security
9. user roles restriction management
10. customers and employees statistic analysis
11. notification functionality
12. subscriptions and contact management
13. etc

### Resources & Tools include: 
1. AWS S3 bucket - Storing images
2. MongoDB Atlas - Database
3. JSON Web Tokens - Security service (access tokens and refresh tokens)
4. Git and GitHub - Code version control, Store and Sharing code
5. onRender - App Deployement and Hosting
6. Reactjs - Frontend Framework
7. Expressjs - Backend Framework
8. Nodejs - Javascript Runtime Environment
9. Javascript, JSX, HTML, CSS - Languages
10. Chrome, FireFox - Browsers
11. Redux - State Management
12. RKT Query - Data fetching and Catching
13. etc


### CheckList: 
1. [x] Replacing kGTech version 1 which was only focusing on replacing sticky note system
2. [x] Add a standard public facing page with KGTech infos (Home page)
3. [x] Desktop mode is most important but should be available in mobile
4. [x] Add customer registration to the application
5. [x] Add employee registration portal to the application 
6. [x] Add customer and employee login to the application
7. [x] Provide a welcome dashboard after login 
8. [x] Provide short statistic analysis on dashboard
9. [x] Provide sideBar
10. [x] Provide easy navigation
11. [x] Display current user and assigned role 
12. [x] Provide a logout option
13. [x] User Account Profile page
14. [x] Allow app users to update the account profile settings
15. [x] Require employees to login at least once per week
16. [x] Provide a way to remove user access asap if needed (only active users have access)
17. [x] Users of the application can be general Users, Customers, Employees, Managers, or Admins 
18. [x] Repair orders are assigned to specific employees
### Repair Orders: 
19. [x] REPAIR ORDERS have a ticket #, customer username, employee created & employee assigned usernames, device type, serial number, brand, issue description, status, created & updated dates
20. [x] Repair orders are either PROCESSED or AWAITING
21. [x] Repair orders can only be created, edited or deleted by employeees
### Repair Requests: 
22. [x] REPAIR REQUESTS have a ticket #, customer username, device type, serial number, brand, issue description, status, created & updated dates
23. [x] Repair requests are either PROCESSED or AWAITING
### Invoices: 
24. [x] INVOICES have a ticket #, rapair order id, customer username, employee assigned username, device type, serial number, total amount, status, created & updated dates
25. [x] Invoices are either PAID or UNPAID
### General users: 
26. [x] GENERAL USERS have a username, password, roles, status, created & updated dates
27. [x] General users are either ACTIVE or INACTIVE
### Customers: 
28. [x] CUSTOMERS have a username, fullname, phone number, email, password, expertises, roles, status, created & updated dates
29. [x] Customers are either ACTIVE or INACTIVE
30. [x] Customers can create, edit, view or delete repair request with their usernames.
31. [x] Customers can view only repair orders, repair requests, invoices with their usernames
### Employees: 
32. [x] EMPLOYEES(general employees, managers, admins) have a username, fullname, phone number, email, password, expertises, roles, status, created & updated dates
33. [x] Employees are either ACTIVE or INACTIVE
34. [x] Employees can create, edit, delete or view repair orders, invoices
35. [x] Employees can only view or edit repair requests
36. [x] Only Employees have access to customers settings
37. [x] Employees can create, edit, delete or view customers
38. [x] Only Managers or Admins can create, edit, delete or view employees and general users
39. [x] Only Managers or Admins can view employees and customers staitstics analysis
40. [x] Only Managers or Admins have access to users and employees settings
41. [x] Only Managers or Admins have access to customers and employees analysis
### Public pages: 
42. [x] Provide Computer  Repairs pages
43. [x] Provide Data Recovery, Support, Parts Pages
44. [x] Provide About Us, Contact Us pages
45. [x] Provide Terms & Conditions, Privacy Policy pages
46. [x] Provide Social Media (facebook, twitter X, instagram, linkedin) platforms Links

### KGTech Repair Version 2: Home Page
![kgtech-v2](https://github.com/user-attachments/assets/ac4b436e-bbe4-4043-a1ee-4f3cd386344d)

### KGTech Repair Version 2: Dash Board
![kgtech-v2-3](https://github.com/user-attachments/assets/a9648ed2-3685-4ce0-a3a5-b52374f7ff33)

### KGTech Repair Version 2: User Account Profile
![kgtech-v2-4](https://github.com/user-attachments/assets/ebf79028-adcd-43f5-a839-7c65a82daa94)

### KGTech Repair Version 2: Repair Orders List
![kgtech-v2-6](https://github.com/user-attachments/assets/0796f4c0-9769-430f-851c-fff52b85f963)

### KGTech Repair Version 2: Invoices List
![kgtech-v2-5](https://github.com/user-attachments/assets/0fe24313-edce-43dd-9ed9-d91e136e0950)

### KGTech Repair Version 2: Customers Analysis
![kgtech-v2-7](https://github.com/user-attachments/assets/366b61de-0052-417c-9bff-f968cbd7f384)

### KGTech Repair Version 2: Employees Analysis
![kgtech-v2-8](https://github.com/user-attachments/assets/16bd995d-7d84-4d9e-aaeb-44891332fc1d)
