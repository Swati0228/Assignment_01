const pool = require('./db');

async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('✅ PostgreSQL Connected');
        console.log(result.rows[0]);
    } catch (err) {
        console.error('❌ Connection Failed');
        console.error(err);
    } finally {
        await pool.end();
    }
}

testConnection();