import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface QuestionInputProps {
  questionId: string;
  placeholder?: string;
  onCorrectAnswer: (answer: string) => void;
  validator: (answer: string) => boolean;
  disabled?: boolean;
  className?: string;
}

export const QuestionInput = ({ 
  questionId, 
  placeholder = "답을 입력하세요",
  onCorrectAnswer,
  validator,
  disabled = false,
  className = ""
}: QuestionInputProps) => {
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!answer.trim()) return;

    const isValid = validator(answer);
    setIsCorrect(isValid);
    
    if (isValid) {
      onCorrectAnswer(answer);
      setShowError(false);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex gap-2">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled || isCorrect === true}
          className={`scripture-input flex-1 ${
            isCorrect === true ? 'border-green-500 bg-green-50' : 
            isCorrect === false ? 'border-red-500' : ''
          }`}
        />
        <Button 
          onClick={handleSubmit}
          disabled={disabled || isCorrect === true || !answer.trim()}
          className="btn-divine"
        >
          {isCorrect === true ? <CheckCircle className="w-4 h-4" /> : '확인'}
        </Button>
      </div>
      
      {showError && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>틀렸습니다. 다시 시도해주세요.</span>
        </div>
      )}
      
      {isCorrect === true && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>정답입니다!</span>
        </div>
      )}
    </div>
  );
};