import { Check, Lightbulb } from 'lucide-react';
import React from 'react';
import { CourseSectionHeader } from './CourseSectionHeader';

type IconProps = { className?: string; 'aria-hidden'?: boolean };
type IconComponent = React.ComponentType<IconProps>;
type IconType = React.ReactElement<IconProps> | IconComponent;

export type ObjectivesItem = {
  text: React.ReactNode;
  icon?: IconType;
};

export type ObjectivesProps = {
  objectives?: string[];
  items?: ObjectivesItem[];
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headerIcon?: IconType;
  dir?: 'rtl' | 'ltr' | 'auto';
  layout?: 'list' | 'grid';
  columnsClassName?: string;
  iconClassName?: string;
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

export const ObjectivesCourse = ({
  objectives = [],
  items,
  title = 'أهداف الدورة',
  subtitle = 'عملي ومتميز',
  headerIcon = Lightbulb,
  dir = 'auto',
  layout = 'list',
  columnsClassName,
  iconClassName = 'w-4 h-4 text-secondary-foreground',
}: ObjectivesProps) => {
  const computedItems: ObjectivesItem[] =
    items && items.length > 0
      ? items
      : objectives.map((point) => ({ text: point, icon: Check }));

  if (computedItems.length === 0) return null;

  const listClassName =
    layout === 'grid'
      ? [
          'mt-8 grid gap-4',
          columnsClassName ?? 'grid-cols-1 md:grid-cols-2',
        ].join(' ')
      : 'mt-8 flex flex-col gap-4';

  return (
    <section className="section-gap" dir={dir}>
      <div className="container">
        <CourseSectionHeader
          title={title}
          subtitle={subtitle}
          icon={headerIcon}
        />

        <ul className={listClassName}>
          {computedItems.map((item, index) => (
            <li
              key={`what-you-learn-${index}`}
              className="flex items-center gap-4"
            >
              <div className="shrink-0">
                {renderIcon(item.icon ?? Check, iconClassName)}
              </div>
              <span className="text-lg text-secondary-foreground">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
