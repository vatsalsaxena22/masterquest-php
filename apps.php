<?php
$page_title = 'Apps | MasterQuest';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#595c8e" />
    <link rel="icon" href="assets/images/masterquest-logo.svg" type="image/svg+xml" />
    <meta name="description" content="Explore MasterQuest apps and practice building real projects from beginner to advanced.">
    <title><?= htmlspecialchars($page_title, ENT_QUOTES, 'UTF-8') ?></title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>
    <main class="container py-4 py-lg-5">
        <!-- Page navigation -->
        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-5">
            <a href="index.html" class="btn btn-outline-secondary rounded-pill px-3">
                <i class="bi bi-arrow-left me-2" aria-hidden="true"></i>Back to MasterQuest
            </a>
            <a href="index.html" class="d-inline-flex align-items-center gap-2 text-decoration-none text-body fw-semibold">
                <img src="assets/images/masterquest-logo.svg" width="32" height="32" alt="" class="flex-shrink-0">
                <span>MasterQuest</span>
            </a>
        </div>

        <!-- Page intro -->
        <header class="apps-header mb-5">
            <span class="badge text-bg-primary d-inline-flex align-items-center gap-2 mb-3">
                <i class="bi bi-grid-1x2-fill" aria-hidden="true"></i>
                PROJECT LIBRARY
            </span>
            <div class="row align-items-end g-4">
                <div class="col-lg-8">
                    <h1 class="display-4 fw-bold lh-1 mb-3">Learn by <span class="text-primary">building.</span></h1>
                    <p class="lead text-secondary mb-0" style="max-width: 650px;">
                        Explore hands-on apps, practice real development skills, and progress from your first build to advanced projects.
                    </p>
                </div>
                <div class="col-lg-4">
                    <div class="d-flex flex-wrap gap-2 justify-content-lg-end">
                        <span class="badge rounded-pill text-bg-light border px-3 py-2">
                            <i class="bi bi-code-slash me-1" aria-hidden="true"></i> Hands-on practice
                        </span>
                        <span class="badge rounded-pill text-bg-light border px-3 py-2">
                            <i class="bi bi-bar-chart-steps me-1" aria-hidden="true"></i> Multiple levels
                        </span>
                    </div>
                </div>
            </div>
        </header>

        <!-- Apps rendered by apps.js -->
        <section aria-labelledby="apps-title">
            <div class="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
                <div>
                    <p class="text-primary text-uppercase small fw-bold letter-spacing mb-2">Choose your next build</p>
                    <h2 id="apps-title" class="h3 fw-bold mb-1">Explore apps</h2>
                    <p class="text-secondary mb-0">Pick a project that matches your current skill level.</p>
                </div>
            </div>

            <div id="appGrid" class="row g-4" aria-live="polite">
                <div class="col-12">
                    <div class="border rounded-4 p-4 p-md-5 text-center bg-body-tertiary">
                        <div class="spinner-border text-primary mb-3" role="status" aria-label="Loading apps"></div>
                        <p class="text-secondary mb-0">Loading the project library…</p>
                    </div>
                </div>
            </div>
        </section>

    </main>

    <script src="./assets/js/apps.js"></script>
</body>

</html>