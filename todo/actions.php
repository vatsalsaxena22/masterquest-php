<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config/db.php';

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'fetch':
        $stmt = $pdo->query("SELECT * FROM tasks ORDER BY id DESC");
        echo json_encode(['status' => 'success', 'data' => $stmt->fetchAll()]);
        break;

    case 'add':
        $data  = json_decode(file_get_contents('php://input'), true);
        $title = trim($data['title'] ?? '');

        if (empty($title)) {
            echo json_encode(['status' => 'error', 'message' => 'Task title cannot be empty.']);
            exit;
        }

        $stmt = $pdo->prepare("INSERT INTO tasks (title) VALUES (:title)");
        $stmt->execute(['title' => $title]);
        echo json_encode(['status' => 'success', 'message' => 'Task added successfully!']);
        break;

    case 'update':
        $data  = json_decode(file_get_contents('php://input'), true);
        $id    = filter_var($data['id'] ?? null, FILTER_VALIDATE_INT);
        $title = trim($data['title'] ?? '');

        if (!$id || empty($title)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid data provided.']);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE tasks SET title = :title WHERE id = :id");
        $stmt->execute(['title' => $title, 'id' => $id]);
        echo json_encode(['status' => 'success', 'message' => 'Task updated successfully!']);
        break;

    case 'toggle':
        $data   = json_decode(file_get_contents('php://input'), true);
        $id     = filter_var($data['id'] ?? null, FILTER_VALIDATE_INT);
        $status = ($data['status'] === 'completed') ? 'completed' : 'pending';

        if (!$id) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid task ID.']);
            exit;
        }

        $stmt = $pdo->prepare("UPDATE tasks SET status = :status WHERE id = :id");
        $stmt->execute(['status' => $status, 'id' => $id]);
        echo json_encode(['status' => 'success']);
        break;

    case 'delete':
        $data = json_decode(file_get_contents('php://input'), true);
        $id   = filter_var($data['id'] ?? null, FILTER_VALIDATE_INT);

        if (!$id) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid task ID.']);
            exit;
        }

        $stmt = $pdo->prepare("DELETE FROM tasks WHERE id = :id");
        $stmt->execute(['id' => $id]);
        echo json_encode(['status' => 'success', 'message' => 'Task deleted successfully!']);
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action requested.']);
        break;
}
?>