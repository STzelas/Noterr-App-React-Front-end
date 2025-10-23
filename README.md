# Notes & Tasks App - React Frontend

This is the **React frontend** for the Notes & Tasks application. It provides a modern and responsive user interface for managing notes and tasks.  
It communicates with the **[Spring Boot backend](https://github.com/STzelas/Noterr-App-Spring-Back-end)** via RESTful APIs and supports **JWT-based authentication**.  
The app can be easily deployed together with the backend and MySQL database using **Docker**.

---

## Features

- **Notes Management**
  - Create, view, edit, and delete notes
- **Tasks Management**
  - Add, update, mark as done, and delete tasks
- **User Authentication**
  - Login and registration with JWT token support
- **Validation & Error Handling**
  - Client-side and server side validation for forms
- **REST API Integration**
  - Communicates seamlessly with the Spring Boot backend
- **Responsive UI**
  - Built with modern React + TypeScript, TailwindCSS and Shadcn
- **Dockerized Deployment**
  - Easily run with backend and database using Docker Compose

---

## Tech Stack

- **Frontend:** React + TypeScript  
- **UI Library:** TailwindCSS / ShadCN UI  
- **HTTP Client:** Axios  
- **Form Handling:** React Hook Form + Zod  
- **Routing:** React Router  
- **Authentication:** JWT (stored securely in local/session storage)  
- **Deployment:** Docker  

---

## Prerequisites

### Local Development
To run the app locally, make sure you have installed:
- **Node.js 20+**
- **npm** or **yarn**
- **[Spring Boot backend](https://github.com/STzelas/Noterr-App-Spring-Back-end)** running (see backend setup)

### Docker Deployment
To deploy with Docker (recommended for full stack):
- **Docker** (latest version)
- **Docker Compose**

---

## Setup & Run Environment Locally

1. **Clone the repository**

```bash
git clone git@github.com:STzelas/Noterr-App-React-Front-end.git

cd noterr-app-react-front-end
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set environment variables**

   Create a `.env` file in the project root and define your API URL:

   ```env
   VITE_API_URL=http://localhost:8080/api
   ```

4. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

   App will run at:  
   - **http://localhost:3000**

   Make sure the **Spring Boot backend** is also running at **http://localhost:8080**.

---

## Deploy using Docker

1. **Prepare project structure**

   Extract both apps (React & Spring Boot) under a shared root folder:

   ```
   project-root/
         ├─ react-app/
         └─ spring-app/
   ```

2. **Ensure backend is ready**

   - Backend should have its own `docker-compose.yml`
   - Local MySQL service should be **stopped** before deployment

3. **Build and deploy the app**

   Navigate to the Spring app directory and build the production version:

   ```bash
   cd spring-app/
   docker-compose up --build
   ```

4. **Access the application**

   ```
   Frontend: http://localhost:3000/
   Backend:  http://localhost:8080/api
   ```

---

## Future Improvements

- Add dark mode toggle
- Improve global error handling
