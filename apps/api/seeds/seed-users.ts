import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
  try {
    const dataSource = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'sca_database',
    });

    console.log('🌱 Connecting to MySQL...');
    await dataSource.initialize();
    console.log('✅ Connected to MySQL');

    console.log('🧹 Clearing existing users...');
    await dataSource.query('DELETE FROM users');
    console.log('✅ Cleared users table');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@sca.com';
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      throw new Error('ADMIN_PASSWORD must be set before seeding the admin user');
    }
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    console.log('📝 Seeding admin user...');
    await dataSource.query(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [adminEmail, hashedPassword, 'admin'],
    );
    console.log(`✅ Admin user created: ${adminEmail}`);

    const users = await dataSource.query('SELECT id, email, role FROM users');
    console.log('\n📊 Seeded Users:');
    console.table(users);

    await dataSource.destroy();
    console.log('\n✅ Seed completed and disconnected from MySQL');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
