/**
 * FBSF Website — Central content data
 * --------------------------------------------------------------
 * VERIFIED CONTENT SOURCE: "New Microsoft Word Document.pdf"
 * (FBSF faculty website documentation, 74 pages)
 *
 * RULES:
 *  - Only information present in the source document is included.
 *  - Where a field is absent, it is omitted or marked "not available".
 *  - Historical deadlines/events are marked status: 'concluded'
 *    (site is current as of November 2026; all documented deadlines
 *    have passed and are retained for reference only).
 *  - Do not invent names, fees, dates or contact details.
 */
(function (global) {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* SITE / FACULTY GLOBAL INFORMATION                                   */
  /* ------------------------------------------------------------------ */
  var SITE = {
    name: 'Faculty of Business Studies and Finance',
    shortName: 'FBSF',
    university: 'Wayamba University of Sri Lanka',
    established: '01 October 1999',
    gazette: 'Government Notification in the Extraordinary Gazette No. 1093/8 of Tuesday, 17 August 1999',
    location: 'Kuliyapitiya premises, Wayamba University of Sri Lanka',
    postal: '60200, Kuliyapitiya, Sri Lanka',
    email: 'bsfoffice@wyb.ac.lk',
    tel: '+94 37 228 4215',
    dean: 'Professor SK Gamage',
    noteCurrent: 'All application deadlines, events and calls for papers listed on this website are reproduced from the faculty\'s published documentation (2023–2026). As of November 2026 these have concluded; they are retained for reference. Verify current dates with the faculty office.',
    vision: 'To be the center of excellence in management education.',
    mission: 'To develop intellectual, ethical and socially responsible human capital through management education, innovative research and outreach programmes to the sustainable development and the wellbeing of the society.'
  };

  /* ------------------------------------------------------------------ */
  /* DEPARTMENTS                                                        */
  /* ------------------------------------------------------------------ */
  var DEPARTMENTS = [
    {
      slug: 'accountancy',
      name: 'Department of Accountancy',
      short: 'DoA',
      icon: 'icon-book',
      tagline: 'Pioneers of business education at Wayamba University',
      intro: 'The Department of Accountancy at Wayamba University of Sri Lanka has played a pioneering role in business education since the establishment of the University in 2001, being one of the earliest academic disciplines introduced. At present, the Department offers the B.Sc in Accountancy and Business Finance degree, designed to meet the evolving demands of the accounting and business environment. The degree programme is structured into three key academic clusters — Accountancy, Business Finance, and Accounting Information Systems — designed to provide students with a comprehensive and industry-relevant education.',
      vision: 'An Assured future for all Sri Lankans and a prosperous society through learning',
      mission: 'The department will ensure the provision of high-quality accountancy education and training towards optimum utilization, control and development of resources that; raise achievement reduces disparity leads to opportunities',
      hodTitle: 'Message from the Head of the Department',
      hodName: null, // not provided in source document
      hodMessage: 'The Department is strongly committed to delivering high-quality accounting education with a holistic approach to developing competent and ethical business professionals. Our academic staff comprise well-qualified scholars with doctoral training, relevant industry experience, and professional credentials in accountancy and related fields. They actively engage in research across diverse areas, including financial and management accounting, auditing, financial management, accounting education, taxation, and corporate governance. Our teaching and learning practices emphasize strong theoretical foundations, professional competencies, and innovative pedagogical approaches. The accounting programmes offered by the Department are accredited by leading professional bodies such as the Association of Chartered Certified Accountants (ACCA), the Chartered Institute of Management Accountants (CIMA), the Institute of Chartered Accountants of Sri Lanka (CA Sri Lanka), and the Institute of Certified Management Accountants (CMA). These accreditations enhance the professional recognition and career prospects of our graduates. Graduates of the Department are well prepared to serve in managerial and professional capacities across a wide range of organizations, including accounting and auditing firms, financial institutions, corporate entities, government bodies, and non-profit organizations, both in Sri Lanka and beyond.',
      research: 'Academic staff actively engage in research across diverse areas, including financial and management accounting, auditing, financial management, accounting education, taxation, and corporate governance. The department publishes the Journal of Accountancy & Finance (JAF) and the open-access Journal of SACFIRE, and participates in the SACFIRE symposium and the faculty-level JARSYM journal.',
      industry: {
        title: 'MoUs with Professional Bodies & Accreditation',
        items: [
          'Accreditation of the B.Sc. in Accountancy and Business Finance degree programme by CFA',
          'MoU with Association of Chartered Certified Accountants (ACCA)',
          'MoU with Institute of Certified Management Accountants of Sri Lanka (CMASL)',
          'MoU with Institute of Chartered Accountants of Sri Lanka (ICASL)',
          'Programme accredited / recognised by CIMA and CA Sri Lanka (professional bodies named in the Head of Department\'s message)'
        ]
      },
      publications: ['JAF', 'SACFIRE', 'JARSYM', 'SLJBSF'],
      contact: 'Contact details for this department were not provided in the source document. Please contact the faculty office.'
    },
    {
      slug: 'banking-finance',
      name: 'Department of Banking and Finance',
      short: 'DoBF',
      icon: 'icon-chart',
      tagline: 'Pioneer in banking and finance education in Sri Lanka',
      intro: 'The Department of Banking & Finance is one of the pioneer academic departments in the Faculty of Business Studies and Finance, which offers the B.Sc Banking and Finance (Special) degree programme every year to the undergraduates of the faculty since 2001. The Department of Banking and Finance is committed to providing a well-rounded banking and finance education and co-curricular experience to all its students. The department is basically focused on the subject areas of Economics, Bank Management, Investments, Financial Markets and Institutions. The primary focus of the department is to enhance undergraduate and postgraduate learning and knowledge by teaching particularly in Banking & Finance and technology, and in close association with industry and commerce.',
      vision: 'To be the center of excellence in banking and finance education and research in Sri Lanka.',
      mission: 'To achieve excellence in the diffusion of knowledge relate to Banking and Financial services in line with the best practices for the field of Banking and Finance',
      hodTitle: 'Message from the Head of the Department',
      hodName: 'Mr. AGDLK Gunaratna',
      hodMessage: 'The Department of Banking & Finance is the pioneer department to offer a specialized degree in Banking & Finance in Sri Lanka. Bachelor of Science (Special) Degree in Banking & Finance is a four-year duration programme conducted in English medium offered with the objective of providing a sound academic & professional background in Banking & Finance enabling the graduates to learn a wide array of subjects from the areas of Banking & Finance. The department is offering students an outcome-based education through outcome-based teaching and learning process to develop their personal capabilities, discipline-specific competencies, professional, ethical and social attributes in order to become a skilled graduate who can compete in the global context. The department focuses on the holistic development of undergraduates by a combination of both curricular and extracurricular activities. Apart from the curriculum, the department provides the opportunity for students to follow several certificate courses developed to improve their soft skills, language fluency and research competencies. The department has partnered with many reputed banks and financial institutions enabling students to gain the opportunity to expose to real-world, by completing a comprehensive internship programme of six months during the degree programme. The department staff comprises many PhD qualified academics and well-experienced staff in the discipline of Banking & Finance. The entire fraternity of the Department of Banking & Finance cohesively works and commits towards the accomplishment of its mission of achieving excellence as a department in the arena of Banking and Finance.',
      research: 'The department publishes the Sri Lankan Journal of Banking and Finance (SLJBF) and organizes the annual Symposium in Banking & Finance (SyBFin). Faculty are PhD-qualified academics and industry practitioners engaged in banking, finance and economics research.',
      industry: {
        title: 'Industry Partnerships & Affiliations',
        items: [
          'Partnered with many reputed banks and financial institutions for internships and real-world exposure',
          'Six-month comprehensive internship programme within the degree programme',
          'External resource persons from banks and financial institutions on the lecture panels of external programmes'
        ]
      },
      publications: ['SLJBF'],
      contact: 'For the Higher Diploma in Banking and Financial Studies: Ms. HMAK Herath (Director) — 037 228 4216 / 071 757 4114; Mr. AGDLK Gunaratna (Academic Coordinator) — 071 582 2953; Email: hdbfs@wyb.ac.lk'
    },
    {
      slug: 'business-management',
      name: 'Department of Business Management',
      short: 'DoBM',
      icon: 'icon-briefcase',
      tagline: 'Management education from diploma to masters',
      intro: 'The Department of Business Management offers the Postgraduate Diploma in Business Management (PGDBM) leading to the Masters Degree in Business Administration (MBA). The department advertises a new intake for the PGDBM programme and publishes programme details through the faculty website. (The source document does not provide further narrative about the department; details are added as documented.)',
      vision: null,
      mission: null,
      hodTitle: 'Message from the Head of the Department',
      hodName: null,
      hodMessage: 'The source document does not include a message from the Head of the Department of Business Management. Further information is required.',
      research: 'The source document does not provide details of research activities for this department.',
      industry: {
        title: 'Programme & Industry Links',
        items: [
          'PGDBM programme designed with compulsory project work and taught modules (approx. 30 hours per module)',
          'Lecture panel comprises qualified internal staff and external resource persons'
        ]
      },
      publications: [],
      contact: 'Contact details for this department were not provided in the source document. Please contact the faculty office.'
    },
    {
      slug: 'insurance-valuation',
      name: 'Department of Insurance and Valuation',
      short: 'DoIV',
      icon: 'icon-shield',
      tagline: 'Pioneer academic center in risk and insurance education',
      intro: 'The Department of Insurance and Valuation is committed to enhance the education in the field of Insurance and Finance by introducing undergraduate, diploma and higher diploma programmes with skills, capabilities and competencies to meet the real world requirement through interaction with public and private sector organizations. It is also committed to pursuing the excellence in teaching and learning in Insurance and Finance by conducting research and community service while making all efforts to contribute to the vision of the Faculty of Business Studies and Finance. At present, the Department is successfully conducting undergraduate, Higher Diploma, Diploma, and Certificate programmes for internal and external students, and planned to commence the postgraduate degree programme specific to Risk Management and Insurance.',
      vision: 'To be the Centre of Excellence in the Arena of Risk and Insurance Education.',
      mission: 'Department of Insurance and Valuation is committed to develop its stakeholders\' competencies through education, training, research, and other outreach programmes to more effectively manage the challenges in the field of risk, insurance and finance.',
      hodTitle: 'Message from the Head of the Department',
      hodName: 'Dr. Weedige Sampath Sanjeewa',
      hodMessage: 'It is with much pleasure I welcome you to the official website of the Department of Insurance and Valuation, the pioneer academic center in risk and insurance education in Sri Lanka. The Department of Insurance and Valuation of the Wayamba University of Sri Lanka is committed to enhancing education in the field of Risk, Insurance, and Finance by introducing undergraduate, diploma, and higher diploma programmes with skills, capabilities and competencies to meet the real-world requirement through interaction with public and private sector organizations. It is also committed to pursuing excellence in teaching and learning in Risk, Insurance, and Finance by conducting research and community service while making all efforts to contribute to the vision of the Faculty of Business Studies and Finance. Bachelor of Science Honours in Insurance & Finance is the main degree programme offered to the internal undergraduates of the department and the curriculum of the degree is designed to provide a sound academic & professional background in Risk Management & Insurance, and Finance Services enabling the graduate to secure a wide range of job opportunities and professional developments. The department is offering students an outcome-based education through outcome-based teaching and learning processes to develop their capabilities, discipline-specific competencies, and professional, ethical and social attributes to become skilled graduates who can compete in the global context. The department has partnered with leading Insurance and Financial Services Companies in Sri Lanka enabling students to gain the opportunity to expose to real-world, by completing a comprehensive internship programme of six months during the degree programme. To meet the requirements of the insurance industry in Sri Lanka, we are successfully conducting external academic programmes for employees who are working in the insurance industry in Sri Lanka. Our academic staffs have received doctoral training with relevant work experience in Risk management, Insurance, Financial services related fields, and most have professional qualifications in the discipline of insurance and finance. They are actively involved in research, with interests in risk management, insurance, and financial services.',
      research: 'The department publishes the Journal of Insurance & Finance (JIF) — a refereed, semi-annual journal — and the biannual magazine Voice of Insurance. Academic staff hold doctoral training with research interests in risk management, insurance, and financial services.',
      industry: {
        title: 'MoUs with Industry & Professional Bodies',
        items: [
          'Janashakthi Insurance PLC',
          'The Sri Lanka Insurance Institute',
          'LB Finance PLC',
          'AIA Insurance Lanka Ltd'
        ]
      },
      publications: ['JIF', 'Voice of Insurance'],
      contact: 'Contact details for this department were not provided in the source document. Please contact the faculty office.'
    }
  ];

  /* ------------------------------------------------------------------ */
  /* ACADEMIC PROGRAMMES                                                 */
  /* ------------------------------------------------------------------ */
  var PROGRAMMES = [
    {
      id: 'bsc-accountancy-business-finance',
      name: 'B.Sc. in Accountancy and Business Finance',
      category: 'ug',
      tags: ['internal'],
      department: 'Department of Accountancy',
      departmentSlug: 'accountancy',
      summary: 'Undergraduate degree structured into three academic clusters: Accountancy, Business Finance and Accounting Information Systems.',
      description: 'The B.Sc in Accountancy and Business Finance degree is designed to meet the evolving demands of the accounting and business environment. The degree programme is structured into three key academic clusters — Accountancy, Business Finance, and Accounting Information Systems — designed to provide students with a comprehensive and industry-relevant education. The programme is accredited by leading professional bodies (ACCA, CIMA, CA Sri Lanka and CMA).',
      duration: 'Information not available in the source document',
      credits: 'Information not available in the source document',
      entry: [],
      fees: 'Information not available in the source document',
      structure: [],
      deadline: null,
      contact: 'Contact the faculty office for current intake information.'
    },
    {
      id: 'bsc-banking-finance',
      name: 'B.Sc. Banking and Finance (Special)',
      category: 'ug',
      tags: ['internal'],
      department: 'Department of Banking and Finance',
      departmentSlug: 'banking-finance',
      summary: 'Four-year specialized degree in banking and finance, taught in English with a six-month industry internship.',
      description: 'Bachelor of Science (Special) Degree in Banking & Finance is a four-year duration programme conducted in English medium offered with the objective of providing a sound academic & professional background in Banking & Finance enabling the graduates to learn a wide array of subjects from the areas of Banking & Finance. The department offers outcome-based education through outcome-based teaching and learning processes to develop personal capabilities, discipline-specific competencies, professional, ethical and social attributes in order to become a skilled graduate who can compete in the global context.',
      duration: 'Four years',
      credits: 'Information not available in the source document',
      entry: [],
      fees: 'Information not available in the source document',
      structure: [],
      deadline: null,
      contact: 'Contact the faculty office for current intake information.'
    },
    {
      id: 'bsc-honours-insurance-finance',
      name: 'B.Sc. (Honours) in Insurance & Finance',
      category: 'ug',
      tags: ['internal'],
      department: 'Department of Insurance and Valuation',
      departmentSlug: 'insurance-valuation',
      summary: 'Main degree of the pioneer center in risk and insurance education, with a six-month industry internship.',
      description: 'Bachelor of Science Honours in Insurance & Finance is the main degree programme offered to the internal undergraduates of the Department of Insurance and Valuation. The curriculum is designed to provide a sound academic & professional background in Risk Management & Insurance, and Finance Services enabling the graduate to secure a wide range of job opportunities and professional developments. The department offers outcome-based education through outcome-based teaching and learning processes.',
      duration: 'Information not available in the source document',
      credits: 'Information not available in the source document',
      entry: [],
      fees: 'Information not available in the source document',
      structure: [],
      deadline: null,
      contact: 'Contact the faculty office for current intake information.'
    },
    {
      id: 'pgdbm',
      name: 'Postgraduate Diploma in Business Management (PGDBM)',
      category: 'pg',
      tags: ['internal'],
      department: 'Department of Business Management',
      departmentSlug: 'business-management',
      summary: 'One-year postgraduate diploma with twelve taught modules and a project report, leading to the MBA.',
      description: 'The Postgraduate Diploma in Business Management (PGDBM) is a programme of study which will run through one academic year (approximately one calendar year duration). Participants will follow twelve course modules during the period, of which all course modules will be compulsory. Each course module will be of about 30 hours of teaching. The academic year comprises two terms; twelve courses are taught during this period. In addition, every participant should complete a project report and submit the same at the end of the 2nd term of the Programme. Those who complete all the requirements of the PGDBM may be admitted to the 2nd year of the Programme — the Masters Degree in Business Administration.',
      duration: 'One year (12 months); minimum period of study one year, maximum allowed five years',
      credits: '24 credits (course modules including the project report, Year One)',
      entry: [
        'Detailed entry requirements were not provided in the source document.',
        'Selection for the MBA (second year) is based on merits and availability of placements; a limited number of participants are also selected under the \u2018Direct Entrance\u2019 criteria (candidates possessing qualifications equal to the PGDBM of Wayamba University of Sri Lanka).'
      ],
      fees: 'Information not available in the source document',
      structure: [],
      deadline: 'Applications closing date: extended to 22 December 2023 — concluded',
      contact: 'Contact the faculty office for current intake information.'
    },
    {
      id: 'mba',
      name: 'Masters Degree in Business Administration (MBA)',
      category: 'pg',
      tags: ['internal', 'second-year'],
      department: 'Department of Business Management',
      departmentSlug: 'business-management',
      summary: 'Second academic year of the PGDBM-to-MBA programme: two taught courses plus a comprehensive research thesis.',
      description: 'The Masters Degree in Business Administration (MBA) is the second academic year of the total programme. The participants devote their full time to complete management research under the guidance of supervisors appointed by the University. They may attend a series of advanced seminars and lectures organized by the Faculty of Business Studies & Finance. Participants must earn a total of sixteen (16) credits by following two taught courses (08 credits) and completing a comprehensive Research Thesis (08 credits).',
      duration: 'One academic year (second year of the programme)',
      credits: '16 credits — two taught courses (08 credits) plus comprehensive research thesis (08 credits)',
      entry: [
        'Completion of all requirements of the Postgraduate Diploma in Business Management (PGDBM), or',
        'Direct Entrance: candidates possessing qualifications equal to the PGDBM of Wayamba University of Sri Lanka may be selected directly to the MBA programme.',
        'Selection is based on merits and availability of placements.'
      ],
      fees: 'Information not available in the source document',
      structure: [],
      deadline: null,
      contact: 'Contact the faculty office for current intake information.'
    },
    {
      id: 'dais',
      name: 'Diploma in Accounting Information Systems (DAIS)',
      category: 'diploma',
      tags: ['internal', 'weekend'],
      department: 'Department of Accountancy',
      departmentSlug: 'accountancy',
      summary: 'One-year diploma (30 credits) delivered on weekends, addressing the national need for Accounting Information Systems education.',
      description: 'Having identified the mounting demand for Accounting Information Systems related study courses and with the industry reputation gained through intense collaborations, the Department of Accountancy believes that it has a responsibility to continue upgrading knowledge and educating people who engage in the field of Accounting Information Systems. The Department offers the Diploma in Accounting Information Systems (DAIS) to address the national need of people who have not reached higher education in this field and wish to proceed with this discipline. Lectures will be held on weekends.',
      duration: 'One academic year consisting of two semesters (weekends)',
      credits: '30 credits required for completion of the course',
      entry: [
        'Passed G.C.E Advanced Level in any stream, OR',
        'Passed AAT second Level, OR',
        'Passed ICASL executive Level, OR',
        'Passed CIMA 1st Level, OR',
        'Passed CMA 1st Level, OR',
        'Passed ACCA 1st Level, OR',
        'Qualifications other than those listed above may be acceptable case by case subject to the approval of the Board of Study.',
        'On acceptance by the Board of Study, a person shall forthwith register as a Diploma Student of the university upon payment of prescribed registration and other fees.'
      ],
      fees: 'Rs. 80,000.00 total — Rs. 40,000.00 at registration; balance in two instalments of Rs. 20,000.00 each during the course.',
      structure: [
        {
          semester: 'Semester I',
          courses: [
            'DAIS 1113 — Management and Information Systems',
            'DAIS 1123 — Information Technology for Accounting',
            'DAIS 1133 — Business Accounting',
            'DAIS 1143 — Computerized Accounting',
            'DAIS 1152 — Business Law and Ethical Conduct in IT'
          ]
        },
        {
          semester: 'Semester II',
          courses: [
            'DAIS 1213 — Accounting Information Systems - Theory',
            'DAIS 1224 — Spreadsheet Modeling For Accounting',
            'DAIS 1233 — Mathematics',
            'DAIS 1243 — Data Base Management Systems',
            'DAIS 1263 — Independent Project'
          ]
        }
      ],
      deadline: 'Application deadline extended to: 25 January 2024 — concluded',
      contact: 'Contact the faculty office for current intake information.'
    },
    {
      id: 'dbfs',
      name: 'Diploma in Banking and Financial Studies (DBFS)',
      category: 'diploma',
      tags: ['external'],
      department: 'Department of Banking and Finance',
      departmentSlug: 'banking-finance',
      summary: 'One-year external diploma (30 credits, SLQF Level 3) designed to meet the demands of the flourishing banking and financial sector.',
      description: 'Today, the banking and financial sector is flourishing in our country and requires more employees and professionals to meet the demand. Having identified the expected qualities and competencies required for the financial sector, the Department of Banking and Finance — the pioneer in banking and finance education provider in Sri Lanka — has designed its external programmes to cope up with the challenge. The Diploma in Banking and Financial Studies (DBFS) facilitates learning in theory and practices to improve skills in advanced areas of economics, banking and finance and equips students with an integrated approach to managerial skills. The course units are designed to develop analytical, problem-solving and decision-making abilities, awareness of domestic and international economics and financial environment.',
      duration: 'One year, consisting of two semesters',
      credits: '30 credits of course units (SLQF Level 3)',
      entry: [
        'Passed in G.C.E (A/L) examination in any stream in a single attempt, OR',
        'Six passes in G.C.E (O/L) Examination in one sitting with three credits with two years working experience in a reputed institution after obtaining the qualification, OR',
        'Any other qualification not listed above with two years working experience, may be considered case by case and acceptable to the Board of Study and the Senate of WUSL;',
        'A good knowledge of English;',
        'Perform well at the admission test and/or the interview.'
      ],
      fees: 'Rs. 65,000 total — Rs. 30,000 at registration; balance in two instalments during the first semester before the semester examination.',
      structure: [
        {
          semester: 'Semester I',
          courses: [
            'DBFS 1113 — Principles of Management',
            'DBFS 1123 — Microeconomics',
            'DBFS 1133 — Quantitative Methods for Banking and Finance',
            'DBFS 1143 — Financial Accounting',
            'DBFS 1152 — Business Communication'
          ]
        },
        {
          semester: 'Semester II',
          courses: [
            'DBFS 1212 — Managing People in Organization',
            'DBFS 1223 — Macroeconomics',
            'DBFS 1233 — Introduction to Business Law',
            'DBFS 1243 — Money and Banking',
            'DBFS 1253 — Financial Market Operations',
            'DBFS 1262 — Essentials of Business Intelligence'
          ]
        }
      ],
      deadline: 'Closing date of applications: 10th May 2025 (Extended) — concluded',
      contact: 'Contact the faculty office or the Department of Banking and Finance for current intake information.'
    },
    {
      id: 'hdbfs',
      name: 'Higher Diploma in Banking and Financial Studies (HDBFS)',
      category: 'higher-diploma',
      tags: ['external'],
      department: 'Department of Banking and Finance',
      departmentSlug: 'banking-finance',
      summary: 'Flagship one-year higher diploma (30 credits, SLQF Level 4) developing future-ready banking professionals.',
      description: 'Step into the world of banking and finance with the Higher Diploma in Banking and Financial Studies (HDBFS), a flagship programme offered by the Department of Banking and Finance, Faculty of Business Studies and Finance, Wayamba University of Sri Lanka. The programme is designed to meet the growing demand for skilled professionals in Sri Lanka\'s vibrant financial services sector. Through a blend of academic theory and practical learning, the HDBFS develops future-ready banking professionals with the knowledge, skills, and confidence to excel in an ever-evolving financial landscape.',
      duration: 'One (01) year, consisting of two semesters',
      credits: '30 credits of course units (SLQF Level 4)',
      entry: [
        'A Diploma in Banking and Financial Studies (DBFS) offered by the Department of Banking and Finance, Wayamba University of Sri Lanka, OR',
        'A recognized Diploma (minimum 30 credits) in management, banking, or finance from a reputed institution, OR',
        'G.C.E (A/L) qualification in any stream (in one sitting), plus a Certificate in Banking and Finance (CBF) or Intermediate in Applied Banking and Finance (IABF) from the Institute of Bankers of Sri Lanka, with at least three years of executive-level experience in a reputed organization, OR',
        'Other qualifications approved on a case-by-case basis by the University Senate.'
      ],
      fees: 'Rs. 90,000 total — Rs. 40,000 at registration; balance in two instalments during the first semester before the semester examination.',
      structure: [],
      deadline: 'Closing date: 25th February 2026 — concluded',
      contact: 'Ms. HMAK Herath (Director) — 037 228 4216 / 071 757 4114; Mr. AGDLK Gunaratna (Academic Coordinator) — 071 582 2953; Email: hdbfs@wyb.ac.lk',
      highlights: [
        'University Recognition: offered by one of Sri Lanka\'s leading public universities with a strong reputation for business and finance education.',
        'Industry-Relevant Curriculum: developed in consultation with banking and financial experts to align with current industry needs.',
        'Career-Focused Learning: combines core academic knowledge with practical applications for real-world financial decision-making.',
        'Expert Faculty: delivered by experienced lecturers and industry practitioners from the banking and finance sectors.',
        'Pathway to Further Studies: a stepping stone to advanced qualifications such as the external degree in Banking and Finance or professional certifications.'
      ],
      documents: ['Application Form', 'Brochure HDBFS 2026']
    },
    {
      id: 'acfsm',
      name: 'Advanced Certificate in Financial Services Management (ACFSM)',
      category: 'advanced-certificate',
      tags: ['external'],
      department: 'Department of Banking and Finance',
      departmentSlug: 'banking-finance',
      summary: 'First advanced certificate programme of its nature offered by the department under its external programmes (SLQF Level 2).',
      description: 'The Department of Banking and Finance is one of the prominent departments in the Sri Lankan university system to cater needs of the Banking & financial industry. The introduction of this nature of course was a long-felt need of the Industry as there are no advanced certificate programmes offered by any university related to this discipline. Further, many employees in the banking and financial services sector are engaged in their work without theoretical background related to their employment. The Department of Banking and Finance considered this vacuum and decided to introduce this Advanced Certificate programme with the aim of infusing enthusiasm among potential people who are eager to solve problems they encountered while in the service. This is the first Advanced Certificate programme introduced by the Department of this nature under its external programmes. Financial firms, on the other hand, could monitor this programme and embody this into their promotion schemes too. The programme is designed following the requirements of the Sri Lanka Qualification Framework (SLQF) Level 2.',
      duration: 'Information not available in the source document',
      credits: 'Information not available in the source document',
      entry: [
        'Main objective: to endow a person with a generalized knowledge, skills, attitudes and competencies which are essential to begin a career in the Financial Service Industry.',
        'Target group, programme duration, admission requirement, method of delivery and commencement details were presented in the source document\'s programme table and require confirmation with the department.'
      ],
      fees: 'Information not available in the source document',
      structure: [],
      deadline: 'New application date: 25th March 2025 (Extended) — concluded',
      contact: 'Contact the faculty office or the Department of Banking and Finance for current intake information.'
    },
    {
      id: 'dip-hdip-rmi',
      name: 'Diploma & Higher Diploma in Risk Management & Insurance',
      category: 'diploma',
      tags: ['external', 'insurance-industry'],
      department: 'Department of Insurance and Valuation',
      departmentSlug: 'insurance-valuation',
      summary: 'External academic programmes conducted for employees working in the insurance industry in Sri Lanka.',
      description: 'To meet the requirements of the insurance industry in Sri Lanka, the Department of Insurance and Valuation successfully conducts external academic programmes for employees who are working in the insurance industry in Sri Lanka. The department advertised a new intake in 2023 for its Diploma & Higher Diploma programmes. Detailed course structures, fees and entry requirements were not included in the source document and require confirmation with the department.',
      duration: 'Information not available in the source document',
      credits: 'Information not available in the source document',
      entry: ['Entry requirements were not provided in the source document.'],
      fees: 'Information not available in the source document',
      structure: [],
      deadline: null,
      contact: 'Contact the faculty office or the Department of Insurance and Valuation for current intake information.'
    }
  ];

  /* ------------------------------------------------------------------ */
  /* PUBLICATIONS                                                        */
  /* ------------------------------------------------------------------ */
  var PUBLICATIONS = [
    {
      abbr: 'JARSYM',
      name: 'Journal of Annual Research Symposium in Management (JARSYM)',
      short: 'Journal of ARSYM',
      type: 'Journal (Refereed)',
      publisher: 'Faculty of Business Studies and Finance, Wayamba University of Sri Lanka',
      issn: 'Information not available in the source document',
      frequency: 'Bi-annually',
      description: 'A publication of Students\' Research of the Annual Research Symposium in Management. The Journal of ARSYM (JARSYM) is a refereed journal published bi-annually by the Faculty of Business Studies & Finance, Wayamba University of Sri Lanka. The aim of the JARSYM is to disseminate high-quality research findings on a variety of timely topics generated by undergraduate researchers at the Wayamba University of Sri Lanka. Furthermore, it opens up avenues for undergraduates involved in the industry to share their inventions, state-of-the-art discoveries, and novel ideas. The main philosophy behind the JARSYM is to enhance the research culture within the faculty, thereby within Wayamba University. All research articles submitted are double-blind reviewed prior to publishing. Views expressed in the research articles are not the views of the Faculty of Business Studies and Finance, Wayamba University of Sri Lanka, or the Editorial Board.',
      issues: ['Volume 05 Issue I (July 2025)', 'Volume 03 Issue II (December 2023)', 'January 2023', 'August 2022', 'May 2022', 'June 2021', 'December 2020'],
      latestIssue: 'Volume 05 — Issue I (July 2025)',
      submission: 'Submission and editorial contact details were not provided in the source document.',
      editorial: 'Editorial board membership details were not provided in the source document.',
      articles: [
        { issue: 'Volume 05 Issue I (July 2025)', title: 'Factors Influencing Auditors\u2019 Going Concern Opinion of Non-Financial Companies in the Colombo Stock Exchange', authors: 'Wimalaweera, P.G.N.S., Rajakaruna, G.K.N.P.' },
        { issue: 'Volume 05 Issue I (July 2025)', title: 'The Mediating Role of Organizational Culture on the Relationship between Transparent Communication and Employee Readiness to Change in the IT Industry of Sri Lanka', authors: 'Thuvaragaa, B., Lasanthika, W.J.A.J.M.' },
        { issue: 'Volume 05 Issue I (July 2025)', title: 'The Determinants of Consumer Attitudes towards Life Insurance in Sri Lanka', authors: 'Hettiarachchi, H.A.G.A., Jayarathne, R.S.L., Gamage, S.K.' },
        { issue: 'Volume 05 Issue I (July 2025)', title: 'The Mediating Role of Employee Engagement on the Relationship Between Green HRM Practices and Employee Well-Being in the Apparel Sector in the Southern Province', authors: 'Madhushika, I.P.I., Lasanthika, W.J.A.J.M.' },
        { issue: 'Volume 05 Issue I (July 2025)', title: 'Impact of Liquidity Ratios on Profitability of Commercial Banks in Sri Lanka', authors: 'Thennakoon, T.M.C.A., Gunaratna, A.G.D.L.K.' },
        { issue: 'Volume 03 Issue II (December 2023)', title: 'Mediating Effect of Internal Control System on the Relationship Between E-accounting and the Financial Performance: Evidence from SME in Colombo District', authors: 'Munasinghe, M.A.D.P.M., Jameel, A.L.M.' },
        { issue: 'Volume 03 Issue II (December 2023)', title: 'Impact of Corporate Governance Mechanisms on the Adoption of Integrated Reporting: Empirical Evidence from Sri Lanka', authors: 'Narampanawa, P.G.B.L., Priyadarshanie, W.A.N.' },
        { issue: 'Volume 03 Issue II (December 2023)', title: 'Impact of Investment Behavior of Investors on Investment Decisions Making: With Special Reference to Generation Y Investors in Sri Lanka', authors: 'Perera, J.K.N.N., Tharanga, B.B., Abeygunawardane, D.G.S.' },
        { issue: 'Volume 03 Issue II (December 2023)', title: 'Impact of Liquidity on Firm\u2019s Profitability: Evidence from Listed Manufacturing Companies in Sri Lanka', authors: 'Jayalath, J.P.D.U.N., Wanigasekara, W.A.D.K.J., Deshika, N.P.T.' },
        { issue: 'Volume 03 Issue II (December 2023)', title: 'Impact of Social Media Influencers on Consumer Purchase Intention of Fashion Retail Industry in Sri Lanka', authors: 'Narayana, N.M.P.S., Dissanayaka, D.M.T.D.' },
        { issue: 'Volume 03 Issue II (December 2023)', title: 'The Simulation on Toll Ticketing Performance: A Case Study of The Highway Ticketing Counter at Kadawatha Interchange', authors: 'Fernando, W.H.L.N., Fernando, W.I.S.N., Kavindra, W.A.H., Mendis, B.S.L., Muthukuda, M.W.A.M.P.' },
        { issue: 'Volume 03 Issue II (December 2023)', title: 'Impact of Marketing Mix Strategies on Sales Performance of Life Insurance Companies in Sri Lanka', authors: 'Wickramasinghe, P.G.G.Y., Bogamuwa, M.M.S.K.B.' },
        { issue: 'Volume 03 Issue II (December 2023)', title: 'Impact of Work-Family Conflicts on Organizational Commitment among Female Bank Employees in XYZ Bank in Nuwara-Eliya District', authors: 'Janarthani, K., Wijesiri, B.M.' },
        { issue: 'Volume 03 Issue II (December 2023)', title: 'The Impact of Integrated Reporting on Firm Performance: Evidence from Listed Companies in Sri Lanka', authors: 'Gunarathne, A.G.T.N., Priyadarshanie, W.A.N.' },
        { issue: 'Volume 03 Issue II (December 2023)', title: 'Rising Motor Insurance Premiums and Policyholders\u2019 Attitude Towards Insurance Fraud in Sri Lanka', authors: 'Sharmila, D.V.S.S., Amarasinghe, J.P.S.D.' }
      ]
    },
    {
      abbr: 'JAF',
      name: 'Journal of Accountancy and Finance (JAF)',
      type: 'Journal (Refereed)',
      publisher: 'Department of Accountancy, Faculty of Business Studies and Finance, Wayamba University of Sri Lanka',
      issn: 'Information not available in the source document',
      frequency: 'Biannually',
      description: 'The Journal of Accountancy and Finance is biannually published by the Department of Accountancy, Faculty of Business Studies and Finance, Wayamba University of Sri Lanka. The main objective of the journal is to publish scientific research findings that address issues and development related to the Accounting and Finance Industry, particularly at both the national and international levels. Initially issued as an Accountancy Journal for six volumes since July 2004; in 2014 the journal was renamed the Journal of Accountancy and Finance and recognized as a refereed journal, published biannually. The journal provides a worthwhile platform for academics spread out within the country as well as globally to publish their novel research work in the field of Accountancy and Finance.',
      issues: ['JAF Volume 12 Issue I (2025)', 'JAF Volume 11 Issue II (2024)', 'JAF Volume 11 Issue I (2024)', 'Volume 10 Issue II (2023)', 'Volume 10 Issue I (2023)', 'Volume 9 Special Issue III (2022)', 'Volume 9 Issue II (2022)', 'Volume 9 Issue I (2022)'],
      latestIssue: 'JAF Volume 12 — Issue I (2025)',
      submission: 'Full papers are to be submitted to jaf@wyb.ac.lk. Manuscripts must be sent in MS Word (Doc/Docx) format. The full paper should not exceed 30 pages (B5 size) including references and appendices, and must contain: Title, Abstract, Keywords, Introduction, Literature Review, Methodology, Results and Discussion, Conclusion, and References. The acceptable range of the Similarity Index is up to 20 percent. Submissions must be original works that have not been accepted for publication/presentation or are under review anywhere else. Authors may submit multiple papers.',
      editorial: [
        { role: 'Editor-in-Chief', name: 'Ms. Deepa Gunarathne — Senior Lecturer, Department of Accountancy, FBSF, Wayamba University of Sri Lanka' },
        { role: 'Assistant Editor', name: 'Dr. Nadeesha Priyadarshanie — Lecturer, Department of Accountancy, FBSF, Wayamba University of Sri Lanka' },
        { role: 'Assistant Editor (Technical)', name: 'Dr. R.M.T.N. Rathnayake — Lecturer, Department of Accountancy, FBSF, Wayamba University of Sri Lanka' }
      ],
      articles: []
    },
    {
      abbr: 'SACFIRE',
      name: 'Journal of SACFIRE',
      type: 'Journal (Open Access)',
      publisher: 'Department of Accountancy, Wayamba University of Sri Lanka',
      issn: 'Information not available in the source document',
      frequency: 'Annually (print and online)',
      description: 'Journal of SACFIRE is a scholarly journal that publishes articles from the discipline of accounting and finance. It is an open-access journal which abides by internationally accepted research and publication ethics, and is funded, hosted and published by the Department of Accountancy, Wayamba University of Sri Lanka, Sri Lanka. The journal provides a forum for undergraduates of Sri Lanka to exchange information, debate, and disseminate knowledge in various areas of accounting and finance. The journal is steered by an independent editorial board that consists of members nominated by the Department of Accountancy and approved by the faculty board of the Faculty of Business Studies and Finance.',
      issues: ['Volume 03 — Issue I', 'Volume 02 — Issue II', 'Volume 02 — Issue I', 'Volume 01 — Issue I'],
      latestIssue: 'Volume 03 — Issue I',
      submission: 'Submission and editorial contact details were not provided in the source document.',
      editorial: 'The journal is steered by an independent editorial board consisting of members nominated by the Department of Accountancy and approved by the faculty board.',
      articles: [
        { issue: 'Volume 03 — Issue I', title: 'IMPACT OF INTELLECTUAL CAPITAL ON FIRMS\u2019 PROFITABILITY: EMPIRICAL EVIDENCE FROM INDUSTRIAL SECTOR IN SRI LANKA', authors: 'K. Thiruvarangan, S. Balagobei' },
        { issue: 'Volume 03 — Issue I', title: 'THE IMPACT OF ERP SYSTEMS ON FIRM PERFORMANCES: CASE OF A PUBLIC SECTOR COMPANY IN SRI LANKA', authors: 'G.W.K.S. Kumarasiri, Kumara Uluwatte' },
        { issue: 'Volume 03 — Issue I', title: 'THE IMPACT OF FINANCIAL LITERACY ON INVESTMENT DECISIONS AMONG THE HOUSEHOLDS IN GAMPAHA DISTRICT', authors: 'K.Y.I. Wilson, Y.D.R. Kuruppuarachchi' },
        { issue: 'Volume 03 — Issue I', title: 'GREEN ORIENTATION AND ITS MEDIATING EFFECT: A STUDY OF LEADING MANUFACTURER OF KNIT FABRICS IN SRI LANKA', authors: 'Y.A. Iddagoda, L.S. Kulasekara' },
        { issue: 'Volume 03 — Issue I', title: 'DIGITAL FINANCIAL LITERACY AND IT\u2019S IMPACT ON INVESTMENT CHOICES OF MANAGEMENT UNDERGRADUATES: EMPIRICAL EVIDENCE FROM GOVERNMENT UNIVERSITIES IN SRI LANKA', authors: 'M.A.M Thilakarathna, D.H.S.W. Dissanayake, J.A.T.S. Jayalath' },
        { issue: 'Volume 03 — Issue I', title: 'IMPACT OF CORPORATE TAX RATE ON CAPITAL STRUCTURE OF LISTED COMPANIES IN SRI LANKA', authors: 'H.D.L Vilmada, L.D. De Silva' },
        { issue: 'Volume 03 — Issue I', title: 'THE IMPACT OF INTEGRATED REPORTING ON COST OF CAPITAL IN LISTED COMPANIES IN SRI LANKA', authors: 'D. Gunathilaka, W.A.N. Priyadarshanie, J.A.T.S Jayalath' }
      ]
    },
    {
      abbr: 'SLJBSF',
      name: 'Sri Lankan Journal of Business Studies and Finance (SLJBSF)',
      type: 'Journal (Double-blind peer-reviewed)',
      publisher: 'Faculty of Business Studies and Finance, Wayamba University of Sri Lanka',
      issn: '2756-9381',
      frequency: 'Semi-annually',
      description: 'The Sri Lankan Journal of Business Studies and Finance (SLJBSF) is a double-blind peer-reviewed scholarly journal which aims to publish scholarly work in the field of Business Studies & Finance. It is published semi-annually by the Faculty of Business Studies and Finance, Wayamba University of Sri Lanka. The objectives of the SLJBSF are three folds: (i) to benchmark the Faculty\u2019s contribution for the growth of the body of knowledge in Business Studies & Finance; (ii) to promote and provide convenient access to publish and disseminate the research works of potential researchers/scholars; and (iii) to maintain the Faculty journal as an updated channel to provide solutions for unsolved problems while maintaining academic excellence in knowledge dissemination in the field. The journal is addressed to diverse communities, including academics, professionals, graduate and postgraduate students, and anyone with a keen interest in the field of Business Studies & Finance. The Faculty planned to publish Volume I, Issue I of SLJBSF in March 2021.',
      issues: ['Volume I — Issue 2 (latest documented issue)', 'Volume I — Issue 1'],
      latestIssue: 'Volume I — Issue 2',
      submission: 'Submission e-mail: sljbsf@wyb.ac.lk. Authors are advised to read aims and scope and author guidelines when preparing a manuscript and submit it when it is at a publishable level.',
      editorial: 'Editorial board membership details were not provided in the source document.',
      articles: [
        { issue: 'Volume I — Issue 2', title: 'Scientific Review of Literature Pertaining to High Performance Work Practices', authors: 'Rathnaweera R.R.N.T and Jayatilake L.V.K' },
        { issue: 'Volume I — Issue 2', title: 'Factors Affecting the Customers\u2019 Intention to Use Green Banking Products in Sri Lanka', authors: 'De Silva K.D.S and Weligamage S.S.' }
      ]
    },
    {
      abbr: 'SLJBF',
      name: 'Sri Lankan Journal of Banking and Finance (SLJBF)',
      type: 'Journal (Double-blind peer-reviewed)',
      publisher: 'Department of Banking and Finance, Wayamba University of Sri Lanka',
      issn: '2345-9271',
      frequency: 'Bi-annually',
      description: 'The Sri Lankan Journal of Banking and Finance (SLJBF) is an official double-blind peer-reviewed journal that publishes research papers and scholarly work by the Department of Banking and Finance, Wayamba University of Sri Lanka. SLJBF publishes theoretical and empirical papers spanning all the major research fields in economics, banking and finance. The aim of the SLJBF is to bridge the gap existing in the theory and practice of Economics, Banking and Finance by encouraging researchers, academicians, professionals, and research students to impart and share knowledge in the form of high-quality research papers to infuse innovative systems and methods to the economic and financial system as a whole.',
      issues: ['Vol 8 Issue I (Jun 2025) — Call for Research Articles', 'Earlier volumes are published by the department'],
      latestIssue: 'Vol 8 — Issue I (June 2025) — call for papers',
      submission: 'Papers may be submitted as hard copy or by e-mail (soft copy in Word and PDF format with a covering letter including author\u2019s details). Manuscripts for publishing considerations should be sent to: Chief Editor, Sri Lankan Journal of Banking and Finance, Department of Banking and Finance, Wayamba University of Sri Lanka, Kuliyapitiya, Sri Lanka. Tel: (+94) 037-2284216. Email: sljbf@wyb.ac.lk or sljbf.ce@gmail.com. The journal gives priority to novelty, originality, and the extent of contribution to the banking industry. Each manuscript is sent to two reviewers.',
      editorial: 'Chief Editor, Sri Lankan Journal of Banking and Finance, Department of Banking and Finance, Wayamba University of Sri Lanka.',
      articles: []
    },
    {
      abbr: 'JIF',
      name: 'Journal of Insurance & Finance (JIF)',
      type: 'Journal (Refereed)',
      publisher: 'Department of Insurance and Valuation, Faculty of Business Studies and Finance, Wayamba University of Sri Lanka',
      issn: 'ISSN (Print): 2673-1258 / ISSN (Online): 2773-7276',
      frequency: 'Semi-annually (January / July)',
      description: 'The Journal of Insurance & Finance is a refereed journal, published semi-annually (January/July) by the Department of Insurance and Valuation, Faculty of Business Studies and Finance, Wayamba University of Sri Lanka. This journal publishes empirical research and review papers in the areas of Insurance, Risk Management, Finance, Management, Economics, and Social Security. The fundamental objective of the journal is to disseminate the knowledge of research conducted by academics, and professionals/practitioners in the field of Insurance and Finance. The Department of Insurance and Valuation intends to publish the journal with effect from January 2021.',
      aimsScope: 'The journal is primarily interested in publishing interdisciplinary research in the intersection of Insurance, Risk Management, Finance, Management, Economics and Social Security, conducted through qualitative, quantitative, and mixed methods approaches. JIF is a premier bi-annual outlet for substantive original research that advances understanding of the specified disciplines in local, regional and global context. The journal considers research papers, case studies, review papers, technical papers, and book reviews for publication.',
      issues: ['JIF Volume 2 Issue 2', 'JIF Volume 2 Issue 1', 'JIF Volume I Issue 2', 'JIF Volume I Issue 1'],
      latestIssue: 'JIF Volume 2 — Issue 2',
      submission: 'Submission e-mail: jif@wyb.ac.lk. Authors are advised to read aims and scope and author guidelines when preparing a manuscript and submit it when it is at a publishable level.',
      editorial: 'Editorial board membership details were not provided in the source document.',
      articles: []
    },
    {
      abbr: 'Voice of Insurance',
      name: 'Voice of Insurance',
      type: 'Magazine (Biannual)',
      publisher: 'Department of Insurance and Valuation, Wayamba University of Sri Lanka',
      issn: 'ISSN: 2806-5018 / ISBN: 9772806 501005',
      frequency: 'Biannual',
      description: 'The Voice of Insurance is the biannual specialized magazine published by the Department of Insurance and Valuation of the Wayamba University of Sri Lanka. The Voice of Insurance provides a trustful and independent information platform for the stakeholders of the risk & insurance business in Sri Lanka. The magazine aims to enlighten the sphere of risk and insurance with its latest trends, information, strategies, and insights to mitigate the dynamism of the business environment. Even though there are many institutions and professionals connected to the risk & insurance business, there is no common platform to present their professional voices, information, experience, and expectations; the Voice of Insurance aims to fill that gap by connecting the stakeholders in the insurance business in Sri Lanka and expects to create a trustful information source for the industry.',
      issues: ['Current volume — themed issue', 'Past volumes published by the department'],
      latestIssue: 'Current themed volume',
      submission: 'Submission guidelines were referenced in the source document; contact the Department of Insurance and Valuation via the faculty office for details.',
      editorial: 'Editorial board details were referenced in the source document but not reproduced in text.',
      articles: []
    }
  ];

  /* ------------------------------------------------------------------ */
  /* RESEARCH SYMPOSIA                                                   */
  /* ------------------------------------------------------------------ */
  var SYMPOSIA = [
    {
      id: 'arsym-2024',
      name: 'ARSYM 2024',
      full: '7th Annual Research Symposium in Management (ARSYM 2024)',
      organiser: 'Faculty of Business Studies and Finance, Wayamba University of Sri Lanka',
      theme: 'Beyond Boundaries: Pioneering Management Research for Sustainable Development',
      description: 'The Faculty of Business Studies and Finance of the Wayamba University of Sri Lanka proudly invites you to the 7th Annual Research Symposium in Management — ARSYM 2024, which aims at providing a platform for undergraduates and academics to exchange and share their experience and research on all aspects of Management.',
      status: 'concluded',
      dates: [
        { label: 'Calling for Extended Abstract', date: '05th October 2024' },
        { label: 'Notification of Acceptance', date: '06th November 2024' },
        { label: 'Submission of Final Manuscript', date: '20th November 2024' },
        { label: 'Pre-Conference Seminar', date: '04th December 2024' }
      ],
      tracks: ['Accounting', 'Banking', 'Economics', 'Finance', 'Management and Organizational Behaviour', 'E-Commerce and Digital Transformation', 'Entrepreneurship and Small Business', 'Risk Management and Insurance', 'Information Systems', 'Crisis Management', 'Business Strategies & Innovations', 'Human Resource Management', 'Information System and Business Communication', 'Corporate Governance and Business Ethics', 'Marketing', 'Sustainable Development'],
      keynote: { name: 'Prof. Ravi Dissanayake', details: 'PhD (Taylor – Malaysia), DBA (Switzerland), MBA (PIM), B.B Mgt. (Kelaniya). Professor in Marketing, University of Kelaniya.' },
      committee: [
        { role: 'Co-Chair', name: 'Mr. Manuja Ariapperuma', contact: '+94 71 644 3432' },
        { role: 'Co-Chair', name: 'Ms. Nadeeka Dissanayaka', contact: '+94 071 582 2953' },
        { role: 'Co-Secretary', name: 'Mrs. D.G.S. Abeygunawardane', contact: '+94 772515626' },
        { role: 'Co-Secretary', name: 'Mrs. NDH Fernando', contact: '+94 772264614' }
      ],
      downloads: ['Guidelines for Authors', 'Template for Extended Abstract'],
      submission: 'Registration and submission links were provided with the symposium announcement; see the faculty office for current details.',
      proceedings: ['5th Annual Research Symposium in Management — 28th October 2022 (proceedings download)']
    },
    {
      id: 'sacfire-2025',
      name: 'SACFIRE 2025',
      full: '11th Symposium of Accounting & Finance Research / 3rd International Symposium of the Department of Accountancy',
      organiser: 'Department of Accountancy, Faculty of Business Studies and Finance, Wayamba University of Sri Lanka',
      theme: 'Furtherance of Entrepreneurialism Culture through Interdisciplinary Research Paradigm in Longitudinality',
      description: 'SACFIRE 2025 is the 11th consecutive research symposium organized by the Department of Accountancy, Faculty of Business Studies and Finance, Wayamba University of Sri Lanka. The symposium proposed to expand its scope to provide a platform for local and international young researchers to showcase their research findings, and aims to foster collaboration and strengthen the network among young researchers and experts in the field of Accounting & Finance, both from the local and international communities. Registration is free.',
      status: 'concluded',
      dates: [
        { label: 'Submission of Extended Abstracts / Full Papers', date: 'Aug 01, 2025' },
        { label: 'Submission Closure', date: 'Sep 25, 2025' },
        { label: 'Notification of Acceptance', date: 'Oct 15, 2025' },
        { label: 'Submission — Camera Ready Copy', date: 'Oct 31, 2025' },
        { label: 'Conference Date', date: 'Nov 14, 2025' }
      ],
      tracks: ['Audit, Assurance, Risk Management, and Taxation', 'Behavioral Finance and Decision Making', 'Business Economics and Finance', 'Contemporary Topics in Accounting and Finance', 'Corporate Governance and Ethics', 'Corporate Finance', 'CSR, Sustainability, and Environmental Accounting', 'Financial Management', 'Financial Accounting, Financial Reporting, and Analysis', 'Information Systems in Accounting and Finance', 'Management Accounting', 'Multidisciplinary Approaches', 'SME Finance and Microfinance'],
      keynote: { name: 'Prof. Lakshman R. Watawala', details: 'Founder and President – CMA Sri Lanka; Past President CA Sri Lanka.' },
      committee: [
        { role: 'Co-Chair', name: 'Dr. Nadeesha Priyadarshanie', contact: '+94 70 3357015' },
        { role: 'Co-Chair', name: 'Ms. Ayoma Karunananda', contact: '+94 71 4461102' },
        { role: 'Secretary', name: 'Dr. Kithsiri Samarakoon', contact: '+94 76 7762573' }
      ],
      downloads: ['Extended Abstract Guidelines for Authors', 'Extended Abstract Template', 'Full Paper Guidelines for Authors', 'Full Paper Template'],
      submission: 'Email: sacfire@wyb.ac.lk · Tel: +37 22 84214. Extended abstract and full paper submission links were provided with the symposium announcement.',
      proceedings: ['PROCEEDINGS 2024', 'PROCEEDINGS 2023'],
      past: ['SACFIRE 2021', 'SACFIRE 2020', 'SACFIRE 2019', 'SACFIRE 2018', 'SACFIRE 2017', 'SACFIRE 2016', 'SACFIRE 2015']
    },
    {
      id: 'sybfin-2025',
      name: 'SyBFin 2025',
      full: '2nd Research Symposium in Banking & Finance 2025',
      organiser: 'Department of Banking & Finance, Wayamba University of Sri Lanka',
      theme: 'Redesigning Finance for an Intelligent, Inclusive Future',
      description: 'The Department of Banking & Finance, Wayamba University of Sri Lanka, proudly presents the 2nd Symposium in Banking & Finance. This annual academic gathering serves as a dynamic platform for undergraduates, researchers, and academics to exchange ideas, share experiences, and present research findings on a wide range of topics related to Banking and Finance. By fostering dialogue and collaboration, the symposium aims to inspire innovation, encourage critical thinking, and strengthen the link between academic knowledge and industry practice in the ever-evolving financial sector.',
      status: 'concluded',
      dates: [
        { label: 'Calling for Papers', date: '01st of Aug 2025' },
        { label: 'Submission Deadline', date: '15th Sep 2025' },
        { label: 'Notification of Acceptance', date: '15th of Oct 2025' },
        { label: 'Conference Day', date: '20th Nov 2025' }
      ],
      tracks: ['Inclusive Finance', 'Innovative Technologies for Finance', 'Sustainable and Responsible Finance', 'Financial Markets and Services', 'Contemporary Banking and Finance', 'Economic Resilience and Stability', 'Corporate Finance and Governance', 'Policy and Regulation for Financial Ecosystem'],
      keynote: { name: 'Mr. Dilan Wijerathne', details: 'Head of Innovations, Hatton National Bank PLC.' },
      committee: [
        { role: 'Chair', name: 'Ms. HMAK Herath', contact: '+94 71 757 4114' },
        { role: 'Co-Secretary', name: 'Ms. WMIC Keerthikumara', contact: '+94 778 755 278' },
        { role: 'Co-Secretary', name: 'Ms. PDKS Piyathilake', contact: '+94 768 378 351' }
      ],
      downloads: ['Guidelines for Authors', 'Template for Extended Abstract'],
      submission: 'Submission guidelines and templates were provided with the symposium announcement; see the faculty office for current details.',
      proceedings: []
    }
  ];

  /* ------------------------------------------------------------------ */
  /* ANNOUNCEMENTS (all concluded — retained for reference)              */
  /* ------------------------------------------------------------------ */
  var ANNOUNCEMENTS = [
    {
      type: 'programme',
      title: 'HDBFS applications closing date: 25 February 2026',
      body: 'Applications are called for the Higher Diploma in Banking and Financial Studies (HDBFS) offered by the Department of Banking and Finance. Closing date (as documented): 25th February 2026. Contact: hdbfs@wyb.ac.lk — Ms. HMAK Herath (Director) 037 228 4216 / 071 757 4114.',
      status: 'concluded',
      date: '25 Feb 2026'
    },
    {
      type: 'programme',
      title: 'DBFS applications closing date: 10 May 2025 (Extended)',
      body: 'Applications are called for the Diploma in Banking and Financial Studies (DBFS). Closing date (as documented): 10th May 2025, extended. Downloadable documents: Application Form; Brochure DBFS 2022.',
      status: 'concluded',
      date: '10 May 2025'
    },
    {
      type: 'programme',
      title: 'Advanced Certificate in Financial Services Management — new application date',
      body: 'Applications are called for the Advanced Certificate in Financial Services Management (ACFSM) offered by the Department of Banking and Finance. New application date (as documented): 25th March 2025, extended.',
      status: 'concluded',
      date: '25 Mar 2025'
    },
    {
      type: 'programme',
      title: 'DAIS application deadline extended to 25 January 2024',
      body: 'Applications for the Diploma in Accounting Information Systems (DAIS), Department of Accountancy. Lectures are held on weekends. Application deadline (as documented): extended to 25 January 2024.',
      status: 'concluded',
      date: '25 Jan 2024'
    },
    {
      type: 'programme',
      title: 'PGDBM new intake — January 2024',
      body: 'The Department of Business Management invites applications for the Postgraduate Diploma in Business Management (PGDBM) leading to the Masters Degree in Business Administration (MBA). New intake: January 2024. Closing date for applications (as documented): extended to 22 December 2023.',
      status: 'concluded',
      date: 'Jan 2024'
    },
    {
      type: 'symposium',
      title: 'SACFIRE 2025 — registration free, conference on 14 November 2025',
      body: 'The 11th Symposium of Accounting & Finance Research (SACFIRE 2025), Department of Accountancy. Registration is free. Conference date (as documented): 14 November 2025. Theme: "Furtherance of Entrepreneurialism Culture through Interdisciplinary Research Paradigm in Longitudinality".',
      status: 'concluded',
      date: '14 Nov 2025'
    },
    {
      type: 'symposium',
      title: 'SyBFin 2025 — call for papers',
      body: 'The 2nd Symposium in Banking & Finance (SyBFin 2025), Department of Banking & Finance. Calling for papers from 01 August 2025; conference day 20 November 2025 (as documented). Theme: "Redesigning Finance for an Intelligent, Inclusive Future".',
      status: 'concluded',
      date: '20 Nov 2025'
    },
    {
      type: 'symposium',
      title: 'ARSYM 2024 — 7th Annual Research Symposium in Management',
      body: 'The 7th Annual Research Symposium in Management (ARSYM 2024). Registration link and author guidelines were published with the announcement. Pre-conference seminar: 04 December 2024 (as documented).',
      status: 'concluded',
      date: '04 Dec 2024'
    },
    {
      type: 'publication',
      title: 'SLJBF — Call for Research Articles, Vol 8 Issue I (Jun 2025)',
      body: 'The Sri Lankan Journal of Banking and Finance (SLJBF) welcomes original research articles in English on disciplines related to economics, banking and finance at both national and international level. Submissions: sljbf@wyb.ac.lk / sljbf.ce@gmail.com, Tel (+94) 037-2284216.',
      status: 'concluded',
      date: 'Jun 2025'
    },
    {
      type: 'event',
      title: 'SACFIRE 2024 — 11 December 2024, 9:00 AM',
      body: 'Mark your calendars for SACFIRE 2024! Join on December 11th from 9:00 AM at the Faculty of Business Studies and Finance, Wayamba University of Sri Lanka, for the most anticipated research symposium of the year (as documented).',
      status: 'concluded',
      date: '11 Dec 2024'
    }
  ];

  /* ------------------------------------------------------------------ */
  /* FAQ                                                                 */
  /* ------------------------------------------------------------------ */
  var FAQS = [
    {
      q: 'Where is the Faculty of Business Studies and Finance located?',
      a: 'The faculty is located at the Kuliyapitiya premises of Wayamba University of Sri Lanka (60200, Kuliyapitiya, Sri Lanka).'
    },
    {
      q: 'When was the faculty established?',
      a: 'The Faculty of Business Studies and Finance (FBSF) was established on 01 October 1999 by the Government Notification in the Extraordinary Gazette No. 1093/8 of Tuesday, 17 August 1999, and remains the fastest growing faculty of Wayamba University of Sri Lanka.'
    },
    {
      q: 'How many departments does the faculty have?',
      a: 'The faculty consists of four departments of studies: Department of Accountancy, Department of Banking and Finance, Department of Business Management, and Department of Insurance and Valuation.'
    },
    {
      q: 'What are the admission requirements for the Diploma in Accounting Information Systems (DAIS)?',
      a: 'Any one of the following: passed G.C.E Advanced Level in any stream; passed AAT second Level; passed ICASL executive Level; passed CIMA 1st Level; passed CMA 1st Level; passed ACCA 1st Level. Other qualifications may be acceptable case by case subject to approval of the Board of Study. Lectures are held on weekends.'
    },
    {
      q: 'What are the admission routes for the Diploma in Banking and Financial Studies (DBFS)?',
      a: '(1) Passed G.C.E (A/L) examination in any stream in a single attempt; (2) Six passes in G.C.E (O/L) Examination in one sitting with three credits and two years working experience in a reputed institution; (3) Any other qualification with two years working experience, considered case by case by the Board of Study and the Senate of WUSL. A good knowledge of English and performance at the admission test/interview are required.'
    },
    {
      q: 'How does the PGDBM lead to the MBA?',
      a: 'The Postgraduate Diploma in Business Management (PGDBM) runs for one academic year with twelve compulsory course modules (24 credits) plus a project report. Those who complete all PGDBM requirements may be admitted to the second year — the Masters Degree in Business Administration (MBA) — earning 16 credits through two taught courses (8 credits) and a comprehensive research thesis (8 credits). A limited number of direct-entrance candidates may also be admitted to the MBA.'
    },
    {
      q: 'How do I submit a research paper to the Journal of Accountancy and Finance (JAF)?',
      a: 'Submit the full paper (maximum 30 pages, B5 size, MS Word format) to jaf@wyb.ac.lk. Papers must contain Title, Abstract, Keywords, Introduction, Literature Review, Methodology, Results and Discussion, Conclusion and References. The acceptable similarity index is up to 20 percent.'
    },
    {
      q: 'Who can I contact for programme applications?',
      a: 'General enquiries: Faculty office — Tel +94 37 228 4215, Email bsfoffice@wyb.ac.lk. HDBFS specifically: Ms. HMAK Herath (Director) 037 228 4216 / 071 757 4114 or Mr. AGDLK Gunaratna (Academic Coordinator) 071 582 2953, hdbfs@wyb.ac.lk. Journal submissions: jaf@wyb.ac.lk, sljbsf@wyb.ac.lk, sljbf@wyb.ac.lk, jif@wyb.ac.lk. SACFIRE: sacfire@wyb.ac.lk, +37 22 84214.'
    }
  ];

  /* ------------------------------------------------------------------ */
  /* AUTHORITIES / ADMINISTRATION                                        */
  /* ------------------------------------------------------------------ */
  var AUTHORITIES = {
    fqac: {
      name: 'Faculty Quality Assurance Cell (FQAC)',
      description: 'The Wayamba University of Sri Lanka is dedicated to maintaining the highest standards of teaching, research and scholarship, and the enhancement of society\u2019s core values by ensuring students\u2019 achievement in excellent learning outcomes and enhanced educational opportunities. The Faculty of Business Studies & Finance has established a Faculty Quality Assurance Cell (FQAC), which coordinates quality assurance activities for the improvements in overall performance of the faculty in liaison with the Centre for Quality Assurance (CQA) of the University.',
      purpose: 'The FQAC was established with a directive to create a culture that pursues to continually improve the quality of all academic and other activities in the Faculty.',
      structure: [
        'FQAC coordinates quality assurance aspects with the Quality Assurance Units of its four academic departments (Department of Accountancy, Department of Banking & Finance, Department of Business Management, Department of Insurance & Valuation).',
        'FQAC facilitates programme reviews of the four academic departments of the Faculty.',
        'FQAC comprises a committee of academic staff members chaired by the Dean of the Faculty and is coordinated by an appointed Faculty Coordinator.',
        'FQAC plans, implements and evaluates quality assurance activities and gives direction on best practices among staff and students of the faculty in liaison with other related committees within the Faculty (Curriculum and Academic Development Committee, Research and Higher Degree Committee, Teaching and Learning Committee, Student-Staff Liaison Committee, etc.)'
      ],
      ultimate: 'The ultimate intention of FQAC is to strengthen the Faculty\u2019s capacity and commitment to produce quality graduates in the disciplines of Accountancy & Business Finance, Banking & Finance, Business Management and Insurance & Finance.'
    },
    departmentQA: [
      { name: 'Department of Accountancy — Quality Assurance Unit', note: 'Liaises with the FQAC on departmental quality assurance activities.' },
      { name: 'Department of Banking & Finance — Quality Assurance Unit', note: 'Liaises with the FQAC on departmental quality assurance activities.' },
      { name: 'Department of Business Management — Quality Assurance Unit', note: 'Liaises with the FQAC on departmental quality assurance activities.' },
      { name: 'Department of Insurance & Valuation — Quality Assurance Unit', note: 'Liaises with the FQAC on departmental quality assurance activities.' }
    ],
    committees: [
      'Curriculum and Academic Development Committee',
      'Research and Higher Degree Committee',
      'Teaching and Learning Committee',
      'Student-Staff Liaison Committee'
    ],
    links: [
      { label: 'Wayamba University of Sri Lanka', href: 'https://wyb.ac.lk/' },
      { label: 'WUSL Library', href: 'https://libsys.wyb.ac.lk/' },
      { label: 'Staff Development Centre', href: 'https://sdc.wyb.ac.lk/wybsdc/' }
    ],
    downloads: [
      { label: 'Student Hand Book 2020–2021', file: 'Student-Handbook-2020-2021.pdf' },
      { label: 'University Student Charter', file: 'University-Student-Charter.pdf' },
      { label: 'UGC Student Charter — English', file: 'UGC-Student-Charter-English.pdf' },
      { label: 'UGC Student Charter — Sinhala', file: 'UGC-Student-Charter-Sinhala.pdf' }
    ]
  };

  /* ------------------------------------------------------------------ */
  /* CONTACT                                                             */
  /* ------------------------------------------------------------------ */
  var CONTACTS = [
    {
      group: 'Faculty Office',
      items: [
        { label: 'Address', value: 'Faculty of Business Studies and Finance, Wayamba University of Sri Lanka, 60200, Kuliyapitiya, Sri Lanka', icon: 'icon-location' },
        { label: 'Telephone', value: '+94 37 228 4215', icon: 'icon-phone' },
        { label: 'Email', value: 'bsfoffice@wyb.ac.lk', icon: 'icon-mail', href: 'mailto:bsfoffice@wyb.ac.lk' }
      ]
    },
    {
      group: 'Department of Accountancy',
      items: [
        { label: 'Contact', value: 'Contact details were not provided in the source document. Please contact the faculty office.', icon: 'icon-info' }
      ]
    },
    {
      group: 'Department of Banking and Finance',
      items: [
        { label: 'HDBFS — Director', value: 'Ms. HMAK Herath — 037 228 4216 / 071 757 4114', icon: 'icon-phone' },
        { label: 'HDBFS — Academic Coordinator', value: 'Mr. AGDLK Gunaratna — 071 582 2953', icon: 'icon-phone' },
        { label: 'HDBFS Email', value: 'hdbfs@wyb.ac.lk', icon: 'icon-mail', href: 'mailto:hdbfs@wyb.ac.lk' },
        { label: 'SLJBF Journal', value: 'sljbf@wyb.ac.lk / sljbf.ce@gmail.com — Tel (+94) 037-2284216', icon: 'icon-mail', href: 'mailto:sljbf@wyb.ac.lk' }
      ]
    },
    {
      group: 'Department of Business Management',
      items: [
        { label: 'Contact', value: 'Contact details were not provided in the source document. Please contact the faculty office.', icon: 'icon-info' }
      ]
    },
    {
      group: 'Department of Insurance and Valuation',
      items: [
        { label: 'JIF Journal', value: 'jif@wyb.ac.lk', icon: 'icon-mail', href: 'mailto:jif@wyb.ac.lk' },
        { label: 'Department contact', value: 'Contact details were not provided in the source document. Please contact the faculty office.', icon: 'icon-info' }
      ]
    },
    {
      group: 'Research & Journals',
      items: [
        { label: 'JAF Journal', value: 'jaf@wyb.ac.lk', icon: 'icon-mail', href: 'mailto:jaf@wyb.ac.lk' },
        { label: 'SLJBSF Journal', value: 'sljbsf@wyb.ac.lk', icon: 'icon-mail', href: 'mailto:sljbsf@wyb.ac.lk' },
        { label: 'SACFIRE Symposium', value: 'sacfire@wyb.ac.lk — Tel +37 22 84214', icon: 'icon-mail', href: 'mailto:sacfire@wyb.ac.lk' }
      ]
    }
  ];

  /* ------------------------------------------------------------------ */
  /* QUICK LINKS (home page)                                             */
  /* ------------------------------------------------------------------ */
  var QUICK_LINKS = [
    { label: 'Academic Programmes', href: 'programmes.html', icon: 'icon-graduation', desc: 'Undergraduate, postgraduate, diploma and external programmes' },
    { label: 'Departments', href: 'departments.html', icon: 'icon-building', desc: 'Explore our four academic departments' },
    { label: 'Research & Publications', href: 'publications.html', icon: 'icon-flask', desc: 'Journals, magazines and research symposia' },
    { label: 'Events', href: 'events.html', icon: 'icon-calendar', desc: 'Symposiums, conferences and announcements' },
    { label: 'Authorities & QA', href: 'authorities.html', icon: 'icon-shield', desc: 'Faculty Quality Assurance Cell and committees' },
    { label: 'Contact Us', href: 'contact.html', icon: 'icon-mail', desc: 'Addresses, telephone numbers and enquiry form' }
  ];

  /* ------------------------------------------------------------------ */
  /* SEARCH INDEX (built in search.js from this data)                    */
  /* ------------------------------------------------------------------ */

  global.FBSF_DATA = {
    SITE: SITE,
    DEPARTMENTS: DEPARTMENTS,
    PROGRAMMES: PROGRAMMES,
    PUBLICATIONS: PUBLICATIONS,
    SYMPOSIA: SYMPOSIA,
    ANNOUNCEMENTS: ANNOUNCEMENTS,
    FAQS: FAQS,
    AUTHORITIES: AUTHORITIES,
    CONTACTS: CONTACTS,
    QUICK_LINKS: QUICK_LINKS
  };
})(window);
