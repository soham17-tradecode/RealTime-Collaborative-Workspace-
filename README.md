# RealTime Collaborative IDE

A full-stack **real-time collaborative coding platform** where multiple
users can join the same room, work with code files, communicate through
team chat, run programs, and use an integrated AI programming assistant.

## 🚀 Features

-   👥 Real-time multi-user collaboration
-   🔑 Room-based collaboration using a unique room code
-   💻 Monaco-based online code editor
-   📁 File explorer and multiple editor tabs
-   📡 Real-time user presence
-   💬 Team chat
-   ▶️ Code execution for Java, Python, C, and C++
-   🛑 Stop running programs
-   ⌨️ Program input and terminal output
-   🤖 AI programming assistant using Spring AI + Groq
-   💾 File saving with `Ctrl + S`
-   🗄️ PostgreSQL database
-   ⚡ Redis for fast data/supporting real-time functionality
-   🐳 Docker and Docker Compose support
-   🔐 Environment-variable based secret configuration

## 🏗️ Project Structure

``` text
RealProject/
│
├── Backend/
│   ├── src/
│   ├── build.gradle
│   ├── settings.gradle
│   ├── gradlew
│   ├── gradlew.bat
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## 🔧 Technology Stack

### Frontend

-   React
-   JavaScript
-   CSS
-   Vite
-   Monaco Editor
-   WebSocket/STOMP

### Backend

-   Java
-   Spring Boot
-   Spring Web
-   Spring WebSocket
-   STOMP
-   Spring Data JPA
-   Spring Data Redis
-   Spring AI
-   Gradle

### Infrastructure

-   PostgreSQL
-   Redis
-   Docker
-   Docker Compose
-   Linux

### AI

-   Spring AI
-   Groq API
-   OpenAI-compatible API

## 🏛️ High-Level Architecture

``` text
                    ┌─────────────────────┐
                    │      Browser        │
                    │   React Frontend    │
                    └──────────┬──────────┘
                               │
                     HTTP / WebSocket / STOMP
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Spring Boot API   │
                    │       Backend       │
                    └──────┬──────┬───────┘
                           │      │
              ┌────────────┘      └────────────┐
              ▼                                ▼
      ┌───────────────┐                ┌───────────────┐
      │  PostgreSQL   │                │     Redis     │
      │    Database   │                │ Cache / RT    │
      └───────────────┘                └───────────────┘
                           │
                           ▼
                    ┌───────────────┐
                    │  Groq / AI    │
                    │  Spring AI    │
                    └───────────────┘
```

## 📋 Prerequisites

Install:

-   Java 17+ or the version configured by the project
-   Node.js and npm
-   Git
-   Docker Desktop
-   PostgreSQL
-   Redis

PostgreSQL and Redis can be run through Docker if configured in
`docker-compose.yml`.

## 🔐 Environment Variables

**Never commit API keys, passwords, JWT secrets, or other credentials to
GitHub.**

Example local environment configuration:

``` env
AI_API_KEY=your_groq_api_key

SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/your_database
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your_password

SPRING_DATA_REDIS_HOST=localhost
SPRING_DATA_REDIS_PORT=6379
```

Keep `.env` in `.gitignore`.

For the Groq integration, the Spring configuration can use:

``` properties
spring.ai.openai.api-key=${AI_API_KEY}
spring.ai.openai.base-url=https://api.groq.com/openai/v1
spring.ai.openai.chat.model=openai/gpt-oss-20b
```

## ▶️ Run the Backend

Open a terminal in the backend directory:

``` bash
cd Backend
```

Windows:

``` bash
gradlew.bat bootRun
```

Linux/macOS:

``` bash
./gradlew bootRun
```

## ▶️ Run the Frontend

Open another terminal:

``` bash
cd frontend
npm install
npm run dev
```

The Vite development server will normally be available at:

``` text
http://localhost:5173
```

## 🐳 Docker

From the directory containing the Compose file:

``` bash
docker compose up --build
```

Stop containers:

``` bash
docker compose down
```

## 🔄 How the Application Works

1.  A user creates or enters a room.
2.  The application provides a room code.
3.  Other users join using the same room code.
4.  The React frontend connects to the Spring Boot backend.
5.  WebSocket/STOMP handles real-time collaboration events.
6.  The Members panel displays users and their current activity.
7.  Users can open and edit files in Monaco Editor.
8.  Team members can communicate through chat.
9.  Code can be submitted for execution.
10. Execution results are displayed in the terminal.
11. The AI assistant handles programming-related questions.

## 👥 Presence System

The Members panel can show states such as:

-   🟢 Online
-   💬 Chatting
-   👀 Viewing a file
-   📝 Editing a file
-   ⌨️ Typing
-   🟢 Idle

The room code is displayed directly from the frontend room state, so it
does not require an additional backend request just to display it.

## 💻 Code Execution

The application supports:

  Language   Extension
  ---------- -----------
  Java       `.java`
  Python     `.py`
  C++        `.cpp`
  C          `.c`

The workflow is:

``` text
Select File
    ↓
Choose Run
    ↓
Send Code + Language + Input
    ↓
Backend Executes Program
    ↓
Poll Execution Status
    ↓
Display Output / Error
```

## 🤖 AI Assistant

The project contains an AI programming assistant integrated through
Spring AI and Groq.

Possible use cases:

-   Explain code
-   Answer programming questions
-   Help debug errors
-   Suggest implementations
-   Assist developers while coding

## 📁 Backend Structure

``` text
Backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── RealTimeCollaboration/
│   │   │           └── RealTime/
│   │   │               ├── controller/
│   │   │               ├── DTOs/
│   │   │               └── ...
│   │   └── resources/
│   │       └── application.properties
│   │
│   └── test/
│
├── build.gradle
├── settings.gradle
├── gradlew
├── gradlew.bat
├── Dockerfile
└── docker-compose.yml
```

## 📁 Frontend Structure

Important frontend areas include:

``` text
frontend/src/
├── Editor/
│   ├── MonacoEditorPanel
│   ├── RunControls
│   ├── StatusBar
│   └── TerminalPanel
│
├── FileExplorer/
├── Api/
├── stomp/
├── components/
└── ...
```

Main UI features:

-   Code editor
-   File explorer
-   Members panel
-   Room code
-   Team chat
-   AI assistant
-   Program input
-   Terminal/output
-   Run/Stop controls

## 🔄 Git Workflow

After making changes:

``` bash
git status
git add -A
git commit -m "Describe your changes"
git push
```

To download changes from GitHub:

``` bash
git pull
```

Before pushing, check that `.env` is not staged:

``` bash
git status
```

Typical development cycle:

``` text
Write Code
    ↓
Run Frontend + Backend
    ↓
Test Feature
    ↓
git status
    ↓
git add -A
    ↓
git commit -m "Add feature"
    ↓
git push
```

## 🎯 Future Improvements

Planned/possible improvements:

-   👤 User accounts and profiles
-   🧩 API Gateway
-   🔗 Microservice architecture
-   📁 Persistent collaborative file storage
-   🔄 Advanced real-time code synchronization
-   🧠 RAG-based AI assistant using project documentation
-   🧪 Automated tests
-   ⚙️ CI/CD pipeline
-   ☁️ Cloud deployment
-   📊 Monitoring and centralized logging
-   🔒 Role-based room permissions

## 🎓 Project Goal

This project combines modern full-stack and backend technologies into
one practical application:

**Java + Spring Boot + React + WebSocket/STOMP + PostgreSQL + Redis +
Docker + Linux + AI + Git/GitHub**

It is intended as a learning, portfolio, and practical
software-engineering project.

## 📄 License

This project is currently intended for educational and portfolio
purposes.
