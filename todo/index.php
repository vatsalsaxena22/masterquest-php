<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP MySQL To-Do List</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
        }

        .task-completed {
            text-decoration: line-through;
            color: #6c757d;
        }
    </style>
</head>

<body>

    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="card shadow-sm border-0">
                    <div class="card-body p-4">
                        <h3 class="card-title text-center mb-4 fw-bold">
                            <i class="bi bi-check2-square text-primary me-2"></i>My To-Do List
                        </h3>

                        <form id="addTaskForm" class="input-group mb-4">
                            <input type="text" id="taskInput" class="form-control" placeholder="Enter a new task..." required>
                            <button type="submit" class="btn btn-primary d-flex align-items-center">
                                <i class="bi bi-plus-lg me-1"></i> Add Task
                            </button>
                        </form>

                        <ul id="taskList" class="list-group list-group-flush">
                            <li class="list-group-item text-center text-muted py-3">Loading tasks...</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold" id="editModalLabel">Edit Task</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="editTaskId">
                    <div class="mb-3">
                        <label for="editTaskTitle" class="form-label">Task Title</label>
                        <input type="text" class="form-control" id="editTaskTitle" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="saveTaskUpdate()">Save Changes</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));

        document.addEventListener('DOMContentLoaded', fetchTasks);

        // Fetch and Display All Tasks
        async function fetchTasks() {
            const response = await fetch('actions.php?action=fetch');
            const result = await response.json();
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';

            if (result.status === 'success') {
                if (result.data.length === 0) {
                    taskList.innerHTML = '<li class="list-group-item text-center text-muted py-3">No tasks found. Add one above!</li>';
                    return;
                }

                result.data.forEach(task => {
                    const isCompleted = task.status === 'completed';
                    const li = document.createElement('li');
                    li.className = 'list-group-item d-flex align-items-center justify-content-between gap-3 px-2 py-3';

                    li.innerHTML = `
                    <div class="form-check d-flex align-items-center flex-grow-1 mb-0">
                        <input class="form-check-input me-2 fs-5" type="checkbox" ${isCompleted ? 'checked' : ''} 
                            onchange="toggleTaskStatus(${task.id}, this.checked)">
                        <span class="fs-6 text-break ${isCompleted ? 'task-completed' : ''}">${escapeHtml(task.title)}</span>
                    </div>
                    <div class="d-flex gap-2 flex-shrink-0">
                        <button class="btn btn-sm btn-outline-warning" onclick="openEditModal(${task.id}, '${escapeHtml(task.title)}')">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${task.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                `;
                    taskList.appendChild(li);
                });
            }
        }

        // Add New Task
        document.getElementById('addTaskForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const titleInput = document.getElementById('taskInput');
            const title = titleInput.value.trim();

            if (!title) return;

            const response = await fetch('actions.php?action=add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title
                })
            });

            const result = await response.json();
            if (result.status === 'success') {
                titleInput.value = '';
                fetchTasks();
            } else {
                alert(result.message);
            }
        });

        // Toggle Pending/Completed Status
        async function toggleTaskStatus(id, isChecked) {
            const status = isChecked ? 'completed' : 'pending';
            await fetch('actions.php?action=toggle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    status: status
                })
            });
            fetchTasks();
        }

        // Open Edit Modal
        function openEditModal(id, currentTitle) {
            document.getElementById('editTaskId').value = id;
            document.getElementById('editTaskTitle').value = currentTitle;
            editModal.show();
        }

        // Save Updated Task Title
        async function saveTaskUpdate() {
            const id = document.getElementById('editTaskId').value;
            const title = document.getElementById('editTaskTitle').value.trim();

            if (!title) return;

            const response = await fetch('actions.php?action=update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    title: title
                })
            });

            const result = await response.json();
            if (result.status === 'success') {
                editModal.hide();
                fetchTasks();
            } else {
                alert(result.message);
            }
        }

        // Delete Task
        async function deleteTask(id) {
            if (!confirm('Are you sure you want to delete this task?')) return;

            const response = await fetch('actions.php?action=delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            });

            const result = await response.json();
            if (result.status === 'success') {
                fetchTasks();
            } else {
                alert(result.message);
            }
        }

        // Helper: Escape HTML string to prevent XSS
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.innerText = text;
            return div.innerHTML.replace(/'/g, "\\'");
        }
    </script>

</body>

</html>