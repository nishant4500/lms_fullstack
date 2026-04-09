# LMS Frontend

React + Vite + TypeScript frontend connected to the existing backend:

`https://lmsbackend-gbcugef8cug0abh6.centralindia-01.azurewebsites.net`

## Stack

- React (Vite)
- TypeScript
- Tailwind CSS
- Axios
- React Router

## Features

- Login / Register with JWT storage in `localStorage`
- Protected routes
- Dashboard
- Course listing and course details
- Course enrollment
- User profile page
- Logout
- Loading and error handling states

## Project Structure

- `src/components` reusable UI and layout components
- `src/pages` route-level pages
- `src/services` Axios setup + API service functions
- `src/hooks` custom hooks
- `src/context` auth state management
- `src/types` shared API types

## Environment Variable

Create a `.env` file:

```env
VITE_API_BASE_URL=https://lmsbackend-gbcugef8cug0abh6.centralindia-01.azurewebsites.net
```

## Run Locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## API Service Layer Examples

- `authService.login({ email, password })` -> `POST /login`
- `authService.register({ name, email, password, role })` -> `POST /register`
- `courseService.getCourses()` -> `GET /courses`
- `courseService.getCourseModules(courseId)` -> `GET /modules/{course_id}`
- `courseService.enrollInCourse(courseId)` -> `POST /courses/{id}/enroll`
