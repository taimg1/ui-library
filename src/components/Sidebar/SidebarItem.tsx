import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { SidebarItem as SidebarItemType } from "./types";
import { cn } from "../../lib/utils";

interface SidebarItemProps {
  item: SidebarItemType;
  depth?: number;
  onClose: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  depth = 0,
  onClose,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = item.children && item.children.length > 0;
  const isLink = !hasChildren && item.href;
  const Icon = item.icon;

  const paddingLeft = `${depth * 1 + 0.75}rem`;

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleLinkClick = () => {
    if (isLink) {
      onClose();
    }
  };

  const contentClasses = cn(
    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer group",
    "hover:bg-gray-100 dark:hover:bg-slate-800",
    "text-gray-700 dark:text-gray-300",
    "focus:outline-none focus:ring-2 focus:ring-blue-500"
  );

  const renderContent = () => (
    <>
      {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
      <span className="flex-1 font-medium text-sm">{item.label}</span>
      {hasChildren && (
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </motion.div>
      )}
      {!hasChildren && !isLink && (
        <ChevronRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </>
  );

  return (
    <li>
      {hasChildren && (
        <>
          <div
            onClick={handleToggle}
            className={contentClasses}
            style={{ paddingLeft }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle();
              }
            }}
          >
            {renderContent()}
          </div>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden space-y-1 mt-1"
              >
                {item.children!.map((child, index) => (
                  <SidebarItem
                    key={`${child.label}-${index}`}
                    item={child}
                    depth={depth + 1}
                    onClose={onClose}
                  />
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </>
      )}

      {isLink && (
        <Link
          to={item.href!}
          onClick={handleLinkClick}
          className={contentClasses}
          style={{ paddingLeft }}
        >
          {renderContent()}
        </Link>
      )}

      {!hasChildren && !isLink && (
        <div className={contentClasses} style={{ paddingLeft }}>
          {renderContent()}
        </div>
      )}
    </li>
  );
};

export default SidebarItem;
