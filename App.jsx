import { useState } from "react";
import CourseList from "./CourseList"; // 1. Import the Child Component
import "./App.css";

// --- 1. Define Initial Data Models ---

// Initial Core Courses (Starts in the student's plan)
const initialCourses = [
  { id: 103, code: "CNIT 103", text: "Hardware", isCompleted: false },
  {
    id: 131,
    code: "CNIT 131",
    text: "Internet & Intro to HTML, CSS",
    isCompleted: false,
  },
  {
    id: 106,
    code: "CNIT 106",
    text: "Introduction to Networks",
    isCompleted: false,
  },
  { id: 120, code: "CNIT 120", text: "Network Security", isCompleted: false },
];

// Available Courses (Used for the Drop-down Box - Extra Credit)
const availableCourses = [
  { id: 132, code: "CNIT 132", text: "Intermediate HTML & CSS" },
  { id: 133, code: "CNIT 133", text: "JavaScript, jQuery, AXAX" },
  { id: 1321, code: "CNIT 132A", text: "Advanced HTML & CSS" },
  { id: 1331, code: "CNIT 133A", text: "JavaScript Libraries/Frameworks" },
  { id: 1332, code: "CNIT 133M", text: "Mobile Web Dev with HTML, CSS, JS" },
  { id: 1311, code: "CNIT 131A", text: "XML & JSON" },
];

function App() {
  // State 1: Manages the student's current course plan (the list)
  const [courses, setCourses] = useState(initialCourses);

  // State 2: Manages which course is currently selected in the drop-down box
  const [selectedCourseId, setSelectedCourseId] = useState(
    availableCourses[0].id
  );

  // --- 2. Logic for Adding Courses ---
  const addCourse = () => {
    const courseToAdd = availableCourses.find((c) => c.id === selectedCourseId);
    const courseExists = courses.some((c) => c.id === selectedCourseId);

    if (!courseToAdd || courseExists) {
      if (courseExists) {
        alert("This course is already in your plan!");
      }
      return;
    }

    const newCourse = {
      ...courseToAdd,
      isCompleted: false,
    };

    setCourses([...courses, newCourse]);
  };

  // --- 3. Logic for Deleting Courses (Passed as a Prop) ---
  const deleteCourse = (courseId) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);
  };

  // --- 4. Logic for Toggling Completion (Passed as a Prop) ---
  const toggleComplete = (courseId) => {
    const updatedCourses = courses.map((course) => {
      if (course.id === courseId) {
        return { ...course, isCompleted: !course.isCompleted };
      }
      return course;
    });

    setCourses(updatedCourses);
  };

  // --- 5. JSX Rendering and Prop Passing ---
  return (
    <div className="course-planner">
      <h1>CNIT AS Degree Course Planner</h1>

      {/* Message: Displays the state count */}
      <p style={{ fontWeight: "bold" }}>
        {courses.length} courses listed in your plan.
      </p>

      {/* Drop-down Box and Add Button */}
      <div className="add-course-group" style={{ marginBottom: "20px" }}>
        <label htmlFor="course-select">Add Course:</label>
        <select
          id="course-select"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(parseInt(e.target.value))}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          {availableCourses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.code} - {course.text}
            </option>
          ))}
        </select>
        <button onClick={addCourse}>Add to Plan</button>
      </div>

      {/* --- RENDER CHILD COMPONENT & PASS PROPS --- */}
      <CourseList
        courses={courses} // Prop 1: Passes the list data (State)
        onDelete={deleteCourse} // Prop 2: Passes the handler function
        onToggle={toggleComplete} // Prop 3: Passes the handler function
      />
    </div>
  );
}

export default App;
