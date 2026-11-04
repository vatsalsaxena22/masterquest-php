# PHP + MySQL + Bootstrap 5 — Best Practices

A practical production checklist for building secure, maintainable PHP applications with MySQL, Bootstrap 5, and vanilla JavaScript.

---

## 1. PDO + Prepared Statements
## 2. Password Hashing
## 3. CSRF Protection
## 4. Server-Side Validation
## 5. Output Escaping / XSS Protection
## 6. Authentication + Authorization
## 7. Secure Sessions
## 8. HTTPS
## 9. Secure File Uploads
## 10. Database Indexes
## 11. Transactions
## 12. DRY + Modular Includes
## 13. Honeypot + Rate Limiting
## 14. API Response Standardization
## 15. Logging + Production Error Handling

---

## 1. PDO + Prepared Statements 🔴 Critical

Always use PDO with prepared statements. Never concatenate user input directly into SQL.

### Good

```php
$stmt = $conn->prepare(
    "SELECT id, name, email FROM users WHERE email = ? LIMIT 1"
);
$stmt->execute([$email]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);
```

### Named parameters

```php
$stmt = $conn->prepare(
    "SELECT id, name FROM users WHERE status = :status AND city = :city"
);

$stmt->execute([
    ':status' => 'active',
    ':city' => $city
]);
```

### Avoid

```php
$sql = "SELECT * FROM users WHERE email = '$email'";
```

### Database connection

Keep the PDO connection in one reusable file.

```php
$pdo = new PDO(
    "mysql:host=localhost;dbname=myapp;charset=utf8mb4",
    $dbUser,
    $dbPass,
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]
);
```

**Rules**

- Use PDO everywhere.
- Use prepared statements everywhere.
- Use `utf8mb4`.
- Disable emulated prepares.
- Never trust SQL escaping as a replacement for prepared statements.

---

## 2. Password Hashing 🔴 Critical

Never store plain-text passwords.

Use PHP's password API.

```php
$hash = password_hash($password, PASSWORD_DEFAULT);
```

Verify with:

```php
if (password_verify($password, $user['password'])) {
    // Login successful
}
```

Do not use:

```php
md5($password);
sha1($password);
```

For password changes:

```php
$newHash = password_hash($newPassword, PASSWORD_DEFAULT);
```

PHP should manage the salt and algorithm automatically.

---

## 3. CSRF Protection 🔴 Critical

Every state-changing form should have CSRF protection.

### Generate token

```php
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
```

### Add to form

```php
<input
    type="hidden"
    name="csrf_token"
    value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>"
>
```

### Verify

```php
if (
    empty($_POST['csrf_token']) ||
    empty($_SESSION['csrf_token']) ||
    !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])
) {
    http_response_code(403);
    exit('Invalid CSRF token.');
}
```

Use CSRF protection for:

- Login forms where appropriate
- Registration
- Profile updates
- Password changes
- Admin actions
- Delete actions
- Payment/order state changes
- Any POST/PUT/PATCH/DELETE operation

For APIs using bearer tokens instead of cookie authentication, use an authentication design appropriate to the API rather than blindly adding form CSRF tokens.

---

## 4. Server-Side Validation 🔴 Critical

Never rely only on HTML or JavaScript validation.

Client-side validation improves UX.

Server-side validation provides security.

### Example

```php
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');

$errors = [];

if ($name === '') {
    $errors['name'] = 'Name is required.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Invalid email address.';
}

if (!preg_match('/^[0-9]{10}$/', $phone)) {
    $errors['phone'] = 'Invalid phone number.';
}
```

Validate:

- Required fields
- Length
- Type
- Format
- Numeric ranges
- Allowed values
- IDs
- File types
- File sizes
- Business rules

Never trust:

```php
$_POST
$_GET
$_FILES
$_COOKIE
$_SERVER
```

---

## 5. Output Escaping / XSS Protection 🔴 Critical

Escape data when outputting it into HTML.

Create a reusable helper:

```php
function e($value): string
{
    return htmlspecialchars(
        (string) $value,
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
}
```

Then:

```php
<h1><?= e($title) ?></h1>
```

Attribute:

```php
<input value="<?= e($name) ?>">
```

URL:

```php
<a href="<?= e($url) ?>">View</a>
```

Do not blindly escape data before storing it in the database.

**Store normalized data. Escape at output.**

For JavaScript:

```php
<script>
const user = <?= json_encode(
    $user,
    JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
) ?>;
</script>
```

Avoid:

```php
echo $_GET['name'];
```

---

## 6. Authentication + Authorization 🔴 Critical

Authentication answers:

> Who are you?

Authorization answers:

> Are you allowed to do this?

Always perform both checks.

### Authentication

```php
if (empty($_SESSION['user_id'])) {
    header('Location: /login.php');
    exit;
}
```

### Authorization

```php
if ($_SESSION['role'] !== 'admin') {
    http_response_code(403);
    exit('Access denied.');
}
```

Prefer centralized helpers:

```php
function requireLogin(): void
{
    if (empty($_SESSION['user_id'])) {
        header('Location: /login.php');
        exit;
    }
}

function requireAdmin(): void
{
    requireLogin();

    if (($_SESSION['role'] ?? '') !== 'admin') {
        http_response_code(403);
        exit('Access denied.');
    }
}
```

Never rely on:

- Hidden buttons
- Hidden form fields
- JavaScript checks
- URL obscurity

Authorization must happen on the server.

---

## 7. Secure Sessions 🔴 Critical

Start sessions securely.

```php
session_set_cookie_params([
    'httponly' => true,
    'secure' => !empty($_SERVER['HTTPS']),
    'samesite' => 'Lax'
]);

session_start();
```

After successful login:

```php
session_regenerate_id(true);
```

Store only necessary information:

```php
$_SESSION['user_id'] = $user['id'];
$_SESSION['role'] = $user['role'];
```

Do not store sensitive secrets unnecessarily in sessions.

On logout:

```php
$_SESSION = [];

if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();

    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params['path'],
        $params['domain'],
        $params['secure'],
        $params['httponly']
    );
}

session_destroy();
```

Also consider:

- Session fixation protection
- Idle session expiration
- Absolute session lifetime
- Regenerating IDs after privilege changes
- Secure cookie settings

---

## 8. HTTPS 🔴 Critical

Production applications should use HTTPS everywhere.

Use:

```text
https://example.com
```

Not:

```text
http://example.com
```

HTTPS protects:

- Login credentials
- Sessions
- Personal information
- API requests
- Payment information
- Cookies

For production:

- Install a valid TLS certificate.
- Redirect HTTP to HTTPS.
- Use Secure cookies.
- Enable HSTS after HTTPS is correctly configured.

Example Apache rule:

```apache
RewriteEngine On

RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

Test HTTPS carefully before enabling aggressive HSTS policies.

---

## 9. Secure File Uploads 🔴 Critical

Never trust the uploaded filename or extension.

Validate:

- Upload error
- File size
- MIME type
- Extension
- Actual file contents
- Storage location

Example:

```php
if (
    !isset($_FILES['file']) ||
    $_FILES['file']['error'] !== UPLOAD_ERR_OK
) {
    exit('Upload failed.');
}

if ($_FILES['file']['size'] > 5 * 1024 * 1024) {
    exit('File is too large.');
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($_FILES['file']['tmp_name']);

$allowed = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'application/pdf' => 'pdf'
];

if (!isset($allowed[$mime])) {
    exit('Invalid file type.');
}

$filename = bin2hex(random_bytes(16)) . '.' . $allowed[$mime];

move_uploaded_file(
    $_FILES['file']['tmp_name'],
    __DIR__ . '/uploads/' . $filename
);
```

### Important

Prefer storing uploaded files outside the public web root when possible.

If public storage is required:

- Disable script execution in upload directories.
- Never use the original filename as the stored filename.
- Do not allow `.php`, `.phtml`, `.phar`, or similar executable uploads.
- Re-check permissions and web-server configuration.

For images, consider decoding/re-encoding them to remove malicious metadata or malformed content.

---

## 10. Database Indexes 🟠 High

Indexes improve query performance.

Index:

- Primary keys
- Foreign keys
- Frequently searched columns
- Frequently filtered columns
- Columns used in joins
- Columns used in sorting when appropriate
- Unique business identifiers

Example:

```sql
CREATE INDEX idx_properties_city
ON properties(city);
```

Unique:

```sql
CREATE UNIQUE INDEX idx_users_email
ON users(email);
```

Foreign key:

```sql
CREATE INDEX idx_orders_user_id
ON orders(user_id);
```

Do not blindly index every column.

Too many indexes increase:

- Storage
- INSERT cost
- UPDATE cost
- DELETE cost

Use `EXPLAIN` to analyze important queries.

---

## 11. Transactions 🟠 High

Use transactions when multiple database operations must succeed or fail together.

```php
try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare(
        "INSERT INTO orders (user_id, total_amount)
         VALUES (?, ?)"
    );

    $stmt->execute([$userId, $total]);

    $orderId = $pdo->lastInsertId();

    $stmt = $pdo->prepare(
        "UPDATE products
         SET stock = stock - ?
         WHERE id = ? AND stock >= ?"
    );

    $stmt->execute([$quantity, $productId, $quantity]);

    if ($stmt->rowCount() !== 1) {
        throw new RuntimeException('Insufficient stock.');
    }

    $pdo->commit();

} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    throw $e;
}
```

Use transactions for workflows such as:

- Orders
- Stock deduction
- Payments
- Wallet operations
- Account creation with related records
- Multi-table updates

---

## 12. DRY + Modular Includes 🟠 High

DRY means:

> Don't Repeat Yourself.

Avoid duplicating:

- Database connection
- Authentication checks
- CSRF logic
- Validation helpers
- Escaping helpers
- Header
- Footer
- Navigation
- Configuration
- Email services
- API response helpers

Example structure:

```text
project/
├── config/
│   ├── config.php
│   └── database.php
├── includes/
│   ├── auth.php
│   ├── csrf.php
│   ├── functions.php
│   ├── validation.php
│   ├── header.php
│   └── footer.php
├── api/
│   ├── products/
│   └── orders/
├── admin/
├── user/
├── uploads/
├── assets/
│   ├── css/
│   └── js/
├── index.php
└── .htaccess
```

Example:

```php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/functions.php';
```

Use `__DIR__` rather than fragile relative paths.

### Modular Monolith

For many PHP applications, a modular monolith is an excellent architecture.

Example:

```text
modules/
├── auth/
├── users/
├── properties/
├── orders/
├── payments/
└── notifications/
```

Keep related functionality together while maintaining one deployable application.

Do not introduce microservices unless the project actually needs them.

---

## 13. Honeypot + Rate Limiting 🟠 High

### Honeypot

A honeypot field is invisible to normal users but attractive to basic bots.

```html
<div class="d-none" aria-hidden="true">
    <label for="website">Website</label>
    <input
        type="text"
        id="website"
        name="website"
        tabindex="-1"
        autocomplete="off"
    >
</div>
```

Server-side:

```php
if (!empty($_POST['website'])) {
    http_response_code(422);
    exit('Invalid submission.');
}
```

Use honeypots as an additional layer, not as the only anti-bot mechanism.

### Rate Limiting

Rate-limit sensitive endpoints:

- Login
- Registration
- OTP
- Password reset
- Contact forms
- Search
- Expensive API requests

For serious production systems, use a shared store such as Redis or a database-backed mechanism rather than relying only on PHP process memory.

Example concept:

```text
IP + endpoint + time window
        ↓
request count
        ↓
limit exceeded?
   ↓           ↓
 block       continue
```

Return:

```http
429 Too Many Requests
```

---

## 14. API Response Standardization 🟡 Recommended

Use a consistent JSON structure.

### Success

```json
{
    "success": true,
    "message": "Product fetched successfully.",
    "data": {
        "id": 101,
        "name": "Example Product"
    }
}
```

### Error

```json
{
    "success": false,
    "message": "Validation failed.",
    "errors": {
        "email": "Invalid email address."
    }
}
```

Create a reusable helper:

```php
function jsonResponse(
    bool $success,
    string $message = '',
    mixed $data = null,
    array $errors = [],
    int $status = 200
): never {
    http_response_code($status);

    header('Content-Type: application/json; charset=utf-8');

    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data,
        'errors' => $errors
    ]);

    exit;
}
```

Use correct HTTP status codes:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Content
429 Too Many Requests
500 Internal Server Error
```

Never expose database errors, SQL statements, file paths, or stack traces to API consumers.

---

## 15. Logging + Production Error Handling 🟠 High

Development and production should behave differently.

### Development

```php
ini_set('display_errors', '1');
error_reporting(E_ALL);
```

### Production

```php
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);
```

Log errors instead of displaying internal details.

```php
error_log($e->getMessage());
```

Production users should see:

```text
Something went wrong. Please try again later.
```

Not:

```text
PDOException: SQLSTATE[42S22]...
C:\xampp\htdocs\project\admin\orders.php:124
```

### Log useful information

Log:

- Timestamp
- Severity
- Request ID
- User ID when appropriate
- Endpoint
- Exception/error type
- Safe contextual information

Never log:

- Passwords
- OTPs
- Access tokens
- Session IDs
- Payment secrets
- API keys
- Full sensitive personal data

---

# Recommended PHP Security Foundation

A reusable bootstrap file can centralize common protections.

```php
<?php

declare(strict_types=1);

session_set_cookie_params([
    'httponly' => true,
    'secure' => !empty($_SERVER['HTTPS']),
    'samesite' => 'Lax'
]);

session_start();

$pdo = new PDO(
    "mysql:host=localhost;dbname=myapp;charset=utf8mb4",
    $dbUser,
    $dbPass,
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]
);

function e(mixed $value): string
{
    return htmlspecialchars(
        (string) $value,
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
}

function csrfToken(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf_token'];
}

function verifyCsrf(): void
{
    $token = $_POST['csrf_token'] ?? '';

    if (
        empty($_SESSION['csrf_token']) ||
        !hash_equals($_SESSION['csrf_token'], $token)
    ) {
        http_response_code(403);
        exit('Invalid CSRF token.');
    }
}
```

---

# PHP Request Lifecycle

Use a predictable request flow:

```text
Request
   ↓
Bootstrap
   ↓
Session
   ↓
Authentication
   ↓
Authorization
   ↓
CSRF validation
   ↓
Input validation
   ↓
Business logic
   ↓
Database transaction
   ↓
Response
   ↓
Logging
```

Do not mix all of this randomly inside large PHP files.

---

# Database Best Practices

Use:

```sql
ENGINE=InnoDB
```

Use:

```sql
utf8mb4
```

Prefer:

```sql
INT UNSIGNED
BIGINT UNSIGNED
DECIMAL(12,2)
DATETIME
TIMESTAMP
```

Use foreign keys where appropriate:

```sql
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE
```

Use constraints to enforce important rules:

```sql
UNIQUE(email)
NOT NULL
FOREIGN KEY(...)
```

Do not rely only on PHP to enforce database integrity.

---

# MySQL Query Best Practices

Prefer:

```sql
SELECT id, name, email
FROM users
WHERE status = ?
ORDER BY id DESC
LIMIT 20
```

Avoid:

```sql
SELECT *
FROM users
```

when you only need a few columns.

For pagination:

```sql
LIMIT ? OFFSET ?
```

For large datasets, consider cursor/keyset pagination.

Use:

```sql
EXPLAIN
```

for slow or complex queries.

---

# PHP Coding Standards

Prefer strict typing:

```php
declare(strict_types=1);
```

Use clear names:

```php
$userId
$orderId
$productId
```

Avoid:

```php
$x
$a
$tmp
```

Prefer early returns:

```php
if (!$user) {
    return null;
}

if (!$user['active']) {
    return null;
}

return $user;
```

Instead of deeply nested code.

Keep functions focused:

```text
validateUser()
createUser()
sendWelcomeEmail()
logActivity()
```

Avoid functions that perform ten unrelated jobs.

---

# HTML + Bootstrap 5 Best Practices

Use semantic HTML:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Use Bootstrap classes for layout and responsive design.

Prefer:

```html
<div class="container">
```

```html
<div class="row g-4">
```

```html
<div class="col-12 col-md-6 col-lg-4">
```

Keep custom CSS limited to project-specific design.

Do not duplicate the same CSS repeatedly.

Always use labels:

```html
<label for="email" class="form-label">Email</label>
<input
    type="email"
    id="email"
    name="email"
    class="form-control"
    required
>
```

---

# JavaScript Best Practices

Use JavaScript for:

- UI interactions
- Client-side validation
- AJAX/fetch requests
- Dynamic components

Do not use JavaScript as the security layer.

Example:

```js
const response = await fetch('/api/products/fetch.php');
const result = await response.json();

if (!result.success) {
    console.error(result.message);
}
```

Avoid exposing secrets in frontend JavaScript.

Never put:

```text
Database passwords
Private API keys
Secret tokens
Payment secret keys
```

in JavaScript.

---

# API + PHP Architecture

A clean API can follow:

```text
/api/
├── auth/
│   ├── login.php
│   ├── register.php
│   └── logout.php
├── users/
│   ├── fetch.php
│   └── update.php
├── products/
│   ├── fetch.php
│   └── details.php
└── orders/
    ├── place.php
    ├── fetch.php
    ├── details.php
    └── update-status.php
```

Each endpoint should have a predictable flow:

```php
require_once __DIR__ . '/../../config/bootstrap.php';

requireLogin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Method not allowed.', null, [], 405);
}

verifyCsrf();

// Validate input.
// Perform business logic.
// Execute database operations.
// Return standardized JSON.
```

---

# Security Headers

Consider sending appropriate security headers:

```php
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('X-Frame-Options: SAMEORIGIN');
```

For modern applications, consider a carefully designed Content Security Policy:

```text
Content-Security-Policy
```

CSP should be tested against the actual application's scripts, styles, fonts, images, and third-party services before enforcing a restrictive policy.

---

# Secrets and Configuration

Never hard-code production secrets in public source code.

Avoid:

```php
$dbPassword = 'MyRealPassword123';
```

Prefer environment/configuration management:

```php
$dbPassword = getenv('DB_PASSWORD');
```

Keep sensitive configuration outside the public web root where possible.

Never commit:

```text
.env
production credentials
API secrets
private keys
database dumps containing real user data
```

to Git.

Use:

```text
.env.example
```

for documenting required variables without real secrets.

---

# Error Handling

Use exceptions for exceptional conditions:

```php
try {
    $stmt->execute($params);
} catch (PDOException $e) {
    error_log($e->getMessage());

    http_response_code(500);
    exit('Something went wrong.');
}
```

Do not silently ignore important failures.

Bad:

```php
$stmt->execute($data);
```

when the application cannot continue safely if it fails.

---

# Production Checklist

Before deploying:

- [ ] PDO is used everywhere.
- [ ] All SQL uses prepared statements.
- [ ] Passwords use `password_hash()`.
- [ ] Passwords use `password_verify()`.
- [ ] CSRF protection exists for cookie-authenticated state-changing requests.
- [ ] Server-side validation exists.
- [ ] Output is escaped.
- [ ] Authentication is enforced server-side.
- [ ] Authorization is enforced server-side.
- [ ] Sessions use secure cookie settings.
- [ ] Session IDs are regenerated after login.
- [ ] HTTPS is enabled.
- [ ] HTTP redirects to HTTPS.
- [ ] File uploads validate MIME, size, extension, and content.
- [ ] Upload directories cannot execute PHP.
- [ ] Database indexes are reviewed.
- [ ] Transactions protect multi-step operations.
- [ ] Shared logic is modularized.
- [ ] Honeypot protection is used where useful.
- [ ] Rate limiting exists for sensitive endpoints.
- [ ] APIs return standardized JSON.
- [ ] Production errors are not displayed.
- [ ] Logs do not contain secrets.
- [ ] Secrets are outside source code.
- [ ] Database uses InnoDB and utf8mb4.
- [ ] Important database constraints exist.
- [ ] Slow queries have been checked with `EXPLAIN`.
- [ ] Security headers are configured.
- [ ] Backups are configured and tested.
- [ ] Production configuration has been reviewed.

---

# Golden Rules

```text
1. Never trust user input.
2. Validate on the server.
3. Use PDO prepared statements.
4. Hash passwords with password_hash().
5. Verify passwords with password_verify().
6. Escape output with htmlspecialchars().
7. Protect cookie-authenticated state-changing requests against CSRF.
8. Authenticate and authorize every protected operation.
9. Secure PHP sessions.
10. Use HTTPS in production.
11. Treat file uploads as untrusted.
12. Use transactions for atomic multi-step operations.
13. Keep code DRY and modular.
14. Rate-limit sensitive endpoints.
15. Standardize API responses.
16. Never expose production errors or secrets.
17. Let the database enforce data integrity.
18. Optimize queries with indexes and EXPLAIN.
19. Keep business logic separate from presentation where practical.
20. Prefer a clean modular monolith before adding unnecessary architectural complexity.
```

---

# Recommended Stack

```text
Frontend
├── HTML5
├── CSS3
├── Bootstrap 5
└── Vanilla JavaScript

Backend
├── PHP 8+
├── PDO
├── Modular Monolith
└── REST-style JSON APIs where needed

Database
├── MySQL
├── InnoDB
├── utf8mb4
├── Foreign Keys
├── Constraints
└── Proper Indexes

Security
├── HTTPS
├── CSRF
├── XSS Protection
├── Password Hashing
├── Secure Sessions
├── Server-side Validation
├── Secure Uploads
├── Honeypot
├── Rate Limiting
└── Production Error Handling

Development
├── Git
├── Environment Configuration
├── Code Review
├── Backups
└── Logging
```

## Priority Summary

| # | Practice | Priority |
|---:|---|---|
| 1 | PDO + prepared statements | 🔴 Critical |
| 2 | Password hashing | 🔴 Critical |
| 3 | CSRF | 🔴 Critical |
| 4 | Server-side validation | 🔴 Critical |
| 5 | Output escaping / XSS protection | 🔴 Critical |
| 6 | Authentication + authorization | 🔴 Critical |
| 7 | Secure sessions | 🔴 Critical |
| 8 | HTTPS | 🔴 Critical |
| 9 | Secure file uploads | 🔴 Critical |
| 10 | Database indexes | 🟠 High |
| 11 | Transactions | 🟠 High |
| 12 | DRY / modular includes | 🟠 High |
| 13 | Honeypot + rate limiting | 🟠 High |
| 14 | API response standardization | 🟡 Recommended |
| 15 | Logging + production error handling | 🟠 High |

> **Core principle:** Security first, correctness second, maintainability third, performance fourth. Optimize only after measuring real bottlenecks.
