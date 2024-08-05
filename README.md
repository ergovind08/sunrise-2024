Project Documentation for Sunrise 2024 Taskboard System
1. Project Overview
Description: Provide a brief overview of the Taskboard System, its purpose, and its significance in managing tasks for employees.
Key Features:
Sequential task management
Auto-initialization of tasks
API endpoints for task management
2. Getting Started
Installation Instructions:
Clone the repository.
Navigate to the web folder.
Run the development server with the appropriate command.
bash
Copy code
cd web
npm run dev
Accessing the Application: Mention that the application can be accessed at http://localhost:3000.
3. Functional Requirements
Sequential Task Generation: Explain how tasks are unlocked sequentially and the requirement to complete all tasks in a group before accessing the next.
Auto-Initialization: Describe how the first task is auto-created upon initialization.
Task Management Features:
Viewing active tasks
Marking tasks as completed
4. API Endpoints
List the implemented API endpoints, their purposes, and examples of how to use them.
Get Active Tasks: GET /api/tasks/active
Get All Tasks: GET /api/tasks
Get Completed Tasks: GET /api/tasks/completed
Create New Task: POST /api/tasks
Update Task: PUT /api/tasks/:id
Delete Task: DELETE /api/tasks/:id
5. UI Implementation
Design Framework: Mention that you used Material-UI (or Ant Design) for UI development.
Screenshots: Include screenshots of the application’s UI at various stages, such as:
Task list view
Task details view
Completed tasks view
Enhancements: Highlight any UI enhancements you made beyond the original design.
6. Code Structure and Design Patterns
Project Structure: Briefly describe the directory structure, focusing on where the main logic and components are located.
Design Patterns: Mention any design patterns or principles you implemented, such as MVC, SOLID principles, etc.
7. Testing
Test Cases: Describe how you wrote unit tests and any other tests, along with the command used to run them.
bash
Copy code
npm run test
8. Conclusion
Summarize the project and any challenges you faced, along with how you overcame them.
Mention future improvements or features that could be added.
9. Pull Request Information
Branch Naming: State the naming convention you used for your branch.
PR Description: Provide a brief overview of what your PR includes, any important details, and a link to the PR.
Screenshots and Videos: Ensure that all relevant UI screenshots and any videos/GIFs showcasing functionality are attached.
Tips for Writing
Use clear and concise language.
Break up text with bullet points and sections for easy readability.
Make sure images are well-labeled and have captions explaining what they show.
Example Screenshot Section
markdown
Copy code
#### UI Screenshots
- **Active Tasks View**:
![Active Tasks](path/to/active-tasks-screenshot.png)

- **Completed Tasks View**:
![Completed Tasks](path/to/completed-tasks-screenshot.png)
