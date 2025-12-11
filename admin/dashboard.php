<?php
session_start();
define('LOVESEX_APP', true);

require_once __DIR__ . '/../core/config.php';
require_once __DIR__ . '/../core/helpers.php';
require_once __DIR__ . '/../core/db.php';
require_once __DIR__ . '/../models/ProductModel.php';

if (!is_logged_in() || !is_admin()) {
    redirect(BASE_URL . '/admin/index.php');
}

$productModel = new ProductModel();
$stats = $productModel->getStatistics();
$db = Database::getInstance();

$users_stats = $db->fetchOne("SELECT COUNT(*) as total, 
                                      COUNT(CASE WHEN role = 'admin' THEN 1 END) as admins,
                                      COUNT(CASE WHEN role = 'customer' THEN 1 END) as customers
                               FROM users WHERE status = 'active'");

$orders_stats = $db->fetchOne("SELECT COUNT(*) as total,
                                      SUM(total) as revenue,
                                      COUNT(CASE WHEN order_status = 'pending' THEN 1 END) as pending,
                                      COUNT(CASE WHEN order_status = 'delivered' THEN 1 END) as delivered
                               FROM orders");

$recent_products = $db->fetchAll("SELECT id, name, price, stock, status, created_at 
                                  FROM products 
                                  ORDER BY created_at DESC 
                                  LIMIT 5");

$page_title = 'Dashboard';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title><?php echo e($page_title); ?> - Admin - <?php echo SITE_NAME; ?></title>
    <link rel="stylesheet" href="<?php echo ASSETS_URL; ?>/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { margin:0; background:#050509; color:#fff; font-family:system-ui, sans-serif; }
        .admin-layout { display:grid; grid-template-columns:240px 1fr; min-height:100vh; }
        .admin-sidebar { background:#111118; border-right:1px solid #242438; padding:16px 0; }
        .admin-sidebar h2 { margin:0 16px 16px; }
        .admin-sidebar nav a { display:block; padding:8px 16px; color:#9b9bb5; text-decoration:none; font-size:14px; }
        .admin-sidebar nav a:hover, .admin-sidebar nav a.active { background:#181824; color:#ff0066; }
        .admin-content { padding:24px; }
        .stats-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:16px; margin-bottom:24px; }
        .stat-card { background:#181824; border-radius:12px; padding:16px; border:1px solid #242438; }
        .stat-label { font-size:12px; color:#9b9bb5; text-transform:uppercase; }
        .stat-value { font-size:22px; font-weight:600; margin-top:4px; }
        table { width:100%; border-collapse:collapse; margin-top:12px; }
        th,td { padding:8px; font-size:13px; border-bottom:1px solid #242438; }
        th { text-align:left; color:#9b9bb5; }
        .badge { padding:2px 8px; border-radius:999px; font-size:11px; }
        .badge-success { background:#1b5e20; }
        .badge-warning { background:#ff8f00; }
        .badge-danger { background:#b71c1c; }
    </style>
</head>
<body>
<div class="admin-layout">
    <aside class="admin-sidebar">
        <h2>Love&Sex Admin</h2>
        <nav>
            <a href="<?php echo BASE_URL; ?>/admin/dashboard.php" class="active"><i class="fas fa-home"></i> Dashboard</a>
            <a href="#"><i class="fas fa-box"></i> Productos</a>
            <a href="#"><i class="fas fa-tags"></i> Categorías</a>
            <a href="#"><i class="fas fa-shopping-cart"></i> Órdenes</a>
            <a href="#"><i class="fas fa-users"></i> Usuarios</a>
            <a href="<?php echo BASE_URL; ?>/index.php"><i class="fas fa-globe"></i> Ver sitio</a>
        </nav>
    </aside>
    <main class="admin-content">
        <h1>Hola, <?php echo e($_SESSION['user_name']); ?></h1>
        <p style="color:#9b9bb5;">Resumen rápido de tu tienda.</p>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Productos activos</div>
                <div class="stat-value"><?php echo number_format($stats['active_products'] ?? 0); ?></div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Órdenes totales</div>
                <div class="stat-value"><?php echo number_format($orders_stats['total'] ?? 0); ?></div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Ingresos totales</div>
                <div class="stat-value"><?php echo format_money($orders_stats['revenue'] ?? 0); ?></div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Vistas totales</div>
                <div class="stat-value"><?php echo number_format($stats['total_views'] ?? 0); ?></div>
            </div>
        </div>

        <section>
            <h2>Productos recientes</h2>
            <?php if (!empty($recent_products)): ?>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Creado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($recent_products as $p): ?>
                            <tr>
                                <td>#<?php echo $p['id']; ?></td>
                                <td><?php echo e($p['name']); ?></td>
                                <td><?php echo format_money($p['price']); ?></td>
                                <td>
                                    <?php if ($p['stock'] > 10): ?>
                                        <span class="badge badge-success"><?php echo $p['stock']; ?></span>
                                    <?php elseif ($p['stock'] > 0): ?>
                                        <span class="badge badge-warning"><?php echo $p['stock']; ?></span>
                                    <?php else: ?>
                                        <span class="badge badge-danger">0</span>
                                    <?php endif; ?>
                                </td>
                                <td><?php echo e($p['status']); ?></td>
                                <td><?php echo format_date($p['created_at'], 'd/m/Y'); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else: ?>
                <p>No hay productos aún.</p>
            <?php endif; ?>
        </section>
    </main>
</div>
</body>
</html>