const searchContainer = document.getElementById("search-container");
const chatResults = document.getElementById("chat-results");
const clearResults = document.getElementById("clear-results");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

// Focus input on page load
document.addEventListener("DOMContentLoaded", () => {
  userInput.focus();
  
  // Handle missing logo
  const logoImage = document.querySelector('.logo-image');
  if (logoImage) {
    logoImage.addEventListener('error', () => {
      logoImage.style.display = 'none';
      const logoContainer = document.querySelector('.college-logo');
      if (logoContainer) {
        logoContainer.innerHTML = '<div class="logo-fallback">🏛️</div>';
      }
    });
  }
});

// Clear results functionality
clearResults.addEventListener("click", () => {
  chatResults.style.display = "none";
  chatBody.innerHTML = "";
  userInput.focus();
});

// Photo Modal Functionality
const photoModal = document.getElementById("photo-modal");
const closePhotoModalBtn = document.getElementById("close-photo-modal");
let currentPhoto = null;

// Photo data
const photoData = {
  'campus': {
    icon: '🏫',
    name: 'Campus View',
    description: 'Our beautiful campus provides a perfect environment for learning with modern infrastructure, green spaces, and state-of-the-art facilities. The campus is designed to inspire creativity and academic excellence.'
  },
  'computer-lab': {
    icon: '💻',
    name: 'Computer Lab',
    description: 'Our advanced computer laboratories are equipped with the latest hardware and software. Students have access to high-speed internet, modern workstations, and specialized software for programming, design, and research.'
  },
  'science-lab': {
    icon: '🔬',
    name: 'Science Lab',
    description: 'Our well-equipped science laboratories include Physics, Chemistry, and Biology labs with modern equipment and safety measures. Students get hands-on experience with cutting-edge scientific instruments.'
  },
  'library': {
    icon: '📚',
    name: 'Digital Library',
    description: 'Our comprehensive library houses thousands of books, journals, and digital resources. With quiet study areas, group discussion rooms, and 24/7 access to online databases, it\'s the perfect place for academic research.'
  },
  'sports': {
    icon: '🏃‍♂️',
    name: 'Sports Complex',
    description: 'Our sports complex includes a gymnasium, outdoor courts, and recreational facilities. We promote physical fitness and sportsmanship through various activities and competitions.'
  },
  'graduation': {
    icon: '🎓',
    name: 'Graduation Ceremony',
    description: 'We celebrate our students\' achievements with memorable graduation ceremonies. Our alumni have gone on to successful careers in various industries, making us proud of their accomplishments.'
  }
};

// Show photo modal
function showPhotoModal(photoType) {
  currentPhoto = photoType;
  const photo = photoData[photoType];
  
  if (photo) {
    document.getElementById('photo-icon').textContent = photo.icon;
    document.getElementById('photo-name').textContent = photo.name;
    document.getElementById('photo-desc').textContent = photo.description;
    document.getElementById('photo-title').textContent = photo.name;
    
    photoModal.style.display = "flex";
    photoModal.setAttribute("aria-hidden", "false");
  }
}

// Close photo modal
function closePhotoModal() {
  photoModal.style.display = "none";
  photoModal.setAttribute("aria-hidden", "true");
  currentPhoto = null;
}

// Ask about facility
function askAboutFacility() {
  if (currentPhoto) {
    const photo = photoData[currentPhoto];
    const question = `Tell me about ${photo.name.toLowerCase()}`;
    
    // Close modal first
    closePhotoModal();
    
    // Set the question in search input
    userInput.value = question;
    
    // Trigger search
    handleUserInput();
  }
}

// Close modal when clicking outside
photoModal.addEventListener("click", (e) => {
  if (e.target === photoModal) {
    closePhotoModal();
  }
});

closePhotoModalBtn.addEventListener("click", closePhotoModal);

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && photoModal.style.display === "flex") {
    closePhotoModal();
  }
});

// Handle iframe loading
const collegeIframe = document.getElementById("college-iframe");
if (collegeIframe) {
  collegeIframe.addEventListener("load", () => {
    console.log("College website loaded successfully");
  });
  
  collegeIframe.addEventListener("error", () => {
    console.warn("Failed to load college website, using fallback background");
    document.getElementById("college-background").style.background = "linear-gradient(135deg, #0e1016 0%, #1a1b2e 100%)";
  });
}

// Results Modal Functionality
const resultsModal = document.getElementById("results-modal");
const closeResults = document.getElementById("close-results");

// Open results modal
function openResults() {
  resultsModal.style.display = "flex";
  resultsModal.setAttribute("aria-hidden", "false");
}

// Close results modal
function closeResultsModal() {
  resultsModal.style.display = "none";
  resultsModal.setAttribute("aria-hidden", "true");
}

// Close modal when clicking outside
resultsModal.addEventListener("click", (e) => {
  if (e.target === resultsModal) {
    closeResultsModal();
  }
});

closeResults.addEventListener("click", closeResultsModal);

// Tab functionality
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const tabName = button.getAttribute("data-tab");
    
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));
    
    // Add active class to clicked button and corresponding content
    button.classList.add("active");
    document.getElementById(tabName + "-results").classList.add("active");
  });
});

// Results functionality
document.getElementById("view-semester-results").addEventListener("click", viewSemesterResults);
document.getElementById("view-backlog-results").addEventListener("click", viewBacklogResults);
document.getElementById("view-overall-results").addEventListener("click", viewOverallResults);
document.getElementById("view-jntuh-results").addEventListener("click", viewJNTUHResults);

function viewSemesterResults() {
  const studentId = document.getElementById("student-id").value.trim();
  const semester = document.getElementById("semester").value;
  
  if (!studentId || !semester) {
    alert("Please enter both Hall Ticket Number and select a semester.");
    return;
  }
  
  // Redirect to official CSI WITS results portal
  const resultsUrl = `https://wesleyengineeringcollege.com/results.csiwits/multiple-results`;
  
  // Show loading message
  const display = document.getElementById("semester-display");
  display.innerHTML = `
    <div class="result-card">
      <h5>🔄 Redirecting to Official Results Portal</h5>
      <p>Taking you to the official CSI WITS results portal...</p>
      <p><strong>Hall Ticket No:</strong> ${studentId}</p>
      <p><strong>Semester:</strong> ${semester}</p>
      <p>Please wait while we redirect you to the official results page.</p>
    </div>
  `;
  display.classList.add("show");
  
  // Redirect after a short delay
  setTimeout(() => {
    window.open(resultsUrl, '_blank');
  }, 2000);
}

function viewBacklogResults() {
  const studentId = document.getElementById("backlog-student-id").value.trim();
  
  if (!studentId) {
    alert("Please enter your Hall Ticket Number.");
    return;
  }
  
  // Redirect to official CSI WITS results portal
  const resultsUrl = `https://wesleyengineeringcollege.com/results.csiwits/multiple-results`;
  
  // Show loading message
  const display = document.getElementById("backlog-display");
  display.innerHTML = `
    <div class="result-card">
      <h5>🔄 Redirecting to Official Results Portal</h5>
      <p>Taking you to the official CSI WITS results portal...</p>
      <p><strong>Hall Ticket No:</strong> ${studentId}</p>
      <p><strong>Checking:</strong> Backlog Status</p>
      <p>Please wait while we redirect you to the official results page.</p>
    </div>
  `;
  display.classList.add("show");
  
  // Redirect after a short delay
  setTimeout(() => {
    window.open(resultsUrl, '_blank');
  }, 2000);
}

function viewOverallResults() {
  const studentId = document.getElementById("overall-student-id").value.trim();
  
  if (!studentId) {
    alert("Please enter your Hall Ticket Number.");
    return;
  }
  
  // Redirect to official CSI WITS results portal
  const resultsUrl = `https://wesleyengineeringcollege.com/results.csiwits/multiple-results`;
  
  // Show loading message
  const display = document.getElementById("overall-display");
  display.innerHTML = `
    <div class="result-card">
      <h5>🔄 Redirecting to Official Results Portal</h5>
      <p>Taking you to the official CSI WITS results portal...</p>
      <p><strong>Hall Ticket No:</strong> ${studentId}</p>
      <p><strong>Checking:</strong> Overall Performance</p>
      <p>Please wait while we redirect you to the official results page.</p>
    </div>
  `;
  display.classList.add("show");
  
  // Redirect after a short delay
  setTimeout(() => {
    window.open(resultsUrl, '_blank');
  }, 2000);
}

function viewJNTUHResults() {
  const studentId = document.getElementById("jntuh-student-id").value.trim();
  
  if (!studentId) {
    alert("Please enter your Hall Ticket Number.");
    return;
  }
  
  // Redirect to official JNTUH results portal
  const jntuhResultsUrl = `http://results.jntuh.ac.in/`;
  
  // Show loading message
  const display = document.getElementById("jntuh-display");
  display.innerHTML = `
    <div class="result-card">
      <h5>🔄 Redirecting to JNTUH Results Portal</h5>
      <p>Taking you to the official JNTUH results portal...</p>
      <p><strong>Hall Ticket No:</strong> ${studentId}</p>
      <p><strong>Portal:</strong> Jawaharlal Nehru Technological University Hyderabad</p>
      <p>Please wait while we redirect you to the official JNTUH results page.</p>
    </div>
  `;
  display.classList.add("show");
  
  // Redirect after a short delay
  setTimeout(() => {
    window.open(jntuhResultsUrl, '_blank');
  }, 2000);
}

// Generate sample results data
function generateSemesterResults(studentId, semester) {
  const subjects = [
    { name: "Mathematics", grade: "A+", credits: 4, points: 10 },
    { name: "Physics", grade: "A", credits: 4, points: 9 },
    { name: "Chemistry", grade: "B+", credits: 3, points: 8 },
    { name: "Programming", grade: "A+", credits: 3, points: 10 },
    { name: "English", grade: "A", credits: 2, points: 9 }
  ];
  
  let html = `
    <div class="result-card">
      <h5>📊 Semester ${semester} Results - Student ID: ${studentId}</h5>
      <p><strong>Semester GPA:</strong> 9.2 <span class="grade-badge">Excellent</span></p>
      <p><strong>Total Credits:</strong> 16</p>
      <p><strong>Status:</strong> <span class="success-badge">Passed</span></p>
    </div>
    <div class="result-card">
      <h5>📚 Subject-wise Results</h5>
  `;
  
  subjects.forEach(subject => {
    html += `
      <p><strong>${subject.name}:</strong> ${subject.grade} (${subject.credits} credits) <span class="grade-badge">${subject.points}/10</span></p>
    `;
  });
  
  html += `</div>`;
  return html;
}

function generateBacklogResults(studentId) {
  const backlogs = [
    { subject: "Mathematics", semester: "1st", attempts: 1 },
    { subject: "Physics Lab", semester: "2nd", attempts: 2 }
  ];
  
  let html = `
    <div class="result-card">
      <h5>📋 Backlog Status - Student ID: ${studentId}</h5>
      <p><strong>Total Backlogs:</strong> ${backlogs.length} <span class="backlog-badge">${backlogs.length} Pending</span></p>
      <p><strong>Overall Status:</strong> <span class="backlog-badge">Has Backlogs</span></p>
    </div>
    <div class="result-card">
      <h5>📚 Backlog Details</h5>
  `;
  
  if (backlogs.length === 0) {
    html += `<p><span class="success-badge">No Backlogs</span> - All subjects cleared!</p>`;
  } else {
    backlogs.forEach(backlog => {
      html += `
        <p><strong>${backlog.subject}:</strong> ${backlog.semester} Semester (${backlog.attempts} attempt${backlog.attempts > 1 ? 's' : ''}) <span class="backlog-badge">Pending</span></p>
      `;
    });
  }
  
  html += `</div>`;
  return html;
}

function generateOverallResults(studentId) {
  const semesters = [
    { sem: "1st", gpa: 8.5, credits: 20, status: "Passed" },
    { sem: "2nd", gpa: 8.8, credits: 20, status: "Passed" },
    { sem: "3rd", gpa: 9.1, credits: 20, status: "Passed" },
    { sem: "4th", gpa: 8.9, credits: 20, status: "Passed" }
  ];
  
  const overallGPA = 8.8;
  const totalCredits = 80;
  
  let html = `
    <div class="result-card">
      <h5>🎓 Overall Performance - Student ID: ${studentId}</h5>
      <p><strong>Overall CGPA:</strong> ${overallGPA}/10 <span class="grade-badge">Good</span></p>
      <p><strong>Total Credits Completed:</strong> ${totalCredits}</p>
      <p><strong>Overall Status:</strong> <span class="success-badge">On Track</span></p>
    </div>
    <div class="result-card">
      <h5>📈 Semester-wise Performance</h5>
  `;
  
  semesters.forEach(sem => {
    html += `
      <p><strong>${sem.sem} Semester:</strong> GPA ${sem.gpa} (${sem.credits} credits) <span class="success-badge">${sem.status}</span></p>
    `;
  });
  
  html += `</div>`;
  return html;
}

// Send message
sendBtn.onclick = () => handleUserInput();
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") handleUserInput();
});

function handleUserInput() {
  const text = userInput.value.trim();
  if (!text) return;
  
  // Disable input while processing
  userInput.disabled = true;
  sendBtn.disabled = true;
  
  // Show results area
  chatResults.style.display = "block";
  
  // Add user query
  addMessage(text, "user-msg");
  userInput.value = "";

  // Show typing animation
  const typing = document.createElement("div");
  typing.className = "bot-msg typing-indicator";
  typing.innerHTML = '<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>';
  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;

  // Simulate AI response delay
  setTimeout(() => {
    typing.remove();
    const botReply = getBotReply(text);
    addMessage(botReply, "bot-msg");
    
    // Re-enable input
    userInput.disabled = false;
    sendBtn.disabled = false;
    userInput.focus();
  }, 1000);
}

// Display message in chat
function addMessage(message, className) {
  const msgDiv = document.createElement("div");
  msgDiv.className = className;
  msgDiv.innerHTML = message;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Comprehensive AI replies based on official college website
function getBotReply(input) {
  const msg = input.toLowerCase();

  if (msg.includes("course") || msg.includes("department") || msg.includes("program")) {
    return "<h4>📚 CSI WESLEY INSTITUTE OF TECHNOLOGY AND SCIENCES</h4><p><strong>Approved by AICTE and Affiliated to JNTUH</strong></p><p><strong>EAMCET Code:</strong> WESL | <strong>ECET Code:</strong> WESL</p><p>Choose Your Courses & Master Your Skills! Start your career with:</p><p>• <strong>Computer Science Engineering (CSE)</strong><br>• <strong>Electronics & Communication Engineering (ECE)</strong><br>• <strong>Electrical & Electronics Engineering (EEE)</strong><br>• <strong>Civil Engineering</strong><br>• <strong>Mechanical Engineering</strong></p><p>All courses are affiliated with Jawaharlal Nehru Technological University (JNTU), Hyderabad and recognized by Government of Telangana.</p>";
  }
  
  if (msg.includes("admission") || msg.includes("apply") || msg.includes("2024")) {
    return "<h4>🎓 Admission 2024 - Your Journey to Success Starts at CSIWITS</h4><p><strong>Admission Process:</strong></p><p>• <strong>TS EAMCET</strong> - State-level entrance exam (Code: WESL)<br>• <strong>ECET</strong> - Engineering Common Entrance Test (Code: WESL)<br>• <strong>Management Quota</strong> - Direct admission</p><p><strong>Apply Now:</strong> <a href='https://wesleyengineeringcollege.com/' target='_blank'>wesleyengineeringcollege.com</a></p><p><strong>Contact for Admissions:</strong><br>📞 Phone: 040-27818137<br>📧 Email: principalxu1@gmail.com</p>";
  }
  
  if (msg.includes("location") || msg.includes("where") || msg.includes("address")) {
    return "<h4>📍 College Location & Contact</h4><p><strong>Address:</strong> 1-7-132/142, P.G Road, Near Paradise, Secunderabad-500003, Telangana, India</p><p><strong>Contact Details:</strong><br>📞 Phone: 040-27818137<br>📧 Email: principalxu1@gmail.com</p><p><strong>Working Hours:</strong><br>• Mon-Tues: 9:00 AM - 5:00 PM<br>• Wed-Thur: 9:00 AM - 5:00 PM<br>• Fri-Sat: 9:00 AM - 5:30 PM<br>• Sunday: Closed</p>";
  }
  
  if (msg.includes("placement") || msg.includes("career") || msg.includes("job")) {
    return "<h4>💼 Placement & Career Opportunities</h4><p>Our dedicated placement cell provides excellent career opportunities:</p><p>• <strong>Industry Partnerships:</strong> Strong connections with leading companies<br>• <strong>Career Counseling:</strong> Professional guidance and support<br>• <strong>Mock Interviews:</strong> Interview preparation sessions<br>• <strong>Industrial Tours:</strong> Real-world industry exposure<br>• <strong>Live Projects:</strong> Hands-on experience with industry projects</p><p>Our alumni are highly placed globally in IT and Corporate Sectors.</p>";
  }
  
  if (msg.includes("facility") || msg.includes("campus") || msg.includes("infrastructure") || msg.includes("lab")) {
    return "<h4>🏫 Campus Facilities & Labs</h4><p><strong>Modern Labs Available:</strong></p><p>• <strong>Computer Lab</strong> - Advanced computing facilities<br>• <strong>ELCS and ALCS Lab</strong> - Communication skills lab<br>• <strong>Engineering Workshop</strong> - Practical engineering training<br>• <strong>BEE Lab</strong> - Basic Electrical Engineering lab<br>• <strong>Chemistry Lab</strong> - Chemical analysis and experiments<br>• <strong>Physics Lab</strong> - Physics experiments and research<br>• <strong>IT Workshop</strong> - Information Technology training</p><p><strong>Additional Facilities:</strong> Library, Digital Classrooms, Sports Complex, Wi-Fi Campus</p>";
  }
  
  if (msg.includes("about") || msg.includes("college") || msg.includes("history")) {
    return "<h4>🏛️ About CSI WESLEY</h4><p><strong>Established:</strong> 2015</p><p>CSI WITS is one of the premier engineering colleges in Telangana, sponsored by <strong>CHURCH OF SOUTH INDIA MEDAK DIOCESE</strong>, well-known in Hyderabad for running various educational institutions of repute for the past 100 years.</p><p><strong>Approvals & Affiliations:</strong><br>• Approved by All India Council for Technical Education (AICTE), New Delhi<br>• Affiliated to Jawaharlal Nehru Technological University (JNTU), Hyderabad<br>• Recognized by Government of Telangana</p>";
  }
  
  if (msg.includes("vision") || msg.includes("mission") || msg.includes("values")) {
    return "<h4>🎯 Vision, Mission & Values</h4><p><strong>VISION:</strong><br>To be a Value-based Globally Recognized Institution ensuring academic excellence and fostering Research, Innovation and Entrepreneurial Attitude.</p><p><strong>MISSION:</strong><br>To engage students of uncommon promise in an intense full-time education of their minds, exploration of their creative faculties, and development of their social and leadership abilities in a four-year course of study.</p><p><strong>CORE VALUES (S T E E R):</strong><br>• <strong>S</strong>trength<br>• <strong>T</strong>ruth<br>• <strong>E</strong>ndurance<br>• <strong>E</strong>thics<br>• <strong>R</strong>everence for All</p>";
  }
  
  if (msg.includes("director") || msg.includes("principal") || msg.includes("leadership")) {
    return "<h4>👨‍💼 College Leadership</h4><p><strong>DIRECTOR:</strong><br>Dr. B VIMAL SUKUMAR<br>B.Com(Honours), MBA, LLB, M.Com, M.Phil, Ph.D</p><p><strong>PRINCIPAL:</strong><br>Dr. P M YOHAN<br>MCA, MBA, M.Tech, Ph.D</p><p><strong>Quote from Principal:</strong><br>\"FEAR OF THE LORD IS BEGINNING OF WISDOM\"</p><p>Our leadership team focuses on providing quality education and professional development opportunities for students.</p>";
  }
  
  if (msg.includes("result") || msg.includes("grade") || msg.includes("marks") || msg.includes("gpa") || msg.includes("semester")) {
    return "<h4>📊 Student Results Portals - CSI WITS & JNTUH</h4><p><strong>Available Results Portals:</strong></p><p><strong>🏫 CSI WITS Results Portal:</strong><br>• <strong>Multiple Results</strong> - View all semester results<br>• <strong>Hall Ticket Entry</strong> - Enter your hall ticket number<br>• <strong>Real-time Results</strong> - Direct access to official results<br>• <strong>Regulation Support</strong> - R18 and R22 students</p><p><strong>🎓 JNTUH Results Portal:</strong><br>• <strong>Official University Results</strong> - JNTUH affiliated results<br>• <strong>All Regulations</strong> - R16, R18, R22 support<br>• <strong>Comprehensive Results</strong> - University-level result access</p><p><strong>Quick Access Links:</strong><br>• <a href='https://wesleyengineeringcollege.com/results.csiwits/multiple-results' target='_blank'>CSI WITS Results Portal</a><br>• <a href='http://results.jntuh.ac.in/' target='_blank'>JNTUH Results Portal</a></p><p><button onclick='openResults()' style='background: #888; color: #fff; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; margin: 10px 0;'>View CSI WITS Results Portal</button></p>";
  }
  
  if (msg.includes("jntuh") || msg.includes("university") || msg.includes("affiliated")) {
    return "<h4>🎓 JNTUH - Jawaharlal Nehru Technological University Hyderabad</h4><p><strong>CSI WESLEY is Affiliated to JNTUH</strong></p><p><strong>JNTUH Information:</strong><br>• <strong>Official University</strong> - Jawaharlal Nehru Technological University<br>• <strong>Affiliation</strong> - CSI WESLEY is officially affiliated to JNTUH<br>• <strong>Regulations</strong> - R16, R18, R22 curriculum support<br>• <strong>Results Portal</strong> - Official university results system</p><p><strong>Access JNTUH Results:</strong><br><a href='http://results.jntuh.ac.in/' target='_blank' style='background: #888; color: #fff; padding: 8px 16px; border-radius: 6px; text-decoration: none; display: inline-block; margin: 5px 0;'>JNTUH Results Portal</a></p><p><strong>University Website:</strong> <a href='https://jntuh.ac.in/' target='_blank'>jntuh.ac.in</a></p>";
  }

  if (msg.includes("library") || msg.includes("academics") || msg.includes("gallery")) {
    return "<h4>📚 Academic Resources</h4><p><strong>Available Resources:</strong></p><p>• <strong>Library</strong> - Digital library with extensive resources<br>• <strong>Gallery</strong> - College photos and events<br>• <strong>Academics</strong> - Academic information and resources<br>• <strong>Admin Login</strong> - Administrative access</p><p><strong>Quick Links:</strong><br>• Multiple Results<br>• Latest Results<br>• Gallery<br>• Library Access</p>";
  }
  
  if (msg.includes("aicte") || msg.includes("approval") || msg.includes("grievance")) {
    return "<h4>📋 AICTE Information</h4><p><strong>AICTE Section Includes:</strong></p><p>• <strong>Disclosures</strong> - Official college disclosures<br>• <strong>Approvals</strong> - AICTE approval documents<br>• <strong>Grievance</strong> - Grievance redressal system</p><p><strong>College Status:</strong> Approved by All India Council for Technical Education (AICTE), New Delhi</p>";
  }
  
  if (msg.includes("contact") || msg.includes("phone") || msg.includes("email")) {
    return "<h4>📞 Contact Information</h4><p><strong>College Address:</strong><br>1-7-132/142, P.G Road, Near Paradise<br>Secunderabad-500003, Telangana, India</p><p><strong>Contact Details:</strong><br>📞 Phone: 040-27818137<br>📧 Email: principalxu1@gmail.com</p><p><strong>Working Hours:</strong><br>• Mon-Tues: 9:00 AM - 5:00 PM<br>• Wed-Thur: 9:00 AM - 5:00 PM<br>• Fri-Sat: 9:00 AM - 5:30 PM<br>• Sunday: Closed</p><p><strong>Website:</strong> <a href='https://wesleyengineeringcollege.com/' target='_blank'>wesleyengineeringcollege.com</a></p>";
  }
  
  if (msg.includes("hi") || msg.includes("hello") || msg.includes("welcome")) {
    return "<h4>👋 Welcome to CSI WESLEY AI Assistant</h4><p>Hello! I'm your virtual assistant for <strong>CSI WESLEY INSTITUTE OF TECHNOLOGY AND SCIENCES</strong>.</p><p><strong>I can help you with:</strong></p><p>• 📚 Course information and programs<br>• 🎓 Admission process for 2024<br>• 🏫 Campus facilities and labs<br>• 📊 Student results and grades<br>• 📞 Contact information<br>• 🎯 Vision, mission, and values<br>• 👨‍💼 College leadership details<br>• 📋 AICTE information</p><p><strong>What would you like to know about our college?</strong></p>";
  }

  // Default reply with comprehensive information
  return "<h4>🔍 Search Results</h4><p>I can help you with comprehensive information about <strong>CSI WESLEY INSTITUTE OF TECHNOLOGY AND SCIENCES</strong>:</p><p><strong>Quick Information:</strong><br>• <strong>Established:</strong> 2015<br>• <strong>Approved by:</strong> AICTE, New Delhi<br>• <strong>Affiliated to:</strong> JNTU Hyderabad<br>• <strong>EAMCET Code:</strong> WESL<br>• <strong>ECET Code:</strong> WESL</p><p><strong>Contact:</strong><br>📞 040-27818137 | 📧 principalxu1@gmail.com<br>🌐 <a href='https://wesleyengineeringcollege.com/' target='_blank'>wesleyengineeringcollege.com</a></p><p>Try asking about: courses, admission, facilities, results, or contact information!</p>";
}
