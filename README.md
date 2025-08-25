# Notes & Tasks App - React Frontend

This is the **React frontend** for the Notes & Tasks application. It provides a clean, interactive and user-friendly interface to manage **notes and tasks** and communicates seamlessly with a **Spring Boot backend**. The entire application can be deployed together using **Docker**.


## Features

- **Notes Management**
  - Create, read, update, and delete notes  
  - **Notes Sidebar** for navigation and notes interaction  
  - **Note Editor** for editing content 
- **Tasks / Todo Management**
  - Add, edit, mark as done, and delete tasks  
  - Task lists linked to specific **Importance** attribute  
- Local state management for smooth UI experience  
- **Form validation** with Zod  
- Integration with a **Spring Boot backend** for persistent storage  
- Full support for **RESTful API** operations via Axios  

---

## Tech Stack

- **Frontend:** React, TypeScript, Axios, Zod  
- **Backend:** Spring Boot (REST API)  
- **Deployment:** Docker  

---

## Setup & Run Dev enviroment Locally

1. **Clone the repository**

```bash
git clone git@github.com:STzelas/Noterr-App-React-Front-end.git

cd noterr-app-react-front-end-0.2.1
```

2. Install dependancies

```
npm install
```

3. Run preview environment

    Preview enviroment do not have all endpoints unlocked because of security. For full access you need [Spring boot back-end application](https://github.com/STzelas/Noterr-App-Spring-Back-end) as well.
```
npm run preview
```

## Deploy using Docker

1. Download Spring Application

    Download the zip code of the [Notes App Back-end spring application](https://github.com/STzelas/Noterr-App-Spring-Back-end)

2. Extract the folder to a project-root folder

    Structure should be:
    ```
    project-root/
          ├─ react-app/
          └─ spring-app/

3. in spring-app/ deploy Docker

   
   ```
   cd to spring-app/ and deploy the app
   
   C:/project-root/spring-app/~
        docker-compose up --build
   ```

4. App is ready to use!
