import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import '../styles/transitions.css';

interface PageTransitionProps {
  children: React.ReactNode;
  transitionKey?: string;
  timeout?: number;
  classNames?: string;
}

/**
 * PageTransition component that wraps content with animated transitions
 * Uses React Transition Group to handle enter/exit animations
 * 
 * @param children - The content to be rendered with transitions
 * @param transitionKey - Optional key to trigger transitions (defaults to pathname)
 * @param timeout - Duration of the transition in ms (defaults to 300)
 * @param classNames - CSS class names for the transition (defaults to 'page-transition')
 * @returns The PageTransition component
 */
const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  transitionKey,
  timeout = 300,
  classNames = 'page-transition'
}) => {
  const location = useLocation();
  const nodeRef = React.useRef(null);
  
  // Use the provided key or fallback to the current pathname
  const key = transitionKey || location.pathname;
  
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={key}
        timeout={timeout}
        classNames={classNames}
        nodeRef={nodeRef}
        unmountOnExit
      >
        <div ref={nodeRef} className="page-transition-wrapper">
          {children}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default PageTransition; 