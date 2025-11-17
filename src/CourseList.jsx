import React from "react";

// This component receives three props: the list data, the delete function, and the toggle function.
function CourseList({ courses, onDelete, onToggle }) {
  return (
    <ul>
      {courses.map((course) => (
        <li
          key={course.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textDecoration: course.isCompleted ? "line-through" : "none",
            padding: "10px",
            borderBottom: "1px solid #eee",
          }}
        >
          {/* Course Information (Clickable to Toggle Completion) */}
          <span
            onClick={() => onToggle(course.id)} // Calls the prop function
            style={{ cursor: "pointer", flexGrow: 1 }}
          >
            {course.code} – {course.text}
          </span>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(course.id)} // Calls the prop function
            style={{
              marginLeft: "20px",
              padding: "5px 10px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CourseList;
