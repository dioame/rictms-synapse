# Laravel Shadcn Starter Kit with Inertia.js

## Introduction
The Laravel Shadcn Starter Kit with Inertia.js is a powerful boilerplate for building modern web applications. It combines the robust Laravel backend with a React-based frontend, utilizing Inertia.js for seamless client-side navigation. This kit provides a solid foundation for developers to create dynamic, single-page applications with ease, including full CRUD operations for user management and role-based access control.

## Key Features
- **Laravel Framework**: Utilizes the latest version of Laravel for a solid backend.
- **React with TypeScript**: Frontend built with React and TypeScript for type-safe development.
- **Inertia.js Integration**: Enables single-page application (SPA) behavior without the complexity of a full frontend framework.
- **Shadcn UI Components**: A collection of customizable UI components for a modern user interface.
- **User Authentication**: Built-in user authentication system.
- **User Management**: Full CRUD (Create, Read, Update, Delete) operations for user accounts.
- **Role-Based Access Control**: Integrated Spatie Laravel Permission package for flexible role and permission management.
- **Responsive Design**: Mobile-friendly layout that adapts to different screen sizes.
- **Dark Mode Support**: Built-in theme toggling between light and dark modes.
- **API Support**: Ready-to-use API routes for building RESTful services.

## Technology Stack
- Backend: Laravel (PHP)
- Frontend: React with TypeScript
- Styling: Tailwind CSS
- UI Components: Shadcn UI
- Build Tool: Vite
- Database: MySQL (configurable)
- Authentication: Laravel Breeze
- Role & Permissions: Spatie Laravel Permission

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/laravel-shadcn-inertia-starter-kit.git
   ```

2. Navigate to the project directory:
   ```
   cd laravel-shadcn-inertia-starter-kit
   ```

3. Install PHP dependencies:
   ```
   composer install
   ```

4. Install JavaScript dependencies:
   ```
   npm install
   ```

5. Copy the `.env.example` file to `.env` and configure your environment variables:
   ```
   cp .env.example .env
   ```

6. Generate an application key:
   ```
   php artisan key:generate
   ```

7. Run database migrations and seed initial data:
   ```
   php artisan migrate --seed
   ```

8. Build frontend assets:
   ```
   npm run dev
   ```

9. Start the development server:
   ```
   php artisan serve
   ```

## User Management and Roles
This starter kit comes with a complete user management system, including:
- User registration and authentication
- User profile management
- CRUD operations for managing users
- Role-based access control using Spatie Laravel Permission

### Available Roles
- Admin: Full access to all features
- Manager: Can manage users and content
- User: Basic access to the application

To assign roles and permissions, use the Spatie Laravel Permission methods in your controllers or seeders.

## Customization
### Adding New Components
1. Create new React components in `resources/js/Components`
2. Use Shadcn UI components or create custom ones as needed
3. Import and use your components in pages located in `resources/js/Pages`

### Modifying Styles
- Tailwind CSS classes can be customized in `tailwind.config.js`
- Global styles are defined in `resources/css/app.css`

### Extending User Roles
1. Define new roles in your database seeder or through the application interface
2. Assign permissions to roles using the Spatie Laravel Permission API
3. Use middleware to protect routes based on roles and permissions

## API Documentation
The starter kit includes a basic API structure. Endpoints for user management are located in `routes/api.php`. Extend this file to add more API routes as needed.

## Testing
- Run PHP tests: `php artisan test`
- Run JavaScript tests: `npm run test`

## Deployment
1. Set up your production environment
2. Configure your `.env` file for production
3. Run `npm run build` to compile and minify assets
4. Follow Laravel's deployment best practices

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
