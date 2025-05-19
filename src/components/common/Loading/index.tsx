export const Loading = () => (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="flex space-x-2">
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-75"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
    </div>
  </div>
);

export default Loading;
