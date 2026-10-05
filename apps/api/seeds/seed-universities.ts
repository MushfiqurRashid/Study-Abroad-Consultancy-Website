import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const common = {
  country: 'South Korea', type: 'private', status: 'active',
  applicationDeadline: 'Dates vary by program and intake; confirm the current deadline with the university or our admissions team.',
  admissionRequirements: ['Completed application form', 'Passport copy', 'Academic certificates and transcripts', 'Proof of language proficiency where required', 'Financial support documents'],
};

const universities = [
  {
    ...common, name: 'Far East University', established: 1998,
    location: '6-32 Daehak-gil, Gamgok-myeon, Eumseong-gun, Chungcheongbuk-do',
    website: 'https://www.kdu.ac.kr/site/eng/main.do', email: '', phone: '+82-43-879-3500',
    description: 'Far East University is a private university in Eumseong, North Chungcheong Province. Its official English site highlights practice-focused study in aviation, AI and IT, health sciences, media and arts, together with international and Korean-language programs.',
    tuitionFee: 'Program-specific. Korean language program: KRW 4,400,000 per year (official published figure; verify before applying).', intakes: 'Spring and Fall; language program schedules may differ.',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=85&w=1600',
    programs: ['Aviation Operations', 'Airline Service', 'Artificial Intelligence and Computer Engineering', 'Nursing and Health Sciences', 'Media and Visual Arts', 'Korean Language Program'],
    facilities: ['On-campus dormitory', 'Aviation training facilities', 'Libraries and learning facilities', 'International student support'],
    languageRequirements: ['Requirements depend on the degree and teaching language', 'Korean language training is available for international students'],
    scholarships: ['International student scholarships may be available', 'Scholarship eligibility and amounts depend on current university policy'],
    whyChoose: ['Specialized aviation and technology programs', 'Practice-oriented education', 'Korean language and international student support'],
    accommodation: 'On-campus dormitory options are published by the university. Room type, meal plan and cost should be confirmed for the intended semester.',
  },
  {
    ...common, name: 'Sudo International University', established: 1999,
    location: '1548 Nambusunhwan-ro, Gwanak-gu, Seoul 08773',
    website: 'https://eng.siu.ac.kr/', email: 'apply@siu.ac.kr', phone: '+82-2-839-0388',
    description: 'Sudo International University is a private graduate university in Seoul. The institution adopted its current English name in 2022 and focuses on graduate-level education with an international admissions pathway.',
    tuitionFee: 'Varies by graduate program; request the current tuition schedule from admissions.', intakes: 'Spring and Fall admissions are commonly offered; confirm the active admission notice.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=85&w=1600',
    programs: ['Theology', 'Counseling', 'Leadership and Coaching', 'Global Leadership and International Development', 'Business Administration', 'Education'],
    facilities: ['Graduate research facilities', 'Library', 'International admissions support', 'Seoul campus'],
    languageRequirements: ['Language evidence depends on the selected department', 'Applicants should check the current international admission guide'],
    scholarships: ['Scholarship availability is published with each admission cycle'],
    whyChoose: ['Graduate-focused institution in Seoul', 'International student admissions', 'Programs connecting leadership, counseling, theology and management'],
    accommodation: 'Ask the international admissions office about current housing guidance and availability.',
  },
  {
    ...common, name: 'Woosong University', established: 1995,
    location: '171 Dongdaejeon-ro, Dong-gu, Daejeon 34606',
    website: 'https://english.wsu.ac.kr/main/index.jsp', email: 'inquire@wsu.ac.kr', phone: '+82-42-629-6643',
    description: 'Woosong University is a private university in Daejeon with a strong international profile. Its official English site promotes more than 25 English-taught programs across three international colleges and schools.',
    tuitionFee: 'Varies by college and program; use the current international application guide.', intakes: 'Spring and Fall.',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=85&w=1600',
    programs: ['Global Management', 'Hospitality and Tourism Management', 'Culinary Arts', 'AI and Big Data', 'Software and Computer Science', 'Railroad and Transport Management', 'Health and Welfare'],
    facilities: ['International student services', 'On-campus residence halls', 'Libraries and laboratories', 'Career and academic support'],
    languageRequirements: ['English-track requirements vary by program', 'Korean-track applicants may need TOPIK', 'Consult the current application guide for accepted scores'],
    scholarships: ['Merit-based international student scholarships', 'Scholarship level depends on admission and academic criteria'],
    whyChoose: ['More than 25 English-taught programs', 'International colleges and diverse student community', 'Career-oriented programs in business, technology, hospitality and transport'],
    accommodation: 'On-campus residence halls are available. Application, room assignment and fees are handled separately and can change by semester.',
  },
  {
    ...common, name: 'Woosuk University', established: 1979,
    location: '443 Samnye-ro, Samnye-eup, Wanju-gun, Jeonbuk State 55338',
    website: 'https://global.woosuk.ac.kr/en/', email: '', phone: '+82-63-290-1078',
    description: 'Woosuk University is a private university with campuses in Wanju and Jincheon. Its Global Education Support Center supports international admissions, Korean language education and partnerships with institutions around the world.',
    tuitionFee: 'Varies by major and semester; confirm through the current international admissions guide.', intakes: 'Spring and Fall.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=85&w=1600',
    programs: ['Business and Culture', 'Food Science and Biotechnology', 'Health and Rehabilitation', 'Computer and Information Technology', 'Education', 'Korean Language Program'],
    facilities: ['Wanju campus', 'Jincheon campus', 'Global Education Support Center', 'Student dormitories', 'Libraries and laboratories'],
    languageRequirements: ['TOPIK requirements vary by degree program', 'Korean language study is available through the university'],
    scholarships: ['International student scholarships may be based on language proficiency and academic performance'],
    whyChoose: ['Dedicated global education support', 'Broad academic portfolio', 'International partnerships across 29 countries'],
    accommodation: 'Student dormitories are available subject to application and capacity. Confirm campus, room type and semester charges before applying.',
  },
  {
    ...common, name: 'Pyeongtaek University', established: 1912,
    location: '3825 Seodong-daero, Pyeongtaek-si, Gyeonggi-do',
    website: 'https://global.ptu.ac.kr/', email: 'ptuglobal@ptu.ac.kr', phone: '+82-31-685-8632',
    description: 'Pyeongtaek University is a private university in Gyeonggi Province with institutional roots dating to 1912. Its international office provides degree admissions, Korean language education and support for international students.',
    tuitionFee: 'Varies by program; consult the latest international admissions guide.', intakes: 'Spring and Fall; Korean language program has separate terms.',
    image: 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?auto=format&fit=crop&q=85&w=1600',
    programs: ['International Business', 'Information and Communication Technology', 'Social Welfare', 'Counseling', 'Culture and Arts', 'Korean Language Program'],
    facilities: ['International student support office', 'Korean language center', 'Student housing guidance', 'Library and campus learning facilities'],
    languageRequirements: ['Degree language requirements vary by department', 'Korean language applicants follow the language center rules', 'Check the latest guide for TOPIK or other accepted evidence'],
    scholarships: ['International student scholarship schemes may apply', 'Awards depend on current admission and academic policies'],
    whyChoose: ['Accessible location in Gyeonggi Province', 'Long educational history', 'Degree and Korean language pathways for international students'],
    accommodation: 'Housing support and dormitory availability should be confirmed with the international office for the relevant intake.',
  },
  {
    ...common, name: 'Dongbang Culture University', established: 2004,
    location: '60 Seongbuk-ro 28-gil, Seongbuk-gu, Seoul',
    website: 'https://www.dongbang.ac.kr/eng/', email: 'admin@dongbang.ac.kr', phone: '+82-2-3668-9800',
    description: 'Dongbang Culture University is a graduate university in Seoul specializing in culture, arts and interdisciplinary fields. Its official English pages describe graduate departments as well as a Korean language education institute.',
    tuitionFee: 'Varies by graduate department or language course; confirm with the university.', intakes: 'Graduate and Korean language schedules differ; consult the current notice.',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=85&w=1600',
    programs: ['Culture and Arts Contents', 'Counseling Psychology and Meditation Therapy', 'Naturopathy and Rehabilitation Welfare', 'Future Prediction Contents', 'Korean Language Education', 'Tteok Management'],
    facilities: ['Graduate research environment', 'Korean language education institute', 'Library and learning facilities', 'Seoul campus'],
    languageRequirements: ['Requirements vary by graduate department', 'Korean language course placement and admission rules are set by the language institute'],
    scholarships: ['Contact the university for current graduate and international scholarship information'],
    whyChoose: ['Specialized graduate study in culture and arts', 'Interdisciplinary programs', 'Seoul location and Korean language education'],
    accommodation: 'Contact the university for current accommodation guidance; availability is not guaranteed.',
  },
];

async function seed() {
  const dataSource = new DataSource({ type: 'mysql', host: process.env.DB_HOST || 'localhost', port: Number(process.env.DB_PORT) || 3306, username: process.env.DB_USERNAME || 'root', password: process.env.DB_PASSWORD || '', database: process.env.DB_DATABASE || 'sca_database' });
  try {
    await dataSource.initialize();
    const extraColumns: Record<string, string> = {
      languageRequirements: 'JSON NULL', admissionRequirements: 'JSON NULL',
      scholarships: 'JSON NULL', whyChoose: 'JSON NULL', intakes: 'VARCHAR(300) NULL',
      applicationDeadline: 'VARCHAR(300) NULL', accommodation: 'TEXT NULL',
    };
    const existing: Array<{ COLUMN_NAME: string }> = await dataSource.query(
      'SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?',
      ['universities'],
    );
    const existingNames = new Set(existing.map((row) => row.COLUMN_NAME));
    for (const [column, definition] of Object.entries(extraColumns)) {
      if (!existingNames.has(column)) await dataSource.query(`ALTER TABLE universities ADD COLUMN \`${column}\` ${definition}`);
    }
    await dataSource.query('DELETE FROM universities');
    for (const university of universities) {
      const columns = Object.keys(university);
      const values = columns.map((key) => ['programs', 'facilities', 'languageRequirements', 'admissionRequirements', 'scholarships', 'whyChoose'].includes(key) ? JSON.stringify((university as any)[key]) : (university as any)[key]);
      await dataSource.query(`INSERT INTO universities (${columns.map((c) => `\`${c}\``).join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`, values);
    }
    console.log(`Seeded ${universities.length} Korean universities.`);
  } finally { if (dataSource.isInitialized) await dataSource.destroy(); }
}

seed().catch((error) => { console.error(error); process.exit(1); });
