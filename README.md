# AI Chatbot API with NestJS + OpenAI

This project is a **demonstrative API** that integrates OpenAI's GPT models with a custom chatbot manager built using **NestJS**. It was designed as a hands-on way to practice:

- **Prompt engineering** techniques learned in the course [ChatGPT Prompt Engineering for Developers by OpenAI & DeepLearning.AI](https://learn.deeplearning.ai/accomplishments/549bb202-0307-4984-b2e9-26cbd645d3a3?usp=sharing)
- Clean architecture principles: **DDD (Domain-Driven Design)** and **SOLID**
- Real-world NestJS skills including interfaces, dependency injection, and modular design

---

## 📌 Project Purpose

The primary goal is to:
- Demonstrate integration with OpenAI's `gpt-3.5-turbo` model
- Manage **multiple chatbots**, each with a custom base prompt and isolated conversations
- Practice designing scalable and maintainable backend applications using NestJS

This is a backend-only project with **no frontend**, intended for API usage or demonstration via tools like Postman or Curl.

---

## ⚙️ How it Works

The system allows the creation of **custom chatbots**, each with its own identity and behavior defined by a base prompt.

### Main Features:
- `POST /bots`: Create a new chatbot with a custom name and base prompt
- `GET /bots`: List all created bots and the number of chats each has
- `POST /bots/:id/chat`: Start a new chat with a bot and receive a greeting
- `PATCH /bots/:id/chat/:chatId`: Send a message and receive the bot's response
- `DELETE /bots/:id`: Delete a bot and all its associated chats

Each conversation is limited to **5 minutes of interaction**, after which the bot stops responding and ends the session.

---

## 🧱 Architecture

The project follows a clean layered structure:

- **Domain Layer**: Pure business logic (entities, interfaces, etc.)
- **Application Layer**: Use cases and services orchestrating domain behavior
- **Infrastructure Layer**: In-memory repositories and external providers (OpenAI)
- **Presentation Layer**: REST controllers

The architecture respects **SOLID principles**, especially:
- **Dependency Inversion**: Application depends on abstractions (`IProviderIA`), not concrete OpenAI SDK
- **Single Responsibility**: Each layer/component has one well-defined job

---

## 🗃️ Persistence

This project uses **in-memory storage** only, via `Map` and `Array` structures.  
This choice keeps the system self-contained, lightweight, and ideal for demos or educational usage.

If needed, persistence can easily be extended using PostgreSQL, MongoDB, Redis, or any other backend, as all logic is decoupled from storage.

---

## 🚀 How to Use

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. Start the server:

   ```bash
   npm run start:dev
   ```

4. Use [Postman](https://www.postman.com/) or similar tool to call the API.  
   A ready-to-use Postman collection is included:  
   `Chatbot_API_Mexican_History.postman_collection.json`

---

## 🧪 Example Use Case

This repo includes a sample chatbot with a simple example about the **Mexican History**.  
You can ask about historical figures like Hernán Cortés, Iturbide, or Conín, and receive precise, contextual answers of up to 150 words.

---

## 🧠 Key Learnings

- Prompt design and control using OpenAI's chat completions API
- DDD structure and modular design in NestJS
- Interface-based architecture for AI provider abstraction
- Chat lifecycle control (timeout, greeting, memory)

---

## 📂 TODO / Ideas

- Add persistent database
- Store conversation history
- Add role-based authentication to manage bots
- UI frontend (React or Angular) to interact with chatbots

---

## License

MIT License.
