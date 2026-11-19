# MasterQuest

MasterQuest is a project-based learning site for building practical PHP and MySQL applications. It includes a responsive project landing page, an app catalog, and working PHP/MySQL Apps.

## Features

- Landing page with a project catalog, learning roadmap, technology stack, and FAQ
- App catalog with beginner, intermediate, and advanced project ideas
- To-do app with task creation, editing, completion, and deletion
- Responsive interface built with Bootstrap 5.3.8 and Bootstrap Icons
- Vanilla JavaScript and a custom SVG brand mark

## Requirements

- PHP 8.0 or later
- MySQL or MariaDB
- PHP PDO MySQL extension (`pdo_mysql`)
- A modern browser and an internet connection to load Bootstrap assets from jsDelivr

## Run locally

1. Clone or download this repository.
2. Create the To-Do database and table using `todo/database/schema.sql`.
3. Configure the database connection in `todo/config/db.php` for your local MySQL credentials.
4. From the repository root, start PHP's development server:

   ```sh
   php -S 127.0.0.1:8000
   ```

5. Open [http://127.0.0.1:8000](http://127.0.0.1:8000).

The app catalog is available at `/apps.php`, and the To-Do app is available at `/todo/`.

### Database setup

For example, if the MySQL command-line client is installed:

```sh
mysql -u root -p < todo/database/schema.sql
```

The schema creates a database named `todo_db` and its `tasks` table. Update the host, database name, username, and password in `todo/config/db.php` to match your environment. Do not use development credentials in production or commit real credentials to source control.

## Project structure

```text
.
├── index.html                 # Main landing page
├── apps.php                   # Project catalog
├── assets/
│   ├── css/style.css          # Shared styles
│   ├── images/                # Brand assets
│   └── js/                    # Landing page and catalog behavior
└── todo/
    ├── index.php              # To-Do interface
    ├── actions.php            # JSON task endpoints
    ├── config/db.php          # PDO connection settings
    └── database/schema.sql    # Database and table schema
```

## Notes

- Bootstrap CSS and JavaScript and Bootstrap Icons are loaded from their CDNs. An internet connection is needed for these assets.
- The project catalog includes planned app concepts; only the To-Do app is implemented in this repository.
- The PHP built-in web server is intended for local development, not production hosting.
- Review `best-practice.md` for a broader PHP and MySQL development checklist.
