import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const caminhoUploads = path.join(__dirname, '..', 'uploads');
        cb(null, caminhoUploads);
    },
    filename: (req, file, cb) => {
        const tempo = Date.now();
        const nomeArquivo = `${tempo}-${file.originalname}`;
        cb(null, nomeArquivo);
    }
});

export const upload = multer({ storage });