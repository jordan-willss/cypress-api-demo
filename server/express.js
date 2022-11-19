import express from 'express';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';
import * as path from 'path';

const app = express();
const jsonParser = bodyParser.json()
const __dirname = process.cwd();

config({ path: path.join(__dirname, '/server/config/config.env') });
const port = process?.env?.PORT || 5005;

console.log(path.join(__dirname, '/server/config/config.env'));

app.use(express.static(__dirname + '/server/assets'));

// connectDB();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/server/index.html'));
})

app.get('/api/background', (req, res) => {
    res.sendFile(path.join(__dirname, '/server/assets/img/background-body.png'))
})

app.get('/api/uuid', (req, res) => {
    res.json({ uuid: uuidv4() });
});

app.post('/api/strToHex', jsonParser, (req, res) => {
    function strToHex(str) {
        var arr1 = [];
        for (let i = 0; i < str.length; i++) {
            var hex = Number(str.charCodeAt(i)).toString(16);
            arr1.push(hex);
        }
        return arr1.join(' ');
    }

    if (req.body.text !== '') res.json({ hex: strToHex(req.body.text) })
    else res.json({ response: 'Input is empty' })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
