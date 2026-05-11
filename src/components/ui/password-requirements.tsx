import { PASSWORD_REQUIREMENTS } from '@/validation/auth';
import { Check, X } from 'lucide-react';
import { useMemo } from 'react';

interface PasswordRequirementsProps {
  password: string;
  isFocused?: boolean;
}

export function PasswordRequirements({
  password,
  isFocused = false,
}: PasswordRequirementsProps) {
  // Track if the input has ever been focused using a derived state
  const isVisible = useMemo(() => isFocused, [isFocused]);

  return (
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isVisible
          ? 'grid-rows-[1fr] opacity-100 mt-0'
          : 'grid-rows-[0fr] opacity-0 -mt-3'
      }`}
    >
      <div className="overflow-hidden">
        <div className="space-y-2">
          {PASSWORD_REQUIREMENTS.map((requirement, index) => {
            const isValid = requirement.test(password);
            return (
              <div key={index} className="flex items-center gap-2 text-sm">
                {isValid ? (
                  <Check className="h-3.5 w-3.5 text-success" />
                ) : (
                  <X className="h-3.5 w-3.5 text-gray-alpha-600" />
                )}
                <span
                  className={
                    isValid ? 'text-success font-medium' : 'text-gray-alpha-600'
                  }
                >
                  {requirement.message}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
