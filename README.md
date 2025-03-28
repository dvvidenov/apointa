Apointa - Appointment Booking Platform

Project Overview
Apointa is an appointment booking platform designed to simplify the process for both businesses
and customers.

The application allows businesses, such as salons, barbershops, and sports facilities, to register,
manage their services, staff, and accept reservations.

Customers can browse businesses by category and city, and book appointments for various
services.

Features
- Business Management: Register and manage business details (name, address, phone number,
etc.)
- Service Management: Add and manage services offered by the business.
- Staff Management: Assign employees to businesses and set their availability.
- Appointment Booking: Customers can book appointments by selecting a business, service, and
time slot.
- Role-Based Authentication: Different access levels for business owners, employees, and
customers.

Tech Stack
- Frontend: React
- Backend: Laravel
- Database: PostgreSQL
- Web Server: Apache

Installation Guide
To get the project up and running, follow the steps below.

1. Install Backend (Laravel) and Apache
- Clone the repository:
git clone https://github.com/your-repository/apointa.git
- Navigate to the backend folder:
cd apointa/backend
- Install PHP dependencies:
composer install
- Set up environment variables: Copy the .env.example file to .env and modify the database
credentials according to your setup.
- Generate application key:
php artisan key:generate
- Run migrations and seed the database with sample data:
php artisan migrate:fresh --seed
- Start the backend server:
php artisan serve

2. Install Frontend (React)

- Navigate to the frontend folder:
cd ../frontend
- Install Node.js dependencies:
npm install
- Start the React development server:
npm run dev

3. Running the Project

Once you have both the backend and frontend servers running, you can navigate to
http://localhost:3000 in your browser.
The application will communicate with the Laravel API backend running at http://localhost:8000.
Conclusion
The Apointa platform is a simple, full-stack application designed to help businesses manage
appointments efficiently.
The backend is built with Laravel and PostgreSQL, while the frontend is powered by React.
The project provides a great foundation for building more complex features in the future, such as
payment integrations and more advanced search and filtering options.