/* ============================================
   i18n — Korean / English Translation
   ============================================ */

const translations = {
  en: {
    // Nav
    nav_about: 'About',
    nav_experience: 'Experience',
    nav_research: 'Research',
    nav_projects: 'Projects',
    nav_education: 'Education',
    nav_contact: 'Contact',

    // Hero
    hero_greeting: 'Hello, I\'m',
    hero_name: 'Wonsuk Kim',
    hero_title: 'CTO at SAFE AI | AI Researcher | Engineer',
    hero_tagline: 'Building AI that is safe, interpretable, and human-centered.',
    hero_cta: 'Explore My Work',
    hero_cta2: 'Get in Touch',

    // About
    about_title: 'About',
    about_bio: 'I\'m a researcher and engineer working at the intersection of AI safety, computer vision, and privacy-preserving machine learning. Currently CTO at SAFE AI, I\'ve spent over a decade building systems \u2014 from food delivery backends to nanophotonic inverse design models \u2014 and I believe the next decade should be defined by AI we can actually trust.',
    about_location_label: 'Location',
    about_location: 'Seoul, South Korea',
    about_email_label: 'Email',
    about_degree_label: 'Degree',
    about_degree: 'Ph.D. & B.S. Electrical Engineering, Korea University',

    // Experience
    exp_title: 'Experience',
    exp_intro: '2012 — Present · SW Engineering → AI Research & Ph.D. → Deep-tech Founder & CTO',
    exp_1_role: 'CTO',
    exp_1_company: 'SAFE AI, Seoul',
    exp_1_desc: 'Leading Vision AI & AI Safety research as CTO / Principal Investigator · 10 government R&D programs · enterprise AI delivery',
    exp_2_role: 'Software Researcher',
    exp_2_company: 'Desilo, Seoul',
    exp_2_desc: 'Privacy-preserving ML — homomorphic encryption (FHE) & multi-party computation (MPC)',
    exp_3_role: 'Software Engineer',
    exp_3_company: 'Woowa Bros. (Baemin)',
    exp_3_desc: 'Alternative military service — Autobrain → SureM → Woowa Bros.; back-end API, payment / PG servers, MSA migration',

    // Research
    research_title: 'Research & Publications',
    research_journals: 'Journal Papers',
    research_conferences: 'Conference Papers',
    research_patent: 'Patent',

    // Seminars
    nav_seminars: 'Seminars',
    seminars_title: 'Seminars',
    sem_1_host: 'Samsung C&T',
    sem_1_name: 'Jira Best Practices',
    sem_1_desc: 'Effective project management using Jira',
    sem_2_host: 'Hanyang Univ.',
    sem_2_name: 'No-Code Tools & AI Development',
    sem_2_desc: 'Hands-on practice with no-code tools and AI development',
    sem_3_host: 'Korea Univ. FMBA',
    sem_3_name: 'AI Transforming Finance',
    sem_3_desc: 'Artificial intelligence reshaping the financial industry',
    sem_4_host: 'Korea Univ. FMBA',
    sem_4_name: 'From Talking AI to Working Agents',
    sem_4_desc: 'AI agent systems transforming enterprise workflows',
    sem_5_host: 'SpartaCoding',
    sem_5_name: 'How to Talk with Developers',
    sem_5_desc: 'Communication skills for effective collaboration with developers',
    sem_6_host: 'Univ. of Seoul',
    sem_6_name: 'AI Marketing Research — From Talking AI to Working Agents',
    sem_6_desc: 'LLM principles to no-code AI tools for marketing research (경영학부 마케팅조사론)',

    // Projects
    projects_title: 'Projects',
    proj_1_desc: 'Inverse design of nanophotonic devices using GANs',
    proj_2_desc: 'Display AI convergence talent training',
    proj_3_desc: 'EM wave simulation acceleration via deep learning',
    proj_4_desc: 'Indoor semantic segmentation app using DeepLabV3 + MobileNetV2',

    // Education
    edu_title: 'Education',
    edu_1_degree: 'Ph.D. Electrical Engineering (CS)',
    edu_1_school: 'Korea University',
    edu_1_detail: 'Advisor: Prof. Junhee Seok',
    edu_1_sublabel: 'During Ph.D.',
    edu_1_sub1: 'Visiting Ph.D. · Broad Institute of MIT & Harvard · 2020',
    edu_1_sub2: 'Research Intern · Samsung Electronics · 2021',
    edu_1_sub3: 'Teaching Assistant · Korea Univ. (ECE403, ECE446)',
    edu_1_sub4: 'JetBrains Campus Ambassador · 2017–2019',
    edu_2_degree: 'B.S. Electrical Engineering',
    edu_2_school: 'Korea University',
    edu_2_detail: 'Best Graduation Thesis Award (Software), 2016',
    edu_3_degree: 'High School Diploma',
    edu_3_school: 'Kyunggi High School',

    // Contact
    contact_title: 'Contact',
    contact_subtitle: 'Feel free to reach out for collaborations or just a friendly hello.',

    // Footer
    footer_text: '\u00A9 2026 Wonsuk Kim. All rights reserved.'
  },

  kr: {
    // Nav
    nav_about: '\uC18C\uAC1C',
    nav_experience: '\uACBD\uB825',
    nav_research: '\uC5F0\uAD6C',
    nav_projects: '\uD504\uB85C\uC81D\uD2B8',
    nav_education: '\uD559\uB825',
    nav_contact: '\uC5F0\uB77D\uCC98',

    // Hero
    hero_greeting: '\uC548\uB155\uD558\uC138\uC694,',
    hero_name: '\uAE40\uC6D0\uC11D',
    hero_title: 'SAFE AI CTO | AI \uC5F0\uAD6C\uC790 | \uC5D4\uC9C0\uB2C8\uC5B4',
    hero_tagline: '\uC548\uC804\uD558\uACE0 \uD574\uC11D \uAC00\uB2A5\uD55C, \uC0AC\uB78C \uC911\uC2EC\uC758 AI\uB97C \uB9CC\uB4ED\uB2C8\uB2E4.',
    hero_cta: '\uB354 \uC54C\uC544\uBCF4\uAE30',
    hero_cta2: '\uC5F0\uB77D\uD558\uAE30',

    // About
    about_title: '\uC18C\uAC1C',
    about_bio: 'AI 안전성, 컴퓨터 비전, 프라이버시 보존 머신러닝 분야에서 연구하고 개발하는 엔지니어입니다. 현재 SAFE AI의 CTO로서, 지난 10여 년간 배달 앱 백엔드부터 나노포토닉 역설계 모델까지 다양한 시스템을 구축해왔습니다. 앞으로의 10년은 우리가 신뢰할 수 있는 AI로 정의되어야 한다고 믿습니다.',
    about_location_label: '\uC704\uCE58',
    about_location: '\uB300\uD55C\uBBFC\uAD6D \uC11C\uC6B8',
    about_email_label: '\uC774\uBA54\uC77C',
    about_degree_label: '\uD559\uC704',
    about_degree: '고려대학교 전기전자공학부 박사 & 학사',

    // Experience (roles & companies kept in English)
    exp_title: '경력',
    exp_intro: '2012 — 현재 · SW 개발 → AI 연구·박사 → 딥테크 창업 · CTO',
    exp_1_role: 'CTO',
    exp_1_company: 'SAFE AI, Seoul',
    exp_1_desc: 'Vision AI · AI Safety 연구 총괄 (CTO · 연구책임) · 정부 R&D 10건 · 기업 AI 딜리버리',
    exp_2_role: 'Software Researcher',
    exp_2_company: 'Desilo, Seoul',
    exp_2_desc: '동형암호(HE) · 다자간 연산(MPC) 기반 프라이버시 강화 ML',
    exp_3_role: 'Software Engineer',
    exp_3_company: 'Woowa Bros. (Baemin)',
    exp_3_desc: '산업기능요원 기간 — 오토브레인 → 슈어엠 → 우아한형제들; 백엔드 API · 결제/PG 서버 · MSA 전환',

    // Research
    research_title: '\uC5F0\uAD6C \uBC0F \uB17C\uBB38',
    research_journals: '\uC800\uB110 \uB17C\uBB38',
    research_conferences: '\uD559\uD68C \uB17C\uBB38',
    research_patent: '특허',

    // Seminars
    nav_seminars: '세미나',
    seminars_title: '세미나',
    sem_1_host: '삼성물산',
    sem_1_name: '지라 활용법 세미나',
    sem_1_desc: 'Jira를 활용한 효과적인 프로젝트 관리',
    sem_2_host: '한양대학교',
    sem_2_name: '노코드툴 활용과 AI 개발 실습',
    sem_2_desc: '취업세미나 - 노코드 도구와 AI 개발 실습',
    sem_3_host: '고려대 FMBA',
    sem_3_name: '금융을 바꾸는 인공지능',
    sem_3_desc: '금융 산업을 변화시키는 인공지능 기술',
    sem_4_host: '고려대 FMBA',
    sem_4_name: '말하는 AI에서 일하는 에이전트로',
    sem_4_desc: '기업 워크플로우를 변화시키는 AI 에이전트 시스템',
    sem_5_host: '스파르타창',
    sem_5_name: '개발자와 대화하는 법',
    sem_5_desc: '개발자와 효과적으로 소통하는 방법',
    sem_6_host: '서울시립대학교',
    sem_6_name: 'AI 시대의 마케팅 조사',
    sem_6_desc: 'LLM 원리부터 노코딩 AI 도구까지 — 경영학부 마케팅조사론',

    // Projects
    projects_title: '프로젝트',
    proj_1_desc: 'GAN\uC744 \uD65C\uC6A9\uD55C \uB098\uB178\uD3EC\uD1A0\uB2C9 \uC18C\uC790 \uC5ED\uC124\uACC4',
    proj_2_desc: '\uB514\uC2A4\uD50C\uB808\uC774 AI \uC735\uD569 \uC778\uC7AC \uC591\uC131',
    proj_3_desc: '\uB525\uB7EC\uB2DD \uAE30\uBC18 \uC804\uC790\uAE30\uD30C \uC2DC\uBBAC\uB808\uC774\uC158 \uAC00\uC18D\uD654',
    proj_4_desc: 'DeepLabV3 + MobileNetV2 \uAE30\uBC18 \uC2E4\uB0B4 \uC2DC\uB9E8\uD2F1 \uC138\uADF8\uBA58\uD14C\uC774\uC158 \uC571',

    // Education
    edu_title: '\uD559\uB825',
    edu_1_degree: '\uBC15\uC0AC \uC804\uAE30\uC804\uC790\uACF5\uD559 (CS)',
    edu_1_school: '\uACE0\uB824\uB300\uD559\uAD50',
    edu_1_detail: '\uC9C0\uB3C4\uAD50\uC218: \uC11D\uC900\uD76C \uAD50\uC218',
    edu_1_sublabel: '\uBC15\uC0AC\uACFC\uC815 \uC911',
    edu_1_sub1: 'Visiting Ph.D. \u00B7 Broad Institute of MIT & Harvard \u00B7 2020',
    edu_1_sub2: 'Research Intern \u00B7 \uC0BC\uC131\uC804\uC790 \u00B7 2021',
    edu_1_sub3: 'Teaching Assistant \u00B7 \uACE0\uB824\uB300 (ECE403, ECE446)',
    edu_1_sub4: 'JetBrains Campus Ambassador \u00B7 2017\u20132019',
    edu_2_degree: '\uD559\uC0AC \uC804\uAE30\uC804\uC790\uACF5\uD559',
    edu_2_school: '\uACE0\uB824\uB300\uD559\uAD50',
    edu_2_detail: '\uACE0\uB824\uB300\uD559\uAD50 \uC878\uC5C5\uB17C\uBB38\uC0C1 (\uC18C\uD504\uD2B8\uC6E8\uC5B4 \uBD80\uBB38), 2016',
    edu_3_degree: '\uACE0\uB4F1\uD559\uAD50 \uC878\uC5C5',
    edu_3_school: '\uACBD\uAE30\uACE0\uB4F1\uD559\uAD50',

    // Contact
    contact_title: '\uC5F0\uB77D\uCC98',
    contact_subtitle: '\uD611\uC5C5 \uC81C\uC548\uC774\uB098 \uC548\uBD80 \uC778\uC0AC \uD658\uC601\uD569\uB2C8\uB2E4.',

    // Footer
    footer_text: '\u00A9 2026 \uAE40\uC6D0\uC11D. All rights reserved.'
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  // Update body class for font family
  document.body.classList.toggle('kr', lang === 'kr');

  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.dataset.i18n;
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
      // Update data-text for glitch effect
      if (el.hasAttribute('data-text')) {
        el.setAttribute('data-text', translations[lang][key]);
      }
    }
  });

  // Update active language indicator
  document.querySelectorAll('.lang-option').forEach(function(opt) {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  // Set initial language
  setLang(currentLang);

  // Language toggle button
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function() {
      setLang(currentLang === 'en' ? 'kr' : 'en');
    });
  }

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
  });
});