import dotenv from 'dotenv';
import React from 'react';
import { createRoot } from 'react-dom/client';

import Application from 'common/Application';
import { ID_ROOT } from 'common/constants';
import 'style/style.scss';

const element = document.getElementById(ID_ROOT);
if (!element) throw new Error('Element root not found!');
const root = createRoot(element);

dotenv.config();
root.render(<Application />);
