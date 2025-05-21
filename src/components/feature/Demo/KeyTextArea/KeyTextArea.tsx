import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Textarea } from "@/components/common/Textarea";
import { TFunction } from "i18next";

const TRUNCATE_LENGTH = 100;

export interface KeyTextAreaProps {
  type: 'public' | 'private';
  value: string;
  isFullView: boolean;
  setFullView: (show: boolean) => void;
  t: TFunction;
  isEditing?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  editedPrivateKey?: string;
}

export const KeyTextArea: React.FC<KeyTextAreaProps> = ({
  type,
  value,
  isFullView,
  setFullView,
  t,
  isEditing,
  onChange,
  placeholder,
  editedPrivateKey,
}) => {
    const isTruncated = !isFullView && value.length > TRUNCATE_LENGTH && !isEditing;
    const displayValue = isTruncated ? `${value.substring(0, TRUNCATE_LENGTH)}...` : value;
    const canBeTruncated = value.length > TRUNCATE_LENGTH && !isEditing;

    return (
      <div className="relative">
        <Textarea
          value={isEditing && type === 'private' ? editedPrivateKey : displayValue}
          onChange={isEditing && type === 'private' ? onChange : undefined}
          readOnly={!isEditing}
          className={`font-mono text-xs resize-none bg-gray-800/60 border-gray-700/80 focus:border-sky-500 
            transition-all duration-200 ease-in-out 
            ${isEditing ? 'border-amber-500 bg-gray-900/70 h-40' : (isFullView ? 'h-40' : 'h-28')} 
            ${isTruncated ? 'cursor-pointer' : ''}`}
          onClick={isTruncated ? () => setFullView(true) : undefined}
          placeholder={placeholder}
          rows={isFullView || isEditing ? 6 : 3}
        />
        {canBeTruncated && (
          <Button 
            variant='ghost' 
            size='sm' 
            onClick={() => setFullView(!isFullView)}
            className='absolute bottom-2 right-2 text-xs text-sky-400 hover:text-sky-300 bg-gray-800/70 hover:bg-gray-700/90 px-2 py-1 rounded'
          >
            {isFullView ? (
              <><ChevronUp className="w-3 h-3 mr-1" /> {t('showLess', {ns: 'common', defaultValue: 'Show Less'})}</>
            ) : (
              <><ChevronDown className="w-3 h-3 mr-1" /> {t('showMore', {ns: 'common', defaultValue: 'Show More'})}</>
            )}
          </Button>
        )}
      </div>
    );
  };
