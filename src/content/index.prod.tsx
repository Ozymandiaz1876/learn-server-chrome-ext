import { createRoot } from 'react-dom/client';

import Content from './Content';

const root = document.createElement('div');
document.body.appendChild(root);

createRoot(root).render(<Content />);
