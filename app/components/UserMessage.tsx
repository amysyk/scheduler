interface UserMessageProps {
  message: string;
}

export default function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[85%] sm:max-w-[75%]">
        <div className="text-xs text-gray-500 mb-1 px-1">You</div>
        <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200">
          <p className="text-gray-800 whitespace-pre-wrap break-words">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
