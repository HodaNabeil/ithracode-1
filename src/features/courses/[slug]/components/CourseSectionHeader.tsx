import React from 'react';

type IconProps = { className?: string; 'aria-hidden'?: boolean };
type IconComponent = React.ComponentType<IconProps>;
type IconType = React.ReactElement<IconProps> | IconComponent;

export type CourseSectionHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: IconType;
  iconClassName?: string;
  iconContainerClassName?: string;
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

function renderIcon(
  icon: IconType | undefined,
  className: string,
): React.ReactNode {
  if (!icon) return null;
  if (React.isValidElement<IconProps>(icon)) {
    const existing = icon.props?.className;
    const mergedClassName = [existing, className].filter(Boolean).join(' ');
    return React.cloneElement(icon, {
      className: mergedClassName,
      'aria-hidden': true,
    });
  }

  return React.createElement(icon, { className, 'aria-hidden': true });
}

export const CourseSectionHeader = ({
  title,
  subtitle,
  icon,
  iconClassName = 'size-[24px] text-primary',
  iconContainerClassName = 'rounded-full mb-4 bg-slate-400/10 w-[48px] h-[48px] element-center text-primary',
  containerClassName = 'flex flex-col items-start text-start',
  titleClassName = 'text-2xl md:text-3xl text-primary font-medium md:font-semibold',
  subtitleClassName = 'mb-3 inline-block text-accent-foreground ',
}: CourseSectionHeaderProps) => {
  return (
    <div className="mt-10 mb-5">
      <div className={containerClassName}>
        {icon && (
          <div className={iconContainerClassName}>
            {renderIcon(icon, iconClassName)}
          </div>
        )}
        {subtitle ? <p className={subtitleClassName}>{subtitle}</p> : null}
        <h2 className={titleClassName}>{title}</h2>
      </div>
    </div>
  );
};
