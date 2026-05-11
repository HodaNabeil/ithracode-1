'use client';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, FieldPath } from 'react-hook-form';
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { IFormField } from '@/types/app';
import Image from 'next/image';
import { Camera, Plus, X, Upload } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<IFormField, 'name'> {
  control: Control<TFieldValues>;
  className?: string;
  name: TName;
  currentImageUrl?: string; // Add prop for existing image URL
  uploadProgress?: number; // Upload progress percentage (0-100)
  isUploading?: boolean; // Upload state
}

const ImageField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  name,
  placeholder,
  disabled,
  control,
  className,
  currentImageUrl,
  uploadProgress = 0,
  isUploading = false,
}: Props<TFieldValues, TName>) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(
    currentImageUrl ?? null,
  );

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File | null) => void,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Pass the file to the form
      onChange(file);
    }
  };

  const removeImage = (onChange: (value: File | null) => void) => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldContent>
            {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

            <div className={cn('space-y-4 w-1/3 h-40 ', className)}>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, onChange)}
                className="hidden"
                disabled={disabled}
                aria-invalid={fieldState.invalid}
              />

              {/* Preview or upload area */}
              <div
                className={cn(
                  'relative rounded-xl h-full text-center transition-[color,box-shadow] border bg-transparent shadow-xs',
                  'hover:border-gray-alpha-300 dark:border-gray-alpha-200 dark:hover:border-gray-alpha-300 border-input',
                  'focus-within:border-ring focus-within:ring-ring focus-within:ring-1',
                  fieldState.invalid &&
                    'ring-destructive dark:ring-destructive border-destructive',
                )}
              >
                {preview ? (
                  <div className="relative h-full element-center">
                    <div
                      className={cn(
                        'relative cursor-pointer group w-full h-full element-center',
                        isUploading && 'pointer-events-none',
                      )}
                      onClick={
                        disabled || isUploading ? undefined : handleFileSelect
                      }
                    >
                      <Image
                        src={preview}
                        alt={preview ? 'Preview' : 'Current profile picture'}
                        width={128}
                        height={128}
                        className={cn(
                          'mx-auto h-32 w-32 rounded-full object-cover shadow-lg transition-opacity',
                          isUploading ? 'opacity-60' : 'group-hover:opacity-75',
                        )}
                      />

                      {/* Upload progress overlay */}
                      {isUploading && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-black/60 w-32 h-32 rounded-full">
                          <Upload className="w-6 h-6 text-white mb-2 animate-pulse" />
                          <div className="w-20 space-y-1">
                            <Progress value={uploadProgress} className="h-2" />
                            <p className="text-xs text-white font-medium text-center">
                              {uploadProgress}%
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Overlay icon on hover (only when not uploading) */}
                      {!isUploading && (
                        <div className="absolute inset-0 bottom-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera />
                        </div>
                      )}
                      {/* Tooltip text (only when not uploading) */}
                      {!isUploading && (
                        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {preview
                            ? 'اضغط لتغيير الصورة'
                            : 'اضغط لتغيير الصورة الحالية'}
                        </div>
                      )}
                    </div>

                    {/* Remove button (disabled during upload) */}
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => removeImage(onChange)}
                      disabled={disabled || isUploading}
                    >
                      <X className="w-3! h-3!" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className={cn(
                      'space-y-2 cursor-pointer transition-colors hover:bg-sidebar-accent/50 rounded-lg flex-col element-center h-full w-full',
                      disabled && 'cursor-not-allowed opacity-50',
                    )}
                    onClick={disabled ? undefined : handleFileSelect}
                  >
                    <div className="mx-auto h-16 w-16 rounded-full bg-sidebar-accent element-center">
                      <Plus className="text-muted-foreground" />
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {placeholder || 'اضغط هنا لاختيار صورة (مطلوب)'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
        </Field>
      )}
    />
  );
};

export default ImageField;
