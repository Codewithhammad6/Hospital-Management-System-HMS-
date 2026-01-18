import {app} from './index.js';
import dotenv from 'dotenv';
dotenv.config();

app.listen(process.env.PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

