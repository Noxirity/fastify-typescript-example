import mariadb from 'mariadb';

let pool: mariadb.Pool

function initalise(): void {
    pool = mariadb.createPool({
        host: '172.17.0.5',
        port: 3306,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        connectionLimit: 100
    });
}

export async function getMariaConnection() {
    if (!pool) {
        initalise();
    }

    return pool.getConnection();
}