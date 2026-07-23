import { Children, cloneElement, isValidElement } from "react";
import "./ScrollStack.css";

export const ScrollStackItem = ({
  children,
  itemClassName = "",
  style,
  sticky = false,
}) => (
  <div
    className={`scroll-stack-card${sticky ? " scroll-stack-card--sticky" : ""} ${itemClassName}`.trim()}
    style={style}
  >
    {children}
  </div>
);

/**
 * Window-scroll mode uses CSS sticky (native compositing — no JS transform jitter).
 * Nested mode keeps the original JS stack behavior for contained scrollers.
 */
const ScrollStack = ({
  children,
  className = "",
  itemDistance = 350,
  itemStackDistance = 30,
  stackPosition = "20%",
  useWindowScroll = false,
}) => {
  if (useWindowScroll) {
    const items = Children.toArray(children).filter(isValidElement);

    return (
      <div className={`scroll-stack-scroller scroll-stack-scroller--window ${className}`.trim()}>
        <div className="scroll-stack-inner scroll-stack-inner--sticky">
          {items.map((child, index) =>
            cloneElement(child, {
              sticky: true,
              style: {
                ...child.props.style,
                top: `calc(${stackPosition} + ${index * itemStackDistance}px)`,
                zIndex: index + 1,
                marginBottom: index < items.length - 1 ? itemDistance : 0,
              },
            })
          )}
          <div className="scroll-stack-end" />
        </div>
      </div>
    );
  }

  return (
    <NestedScrollStack className={className} itemDistance={itemDistance}>
      {children}
    </NestedScrollStack>
  );
};

function NestedScrollStack({ children, className, itemDistance }) {
  // Lightweight fallback: still sticky inside a tall nested pane is more stable
  // than Lenis + transforms for this portfolio. Kept as a simple stacked list.
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()}>
      <div className="scroll-stack-inner">
        {items.map((child, index) =>
          cloneElement(child, {
            sticky: true,
            style: {
              ...child.props.style,
              top: `${16 + index * 12}px`,
              zIndex: index + 1,
              marginBottom: index < items.length - 1 ? itemDistance : 0,
            },
          })
        )}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
}

export default ScrollStack;
