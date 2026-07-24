-- 001_create_orders_tables.sql

CREATE TABLE orders (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    store_id BIGINT UNSIGNED NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    status ENUM('PLACED', 'PREPARING', 'COMPLETED')
        NOT NULL DEFAULT 'PLACED',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_orders_total_amount
        CHECK (total_amount >= 0),

    INDEX idx_orders_created_at (created_at),
    INDEX idx_orders_store_created_at (store_id, created_at)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE order_items (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT UNSIGNED NOT NULL,
    item_id BIGINT UNSIGNED NOT NULL,
    qty INT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_order_items_qty
        CHECK (qty > 0),

    INDEX idx_order_items_order_id (order_id),
    INDEX idx_order_items_item_id (item_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE orders_archive (
    id BIGINT UNSIGNED PRIMARY KEY,
    store_id BIGINT UNSIGNED NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    status ENUM('PLACED', 'PREPARING', 'COMPLETED') NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    archived_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_orders_archive_total_amount
        CHECK (total_amount >= 0),

    INDEX idx_orders_archive_created_at (created_at),
    INDEX idx_orders_archive_store_created_at (store_id, created_at)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE order_items_archive (
    id BIGINT UNSIGNED PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    item_id BIGINT UNSIGNED NOT NULL,
    qty INT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL,
    archived_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_items_archive_order
        FOREIGN KEY (order_id)
        REFERENCES orders_archive(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_order_items_archive_qty
        CHECK (qty > 0),

    INDEX idx_order_items_archive_order_id (order_id),
    INDEX idx_order_items_archive_item_id (item_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;