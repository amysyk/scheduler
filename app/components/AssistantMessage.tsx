interface AssistantMessageProps {
  message: string;
}

export default function AssistantMessage({ message }: AssistantMessageProps) {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[85%] sm:max-w-[75%]">
        <div className="text-xs text-blue-600 mb-1 px-1 font-medium">App</div>
        <div className="bg-blue-50 rounded-lg px-4 py-3 shadow-sm border border-blue-100">
          <p className="text-gray-800 whitespace-pre-wrap break-words">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
