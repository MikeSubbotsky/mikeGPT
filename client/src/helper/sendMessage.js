// import axios from 'axios';

// const handleSendMessage = async () => {
//   if (userInput.trim() === '') return;

//   setMessages([...messages, { role: 'user', content: userInput }]);

//   try {
//     const response = await axios.post('http://localhost:4000/api/chat', { message: userInput });
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { role: 'assistant', content: response.data.content },
//     ]);
//   } catch (error) {
//     console.error('Error sending message:', error);
//   }

//   setUserInput('');
// };

// export default handleSendMessage;