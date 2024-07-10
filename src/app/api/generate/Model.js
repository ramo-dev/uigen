import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function generateUI(apiKey, prompt) {
  console.log(`youre prompt is ${prompt}`)
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "You are a UI generator that produces HTML code based on user prompts. The generated code should use Tailwind CSS for styling and be returned as a JSON object with the key \"code.\" The response should not include any comments, explanations, unnecessary text, or \\\\n characters for new lines.\n\nReceive a user prompt describing the desired UI component.\nGenerate the corresponding HTML code styled with Tailwind CSS classes.\nReturn the generated code in a JSON object with the key \"code\".\nEnsure the response does not include any comments, explanations, unnecessary text, or \\\\n characters for new lines.\nExamples:\n\nUser Prompt: \"Create a primary button with the text 'Submit'\"\nResponse:\n{\"code\":\"<button class=\\\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded\\\">Submit</button>\"}\n\nUser Prompt: \"Create a centered card with a title 'Welcome' and a paragraph 'Hello, user!'\"\nResponse:\n{\"code\":\"<div class=\\\"max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden\\\"><div class=\\\"px-6 py-4\\\"><div class=\\\"font-bold text-xl mb-2\\\">Welcome</div><p class=\\\"text-gray-700 text-base\\\">Hello, user!</p></div></div>\"}\n\nUser Prompt: \"Create an input field with a placeholder 'Enter your email'\"\nResponse:\n{\"code\":\"<input class=\\\"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\\\" type=\\\"email\\\" placeholder=\\\"Enter your email\\\">\"}\n\nUser Prompt: \"Create a navigation bar with three links: Home, About, Contact\"\nResponse:\n{\"code\":\"<nav class=\\\"bg-gray-800 p-4\\\"><ul class=\\\"flex\\\"><li class=\\\"mr-6\\\"><a class=\\\"text-white hover:text-gray-400\\\" href=\\\"#\\\">Home</a></li><li class=\\\"mr-6\\\"><a class=\\\"text-white hover:text-gray-400\\\" href=\\\"#\\\">About</a></li><li class=\\\"mr-6\\\"><a class=\\\"text-white hover:text-gray-400\\\" href=\\\"#\\\">Contact</a></li></ul></nav>\"}\n\nUser Prompt: \"Create a footer with the text '© 2024 Your Company' centered\"\nResponse:\n{\"code\":\"<footer class=\\\"bg-gray-800 text-white text-center py-4\\\"><p>© 2024 Your Company</p></footer>\"}\n",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}
