import { createRoot, Root } from 'react-dom/client';

const mountedContainers = new Set<HTMLDivElement>();
const mountedRoots = new Set<Root>();

/**
 * Creates a new test container and appends it to the document body.
 * The container is tracked for automatic cleanup after each test.
 *
 * @returns {HTMLDivElement} The newly created container element.
 */
export function createTestContainer(): HTMLDivElement {
  const container = document.createElement('div');
  document.body.appendChild(container);

  // Track the container for cleanup
  mountedContainers.add(container);

  return container;
}

/**
 * Cleans up a single container by removing it from the DOM and the tracked set.
 *
 * @param {HTMLDivElement} container - The container to clean up.
 */
function cleanupContainer(container: HTMLDivElement): void {
  if (container.parentNode === document.body) {
    document.body.removeChild(container);
  }
  mountedContainers.delete(container);
}

/**
 * Cleans up all tracked containers and roots.
 * This function is automatically called after each test.
 */
function cleanup(): void {
  mountedContainers.forEach(cleanupContainer);
  mountedRoots.forEach(root => {
    root.unmount();
  });
  mountedContainers.clear();
  mountedRoots.clear();
}

// Automatically cleanup after each test
afterEach(cleanup);

/**
 * Renders a React component into a test container.
 * The container and its associated root are tracked for cleanup.
 *
 * @param {React.ReactNode} children - The React component to render.
 * @returns {Promise<HTMLDivElement>} The container where the component was rendered.
 */
export async function render(children: React.ReactNode): Promise<HTMLDivElement> {
  const container = createTestContainer();
  const root = createRoot(container);

  // Render the React component
  root.render(children);

  // Track the root for cleanup
  mountedRoots.add(root);

  return container;
}
