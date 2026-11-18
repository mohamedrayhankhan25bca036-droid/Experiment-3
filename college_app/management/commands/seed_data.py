from django.core.management.base import BaseCommand
from college_app.models import (
    Department, Course, Faculty, Facility, Event,
    ExamSchedule, PlacementStat, KnowledgeEntry, BotConfig
)

class Command(BaseCommand):
    help = 'Seeds initial imaginary college data for Angelo University into the database'

    def handle(self, *args, **options):
        self.stdout.write("Seeding Angelo University imaginary data...")

        # Bot Config
        BotConfig.objects.all().delete()
        BotConfig.objects.create(
            model_name='gemini-3.5-flash',
            temperature=0.7,
            history_limit=12,
            rate_limit=40,
            system_prompt_version='1.0'
        )

        # Clear existing data
        Department.objects.all().delete()
        Course.objects.all().delete()
        Faculty.objects.all().delete()
        Facility.objects.all().delete()
        Event.objects.all().delete()
        ExamSchedule.objects.all().delete()
        PlacementStat.objects.all().delete()
        KnowledgeEntry.objects.all().delete()

        # Departments
        cs_dept = Department.objects.create(
            name="School of Computer Science & Artificial Intelligence",
            code="CSAI",
            head="Prof. Alexander Reed",
            description="Leading department in advanced AI research, deep learning, algorithmic theory, cyber defense, and cloud computing systems.",
            contact_email="cs.head@angelo.edu"
        )

        ece_dept = Department.objects.create(
            name="Department of Electronics & Autonomous Robotics",
            code="EAR",
            head="Dr. Elena Rostova",
            description="Pioneering autonomous robotics, embedded IoT systems, quantum computing hardware, and neural-interfacing devices.",
            contact_email="robotics.head@angelo.edu"
        )

        biz_dept = Department.objects.create(
            name="School of Business Analytics & Global Management",
            code="SBAGM",
            head="Dr. David Chen",
            description="Focuses on technology management, quantitative finance, data-driven entrepreneurship, and sustainable corporate strategy.",
            contact_email="business.head@angelo.edu"
        )

        bio_dept = Department.objects.create(
            name="Department of Biotechnology & Life Sciences",
            code="DBLS",
            head="Dr. Priya Nair",
            description="Spearheading genomic informatics, biomedical engineering, biopharmaceutical discovery, and bioinformatics.",
            contact_email="biotech.head@angelo.edu"
        )

        # Courses
        courses_data = [
            {
                "code": "CS-101",
                "title": "B.Tech in Computer Science & Engineering",
                "degree": "Undergraduate",
                "department": cs_dept,
                "duration": "4 Years",
                "fees_per_year": "$13,000 / year",
                "eligibility": "10+2 with Physics, Mathematics & Chemistry/CS with min 75% aggregate, or Angelo Scholastic Entrance Test (ASET) score > 80th percentile.",
                "description": "Comprehensive engineering curriculum covering distributed systems, compilers, full-stack software development, security, and cloud infrastructure.",
                "curriculum": "Sem 1-2: Foundations of Computing & Discrete Math; Sem 3-4: Data Structures, Algorithms, OS, Computer Architecture; Sem 5-6: Cloud Computing, Databases, Web Systems, AI Fundamentals; Sem 7-8: Capstone Industry Project, Electives & Internship.",
                "seats": 180
            },
            {
                "code": "AI-201",
                "title": "B.Tech in Artificial Intelligence & Data Science",
                "degree": "Undergraduate",
                "department": cs_dept,
                "duration": "4 Years",
                "fees_per_year": "$13,500 / year",
                "eligibility": "10+2 with Physics, Mathematics & CS/Stats with min 75% aggregate or qualifying score in ASET.",
                "description": "Specialized curriculum covering Machine Learning, Deep Neural Networks, Natural Language Processing, Computer Vision, and Generative AI architectures.",
                "curriculum": "Sem 1-2: Advanced Calculus, Linear Algebra, Python for Data Science; Sem 3-4: Classical Machine Learning, Statistical Inference, Big Data Frameworks; Sem 5-6: Deep Learning, NLP, Computer Vision, MLOps; Sem 7-8: Autonomous Systems Capstone & Industry Research Thesis.",
                "seats": 120
            },
            {
                "code": "CY-301",
                "title": "B.Tech in Cyber Security & Digital Forensics",
                "degree": "Undergraduate",
                "department": cs_dept,
                "duration": "4 Years",
                "fees_per_year": "$12,500 / year",
                "eligibility": "10+2 with min 70% in Science stream.",
                "description": "Hands-on offensive and defensive cybersecurity, ethical hacking, cryptography, secure software architecture, and digital forensics.",
                "curriculum": "Sem 1-4: Computer Networking, Cryptography, Linux Kernel Security; Sem 5-8: Penetration Testing, SOC Operations, Malware Reverse Engineering, Cloud Security Audits.",
                "seats": 90
            },
            {
                "code": "ROB-401",
                "title": "B.Tech in Robotics & Mechatronics Engineering",
                "degree": "Undergraduate",
                "department": ece_dept,
                "duration": "4 Years",
                "fees_per_year": "$12,000 / year",
                "eligibility": "10+2 with Physics, Math and Chemistry with min 70% aggregate.",
                "description": "Integrates mechanical design, electronic sensors, microcontrollers, ROS (Robot Operating System), and robotic vision systems.",
                "curriculum": "Sem 1-4: Statics, Dynamics, Circuit Design, Microcontrollers; Sem 5-8: Kinematics, Control Systems, ROS 2, Industrial Automation, Autonomous Mobile Robots.",
                "seats": 90
            },
            {
                "code": "BBA-501",
                "title": "BBA in Business Analytics & Global Finance",
                "degree": "Undergraduate",
                "department": biz_dept,
                "duration": "3 Years",
                "fees_per_year": "$10,500 / year",
                "eligibility": "High school completion (any stream) with minimum 65% aggregate with Mathematics/Statistics/Economics preferred.",
                "description": "Prepares future business leaders with quantitative financial modeling, business intelligence, market analytics, and strategy.",
                "curriculum": "Year 1: Financial Accounting, Microeconomics, Business Statistics; Year 2: Predictive Analytics, Corporate Finance, Marketing Metrics; Year 3: FinTech, Strategic Management, Venture Capital Capstone.",
                "seats": 100
            },
            {
                "code": "BIO-601",
                "title": "B.Sc in Biotechnology & Genomic Science",
                "degree": "Undergraduate",
                "department": bio_dept,
                "duration": "3 Years",
                "fees_per_year": "$9,500 / year",
                "eligibility": "10+2 with Biology and Chemistry with minimum 65% aggregate.",
                "description": "Explores genetic engineering, cell biology, bioinformatics, immunological therapies, and bio-industrial manufacturing.",
                "curriculum": "Year 1: Molecular Biology, Biochemistry, Cell Physiology; Year 2: Genetics, Fermentation Tech, Biostatistics; Year 3: CRISPR Gene Editing, Pharmaceutical Biotech, Clinical Trials.",
                "seats": 60
            },
            {
                "code": "MSC-AI",
                "title": "M.Tech in Autonomous Systems & AI",
                "degree": "Postgraduate",
                "department": cs_dept,
                "duration": "2 Years",
                "fees_per_year": "$15,000 / year",
                "eligibility": "B.Tech / B.E. in CS, IT, ECE or equivalent with minimum 65% or 3.0 GPA.",
                "description": "Postgraduate program focusing on reinforcement learning, multi-agent systems, autonomous driving algorithms, and neuromorphic computing.",
                "curriculum": "Year 1: Advanced Deep Learning, Reinforcement Learning, Probabilistic Robotics; Year 2: Master Thesis and Industry Research Practicum.",
                "seats": 45
            },
            {
                "code": "MBA-701",
                "title": "MBA in Technology Management & Leadership",
                "degree": "Postgraduate",
                "department": biz_dept,
                "duration": "2 Years",
                "fees_per_year": "$16,500 / year",
                "eligibility": "Bachelor's degree in any discipline with min 60% and CAT/GMAT score or Angelo Executive Test.",
                "description": "Executive and tech-driven MBA focused on product management, digital transformation, tech ventures, and enterprise leadership.",
                "curriculum": "Year 1: Global Business Strategy, Financial Analysis, Tech Product Management; Year 2: AI in Enterprise, Venture Incubation, International Immersion.",
                "seats": 90
            }
        ]

        for c in courses_data:
            Course.objects.create(**c)

        # Faculty Members
        faculty_data = [
            {
                "name": "Dr. Sophia Martinez",
                "designation": "Dean of Engineering & Professor of AI",
                "department": cs_dept,
                "qualification": "Ph.D. Computer Science, Stanford University; IEEE Fellow",
                "email": "s.martinez@angelo.edu",
                "bio": "Over 20 years of research leadership in neural network architectures and ethical AI systems. Former researcher at Google AI.",
                "research_areas": "Deep Learning, Transformer Architectures, AI Ethics, Computer Vision"
            },
            {
                "name": "Prof. Alexander Reed",
                "designation": "Professor & Head of Computer Science",
                "department": cs_dept,
                "qualification": "Ph.D. in Computer Science, MIT",
                "email": "a.reed@angelo.edu",
                "bio": "Distinguished academician with over 60 published papers on distributed consensus, large-scale cloud databases, and high-performance algorithms.",
                "research_areas": "Distributed Systems, Cloud Architecture, Quantum Algorithms"
            },
            {
                "name": "Dr. Elena Rostova",
                "designation": "Head of Robotics & Mechatronics",
                "department": ece_dept,
                "qualification": "Ph.D. in Robotics, ETH Zurich",
                "email": "e.rostova@angelo.edu",
                "bio": "Leading investigator in bio-inspired robotics, drone telemetry, and human-robot cooperative manipulation.",
                "research_areas": "Autonomous Swarms, Bio-Robotics, ROS 2, Industrial Automation"
            },
            {
                "name": "Dr. David Chen",
                "designation": "Dean, School of Business & Analytics",
                "department": biz_dept,
                "qualification": "Ph.D. in Financial Economics, Harvard Business School",
                "email": "d.chen@angelo.edu",
                "bio": "Advises international tech incubators and venture funds on quantitative risk models and digital economy transformations.",
                "research_areas": "Predictive Financial Modeling, Venture Capital Dynamics, Data Strategy"
            },
            {
                "name": "Dr. Priya Nair",
                "designation": "Professor & Head of Life Sciences",
                "department": bio_dept,
                "qualification": "Ph.D. in Molecular Genetics, Oxford University",
                "email": "p.nair@angelo.edu",
                "bio": "Pioneer in targeted drug delivery systems, nanomedicine, and high-throughput genomic data interpretation.",
                "research_areas": "CRISPR-Cas9 Applications, Genomic Informatics, Nanomedicine"
            },
            {
                "name": "Prof. Liam O'Connor",
                "designation": "Associate Professor of Cyber Defense",
                "department": cs_dept,
                "qualification": "M.S. & Ph.D. in Information Security, Carnegie Mellon University",
                "email": "l.oconnor@angelo.edu",
                "bio": "Certified Ethical Hacker (CEH) and CISSP consultant for federal cyber security initiatives.",
                "research_areas": "Zero-Trust Architecture, Cryptographic Protocols, Threat Intelligence"
            }
        ]

        for f in faculty_data:
            Faculty.objects.create(**f)

        # Facilities
        facilities_data = [
            {
                "name": "Angelo Central Library & Knowledge Center",
                "category": "Academic",
                "description": "A magnificent 6-floor architectural library housing over 150,000 volumes, 50,000+ scientific journals, 40 private discussion rooms, VR learning stations, and round-the-clock digital database terminals.",
                "location": "North Quadrangle, Building A",
                "timings": "Open 24/7 during semester; 8:00 AM - 11:00 PM during breaks"
            },
            {
                "name": "Alan Turing High-Performance Computing Cluster",
                "category": "Innovation",
                "description": "Supercomputing facility with 64 NVIDIA H100 GPU nodes and petabyte-scale NVMe storage dedicated to deep learning experiments, large language model training, and simulations.",
                "location": "Turing Tech Pavilion, 3rd Floor",
                "timings": "Open 24/7 for authorized research scholars and engineering students"
            },
            {
                "name": "St. Angelo Olympic Sports Arena & Aquatic Center",
                "category": "Sports",
                "description": "Comprehensive sports hub featuring an Olympic standard 50-meter temperature-regulated pool, 4 synthetic tennis courts, indoor wooden basketball and badminton arenas, and modern cardio/strength gym.",
                "location": "East Campus Athletic Zone",
                "timings": "6:00 AM - 10:00 PM Daily"
            },
            {
                "name": "Phoenix & Orion Student Residences (Hostels)",
                "category": "Residential",
                "description": "Modern campus dormitories providing single and dual occupancy air-conditioned suites with gigabit Wi-Fi, laundry facilities, recreation lounges, study halls, and biometric access control.",
                "location": "South Campus Residential Park",
                "timings": "Resident curfew 11:00 PM for undergrads; 24/7 security desk"
            },
            {
                "name": "Campus Health & Wellness Medical Center",
                "category": "Health",
                "description": "Accredited health center staffed by full-time medical physicians, registered nurses, an emergency trauma room, an in-house pharmacy, and free psychological counseling & mindfulness services.",
                "location": "Central Quad, Beside Admin Block",
                "timings": "24/7 Emergency Care; OPD 8:30 AM - 6:00 PM"
            },
            {
                "name": "Nikola Tesla Innovation & Robotics Incubator",
                "category": "Innovation",
                "description": "State-of-the-art makerspace with 3D printers, laser cutters, CNC milling machines, drone flying cages, and startup seed incubation offices with mentor support.",
                "location": "Innovation Block C",
                "timings": "8:00 AM - Midnight"
            }
        ]

        for fac in facilities_data:
            Facility.objects.create(**fac)

        # Events
        events_data = [
            {
                "title": "Ignite Angelo 2027: Annual International Tech Fest",
                "category": "Tech & Innovation",
                "date_display": "March 24-26, 2027",
                "venue": "Angelo Grand Auditorium & Tech Quads",
                "description": "36-hour hackathon, robotics arena battle, AI expo, and keynote addresses from Silicon Valley technology leaders with $50,000 in prizes."
            },
            {
                "title": "Aura 2027: Cultural & Music Extravaganza",
                "category": "Cultural",
                "date_display": "April 10-12, 2027",
                "venue": "Open Air Amphitheatre & Sports Arena",
                "description": "3-day cultural showcase with celebrity live concerts, inter-university dance competitions, fashion shows, street art displays, and food trucks."
            },
            {
                "title": "Angelo Global AI & Robotics Summit",
                "category": "Academic",
                "date_display": "December 4, 2026",
                "venue": "Turing Conference Center",
                "description": "Keynote symposium bringing together research scientists, industry executives, and students exploring generative AI and autonomous robotics."
            },
            {
                "title": "Fall Career Expo & Placement Fair 2026",
                "category": "Placements",
                "date_display": "October 18-20, 2026",
                "venue": "Angelo Convention Hall",
                "description": "Over 120 premier multinational corporations hiring for engineering, software development, data science, and consulting positions."
            }
        ]

        for ev in events_data:
            Event.objects.create(**ev)

        # Exam Schedules
        exam_data = [
            {
                "semester": "Fall 2026 End-Semester",
                "program": "B.Tech Computer Science & AI",
                "course_code": "CS-101",
                "course_title": "Foundations of Computer Systems & Architecture",
                "exam_date": "December 08, 2026",
                "exam_time": "09:30 AM - 12:30 PM",
                "venue": "Hall A & Hall B, Turing Building"
            },
            {
                "semester": "Fall 2026 End-Semester",
                "program": "B.Tech Computer Science & AI",
                "course_code": "AI-201",
                "course_title": "Neural Networks & Deep Learning Architectures",
                "exam_date": "December 10, 2026",
                "exam_time": "02:00 PM - 05:00 PM",
                "venue": "Grand Exam Center, West Wing"
            },
            {
                "semester": "Fall 2026 End-Semester",
                "program": "B.Tech Cyber Security",
                "course_code": "CY-301",
                "course_title": "Applied Cryptography & Network Security Protocols",
                "exam_date": "December 12, 2026",
                "exam_time": "09:30 AM - 12:30 PM",
                "venue": "Turing Hall C"
            },
            {
                "semester": "Fall 2026 End-Semester",
                "program": "BBA Business Analytics",
                "course_code": "BBA-501",
                "course_title": "Predictive Financial Analytics & Decision Models",
                "exam_date": "December 15, 2026",
                "exam_time": "09:30 AM - 12:30 PM",
                "venue": "Business School Auditorium"
            },
            {
                "semester": "Fall 2026 End-Semester",
                "program": "B.Tech Robotics",
                "course_code": "ROB-401",
                "course_title": "Autonomous Robot Kinematics & Embedded Sensors",
                "exam_date": "December 18, 2026",
                "exam_time": "02:00 PM - 05:00 PM",
                "venue": "Robotics Testing Lab Hall 1"
            }
        ]

        for ex in exam_data:
            ExamSchedule.objects.create(**ex)

        # Placement Stats
        PlacementStat.objects.create(
            year=2026,
            total_offers=1120,
            highest_package="$148,000 / annum",
            average_package="$86,200 / annum",
            placement_rate="96.8%",
            top_recruiters="Google, Microsoft, Amazon AWS, Tesla, Apple, Nvidia, Meta, Cisco, Deloitte, McKinsey Digital, Intel"
        )

        # Knowledge Base Entries for RAG Retrieval & System Grounding
        kb_entries = [
            {
                "category": "general",
                "title": "About Angelo University Overview & Heritage",
                "content": "Angelo University, founded in 1968, is a premier world-class institution dedicated to empowering minds and building futures. Situated on a lush 120-acre green campus in California's tech corridor, Angelo University enrolls over 10,000 undergraduate and graduate students across 15+ specialized degree programs. The university features 200+ expert faculty, 30+ cutting-edge campus facilities, and maintains an outstanding 96.8% graduate placement record.",
                "keywords": "about, overview, history, established, students, faculty, mission, motto, campus size, location, Angelo University"
            },
            {
                "category": "admissions",
                "title": "Undergraduate Admissions Process & Eligibility Criteria",
                "content": "Admissions to Angelo University undergraduate programs (B.Tech, B.Sc, BBA) require a high school diploma (10+2) with at least 70% to 75% aggregate marks in relevant subjects. Candidates can qualify either through the Angelo Scholastic Entrance Test (ASET), SAT scores (1220+ recommended), or high academic standing. Applications can be submitted online via the 'Apply Now' portal. The non-refundable application fee is $65. Deadlines: Fall 2027 Early Action: January 15; Regular Decision: April 30; Late Application: June 30.",
                "keywords": "admission process, how to apply, eligibility, cutoffs, deadlines, application fee, ASET, entrance exam, criteria, apply now"
            },
            {
                "category": "courses",
                "title": "Programs Offered & Academic Degrees",
                "content": "Angelo University offers 15+ premier academic programs: Undergrad: B.Tech in Computer Science & Engineering ($13,000/yr), B.Tech in AI & Data Science ($13,500/yr), B.Tech in Cyber Security & Digital Forensics ($12,500/yr), B.Tech in Robotics & Mechatronics ($12,000/yr), BBA in Business Analytics ($10,500/yr), B.Sc in Biotechnology ($9,500/yr). Postgrad: M.Tech in Autonomous Systems & AI ($15,000/yr), MBA in Technology Management ($16,500/yr), M.Sc in Applied Data Science ($11,000/yr). Ph.D. programs with full fellowship are also available.",
                "keywords": "courses, programs, degrees, majors, btech, cse, ai, cyber security, robotics, bba, mba, mtech, phd, branch, curriculum"
            },
            {
                "category": "fees",
                "title": "Tuition Fees, Hostel Charges & Scholarships",
                "content": "Tuition fees range from $9,500 to $16,500 per year depending on the program. Engineering programs average $12,000-$13,500/year. On-campus residential hostel accommodation costs $3,800/year (including twin-sharing AC room, high-speed WiFi, and utilities) plus $2,400/year for meal plan dining. Scholarships: Chancellor's Merit Scholarship awards up to 50% tuition reduction to top 5% entrance test rankers. Women in Tech Grant offers $5,000/yr. Need-based financial aid covers up to 40% of tuition.",
                "keywords": "fees, tuition fee, cost, hostel fees, accommodation cost, food charges, scholarships, financial aid, waiver, payment"
            },
            {
                "category": "facilities",
                "title": "Campus Facilities, Library, Labs & Hostels",
                "content": "Angelo University provides 30+ top-tier campus facilities: 1) Angelo Central Library: 6 floors, 150,000+ volumes, 24/7 digital hub with private study pods. 2) Alan Turing HPC Supercomputing Center with NVIDIA H100 GPU clusters for AI students. 3) St. Angelo Olympic Sports Complex: 50m Olympic pool, basketball court, soccer field, modern gym. 4) Phoenix and Orion Hostels: AC rooms, high-speed fiber internet, dining halls. 5) 24/7 Health & Wellness Clinic with free student counseling. 6) Nikola Tesla Innovation & Robotics Incubator.",
                "keywords": "facilities, library, supercomputer, sports, swimming pool, gym, hostels, dorms, clinic, hospital, wifi, labs, makerspace"
            },
            {
                "category": "exams",
                "title": "Exam Schedules, Dates, Grading & Timetables",
                "content": "Fall 2026 Semester Final Exams run from December 08 to December 22, 2026. CS-101 is on Dec 8 (9:30 AM), AI-201 on Dec 10 (2:00 PM), CY-301 on Dec 12 (9:30 AM), BBA-501 on Dec 15 (9:30 AM), and ROB-401 on Dec 18 (2:00 PM). Hall tickets are downloadable from the student portal 2 weeks prior. Passing criteria is 40% in theory and practicals. Spring 2027 Mid-term exams will be held March 15-22, 2027.",
                "keywords": "exams, exam schedule, timetable, dates, fall 2026, midterms, finals, hall ticket, grading, marks"
            },
            {
                "category": "placements",
                "title": "Placements, Internships & Career Statistics",
                "content": "Angelo University boasts an exceptional 96.8% placement record for the 2026 graduating class. Highest international package offered: $148,000/annum. Highest domestic package: $98,000/annum. Average package: $86,200/annum. Over 120 multinational companies recruit from campus, including Google, Microsoft, Amazon AWS, Tesla, Apple, Nvidia, Meta, Cisco, and Deloitte. The dedicated Career Development Cell organizes summer internships, coding bootcamps, and mock technical interviews.",
                "keywords": "placements, jobs, salary, package, highest package, average package, companies, recruiters, internships, career, google, microsoft"
            },
            {
                "category": "faculty",
                "title": "Distinguished Faculty & Research Leadership",
                "content": "The university employs 200+ expert faculty members, with 92% holding Ph.D. degrees from prestigious institutions like Stanford, MIT, Harvard, Cambridge, and ETH Zurich. Key academic leaders include Dr. Sophia Martinez (Dean of Engineering, former Google AI researcher), Prof. Alexander Reed (HOD Computer Science, Ph.D. MIT), Dr. Elena Rostova (Head of Robotics, Ph.D. ETH Zurich), Dr. David Chen (Dean of Business, Ph.D. Harvard), and Dr. Priya Nair (Head of Life Sciences, Ph.D. Oxford).",
                "keywords": "faculty, professors, teachers, dean, hod, sophia martinez, alexander reed, elena rostova, staff, research"
            },
            {
                "category": "events",
                "title": "Campus Life, Clubs, Events & Extracurriculars",
                "content": "Angelo University offers a vibrant student life with 45+ student-run clubs, including the Robotics Club, Coding Syndicate, AI Society, E-Sports Guild, Debate Union, and Music Society. Major annual events include 'Ignite Angelo' (Annual Tech Fest & 36-hr Hackathon in March), 'Aura' (3-day Cultural & Music Festival in April), and the Angelo Global AI & Robotics Summit in December. Intramural sports leagues run year-round.",
                "keywords": "campus life, events, clubs, festivals, ignite angelo, aura, hackathon, cultural, sports, student activities"
            },
            {
                "category": "contact",
                "title": "Official Contact Details, Address & Office Hours",
                "content": "Official Campus Address: Angelo University, 100 University Boulevard, Tech Crest Valley, California 94025, USA. Admissions Hotline: +1 (555) 019-2834. General Inquiries & Registrar: registrar@angelo.edu. Admissions Office: admissions@angelo.edu. Student Support Helpline: helpline@angelo.edu. Official Office Hours: Monday through Friday, 8:30 AM to 5:30 PM PST. Campus tours are hosted every Wednesday and Saturday.",
                "keywords": "contact, phone number, email, address, location, office hours, registrar, helpline, directions, campus tour"
            },
            {
                "category": "rules",
                "title": "Campus Rules, Attendance & Conduct Code",
                "content": "Angelo University strictly upholds an academic honor code and inclusive community culture. Minimum 75% attendance is required in each course to be eligible for end-semester examinations. The campus operates as a zero-tolerance ragging, harassment, and substance-free zone. ID cards must be worn on campus premises. Hostel entry curfew for undergraduate residents is 11:00 PM.",
                "keywords": "rules, regulations, attendance, code of conduct, ragging policy, curfew, guidelines, discipline"
            }
        ]

        for kb in kb_entries:
            KnowledgeEntry.objects.create(**kb)

        self.stdout.write(self.style.SUCCESS(
            f"Successfully seeded: {Department.objects.count()} departments, "
            f"{Course.objects.count()} courses, {Faculty.objects.count()} faculty, "
            f"{Facility.objects.count()} facilities, {Event.objects.count()} events, "
            f"{ExamSchedule.objects.count()} exams, and {KnowledgeEntry.objects.count()} knowledge entries!"
        ))
